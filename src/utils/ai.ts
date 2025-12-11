
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const Deepseek = async (messages: ChatMessage[]) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error("DeepSeek API Call Failed:", error);
    throw error;
  }
};

export const conversation = async (history: ChatMessage[]) => {
  const evaluationPrompt: ChatMessage = {
    role: 'system',
    content: `你是游戏《信奥机构模拟器》的裁判。玩家刚刚扮演机构老板与你扮演的家长进行了对话。
请根据对话内容，判定谈判结果，并以 JSON 格式返回对玩家机构的影响。

评价标准：
1. 玩家态度是否专业、诚恳？
2. 玩家是否成功解决了家长的问题（如砍价、投诉）？
3. 玩家是否维护了机构的利益（没有无底线让步）？

请返回如下 JSON 格式（不要包含 markdown 代码块）：
{
  "success": boolean, // 谈判是否成功
  "message": "一句话总结谈判结果",
  "reward": {
    "reputation": number, // 声望变化 (-20 到 +20)
    "money": number, // 资金变化 (如退费则为负，获得赞助则为正)
    "studentSatisfaction": number, // 学生满意度变化
    "coachMorale": number, // 教练士气变化 (-20 到 +20)
    "students": number // 学生人数变化 (如退学为 -1)
  }
}
`
  };

  const contextMessages = history.filter(m => m.role !== 'system');
  return Deepseek([evaluationPrompt, ...contextMessages]);
};