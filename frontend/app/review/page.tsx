'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '@/components/Layout'
import { submitReview, downloadReport, type ReviewData, type Prediction } from '@/lib/api'

export default function ReviewPage() {
    const [form, setForm] = useState<ReviewData>({
        patient_name: '', patient_age: 0, patient_number: '',
        patient_gender: 'Male', patient_email: '', comments: '',
        diagnosis: '', tumor_type: '', confidence: 0
    })
    const [predictions, setPredictions] = useState<Prediction[]>([])
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')
    const [language, setLanguage] = useState('en')

    useEffect(() => {
        const stored = localStorage.getItem('latestResult')
        if (stored) {
            const data = JSON.parse(stored)
            const preds = data.predictions || []
            setPredictions(preds)
            setImage(data.image || '')
            if (preds.length) {
                setForm(prev => ({
                    ...prev,
                    diagnosis: preds[0].tagName,
                    tumor_type: preds[0].tagName,
                    confidence: preds[0].probability
                }))
            }
        }
        // Read global language preference
        const savedLang = localStorage.getItem('appLanguage') || 'en'
        setLanguage(savedLang)

        // Keep in sync if user changes language in navbar while on this page
        const onStorage = () => setLanguage(localStorage.getItem('appLanguage') || 'en')
        window.addEventListener('storage', onStorage)
        // Also poll every 500ms (same-tab localStorage changes don't fire 'storage')
        const interval = setInterval(onStorage, 500)
        return () => {
            window.removeEventListener('storage', onStorage)
            clearInterval(interval)
        }
    }, [])

    const handleSubmit = async () => {
        setLoading(true)
        setError('')
        try {
            await submitReview(form)
            setSubmitted(true)
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to submit')
        } finally {
            setLoading(false)
        }
    }

    const handleDownload = () => {
        // Always read the freshest language at download time
        const lang = localStorage.getItem('appLanguage') || language || 'en'
        downloadReport(form, predictions, image, undefined, lang)
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
                            <span className="bg-gradient-to-r from-[#C5757C] to-[#F9AAAD] text-transparent bg-clip-text">Generate Report</span>
                        </h1>
                        <p className="text-gray-400 text-lg">Fill in patient details to generate a diagnostic report</p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-6">
                            {/* Language Selection */}
                            <div>
                                <label className="block text-gray-300 mb-2 font-medium">Report Language</label>
                                <div className="flex gap-3">
                                    {[
                                        { code: 'en', label: '🇬🇧 English' },
                                        { code: 'hi', label: '🇮🇳 हिन्दी' },
                                        { code: 'mr', label: '🇮🇳 मराठी' }
                                    ].map(lang_opt => (
                                        <button
                                            key={lang_opt.code}
                                            onClick={() => setLanguage(lang_opt.code)}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all ${language === lang_opt.code
                                                ? 'bg-gradient-to-r from-[#C5757C] to-cyan-500 text-white'
                                                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                                }`}
                                        >
                                            {lang_opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Patient Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium">Patient Name *</label>
                                    <input
                                        type="text"
                                        value={form.patient_name}
                                        onChange={(e) => setForm({ ...form, patient_name: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                        placeholder="Enter patient name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium">Age *</label>
                                    <input
                                        type="number"
                                        value={form.patient_age || ''}
                                        onChange={(e) => setForm({ ...form, patient_age: Number(e.target.value) })}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                        placeholder="Age"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium">Gender</label>
                                    <select
                                        value={form.patient_gender}
                                        onChange={(e) => setForm({ ...form, patient_gender: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium">Contact Number</label>
                                    <input
                                        type="tel"
                                        value={form.patient_number}
                                        onChange={(e) => setForm({ ...form, patient_number: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                        placeholder="Phone number"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2 font-medium">AI Diagnosis</label>
                                <div className="px-4 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-[#F9AAAD] font-medium">
                                    {form.diagnosis || 'No analysis data found'} {form.confidence ? `(${(form.confidence * 100).toFixed(1)}%)` : ''}
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2 font-medium">Additional Comments</label>
                                <textarea
                                    value={form.comments}
                                    onChange={(e) => setForm({ ...form, comments: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[100px]"
                                    placeholder="Any additional observations or notes..."
                                />
                            </div>

                            {error && (
                                <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
                                    <p className="text-red-200">⚠️ {error}</p>
                                </div>
                            )}

                            {submitted && (
                                <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl p-4">
                                    <p className="text-emerald-200">✅ Review submitted successfully!</p>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSubmit}
                                    disabled={loading || !form.patient_name}
                                    className="flex-1 px-8 py-4 bg-gradient-to-r from-[#C5757C] to-[#F9AAAD] text-white font-bold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : '📝'}
                                    <span>{loading ? 'Submitting...' : 'Submit Review'}</span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleDownload}
                                    className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-xl flex items-center gap-2"
                                >
                                    ⬇️ Download PDF
                                </motion.button>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 bg-gradient-to-r from-[#C5757C]/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-4">
                            <p className="text-gray-300 text-sm">
                                <strong className="text-[#F9AAAD]">⚕️ Disclaimer:</strong> AI-assisted suggestive analysis only. Reports are generated in {language === 'en' ? 'English' : language === 'hi' ? 'Hindi' : 'Marathi'}.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
