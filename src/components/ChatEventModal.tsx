import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { ChatScenario } from '../types';
import { Deepseek, conversation, ChatMessage } from '../utils/ai';

interface ChatEventModalProps {
  scenario: ChatScenario;
  eventDescription?: string;
  onClose: () => void;
  onComplete: (result: any) => void;
  onError: (message: string) => void;
}

const ChatEventModal: React.FC<ChatEventModalProps> = ({
  scenario,
  eventDescription,
  onClose,
  onComplete,
  onError,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [completionResult, setCompletionResult] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      { role: 'system', content: scenario.systemPrompt },
      { role: 'assistant', content: scenario.openingMessage },
    ]);
  }, [scenario]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const userMessageCount = messages.filter((m) => m.role === 'user').length;
  const remainingTurns = 10 - userMessageCount;

  const handleSend = async () => {
    if (!input.trim() || input.length > 100 || remainingTurns <= 0) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await Deepseek(newHistory);
      console.log('AI Reply:', reply);

      try {
        const parsed = JSON.parse(reply);
        if (parsed.reply && typeof parsed.reply === 'string' && parsed.reply.trim()) {
          setMessages((prev) => [...prev, { role: 'assistant', content: parsed.reply }]);
        }
        if (parsed.is_finished && parsed.result) {
          setCompletionResult(parsed.result);
        }
      } catch (e) {
        console.error('JSON Parse Error', e);
        if (reply && typeof reply === 'string' && reply.trim()) {
          setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'system', content: 'Error: 无法连接到 AI 服务，请检查网络或后端服务。' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = async () => {
    setIsLoading(true);
    try {
      const resultJson = await conversation(messages);
      const result = JSON.parse(resultJson);
      onComplete(result);
    } catch (error) {
      console.error('Evaluation failed', error);
      onError('AI 判决失败，请重试或直接关闭。');
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm duration-200">
      <div className="flex h-[600px] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            <h2 className="text-lg font-bold">{scenario.title}</h2>
          </div>
        </div>

        {/* Description Banner */}
        {eventDescription && (
          <div className="flex shrink-0 items-start gap-2 border-b border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            <span className="mt-0.5 shrink-0">💡</span>
            <span>{eventDescription}</span>
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4">
          {messages
            .filter((m) => m.role !== 'system')
            .map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                    msg.role === 'user'
                      ? 'rounded-br-none bg-blue-600 text-white'
                      : 'rounded-bl-none border border-slate-200 bg-white text-slate-800'
                  }`}
                >
                  <div className="mb-1 flex items-center gap-2 text-xs opacity-70">
                    {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                    <span>{msg.role === 'user' ? '我' : '家长'}</span>
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="shrink-0 space-y-3 border-t border-slate-200 bg-white p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && !isLoading && !completionResult && handleSend()
                }
                placeholder={
                  completionResult
                    ? '对话已结束'
                    : remainingTurns > 0
                      ? '输入你的回复...'
                      : '对话次数已用尽'
                }
                disabled={isLoading || remainingTurns <= 0 || !!completionResult}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-16 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-slate-100"
              />
              <span
                className={`pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs ${input.length >= 90 ? 'font-bold text-red-500' : 'text-slate-400'}`}
              >
                {input.length}/100
              </span>
            </div>
            <button
              onClick={handleSend}
              disabled={
                isLoading ||
                !input.trim() ||
                input.length > 100 ||
                remainingTurns <= 0 ||
                !!completionResult
              }
              className="rounded-xl bg-blue-600 p-3 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
            </button>
          </div>

          {completionResult ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 flex w-full flex-col items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
              <p className="text-lg font-bold text-green-800">家长决定结束对话</p>
              <p className="text-sm text-green-600">对方似乎已经有了决定，点击下方按钮查看结果。</p>
              <button
                onClick={() => onComplete(completionResult)}
                className="mt-2 rounded-xl bg-green-600 px-8 py-3 text-base font-bold text-white shadow-lg shadow-green-200 transition-all hover:scale-105 hover:bg-green-700 active:scale-95"
              >
                查看谈判结果
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-400">
                  {messages.length > 2 ? '对话进行中...' : '请开始你的表演'}
                </span>
                <span
                  className={`mt-0.5 text-xs font-bold ${remainingTurns < 3 ? 'text-red-500' : 'text-slate-400'}`}
                >
                  剩余回合: {remainingTurns}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700"
                >
                  放弃离开
                </button>
                <button
                  onClick={handleFinish}
                  disabled={messages.length < 4 || isLoading}
                  className="rounded-lg bg-green-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-green-200 hover:bg-green-700 disabled:opacity-50"
                >
                  结束对话并结算
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatEventModal;
