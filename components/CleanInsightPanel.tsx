'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ZiweiChart, Palace, Star } from '@/lib/ziwei/types';
import { STEMS, BRANCHES } from '@/lib/ziwei/constants';
import { STAR_DETAIL } from './StarDetailPanel';
import { detectPatterns } from '@/lib/ziwei/patterns';
import PatternsCard from './PatternsCard';

interface CleanInsightPanelProps {
  chart: ZiweiChart;
  selectedPalace: Palace | null;
  onSelectPalace?: (palace: Palace) => void;
  onStarClick?: (star: Star) => void;
}

const PALACE_DEFINITIONS: Record<string, { role: string; desc: string; core: string }> = {
  '命宫': {
    role: '先天格局 · 自我本原',
    desc: '主先天命格、性格特质、天赋才能与人生整体格局基调。命宫为本，三方为用。',
    core: '性格决定命运之所在，倪师强调立命立德，看清先天局限与优势。',
  },
  '兄弟宫': {
    role: '手足缘分 · 亲近伙伴',
    desc: '主兄弟姐妹、亲近合伙人、知心好友之情谊深浅与助益大小。',
    core: '亦为财帛宫之田宅（资金库），看日常现金流与流动资产聚散。',
  },
  '夫妻宫': {
    role: '感情婚姻 · 配偶性情',
    desc: '主婚姻缘分、配偶性格长相、两人相处模式与感情起伏关键。',
    core: '感情非宿命，知对方性情以行包容互补，方为夫妻相处大道。',
  },
  '子女宫': {
    role: '后代晚辈 · 门生下属',
    desc: '主子女缘分、聪明才智、晚辈关系以及自身生殖健康与合伙晚辈。',
    core: '以身作则为上，子女宫亦看自身才华输出与创造力延伸。',
  },
  '财帛宫': {
    role: '求财管道 · 财富进出',
    desc: '主一生求财模式、收入来源、理财手段与资金周转能力（动态之财）。',
    core: '为三方四正重要支柱，财帛吉则求财顺畅，有煞则需防波折与过路财神。',
  },
  '疾厄宫': {
    role: '身体体魄 · 健康潜伏',
    desc: '主体魄强弱、先天器官隐患、五脏六腑生克及一生重大健康关口。',
    core: '倪师结合中医五行脏腑理论，疾厄宫有煞星宜早作生活养生调摄。',
  },
  '迁移宫': {
    role: '外出机遇 · 社会评价',
    desc: '主外出发展、远行机遇、社会公众形象及与陌生人打交道的际遇。',
    core: '与命宫直接对拱（互为表里），外在表现之镜像，外出吉凶看此宫。',
  },
  '交友宫': {
    role: '人际交往 · 部属群众',
    desc: '原称仆役宫，主一般朋友、部属、客户群体、社交圈与人际助力。',
    core: '看是否有贵人相助或小人背刺，宜结善缘以扩社交格局。',
  },
  '官禄宫': {
    role: '事业舞台 · 功名地位',
    desc: '又称事业宫，主事业发展高度、职场地位、创业胜算与社会成就。',
    core: '三方四正核心之一，看适合自主创业、掌权任职还是专业立身。',
  },
  '田宅宫': {
    role: '不动产业 · 聚财之库',
    desc: '主不动产购置、祖业继承、家庭居住环境、晚年财富积蓄（静态财库）。',
    core: '财帛是流水，田宅是水库。田宅吉者能聚守家业，晚运丰厚安稳。',
  },
  '福德宫': {
    role: '精神追求 · 内心福分',
    desc: '主内心精神世界、幸福感、兴趣爱好、寿命福报与晚年安乐。',
    core: '与财帛宫相对，物质与精神之平衡所在。福德好者心宽少恼，身心自得。',
  },
  '父母宫': {
    role: '长辈尊亲 · 文书资质',
    desc: '主父母长辈缘分、长上荫庇、名誉文书、学历认证及政府法规关系。',
    core: '得长辈提携则少走弯路，文书星照则利学业与考运。',
  },
};

const SI_HUA_COLORS: Record<string, { bg: string; text: string; border: string; desc: string }> = {
  '禄': { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/30', desc: '主收获、财富、机遇、福禄与顺畅' },
  '权': { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/30', desc: '主权力、掌控、能力、魄力与实权' },
  '科': { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/30', desc: '主名声、文墨、才华、贵人与清誉' },
  '忌': { bg: 'bg-rose-500/10', text: 'text-rose-500', border: 'border-rose-500/30', desc: '主阻滞、执念、波折、考验与人生功课' },
};

export default function CleanInsightPanel({
  chart,
  selectedPalace,
  onSelectPalace,
  onStarClick,
}: CleanInsightPanelProps) {
  const [activeTab, setActiveTab] = useState<'palace' | 'patterns' | 'overview'>('palace');

  // 若未手动选择宫位，默认选中命宫
  const targetPalace = selectedPalace || chart.palaces.find(p => p.isMingGong) || chart.palaces[0];
  const palaceDef = PALACE_DEFINITIONS[targetPalace.name] || {
    role: '十二宫位',
    desc: '紫微斗数十二宫之一。',
    core: '三方四正相互作用，吉凶相参。',
  };

  const majorStars = targetPalace.stars.filter(s => s.type === 'major');
  const luckyStars = targetPalace.stars.filter(s => s.type === 'lucky');
  const shaStars = targetPalace.stars.filter(s => s.type === 'sha');
  const otherStars = targetPalace.stars.filter(s => s.type !== 'major' && s.type !== 'lucky' && s.type !== 'sha');

  const patterns = detectPatterns(chart);

  // 计算三方四正对应的宫位
  const oppositeBranch = (targetPalace.branch + 6) % 12;
  const sanHeBranch1 = (targetPalace.branch + 4) % 12;
  const sanHeBranch2 = (targetPalace.branch + 8) % 12;

  const oppositePalace = chart.palaces.find(p => p.branch === oppositeBranch);
  const sanHePalace1 = chart.palaces.find(p => p.branch === sanHeBranch1);
  const sanHePalace2 = chart.palaces.find(p => p.branch === sanHeBranch2);

  return (
    <div className="card-glass rounded-xl flex flex-col overflow-hidden border" style={{ borderColor: 'var(--t-border)' }}>
      {/* 选项卡头部 */}
      <div className="flex border-b" style={{ borderColor: 'var(--t-border)', background: 'rgba(0,0,0,0.02)' }}>
        <button
          onClick={() => setActiveTab('palace')}
          className={`flex-1 py-3 text-xs font-medium tracking-wider text-center transition-all border-b-2 ${
            activeTab === 'palace'
              ? 'border-amber-500 text-amber-500 bg-amber-500/5'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          ✦ 宫位精析
        </button>
        <button
          onClick={() => setActiveTab('patterns')}
          className={`flex-1 py-3 text-xs font-medium tracking-wider text-center transition-all border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === 'patterns'
              ? 'border-amber-500 text-amber-500 bg-amber-500/5'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          📜 经典格局
          {patterns.length > 0 && (
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-500 font-bold">
              {patterns.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-3 text-xs font-medium tracking-wider text-center transition-all border-b-2 ${
            activeTab === 'overview'
              ? 'border-amber-500 text-amber-500 bg-amber-500/5'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          ☯ 命造大局
        </button>
      </div>

      {/* 内容区域 */}
      <div className="p-4 sm:p-5 overflow-y-auto max-h-[720px] space-y-4">
        {/* ── 选项卡 1：宫位精析 ── */}
        {activeTab === 'palace' && (
          <div className="space-y-4">
            {/* 宫位头卡 */}
            <div className="p-3.5 rounded-lg border" style={{ background: 'var(--t-bg)', borderColor: 'var(--t-border)' }}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-amber-500 tracking-wide">
                    {targetPalace.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded border border-amber-500/30 text-amber-500/90 font-mono">
                    {STEMS[targetPalace.stem]}{BRANCHES[targetPalace.branch]}
                  </span>
                  {targetPalace.isMingGong && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-500 font-semibold">
                      命主本宫
                    </span>
                  )}
                  {targetPalace.isShenGong && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 font-semibold">
                      身宫同位
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-neutral-400">{palaceDef.role}</span>
              </div>
              <p className="text-xs leading-relaxed text-neutral-300 mt-1">{palaceDef.desc}</p>
              <div className="text-[11px] leading-relaxed text-amber-500/80 mt-2 border-t pt-2" style={{ borderColor: 'var(--t-border)' }}>
                <span className="font-semibold mr-1">倪师心法：</span>
                {palaceDef.core}
              </div>
            </div>

            {/* 主星及解说 */}
            <div>
              <div className="text-[11px] tracking-widest uppercase mb-2 text-neutral-400 flex items-center gap-1.5">
                <span>★</span> 宫内十四主星解断
              </div>
              {majorStars.length === 0 ? (
                <div className="p-3.5 rounded-lg border text-xs text-neutral-400 leading-relaxed" style={{ background: 'var(--t-bg)', borderColor: 'var(--t-border)' }}>
                  <span className="text-amber-500 font-medium">【空宫无主星】</span>
                  ：本宫位虚，气场受对宫影响极大。在三合派体系中，空宫通常借对宫（{oppositePalace?.name}）主星会照借力推演，主性格善于接纳、易受外部环境塑造。
                </div>
              ) : (
                <div className="space-y-3">
                  {majorStars.map((star) => {
                    const detail = STAR_DETAIL[star.name];
                    const siHuaStyle = star.siHua ? SI_HUA_COLORS[star.siHua] : null;

                    return (
                      <div
                        key={star.name}
                        className="p-3.5 rounded-lg border transition-all"
                        style={{ background: 'var(--t-bg)', borderColor: 'var(--t-border)' }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              onClick={() => onStarClick?.(star)}
                              className="text-sm font-bold text-amber-400 cursor-pointer hover:underline"
                            >
                              {star.name}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">
                              {star.brightness || '平'}
                            </span>
                            {star.siHua && siHuaStyle && (
                              <span className={`text-[10px] px-1.5 py-0.5 rounded border font-semibold ${siHuaStyle.bg} ${siHuaStyle.text} ${siHuaStyle.border}`}>
                                化{star.siHua}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-neutral-500">点击星名查详释</span>
                        </div>

                        {detail ? (
                          <div className="space-y-2 text-xs leading-relaxed text-neutral-300">
                            <div className="bg-amber-500/5 p-2.5 rounded border border-amber-500/15">
                              <span className="text-amber-500 font-semibold block mb-1">【倪海厦老师原典论断】</span>
                              <p className="text-[11px] text-neutral-200">{detail.niHaixia}</p>
                            </div>
                            <div className="text-[11px] text-neutral-400 bg-neutral-900/30 p-2 rounded">
                              <span className="text-neutral-300 font-medium">古籍诀要：</span>
                              {detail.classical}
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                              <div><span className="text-amber-400/90 font-medium">事业适性：</span>{detail.career}</div>
                              <div><span className="text-amber-400/90 font-medium">财运走势：</span>{detail.wealth}</div>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-neutral-400">主星在此宫坐守，主性格特质强劲。</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 辅星与神煞 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {/* 吉星 */}
              <div className="p-3 rounded-lg border text-xs" style={{ background: 'var(--t-bg)', borderColor: 'var(--t-border)' }}>
                <div className="text-[11px] font-semibold text-emerald-400 mb-1.5 flex items-center gap-1">
                  <span>✔</span> 会照吉星 ({luckyStars.length})
                </div>
                {luckyStars.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {luckyStars.map(s => (
                      <span key={s.name} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px]">
                        {s.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-neutral-500 text-[11px]">本宫无六吉星坐守</span>
                )}
              </div>

              {/* 煞星 */}
              <div className="p-3 rounded-lg border text-xs" style={{ background: 'var(--t-bg)', borderColor: 'var(--t-border)' }}>
                <div className="text-[11px] font-semibold text-rose-400 mb-1.5 flex items-center gap-1">
                  <span>⚠</span> 逢遇煞星 ({shaStars.length})
                </div>
                {shaStars.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {shaStars.map(s => (
                      <span key={s.name} className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[11px]">
                        {s.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-emerald-500/80 text-[11px]">本宫无六煞冲破，气场纯净</span>
                )}
              </div>
            </div>

            {/* 三方四正拱照一览 */}
            <div className="p-3.5 rounded-lg border" style={{ background: 'var(--t-bg)', borderColor: 'var(--t-border)' }}>
              <div className="text-[11px] tracking-wider font-semibold text-neutral-300 mb-2">
                ◈ 三方四正会照宫位（点击可快速切换）
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {oppositePalace && (
                  <button
                    type="button"
                    onClick={() => onSelectPalace?.(oppositePalace)}
                    className="p-2 rounded border hover:border-amber-500 transition-all text-left"
                    style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'var(--t-border)' }}
                  >
                    <div className="text-[10px] text-neutral-500">对宫拱照</div>
                    <div className="font-semibold text-amber-400">{oppositePalace.name}</div>
                    <div className="text-[10px] text-neutral-400 truncate">
                      {oppositePalace.stars.filter(s => s.type === 'major').map(s => s.name).join(' ') || '无主星'}
                    </div>
                  </button>
                )}
                {sanHePalace1 && (
                  <button
                    type="button"
                    onClick={() => onSelectPalace?.(sanHePalace1)}
                    className="p-2 rounded border hover:border-amber-500 transition-all text-left"
                    style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'var(--t-border)' }}
                  >
                    <div className="text-[10px] text-neutral-500">三合会宫 1</div>
                    <div className="font-semibold text-sky-400">{sanHePalace1.name}</div>
                    <div className="text-[10px] text-neutral-400 truncate">
                      {sanHePalace1.stars.filter(s => s.type === 'major').map(s => s.name).join(' ') || '无主星'}
                    </div>
                  </button>
                )}
                {sanHePalace2 && (
                  <button
                    type="button"
                    onClick={() => onSelectPalace?.(sanHePalace2)}
                    className="p-2 rounded border hover:border-amber-500 transition-all text-left"
                    style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'var(--t-border)' }}
                  >
                    <div className="text-[10px] text-neutral-500">三合会宫 2</div>
                    <div className="font-semibold text-sky-400">{sanHePalace2.name}</div>
                    <div className="text-[10px] text-neutral-400 truncate">
                      {sanHePalace2.stars.filter(s => s.type === 'major').map(s => s.name).join(' ') || '无主星'}
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── 选项卡 2：格局识别 ── */}
        {activeTab === 'patterns' && (
          <div className="space-y-3">
            <div className="p-3 rounded-lg border bg-amber-500/5 border-amber-500/20 text-xs text-neutral-300 leading-relaxed">
              <span className="font-semibold text-amber-500">严格古法格局判定：</span>
              基于《紫微斗数全书》《全集》与倪师《天纪》三合派理论，严格检验主星、辅煞、庙旺平陷及三方四正条件，列出已成立格局与破格警示。
            </div>
            <PatternsCard chart={chart} />
          </div>
        )}

        {/* ── 选项卡 3：全盘大局 ── */}
        {activeTab === 'overview' && (
          <div className="space-y-3 text-xs">
            {/* 四化汇总 */}
            <div className="p-3.5 rounded-lg border" style={{ background: 'var(--t-bg)', borderColor: 'var(--t-border)' }}>
              <div className="text-[11px] font-semibold text-neutral-300 mb-2.5">✦ 生年四化星曜落位</div>
              <div className="grid grid-cols-2 gap-2">
                {(['禄', '权', '科', '忌'] as const).map(hua => {
                  const style = SI_HUA_COLORS[hua];
                  // 找到带有该四化的星
                  let foundStar: Star | null = null;
                  let foundPalace: Palace | null = null;
                  for (const p of chart.palaces) {
                    for (const s of p.stars) {
                      if (s.siHua === hua) {
                        foundStar = s;
                        foundPalace = p;
                        break;
                      }
                    }
                  }

                  return (
                    <div key={hua} className={`p-2.5 rounded border ${style.bg} ${style.border}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-bold ${style.text}`}>化{hua}</span>
                        <span className="text-[11px] font-medium text-neutral-200">
                          {foundStar ? `${foundStar.name}入${foundPalace?.name}` : '未入主星'}
                        </span>
                      </div>
                      <div className="text-[10px] text-neutral-400 leading-tight">{style.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 局数与命身主 */}
            <div className="p-3.5 rounded-lg border space-y-2" style={{ background: 'var(--t-bg)', borderColor: 'var(--t-border)' }}>
              <div className="text-[11px] font-semibold text-neutral-300">✦ 五行局数与命理基底</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                <div className="p-2 rounded bg-neutral-900/40">
                  <div className="text-neutral-500">五行局</div>
                  <div className="font-semibold text-amber-400">{chart.wuxingJuName}</div>
                </div>
                <div className="p-2 rounded bg-neutral-900/40">
                  <div className="text-neutral-500">命主星</div>
                  <div className="font-semibold text-neutral-200">{chart.mingZhu || '破军'}</div>
                </div>
                <div className="p-2 rounded bg-neutral-900/40">
                  <div className="text-neutral-500">身主星</div>
                  <div className="font-semibold text-neutral-200">{chart.shenZhu || '火星'}</div>
                </div>
              </div>
            </div>

            {/* 当前大限 */}
            {chart.currentDaXianIndex >= 0 && (
              <div className="p-3.5 rounded-lg border" style={{ background: 'var(--t-bg)', borderColor: 'var(--t-border)' }}>
                <div className="text-[11px] font-semibold text-purple-400 mb-1.5">✦ 当前大限重点</div>
                <div className="text-xs text-neutral-300 leading-relaxed">
                  当前处于 <span className="text-purple-300 font-bold">{chart.daXians[chart.currentDaXianIndex]?.palaceName}</span> 大限（
                  <span className="font-mono text-purple-400 font-bold">
                    {chart.daXians[chart.currentDaXianIndex]?.startAge} - {chart.daXians[chart.currentDaXianIndex]?.endAge}
                  </span> 岁）。
                  这十年的人生焦点主要围绕该宫位所管辖的事务展开。
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
