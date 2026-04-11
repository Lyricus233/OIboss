import React, { useEffect, useMemo, useState } from 'react';
import { ContestResult } from '../types';
import { Medal, Pause, Play, SkipForward, Trophy, X } from 'lucide-react';

interface ContestResultModalProps {
  result: ContestResult;
  onClose: () => void;
}

type GroupKey = 'BEGINNER' | 'INTERMEDIATE' | 'OPEN';
type GroupFilter = 'ALL' | GroupKey;
type Phase = 'LIVE' | 'FINAL';
type OrderMode = 'ASC' | 'DESC';

interface LiveStudentState {
  studentId: string;
  studentName: string;
  contestGroup: GroupKey;
  finalScores: number[];
  currentScores: number[];
  totalScore: number;
  finalTotal: number;
  rank: number;
  isRecommended?: boolean;
}

interface LiveLog {
  id: string;
  tick: number;
  message: string;
  type: 'submit' | 'solve' | 'info';
}

const GROUP_LABEL: Record<GroupFilter, string> = {
  ALL: '全部',
  BEGINNER: '普及组',
  INTERMEDIATE: '提高组',
  OPEN: '公开组',
};

const rankClass = (rank: number) => {
  if (rank === 1) return 'border-amber-200 bg-amber-100 text-amber-700';
  if (rank === 2) return 'border-slate-200 bg-slate-100 text-slate-700';
  if (rank === 3) return 'border-orange-200 bg-orange-100 text-orange-700';
  return 'border-slate-200 bg-slate-50 text-slate-600';
};

const recalculateRank = (list: LiveStudentState[]) => {
  const sorted = [...list].sort((a, b) => {
    if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
    return a.studentName.localeCompare(b.studentName, 'zh-Hans-CN');
  });
  let lastScore = Number.NaN;
  let rank = 0;
  sorted.forEach((item, index) => {
    if (index === 0 || item.totalScore !== lastScore) rank = index + 1;
    item.rank = rank;
    lastScore = item.totalScore;
  });
  return sorted;
};

const ContestResultModal: React.FC<ContestResultModalProps> = ({ result, onClose }) => {
  const [phase, setPhase] = useState<Phase>('LIVE');
  const [filter, setFilter] = useState<GroupFilter>('ALL');
  const [isRunning, setIsRunning] = useState(true);
  const [orderMode, setOrderMode] = useState<OrderMode>('ASC');
  const [tick, setTick] = useState(0);
  const maxTicks = useMemo(() => Math.min(20, Math.max(8, result.problems.length * 4)), [result]);
  const [logs, setLogs] = useState<LiveLog[]>([
    {
      id: 'init-0',
      tick: 0,
      message: `${result.contestName} 开始，正在实时滚榜...`,
      type: 'info',
    },
  ]);

  const availableGroups = useMemo(() => {
    const set = new Set<GroupKey>();
    result.participants.forEach((p) => set.add(p.contestGroup));
    return (['BEGINNER', 'INTERMEDIATE', 'OPEN'] as GroupKey[]).filter((g) => set.has(g));
  }, [result.participants]);

  useEffect(() => {
    if (filter !== 'ALL' && !availableGroups.includes(filter)) {
      setFilter('ALL');
    }
  }, [availableGroups, filter]);

  const [liveStudents, setLiveStudents] = useState<LiveStudentState[]>(() =>
    recalculateRank(
      result.participants.map((p) => ({
        studentId: p.studentId,
        studentName: p.studentName,
        contestGroup: p.contestGroup,
        finalScores: p.problemScores,
        currentScores: new Array(p.problemScores.length).fill(0),
        totalScore: 0,
        finalTotal: p.totalScore,
        rank: 0,
        isRecommended: p.isRecommended,
      }))
    )
  );

  useEffect(() => {
    if (!isRunning || phase !== 'LIVE') return;
    const timer = window.setTimeout(() => {
      setTick((prev) => prev + 1);
    }, 600);
    return () => window.clearTimeout(timer);
  }, [isRunning, phase, tick]);

  useEffect(() => {
    if (phase !== 'LIVE') return;
    if (tick === 0) return;

    let emittedLogs: LiveLog[] = [];

    setLiveStudents((prev) => {
      let updated = prev.map((s) => ({ ...s, currentScores: [...s.currentScores] }));

      updated.forEach((student, idx) => {
        const pendingProblemIndex = student.currentScores.findIndex(
          (v, problemIndex) => v < student.finalScores[problemIndex]
        );
        if (pendingProblemIndex < 0) return;

        const progressChance = 0.45 + (student.rank <= 3 ? 0.12 : 0) + Math.random() * 0.2;
        if (Math.random() > progressChance) return;

        const left =
          student.finalScores[pendingProblemIndex] - student.currentScores[pendingProblemIndex];
        const ticksLeft = Math.max(1, maxTicks - tick + 1);
        const minInc = Math.max(1, Math.floor(left / (ticksLeft + 1)));
        const maxInc = Math.max(minInc, Math.ceil(left / Math.max(1, ticksLeft / 2)));
        const inc = Math.min(left, minInc + Math.floor(Math.random() * (maxInc - minInc + 1)));

        student.currentScores[pendingProblemIndex] += inc;
        student.totalScore = student.currentScores.reduce((sum, v) => sum + v, 0);

        const problemLabel =
          result.problems[pendingProblemIndex]?.label || `T${pendingProblemIndex + 1}`;
        emittedLogs.push({
          id: `log-${tick}-${student.studentId}-${idx}`,
          tick,
          message: `${student.studentName} 提交 ${problemLabel}，当前总分 ${student.totalScore}`,
          type:
            student.currentScores[pendingProblemIndex] >= student.finalScores[pendingProblemIndex]
              ? 'solve'
              : 'submit',
        });
      });

      if (tick >= maxTicks) {
        updated = updated.map((student) => {
          const finalScores = [...student.finalScores];
          return {
            ...student,
            currentScores: finalScores,
            totalScore: finalScores.reduce((sum, v) => sum + v, 0),
          };
        });
      }

      const ranked = recalculateRank(updated);
      const allFinished = ranked.every((s) => s.totalScore >= s.finalTotal);
      if (allFinished || tick >= maxTicks) {
        setPhase('FINAL');
        setIsRunning(false);
        emittedLogs.push({
          id: `finish-${tick}`,
          tick,
          message: '滚榜结束，最终排名已锁定。',
          type: 'info',
        });
      }
      return ranked;
    });

    if (emittedLogs.length > 0) {
      setLogs((prev) => [...prev, ...emittedLogs].slice(-220));
    }
  }, [tick, maxTicks, phase, result.problems]);

  const visibleStudents = useMemo(() => {
    if (filter === 'ALL') return liveStudents;
    return liveStudents.filter((s) => s.contestGroup === filter);
  }, [filter, liveStudents]);

  const finalSorted = useMemo(() => {
    return [...result.participants].sort((a, b) => b.totalScore - a.totalScore);
  }, [result.participants]);

  const finalListRows = useMemo(() => {
    const rows =
      filter === 'ALL' ? [...finalSorted] : finalSorted.filter((r) => r.contestGroup === filter);
    rows.sort((a, b) => {
      if (orderMode === 'ASC') {
        if (a.rank !== b.rank) return a.rank - b.rank;
        return b.totalScore - a.totalScore;
      }
      if (a.rank !== b.rank) return b.rank - a.rank;
      return a.totalScore - b.totalScore;
    });
    return rows;
  }, [filter, finalSorted, orderMode]);

  const finalByGroup = useMemo(() => {
    const groupList: GroupKey[] = filter === 'ALL' ? availableGroups : [filter as GroupKey];
    return groupList.map((group) => {
      const rows = finalSorted.filter((r) => r.contestGroup === group);
      const total = rows.length || 1;
      const average = rows.reduce((sum, r) => sum + r.totalScore, 0) / total;
      const top = rows.slice(0, 3);
      const bottom = [...rows].reverse().slice(0, 3);
      const firstRate = (rows.filter((r) => r.award === '一等奖').length / total) * 100;
      const secondRate = (rows.filter((r) => r.award === '二等奖').length / total) * 100;
      const thirdRate = (rows.filter((r) => r.award === '三等奖').length / total) * 100;
      const passRate = (rows.filter((r) => r.passed).length / total) * 100;
      const standoutByTotal = rows[0];
      const standoutBySingle = [...rows].sort(
        (a, b) => Math.max(...b.problemScores) - Math.max(...a.problemScores)
      )[0];
      return {
        group,
        rows,
        average,
        top,
        bottom,
        firstRate,
        secondRate,
        thirdRate,
        passRate,
        standoutByTotal,
        standoutBySingle,
      };
    });
  }, [availableGroups, filter, finalSorted]);

  const jumpToFinal = () => {
    setLiveStudents(
      recalculateRank(
        result.participants.map((p) => ({
          studentId: p.studentId,
          studentName: p.studentName,
          contestGroup: p.contestGroup,
          finalScores: p.problemScores,
          currentScores: [...p.problemScores],
          totalScore: p.totalScore,
          finalTotal: p.totalScore,
          rank: p.rank,
          isRecommended: p.isRecommended,
        }))
      )
    );
    setTick(maxTicks);
    setIsRunning(false);
    setPhase('FINAL');
    setLogs((prev) =>
      [
        ...prev,
        {
          id: `skip-${Date.now()}`,
          tick: maxTicks,
          message: '已跳过滚榜，直接查看最终排名。',
          type: 'info' as const,
        },
      ].slice(-220)
    );
  };

  const cutoffText = useMemo(() => {
    if (result.groupCutoffScores) {
      const chunks: string[] = [];
      if (typeof result.groupCutoffScores.INTERMEDIATE === 'number') {
        chunks.push(`提高组晋级线 ${result.groupCutoffScores.INTERMEDIATE}`);
      }
      if (typeof result.groupCutoffScores.BEGINNER === 'number') {
        chunks.push(`普及组晋级线 ${result.groupCutoffScores.BEGINNER}`);
      }
      if (typeof result.groupCutoffScores.OPEN === 'number') {
        chunks.push(`分数线 ${result.groupCutoffScores.OPEN}`);
      }
      if (chunks.length > 0) return chunks.join(' · ');
    }
    return typeof result.cutoffScore === 'number' ? `分数线 ${result.cutoffScore}` : '';
  }, [result.cutoffScore, result.groupCutoffScores]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="pointer-events-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-indigo-100 p-1.5 text-indigo-600">
              <Trophy size={16} />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-800">{result.contestName}</div>
              <div className="text-xs text-slate-500">
                时间点 {tick} / {maxTicks}
              </div>
            </div>
          </div>
          <button
            onClick={phase === 'FINAL' ? onClose : undefined}
            disabled={phase !== 'FINAL'}
            className={`rounded-lg p-1.5 ${
              phase === 'FINAL'
                ? 'text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700'
                : 'cursor-not-allowed text-slate-300'
            }`}
          >
            <X size={16} />
          </button>
        </div>

        <div className="grid h-[78vh] grid-cols-12">
          <div className="col-span-12 flex min-h-0 flex-col border-r border-slate-100 md:col-span-8">
            <div className="shrink-0 border-b border-slate-100 px-4 py-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-sm font-bold text-slate-700">
                  {phase === 'LIVE' ? '实时滚榜' : '最终喜报'}
                </div>
                <div className="flex items-center gap-2">
                  {(['ALL', ...availableGroups] as GroupFilter[]).map((item) => (
                    <button
                      key={item}
                      onClick={() => setFilter(item)}
                      className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                        filter === item
                          ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                          : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {GROUP_LABEL[item]}
                    </button>
                  ))}
                </div>
              </div>

              {phase === 'LIVE' ? (
                <>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-indigo-500 to-blue-500 transition-all duration-500"
                      style={{ width: `${Math.min(100, (tick / Math.max(1, maxTicks)) * 100)}%` }}
                    />
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => setIsRunning((v) => !v)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                    >
                      {isRunning ? <Pause size={14} /> : <Play size={14} />}
                      {isRunning ? '暂停' : '继续'}
                    </button>
                    <button
                      onClick={jumpToFinal}
                      className="inline-flex items-center gap-1 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100"
                    >
                      <SkipForward size={14} />
                      跳过并查看最终排名
                    </button>
                  </div>
                </>
              ) : (
                <div className="rounded-xl border border-amber-200 bg-linear-to-r from-amber-50 to-orange-50 px-4 py-3">
                  <div className="flex items-center gap-2 text-amber-700">
                    <Medal size={16} />
                    <span className="text-sm font-bold">喜报</span>
                  </div>
                  <div className="mt-1 text-sm text-amber-800">
                    {result.summary}
                    {cutoffText ? ` ${cutoffText}。` : ''}
                  </div>
                </div>
              )}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-3">
              {phase === 'LIVE' ? (
                <div className="space-y-2">
                  {visibleStudents.map((student) => (
                    <div
                      key={student.studentId}
                      className="rounded-xl border border-slate-200 bg-white p-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex min-w-10 items-center justify-center rounded-full border px-2 py-1 text-xs font-bold ${rankClass(student.rank)}`}
                          >
                            #{student.rank}
                          </span>
                          <span className="text-sm font-bold text-slate-800">
                            {student.studentName}
                            {student.isRecommended && (
                              <span className="ml-1 inline-flex items-center rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-800">
                                推荐名额
                              </span>
                            )}
                          </span>
                          <span className="text-xs text-slate-400">
                            {GROUP_LABEL[student.contestGroup]}
                          </span>
                        </div>
                        <span className="font-mono text-sm font-bold text-indigo-700">
                          {student.totalScore}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-col gap-2">
                        {Object.entries(
                          student.currentScores.reduce(
                            (acc, score, idx) => {
                              const stage = result.problems[idx]?.stageName || 'Day 1';
                              if (!acc[stage]) acc[stage] = { scores: [], subtotal: 0 };
                              acc[stage].scores.push({ score, idx });
                              acc[stage].subtotal += score;
                              return acc;
                            },
                            {} as Record<
                              string,
                              { scores: { score: number; idx: number }[]; subtotal: number }
                            >
                          )
                        ).map(([stage, { scores, subtotal }]) => (
                          <div
                            key={`${student.studentId}-${stage}`}
                            className="flex flex-col gap-1"
                          >
                            <div className="flex items-center justify-between px-1">
                              <span className="text-xs font-bold text-slate-600">{stage}</span>
                              <span className="font-mono text-xs font-medium text-indigo-600">
                                小计: {subtotal}
                              </span>
                            </div>
                            <div className="grid grid-cols-4 gap-1">
                              {scores.map(({ score, idx }) => (
                                <div
                                  key={`${student.studentId}-${idx}`}
                                  className="rounded-md border border-slate-100 bg-slate-50 px-2 py-1 text-center"
                                >
                                  <div className="text-[10px] text-slate-400">
                                    {result.problems[idx]?.label || `T${idx + 1}`}
                                  </div>
                                  <div className="font-mono text-xs font-bold text-slate-700">
                                    {score}
                                    <span className="text-slate-400">/100</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="text-sm font-bold text-slate-800">完整成绩榜（可下滑）</div>
                      <button
                        onClick={() => setOrderMode((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'))}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
                      >
                        {orderMode === 'ASC' ? '当前：正序' : '当前：逆序'}
                      </button>
                    </div>
                    <div className="max-h-64 overflow-y-auto rounded-lg border border-slate-100">
                      <table className="min-w-full text-xs">
                        <thead className="sticky top-0 bg-slate-50 text-slate-600">
                          <tr>
                            <th className="px-2 py-2 text-left">排名</th>
                            <th className="px-2 py-2 text-left">姓名</th>
                            <th className="px-2 py-2 text-left">组别</th>
                            <th className="px-2 py-2 text-center">总分</th>
                            <th className="px-2 py-2 text-center">奖项</th>
                            {result.hasAdvancement && (
                              <th className="px-2 py-2 text-center">是否过线</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {finalListRows.map((row) => (
                            <tr key={`full-${row.studentId}`} className="border-t border-slate-100">
                              <td className="px-2 py-1.5 font-mono text-slate-700">#{row.rank}</td>
                              <td className="px-2 py-1.5 font-medium text-slate-800">
                                {row.studentName}
                                {row.isRecommended && (
                                  <span className="ml-1 inline-flex items-center rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-800">
                                    推荐名额
                                  </span>
                                )}
                              </td>
                              <td className="px-2 py-1.5 text-slate-500">
                                {GROUP_LABEL[row.contestGroup]}
                              </td>
                              <td className="px-2 py-1.5 text-center font-mono font-bold text-indigo-700">
                                {row.totalScore}
                              </td>
                              <td className="px-2 py-1.5 text-center text-slate-700">
                                {row.award || '未获奖'}
                              </td>
                              {result.hasAdvancement && (
                                <td className="px-2 py-1.5 text-center">
                                  <span
                                    className={`rounded-full px-2 py-0.5 ${
                                      row.passed
                                        ? 'bg-emerald-50 text-emerald-700'
                                        : 'bg-rose-50 text-rose-700'
                                    }`}
                                  >
                                    {row.passed ? '过线' : '未过线'}
                                  </span>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {finalByGroup.map((groupItem) => (
                    <div
                      key={groupItem.group}
                      className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="text-sm font-bold text-slate-800">
                          {GROUP_LABEL[groupItem.group]}
                        </div>
                        <div className="text-xs text-slate-500">
                          平均分 {groupItem.average.toFixed(1)} / {result.totalPossibleScore}
                        </div>
                      </div>
                      <div className="mb-2 rounded-lg border border-amber-100 bg-amber-50 px-2 py-1.5 text-xs text-amber-700">
                        奖项分数线(一/二/三)：
                        {result.groupAwardLines?.[groupItem.group]
                          ? `${result.groupAwardLines[groupItem.group]!.first}/${result.groupAwardLines[groupItem.group]!.second}/${result.groupAwardLines[groupItem.group]!.third}`
                          : '-'}
                      </div>

                      <div className="mb-2 grid grid-cols-2 gap-2 md:grid-cols-4">
                        <div className="rounded-lg border border-slate-100 bg-slate-50 px-2 py-1.5 text-xs text-slate-600">
                          一等率{' '}
                          <span className="font-bold text-amber-600">
                            {groupItem.firstRate.toFixed(1)}%
                          </span>
                        </div>
                        <div className="rounded-lg border border-slate-100 bg-slate-50 px-2 py-1.5 text-xs text-slate-600">
                          二等率{' '}
                          <span className="font-bold text-indigo-600">
                            {groupItem.secondRate.toFixed(1)}%
                          </span>
                        </div>
                        <div className="rounded-lg border border-slate-100 bg-slate-50 px-2 py-1.5 text-xs text-slate-600">
                          三等奖{' '}
                          <span className="font-bold text-emerald-600">
                            {groupItem.thirdRate.toFixed(1)}%
                          </span>
                        </div>
                        {result.hasAdvancement && (
                          <div className="rounded-lg border border-slate-100 bg-slate-50 px-2 py-1.5 text-xs text-slate-600">
                            过线率{' '}
                            <span className="font-bold text-rose-600">
                              {groupItem.passRate.toFixed(1)}%
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-2">
                          <div className="mb-1 text-xs font-bold text-emerald-700">前几名</div>
                          <div className="space-y-1 text-xs text-emerald-800">
                            {groupItem.top.map((r, idx) => (
                              <div key={`${r.studentId}-top`} className="flex justify-between">
                                <span>
                                  {idx + 1}. {r.studentName}
                                </span>
                                <span className="font-mono">{r.totalScore}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-lg border border-rose-100 bg-rose-50 p-2">
                          <div className="mb-1 text-xs font-bold text-rose-700">倒数前几名</div>
                          <div className="space-y-1 text-xs text-rose-800">
                            {groupItem.bottom.map((r, idx) => (
                              <div key={`${r.studentId}-bottom`} className="flex justify-between">
                                <span>
                                  {idx + 1}. {r.studentName}
                                </span>
                                <span className="font-mono">{r.totalScore}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 rounded-lg border border-indigo-100 bg-indigo-50 p-2 text-xs text-indigo-700">
                        表现突出：
                        {groupItem.standoutByTotal
                          ? ` 总分领跑 ${groupItem.standoutByTotal.studentName}（${groupItem.standoutByTotal.totalScore}）`
                          : ' 暂无'}
                        {groupItem.standoutBySingle
                          ? `；单题高分 ${groupItem.standoutBySingle.studentName}（${Math.max(...groupItem.standoutBySingle.problemScores)}）`
                          : ''}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="col-span-12 flex min-h-0 flex-col bg-slate-50 md:col-span-4">
            <div className="shrink-0 border-b border-slate-100 px-4 py-3 text-sm font-bold text-slate-700">
              比赛日志
            </div>
            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className={`rounded-lg border px-2.5 py-2 text-xs ${
                    log.type === 'solve'
                      ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                      : log.type === 'submit'
                        ? 'border-blue-100 bg-blue-50 text-blue-700'
                        : 'border-slate-100 bg-white text-slate-600'
                  }`}
                >
                  <span className="mr-1 font-mono text-[10px] opacity-70">T{log.tick}</span>
                  {log.message}
                </div>
              ))}
            </div>
          </div>
        </div>

        {phase === 'FINAL' && (
          <div className="border-t border-slate-100 bg-white px-4 py-3 text-right">
            <button
              onClick={onClose}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-slate-800"
            >
              返回经营
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestResultModal;
