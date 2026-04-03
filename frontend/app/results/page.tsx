'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '@/components/Layout'
import Link from 'next/link'
import type { Prediction } from '@/lib/api'

const TUMOR_META: Record<string, { color: string; severity: string; tagline: string; info: string }> = {
  'Glioma': {
    color: '#ef4444',
    severity: 'High Priority · Immediate Attention',
    tagline: 'Neural tissue tumor detected. Expert consultation urgently recommended.',
    info: 'Gliomas are primary brain tumors arising from glial cells. Grade III–IV require immediate specialist intervention.',
  },
  'Meningioma': {
    color: '#f97316',
    severity: 'Moderate Priority · Schedule Review',
    tagline: 'Membrane-arising tumor identified. Specialist review recommended.',
    info: 'Meningiomas arise from the meninges. Most are benign. Regular monitoring and specialist consultation advised.',
  },
  'Pituitary': {
    color: '#eab308',
    severity: 'Moderate Priority · Endocrine Review',
    tagline: 'Pituitary gland anomaly detected. Hormonal assessment needed.',
    info: 'Pituitary adenomas are often treatable with medication or minimally invasive surgery.',
  },
  'No Tumor': {
    color: '#22c55e',
    severity: 'Normal · No Tumor Detected',
    tagline: 'No tumor markers identified in the uploaded MRI scan.',
    info: 'Continue regular health monitoring. Consult a neurologist if symptoms persist.',
  },
}

function getBarColor(idx: number) {
  return ['#C5757C', '#F9AAAD', '#A1525F', '#683A46'][idx % 4]
}

export default function ResultsPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [imagePreview, setImagePreview] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('latestResult')
    if (stored) {
      const data = JSON.parse(stored)
      setPredictions(data.predictions || [])
      if (data.image) setImagePreview(`data:image/jpeg;base64,${data.image}`)
    }
    setLoading(false)
  }, [])

  const top = predictions[0]
  const meta = top ? (TUMOR_META[top.tagName] ?? TUMOR_META['No Tumor']) : TUMOR_META['No Tumor']
  const pct = top ? (top.probability * 100).toFixed(1) : '0'

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-[#f4f2fb]">
          <div className="w-10 h-10 border-[3px] border-[#C5757C] border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    )
  }

  if (!predictions.length) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-[#f4f2fb]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-center p-12 bg-white rounded-3xl shadow-xl max-w-md">
            <div className="text-7xl mb-6">🧠</div>
            <h2 className="text-3xl font-black text-gray-900 mb-3">No Results Yet</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">Upload an MRI scan to receive your AI-powered diagnosis.</p>
            <Link href="/upload">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="px-8 py-3 rounded-full font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#C5757C,#F9AAAD)' }}>
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
      {/* Page background — light lavender/white like BrainWave */}
      <div className="min-h-screen bg-[#f4f2fb] px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">

          {/* Main grid: left card + right image card */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 h-auto lg:h-[520px]">

            {/* ─── LEFT CARD ─── */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
              className="bg-white rounded-[2rem] p-8 shadow-lg flex flex-col justify-between overflow-hidden">

              {/* Top: headline + CTA */}
              <div>
                {/* Severity badge */}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-5"
                  style={{ background: meta.color + '15', color: meta.color }}>
                  {meta.severity}
                </span>

                <h1 className="text-[2.6rem] leading-[1.1] font-black text-gray-900 mb-4">
                  {top.tagName === 'No Tumor' ? (
                    <>No Tumor<br /><span style={{ color: '#22c55e' }}>Detected</span></>
                  ) : (
                    <>{top.tagName}<br /><span style={{ color: meta.color }}>Detected</span></>
                  )}
                </h1>

                <p className="text-gray-400 text-[15px] leading-relaxed max-w-sm mb-6">
                  {meta.tagline}<br />
                  Harness the power of AI diagnostics through Tumor Vision's Azure-powered analysis.
                </p>

                {/* Confidence bars */}
                <div className="space-y-2.5 mb-6">
                  {predictions.map((pred, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500 font-medium">{pred.tagName}</span>
                        <span className="font-bold" style={{ color: getBarColor(idx) }}>
                          {(pred.probability * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }} animate={{ width: `${pred.probability * 100}%` }}
                          transition={{ duration: 1, delay: idx * 0.15 }}
                          className="h-2.5 rounded-full"
                          style={{ background: `linear-gradient(90deg,${getBarColor(idx)},${getBarColor(idx)}aa)` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA pill button */}
                <Link href="/review">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold text-white text-sm shadow-lg"
                    style={{ background: 'linear-gradient(135deg,#1a1a2e,#16213e)' }}>
                    Generate Report
                    <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">→</span>
                  </motion.button>
                </Link>
              </div>

              {/* ── Bottom mini-card (BrainWave style thumbnail row) ── */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="mt-6 flex items-center gap-4 bg-[#f8f7fd] rounded-2xl p-4">
                {/* MRI thumbnail */}
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-[#C5757C]/30 to-[#683A46]/30">
                  {imagePreview
                    ? <img src={imagePreview} alt="MRI thumb" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-2xl">🧠</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-bold text-sm leading-tight">
                    AI Confidence: {pct}%
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5 line-clamp-2">
                    {meta.info}
                  </p>
                  <Link href="/treatment">
                    <span className="text-[#C5757C] text-xs font-bold hover:underline cursor-pointer">Learn more →</span>
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* ─── RIGHT CARD — full MRI image ─── */}
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }}
              className="relative rounded-[2rem] overflow-hidden shadow-lg min-h-[340px]"
              style={{ background: 'linear-gradient(135deg,#C5757C33,#683A4655)' }}>

              {imagePreview ? (
                <img src={imagePreview} alt="MRI Scan"
                  className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[8rem] opacity-40">🧠</div>
                </div>
              )}

              {/* Top-right arrow button */}
              <motion.div whileHover={{ scale: 1.1 }} className="absolute top-4 right-4 z-10">
                <Link href="/treatment">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold hover:bg-white/40 transition-colors cursor-pointer">
                    ↗
                  </div>
                </Link>
              </motion.div>

              {/* Bottom overlay text — matches BrainWave "Innovate Your Mind" */}
              <motion.div
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{ background: 'linear-gradient(to top, rgba(20,14,28,0.85) 0%, transparent 100%)' }}>
                <h2 className="text-white text-2xl font-black leading-tight mb-1">
                  Analyze Your Scan,<br />Protect Your Future
                </h2>
                <p className="text-white/60 text-xs leading-relaxed max-w-xs">
                  Discover precise AI-powered diagnostics from Tumor Vision, where cutting-edge neural networks converge to amplify medical insight.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Action row */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="mt-4 flex flex-wrap gap-3 items-center">
            <Link href="/treatment">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 rounded-full text-sm font-bold text-white shadow-md"
                style={{ background: 'linear-gradient(135deg,#C5757C,#F9AAAD)' }}>
                💊 View Treatment Options
              </motion.button>
            </Link>
            <Link href="/upload">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50">
                📤 New Scan
              </motion.button>
            </Link>
            <div className="ml-auto">
              <p className="text-gray-400 text-xs">
                ⚕️ AI-assisted analysis only — not a medical diagnosis
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </Layout>
  )
}
