'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '@/components/Layout'
import Link from 'next/link'
import type { Prediction } from '@/lib/api'

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

    const topPrediction = predictions[0]
    const tumorDetected = topPrediction && topPrediction.tagName !== 'No Tumor'

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#140E1C] via-[#2A1020] to-[#140E1C]">
                    <div className="w-8 h-8 border-2 border-[#C5757C] border-t-transparent rounded-full animate-spin"></div>
                </div>
            </Layout>
        )
    }

    if (!predictions.length) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#140E1C] via-[#2A1020] to-[#140E1C]">
                    <div className="text-center">
                        <div className="text-6xl mb-4">📋</div>
                        <h2 className="text-2xl font-bold text-white mb-2">No Results Yet</h2>
                        <p className="text-gray-400 mb-6">Upload an MRI scan first to see analysis results</p>
                        <Link href="/upload">
                            <motion.button whileHover={{ scale: 1.05 }} className="px-8 py-3 bg-gradient-to-r from-[#C5757C] to-[#F9AAAD] text-white font-bold rounded-xl">
                                Upload Scan
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #140E1C 0%, #2A1020 50%, #140E1C 100%)' }}>
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, #C5757C 1px, transparent 1px), linear-gradient(to bottom, #F9AAAD 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
                </div>

                <div className="container mx-auto px-6 pt-20 pb-12 relative z-10">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                        <h1 className="text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-[#C5757C] to-[#F9AAAD] text-transparent bg-clip-text">Analysis Results</span>
                        </h1>
                        <p className="text-gray-400 text-lg">AI-Powered Suggestive Diagnosis</p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* MRI Preview */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">📷 MRI Scan</h2>
                            {imagePreview && <img src={imagePreview} alt="MRI Scan" className="w-full rounded-xl border border-white/20" />}
                        </motion.div>

                        {/* Classification */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            {/* Top Result */}
                            <div className={`bg-white/5 backdrop-blur-xl border rounded-2xl p-6 ${tumorDetected ? 'border-red-500/50' : 'border-emerald-500/50'}`}>
                                <h2 className="text-xl font-bold text-white mb-4">🎯 Primary Detection</h2>
                                <div className="text-center">
                                    <div className="text-5xl mb-3">{tumorDetected ? '⚠️' : '✅'}</div>
                                    <p className={`text-3xl font-bold mb-2 ${tumorDetected ? 'text-red-400' : 'text-[#F9AAAD]'}`}>
                                        {topPrediction.tagName}
                                    </p>
                                    <p className="text-white text-lg">Confidence: {(topPrediction.probability * 100).toFixed(1)}%</p>
                                </div>
                            </div>

                            {/* All Predictions */}
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-white mb-4">📊 Confidence Breakdown</h2>
                                <div className="space-y-4">
                                    {predictions.map((pred, idx) => (
                                        <div key={idx}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-300">{pred.tagName}</span>
                                                <span className="text-white font-bold">{(pred.probability * 100).toFixed(1)}%</span>
                                            </div>
                                            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${pred.probability * 100}%` }}
                                                    transition={{ duration: 1, delay: idx * 0.2 }}
                                                    className="bg-gradient-to-r from-[#C5757C] to-cyan-500 h-3 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="max-w-5xl mx-auto mt-8 flex flex-wrap gap-4 justify-center">
                        <Link href="/review">
                            <motion.button whileHover={{ scale: 1.05 }} className="px-8 py-3 bg-gradient-to-r from-[#C5757C] to-[#F9AAAD] text-white font-bold rounded-xl">
                                📝 Generate Report
                            </motion.button>
                        </Link>
                        <Link href="/treatment">
                            <motion.button whileHover={{ scale: 1.05 }} className="px-8 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-xl">
                                💊 Treatment Options
                            </motion.button>
                        </Link>
                        <Link href="/upload">
                            <motion.button whileHover={{ scale: 1.05 }} className="px-8 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-xl">
                                📤 New Scan
                            </motion.button>
                        </Link>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="max-w-5xl mx-auto mt-6 bg-gradient-to-r from-[#C5757C]/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-4">
                        <p className="text-gray-300 text-sm">
                            <strong className="text-[#F9AAAD]">⚕️ Disclaimer:</strong> This is an AI-assisted suggestive analysis. It does NOT constitute a medical diagnosis. Consult a qualified medical professional for final assessment.
                        </p>
                    </motion.div>
                </div>
            </div>
        </Layout>
    )
}
