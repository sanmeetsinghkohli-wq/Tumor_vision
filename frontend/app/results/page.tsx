'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '@/components/Layout'
import Link from 'next/link'
import type { Prediction } from '@/lib/api'

const TUMOR_META: Record<string, { icon: string; color: string; bg: string; border: string; severity: string; info: string }> = {
  'Glioma': {
    icon: '⚠️',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.35)',
    severity: 'High Priority',
    info: 'Gliomas are primary brain tumors arising from glial cells. Immediate specialist consultation recommended.',
  },
  'Meningioma': {
    icon: '🔶',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.08)',
    border: 'rgba(249,115,22,0.35)',
    severity: 'Moderate Priority',
    info: 'Meningiomas arise from the meninges. Most are benign and slow-growing. Specialist review advised.',
  },
  'Pituitary': {
    icon: '🟡',
    color: '#eab308',
    bg: 'rgba(234,179,8,0.08)',
    border: 'rgba(234,179,8,0.35)',
    severity: 'Moderate Priority',
    info: 'Pituitary tumors arise in the pituitary gland. Often treatable with medication or minimally invasive surgery.',
  },
  'No Tumor': {
    icon: '✅',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.35)',
    severity: 'Normal',
    info: 'No tumor detected. Continue regular health monitoring. Consult a neurologist if symptoms persist.',
  },
}

function getBarColor(idx: number) {
  const colors = ['#C5757C', '#F9AAAD', '#A1525F', '#683A46']
  return colors[idx % colors.length]
}

export default function ResultsPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [imagePreview, setImagePreview] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'breakdown' | 'info'>('breakdown')

  useEffect(() => {
    const stored = localStorage.getItem('latestResult')
    if (stored) {
      const data = JSON.parse(stored)
      setPredictions(data.predictions || [])
      if (data.image) setImagePreview(`data:image/jpeg;base64,${data.image}`)
    }
    setLoading(false)
  }, [])

  const topPrediction = predictions[0]
  const tumorDetected = topPrediction && topPrediction.tagName !== 'No Tumor'
  const meta = topPrediction ? (TUMOR_META[topPrediction.tagName] ?? TUMOR_META['No Tumor']) : TUMOR_META['No Tumor']
  const confidencePct = topPrediction ? (topPrediction.probability * 100).toFixed(1) : '0'

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#f5f3ff 0%,#ede8f5 50%,#f5f3ff 100%)' }}>
          <div className="w-10 h-10 border-3 border-[#C5757C] border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    )
  }

  if (!predictions.length) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#f5f3ff 0%,#ede8f5 50%,#f5f3ff 100%)' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center p-12 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 max-w-md">
            <div className="text-7xl mb-6">🧠</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">No Results Yet</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">Upload an MRI scan first to receive your AI-powered diagnostic analysis.</p>
            <Link href="/upload">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="px-8 py-3 bg-gradient-to-r from-[#C5757C] to-[#F9AAAD] text-white font-bold rounded-full shadow-lg shadow-[#C5757C]/30">
                Upload MRI Scan →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg,#f5f3ff 0%,#ede8f5 50%,#f5f3ff 100%)' }}>
        {/* Hero Section — BrainWave-style split layout */}
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch min-h-[480px]">

            {/* LEFT — Main result card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
              className="bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 shadow-2xl border border-white/60 flex flex-col justify-between"
            >
              {/* Badge */}
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest border"
                  style={{ color: meta.color, background: meta.bg, borderColor: meta.border }}>
                  <span>{meta.icon}</span> {meta.severity}
                </span>

                <h1 className="mt-5 text-5xl md:text-6xl font-black text-gray-900 leading-tight">
                  {topPrediction.tagName}
                  <br />
                  <span className="text-3xl md:text-4xl font-bold" style={{ color: meta.color }}>
                    Detected
                  </span>
                </h1>

                <p className="mt-4 text-gray-500 text-base leading-relaxed max-w-sm">
                  {meta.info}
                </p>
              </div>

              {/* Confidence ring + CTA */}
              <div className="mt-8 flex items-end gap-6 flex-wrap">
                {/* Confidence */}
                <div className="flex flex-col items-center">
                  <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none" stroke="#e5e7eb" strokeWidth="2.8" />
                      <motion.path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none" stroke={meta.color} strokeWidth="2.8" strokeLinecap="round"
                        strokeDasharray={`${confidencePct}, 100`}
                        initial={{ strokeDasharray: '0, 100' }}
                        animate={{ strokeDasharray: `${confidencePct}, 100` }}
                        transition={{ duration: 1.2, ease: 'easeOut' }} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-black text-gray-800">{confidencePct}%</span>
                    </div>
                  </div>
                  <span className="mt-1 text-xs text-gray-400 font-semibold">AI Confidence</span>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 flex-1">
                  <Link href="/review">
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white shadow-lg shadow-[#C5757C]/30 text-sm"
                      style={{ background: 'linear-gradient(135deg,#C5757C,#F9AAAD)' }}>
                      <span>📝</span> Generate Report
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.button>
                  </Link>
                  <Link href="/treatment">
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-gray-700 bg-white/80 border border-gray-200 hover:bg-gray-50 text-sm">
                      <span>💊</span> View Treatment Options
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* RIGHT — MRI Scan image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-[2rem] overflow-hidden shadow-2xl min-h-[400px] lg:min-h-0"
              style={{ background: 'linear-gradient(135deg,#C5757C22,#683A4644)' }}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Uploaded MRI Scan"
                  className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[6rem]">🧠</div>
              )}
              {/* Overlay pill at bottom */}
              <div className="absolute bottom-4 left-4 right-4">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                  className="flex items-center justify-between bg-black/50 backdrop-blur-md rounded-2xl px-5 py-3">
                  <div>
                    <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">AI Analysis Complete</p>
                    <p className="text-white font-bold text-sm mt-0.5">Tumor Vision · Azure Custom Vision</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM CARDS — BrainWave bottom row style */}
        <div className="max-w-7xl mx-auto px-6 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Card 1 — Confidence Breakdown (tabbed) */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-white/70 backdrop-blur-2xl rounded-[1.75rem] p-6 shadow-xl border border-white/60">

              {/* Tabs */}
              <div className="flex gap-2 mb-5">
                {(['breakdown', 'info'] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === tab ? 'bg-gradient-to-r from-[#C5757C] to-[#F9AAAD] text-white shadow' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                    {tab === 'breakdown' ? '📊 Confidence Breakdown' : '🔬 Clinical Info'}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'breakdown' ? (
                  <motion.div key="breakdown" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    {predictions.map((pred, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-semibold text-gray-700">{pred.tagName}</span>
                          <span className="font-bold" style={{ color: getBarColor(idx) }}>{(pred.probability * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }} animate={{ width: `${pred.probability * 100}%` }}
                            transition={{ duration: 1, delay: idx * 0.15 }}
                            className="h-3 rounded-full"
                            style={{ background: `linear-gradient(90deg, ${getBarColor(idx)}, ${getBarColor(idx)}99)` }} />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div key="info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                    {[
                      { label: 'Tumor Type', value: topPrediction?.tagName || '—' },
                      { label: 'AI Model', value: 'Azure Custom Vision (CNN)' },
                      { label: 'Analysis Engine', value: 'Tumor Vision v2.0' },
                      { label: 'Scan Type', value: 'Brain MRI' },
                      { label: 'Report Available', value: 'English, हिंदी, मराठी' },
                    ].map(item => (
                      <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-500 text-sm">{item.label}</span>
                        <span className="text-gray-800 font-semibold text-sm">{item.value}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Card 2 — Quick actions / next steps */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-white/70 backdrop-blur-2xl rounded-[1.75rem] p-6 shadow-xl border border-white/60 flex flex-col justify-between">

              <div>
                <h3 className="font-bold text-gray-800 text-base mb-1">Next Steps</h3>
                <p className="text-gray-400 text-xs mb-4">Recommended actions based on your result</p>
                <div className="space-y-3">
                  {[
                    { step: '01', text: 'Generate a detailed PDF report', href: '/review', color: '#C5757C' },
                    { step: '02', text: 'Review AI treatment options', href: '/treatment', color: '#F9AAAD' },
                    { step: '03', text: 'Upload another scan to compare', href: '/upload', color: '#683A46' },
                  ].map(item => (
                    <Link key={item.step} href={item.href}>
                      <motion.div whileHover={{ x: 4 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                        <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0"
                          style={{ background: item.color }}>{item.step}</span>
                        <span className="text-gray-700 text-sm font-medium">{item.text}</span>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-5 p-3 rounded-xl bg-amber-50 border border-amber-200">
                <p className="text-amber-700 text-xs leading-relaxed">
                  <strong>⚕️ Disclaimer:</strong> AI-assisted suggestive analysis only. Consult a qualified physician for diagnosis.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
