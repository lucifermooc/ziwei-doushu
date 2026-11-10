'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BirthForm, { type BirthFormState } from '@/components/BirthForm';
import ChartBoard from '@/components/ChartBoard';
import CleanInsightPanel from '@/components/CleanInsightPanel';
import StarDetailPanel from '@/components/StarDetailPanel';
import FamousPicker from '@/components/FamousPicker';
import { useTheme } from '@/components/ThemeProvider';
import { generateChart } from '@/lib/ziwei/algorithm';
import { formToBirthInfo } from '@/lib/ziwei/share';
import type { BirthInfo, ZiweiChart, Palace, Star } from '@/lib/ziwei/types';
import { STEMS, BRANCHES } from '@/lib/ziwei/constants';

export default function HomePage() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  const [chart, setChart] = useState<ZiweiChart | null>(null);
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null);
  const [selectedStar, setSelectedStar] = useState<{ star: Star; palaceName?: string } | null>(null);
  
  // 预设数据与表单重新渲染 key
  const [formKey, setFormKey] = useState(0);
  const [formData, setFormData] = useState<Partial<BirthFormState>>({
    name: '',
    year: '1995',
    month: '10',
    day: '24',
    clockHour: '8',
    clockMinute: '30',
    gender: 'male',
    province: '北京',
    city: '北京',
    longitude: 116.4,
  });

  // 处理起盘提交
  const handleFormSubmit = (info: BirthInfo) => {
    const generated = generateChart(info);
    setChart(generated);
    // 默认选中命宫
    const mingGong = generated.palaces.find(p => p.isMingGong) || generated.palaces[0];
    setSelectedPalace(mingGong);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 选择经典名人格局
  const handleSelectFamous = (preset: Partial<BirthFormState>) => {
    setFormData(preset);
    setFormKey(k => k + 1);
    // 直接自动生成此名人的命盘，带来极致流畅的测试体验
    try {
      const birthInfo = formToBirthInfo({
        name: preset.name || '',
        year: preset.year || '1990',
        month: preset.month || '1',
        day: preset.day || '1',
        clockHour: preset.clockHour || '8',
        clockMinute: preset.clockMinute || '0',
        unknownTime: preset.unknownTime || false,
        province: preset.province || '',
        city: preset.city || '',
        longitude: preset.longitude || 120,
        gender: preset.gender || 'male',
      });
      const generated = generateChart(birthInfo);
      setChart(generated);
      const mingGong = generated.palaces.find(p => p.isMingGong) || generated.palaces[0];
      setSelectedPalace(mingGong);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.error('Failed to generate famous preset:', e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-0)', color: 'var(--tx-1)' }}>
      {/* ── 顶部导航栏 ── */}
      <header
        className="sticky top-0 z-40 w-full border-b backdrop-blur-md px-4 sm:px-8 py-3.5 transition-colors"
        style={{
          background: isDark ? 'rgba(2,8,16,0.85)' : 'rgba(250,250,249,0.9)',
          borderColor: 'var(--t-border)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo 与主标 */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => { setChart(null); setSelectedPalace(null); }}
              className="flex items-center gap-2 group text-left"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-serif text-base font-bold shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,168,67,0.2) 0%, rgba(184,146,42,0.08) 100%)',
                  border: '1px solid var(--ac-bdr)',
                  color: 'var(--ac)',
                }}
              >
                ✦
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold tracking-wider leading-none" style={{ color: 'var(--ac)' }}>
                  紫微斗数研析
                </div>
                <div className="text-[10px] text-neutral-500 tracking-wider leading-tight mt-0.5">
                  三合派 · 倪海厦正宗传承
                </div>
              </div>
            </button>
          </div>

          {/* 中间核心导航 */}
          <nav className="hidden md:flex items-center gap-1 text-xs">
            <button
              onClick={() => { setChart(null); setSelectedPalace(null); }}
              className="px-3.5 py-1.5 rounded-full transition-all text-neutral-300 hover:text-amber-400 bg-amber-500/10 border border-amber-500/20"
            >
              在线排盘
            </button>
            <a
              href="/knowledge"
              className="px-3.5 py-1.5 rounded-full transition-all text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40"
            >
              星曜百科
            </a>
            <a
              href="/library"
              className="px-3.5 py-1.5 rounded-full transition-all text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40"
            >
              古籍原典
            </a>
          </nav>

          {/* 右侧控制 */}
          <div className="flex items-center gap-2.5">
            {chart && (
              <button
                type="button"
                onClick={() => { setChart(null); setSelectedPalace(null); }}
                className="text-xs px-3 py-1.5 rounded-full border border-neutral-700 hover:border-amber-500/60 bg-neutral-800/50 hover:bg-amber-500/10 text-neutral-300 hover:text-amber-400 transition-all"
              >
                ← 重新起盘
              </button>
            )}

            {/* 主题切换 */}
            <button
              type="button"
              onClick={toggle}
              aria-label="切换主题"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-all"
              style={{
                borderColor: 'var(--t-border)',
                background: 'rgba(255,255,255,0.03)',
                color: 'var(--t-gold)',
              }}
            >
              <span>{isDark ? '🌙' : '☀️'}</span>
              <span className="hidden sm:inline text-[11px] font-medium">{isDark ? '暗色' : '亮色'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── 主体内容区 ── */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          {!chart ? (
            /* ═══ 状态 A：起盘工作台 ═══ */
            <motion.div
              key="form-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto space-y-6"
            >
              {/* 标题引导区 */}
              <div className="text-center space-y-2 py-4">
                <div
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded-full border mb-1"
                  style={{
                    borderColor: 'var(--ac-bdr)',
                    background: 'var(--ac-bg)',
                    color: 'var(--ac)',
                  }}
                >
                  <span>☯</span> 纯净离线 · 零隐私上传 · 严格古法安星
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--tx-0)' }}>
                  紫微斗数排盘与命理研析
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed">
                  严格遵循倪海厦《天纪》三合派正宗法则，纳音五行局定盘、十四主星安星、三方四正对拱与经典格局判定。
                </p>
              </div>

              {/* 快捷选择名人预设 */}
              <div className="card-glass rounded-xl p-4 border" style={{ borderColor: 'var(--t-border)' }}>
                <FamousPicker onSelect={handleSelectFamous} />
              </div>

              {/* 起盘主表单 */}
              <div className="card-glass rounded-2xl p-5 sm:p-8 border shadow-lg" style={{ borderColor: 'var(--t-border)' }}>
                <BirthForm
                  key={formKey}
                  initialData={formData}
                  onSubmit={handleFormSubmit}
                />
              </div>

              {/* 核心特色卡片（知识介绍，无广告） */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-4 rounded-xl border text-xs space-y-1.5" style={{ background: 'var(--bg-card)', borderColor: 'var(--t-border)' }}>
                  <div className="font-semibold text-amber-500 text-sm">✦ 三合正宗安星</div>
                  <p className="text-neutral-400 leading-relaxed text-[11px]">
                    命身宫顺逆起盘，十四主星、六吉、六煞、博士十二神按原法严密排布，结构明晰。
                  </p>
                </div>
                <div className="p-4 rounded-xl border text-xs space-y-1.5" style={{ background: 'var(--bg-card)', borderColor: 'var(--t-border)' }}>
                  <div className="font-semibold text-amber-500 text-sm">✦ 经典大格局识别</div>
                  <p className="text-neutral-400 leading-relaxed text-[11px]">
                    内置紫府同宫、阳梁昌禄、杀破狼等数十种传统大格，自动判定成格、加分与破格警示。
                  </p>
                </div>
                <div className="p-4 rounded-xl border text-xs space-y-1.5" style={{ background: 'var(--bg-card)', borderColor: 'var(--t-border)' }}>
                  <div className="font-semibold text-amber-500 text-sm">✦ 倪师讲义与原典详释</div>
                  <p className="text-neutral-400 leading-relaxed text-[11px]">
                    收录倪海厦老师原版断语与《紫微斗数全书》《全集》歌诀，点击宫位即可研读。
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ═══ 状态 B：已排盘，全功能命理分析工作台 ═══ */
            <motion.div
              key="chart-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="space-y-4"
            >
              {/* 顶部盘面概要 Bar */}
              <div
                className="card-glass rounded-xl p-3.5 sm:p-4 border flex flex-wrap items-center justify-between gap-3"
                style={{ borderColor: 'var(--t-border)' }}
              >
                {/* 命造生辰信息 */}
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm sm:text-base text-amber-400">
                      {chart.birthInfo.name || '命主'}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/25 font-semibold">
                      {chart.birthInfo.gender === 'male' ? '乾造 · 阳男' : '坤造 · 阴女'}
                    </span>
                  </div>

                  <div className="text-neutral-300">
                    <span className="text-neutral-500 mr-1">公历：</span>
                    {chart.birthInfo.year}年{chart.birthInfo.month}月{chart.birthInfo.day}日{' '}
                    {chart.birthInfo.origInput
                      ? `${chart.birthInfo.origInput.clockHour}时${chart.birthInfo.origInput.clockMinute}分`
                      : `${BRANCHES[chart.birthInfo.hour]}时`}
                  </div>

                  <div className="text-neutral-300">
                    <span className="text-neutral-500 mr-1">农历：</span>
                    {chart.lunarInfo.lunarYear}年{chart.lunarInfo.isLeapMonth ? '闰' : ''}
                    {chart.lunarInfo.lunarMonth}月{chart.lunarInfo.lunarDay}
                  </div>

                  {chart.lunarInfo.fourPillars && (
                    <div className="text-amber-500 font-mono font-medium">
                      <span className="text-neutral-500 mr-1 font-sans">四柱：</span>
                      {chart.lunarInfo.fourPillars.join(' · ')}
                    </div>
                  )}

                  <div className="text-neutral-400 text-[11px]">
                    <span className="text-neutral-500 mr-1">局象：</span>
                    <strong className="text-amber-400/90">{chart.wuxingJuName}</strong>
                    {' · '}命主 <strong className="text-neutral-200">{chart.mingZhu}</strong>
                    {' · '}身主 <strong className="text-neutral-200">{chart.shenZhu}</strong>
                  </div>
                </div>

                {/* 快速换盘操作 */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => { setChart(null); setSelectedPalace(null); }}
                    className="text-xs px-3 py-1.5 rounded-lg border border-neutral-700 hover:border-amber-500 bg-neutral-800/40 hover:bg-amber-500/10 text-neutral-200 hover:text-amber-400 transition-all"
                  >
                    重新输入生辰
                  </button>
                </div>
              </div>

              {/* 主分析区域：左侧十二宫天盘，右侧深度研析面板 */}
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-4 items-start">
                {/* 左列：天盘网格 + 三方四正 + 时间轴导航 */}
                <div className="card-glass rounded-2xl p-3 sm:p-5 border space-y-3" style={{ borderColor: 'var(--t-border)' }}>
                  <ChartBoard
                    chart={chart}
                    onPalaceSelect={(p) => setSelectedPalace(p)}
                    onStarSelect={(star, palace) => setSelectedStar({ star, palaceName: palace.name })}
                  />
                  <div className="text-[11px] text-neutral-500 flex items-center justify-between px-1 pt-1 border-t" style={{ borderColor: 'var(--t-border)' }}>
                    <span>💡 点击宫位查看【三方四正】连线及详细解读</span>
                    <span>点击主星可查看星曜专释</span>
                  </div>
                </div>

                {/* 右列：宫位详解、格局识别与全盘大局 */}
                <div className="sticky top-20">
                  <CleanInsightPanel
                    chart={chart}
                    selectedPalace={selectedPalace}
                    onSelectPalace={(p) => setSelectedPalace(p)}
                    onStarClick={(star) => setSelectedStar({ star, palaceName: selectedPalace?.name })}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── 星曜详释弹窗 Modal ── */}
      <AnimatePresence>
        {selectedStar && (
          <StarDetailPanel
            star={selectedStar.star}
            palaceName={selectedStar.palaceName}
            onClose={() => setSelectedStar(null)}
          />
        )}
      </AnimatePresence>

      {/* ── 极简纯净页脚（无任何引流广告） ── */}
      <footer className="mt-auto border-t py-6 px-4 text-center text-xs text-neutral-500" style={{ borderColor: 'var(--t-border)' }}>
        <div className="max-w-7xl mx-auto space-y-1.5">
          <p className="tracking-wider">
            紫微斗数命理排盘研析系统 · 遵循倪海厦《天纪》三合派理论体系
          </p>
          <p className="text-[11px] text-neutral-600">
            纯前端本地算法计算 · 本平台仅供传统术数文化研究与学习交流使用
          </p>
        </div>
      </footer>
    </div>
  );
}
