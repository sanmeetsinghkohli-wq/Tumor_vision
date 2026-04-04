'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '@/components/Layout'
import Link from 'next/link'
import type { Prediction } from '@/lib/api'
import { useLang } from '@/contexts/LanguageContext'

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
  return ['#528DCB', '#A4BFDB', '#4B78A0', '#6A7F92'][idx % 4]
}

export default function ResultsPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [imagePreview, setImagePreview] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const { t } = useLang()

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
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-[3px] border-[#528DCB] border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    )
  }

  if (!predictions.length) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-center p-12 bg-white/70 backdrop-blur-xl border border-[#528DCB]/20 rounded-3xl max-w-md shadow-lg">
            <div className="text-7xl mb-6">🧠</div>
            <h2 className="text-3xl font-black text-[#1a1a2e] mb-3">No Results Yet</h2>
            <p className="text-[#6A7F92] mb-8 leading-relaxed">{t('upload_sub')}</p>
            <Link href="/upload">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="px-8 py-3 rounded-full font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#528DCB,#4B78A0)' }}>
                {t('nav_new_scan')} →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 h-auto lg:h-[520px]">
            {/* LEFT CARD */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
              className="bg-white/70 backdrop-blur-xl border border-[#528DCB]/20 rounded-[2rem] p-8 shadow-lg flex flex-col justify-between overflow-hidden">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-5"
                  style={{ background: meta.color + '22', color: meta.color }}>
                  {meta.severity}
                </span>
                <h1 className="text-[2.6rem] leading-[1.1] font-black text-[#1a1a2e] mb-4">
                  {top.tagName === 'No Tumor' ? (
                    <>No Tumor<br /><span style={{ color: '#22c55e' }}>{t('results_detected')}</span></>
                  ) : (
                    <>{top.tagName}<br /><span style={{ color: meta.color }}>{t('results_detected')}</span></>
                  )}
                </h1>
                <p className="text-[#6A7F92] text-[15px] leading-relaxed max-w-sm mb-6">{meta.tagline}</p>
                <div className="space-y-2.5 mb-6">
                  {predictions.map((pred, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#6A7F92] font-medium">{pred.tagName}</span>
                        <span className="font-bold" style={{ color: getBarColor(idx) }}>{(pred.probability * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-[#528DCB]/10 rounded-full h-2.5 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${pred.probability * 100}%` }}
                          transition={{ duration: 1, delay: idx * 0.15 }} className="h-2.5 rounded-full"
                          style={{ background: `linear-gradient(90deg,${getBarColor(idx)},${getBarColor(idx)}aa)` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/review">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold text-white text-sm shadow-lg"
                    style={{ background: 'linear-gradient(135deg,#528DCB,#4B78A0)' }}>
                    {t('results_generate_report')}
                    <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">→</span>
                  </motion.button>
                </Link>
              </div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="mt-6 flex items-center gap-4 bg-[#E0EFFF] border border-[#528DCB]/20 rounded-2xl p-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-[#528DCB]/30 to-[#4B78A0]/30">
                  {imagePreview ? <img src={imagePreview} alt="MRI thumb" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-2xl">🧠</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1a1a2e] font-bold text-sm leading-tight">{t('results_confidence')}: {pct}%</p>
                  <p className="text-[#6A7F92] text-xs mt-0.5 line-clamp-2">{meta.info}</p>
                  <Link href="/treatment"><span className="text-[#528DCB] text-xs font-bold hover:underline cursor-pointer">{t('results_treatment')} →</span></Link>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT CARD */}
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }}
              className="relative rounded-[2rem] overflow-hidden shadow-lg min-h-[340px] border border-[#528DCB]/20"
              style={{ background: 'linear-gradient(135deg,#528DCB22,#4B78A044)' }}>
              {imagePreview ? (
                <img src={imagePreview} alt="MRI Scan" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center"><div className="text-[8rem] opacity-40">🧠</div></div>
              )}
              <motion.div whileHover={{ scale: 1.1 }} className="absolute top-4 right-4 z-10">
                <Link href="/treatment">
                  <div className="w-10 h-10 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-[#1a1a2e] font-bold hover:bg-white/60 transition-colors cursor-pointer">↗</div>
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 p-6" style={{ background: 'linear-gradient(to top, rgba(250,240,230,0.95) 0%, transparent 100%)' }}>
                <h2 className="text-[#1a1a2e] text-2xl font-black leading-tight mb-1">{t('results_analysis_complete')}</h2>
                <p className="text-[#6A7F92] text-xs leading-relaxed max-w-xs">{t('results_disclaimer')}</p>
              </motion.div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="mt-4 flex flex-wrap gap-3 items-center">
            <Link href="/treatment">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 rounded-full text-sm font-bold text-white shadow-md"
                style={{ background: 'linear-gradient(135deg,#528DCB,#4B78A0)' }}>💊 {t('results_treatment')}</motion.button>
            </Link>
            <Link href="/upload">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 rounded-full text-sm font-bold text-[#1a1a2e] bg-white/70 border border-[#528DCB]/20 hover:bg-white/90">📤 {t('results_new_scan')}</motion.button>
            </Link>
            <div className="ml-auto"><p className="text-[#6A7F92] text-xs">⚕️ {t('results_disclaimer')}</p></div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
