'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '@/components/Layout'
import { submitReview, downloadReport, type ReviewData, type Prediction } from '@/lib/api'
import { useLang } from '@/contexts/LanguageContext'

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
    const { lang: language, setLang, t } = useLang()

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
        // language is managed by LanguageContext — no manual sync needed
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
        downloadReport(form, predictions, image, undefined, language)
    }

    return (
        <Layout>
            <div className="min-h-screen relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, #C5757C 1px, transparent 1px), linear-gradient(to bottom, #F9AAAD 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
                </div>

                <div className="container mx-auto px-6 pt-20 pb-12 relative z-10">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                        <h1 className="text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-[#C5757C] to-[#F9AAAD] text-transparent bg-clip-text">{t('review_title')}</span>
                        </h1>
                        <p className="text-gray-400 text-lg">{t('review_sub')}</p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-6">
                            {/* Language Selection */}
                            <div>
                                <label className="block text-gray-300 mb-2 font-medium">{t('review_lang_label')}</label>
                                <div className="flex gap-3">
                                    {[
                                        { code: 'en', label: '🇬🇧 English' },
                                        { code: 'hi', label: '🇮🇳 हिन्दी' },
                                        { code: 'mr', label: '🇮🇳 मराठी' }
                                    ].map(lang_opt => (
                                        <button
                                            key={lang_opt.code}
                                            onClick={() => setLang(lang_opt.code as 'en' | 'hi' | 'mr')}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all ${language === lang_opt.code
                                                ? 'bg-gradient-to-r from-[#C5757C] to-[#A1525F] text-white'
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
                                    <label className="block text-gray-300 mb-2 font-medium">{t('review_name')} *</label>
                                    <input
                                        type="text"
                                        value={form.patient_name}
                                        onChange={(e) => setForm({ ...form, patient_name: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#C5757C]/50"
                                        placeholder={t('review_name_ph')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium">{t('review_age')} *</label>
                                    <input
                                        type="number"
                                        value={form.patient_age || ''}
                                        onChange={(e) => setForm({ ...form, patient_age: Number(e.target.value) })}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#C5757C]/50"
                                        placeholder={t('review_age')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium">{t('review_gender')}</label>
                                    <select
                                        value={form.patient_gender}
                                        onChange={(e) => setForm({ ...form, patient_gender: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#C5757C]/50"
                                    >
                                        <option value="Male">{t('gender_male')}</option>
                                        <option value="Female">{t('gender_female')}</option>
                                        <option value="Other">{t('gender_other')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium">{t('review_phone')}</label>
                                    <input
                                        type="tel"
                                        value={form.patient_number}
                                        onChange={(e) => setForm({ ...form, patient_number: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#C5757C]/50"
                                        placeholder={t('review_phone_ph')}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2 font-medium">{t('review_diagnosis')}</label>
                                <div className="px-4 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-[#F9AAAD] font-medium">
                                    {form.diagnosis || 'No analysis data found'} {form.confidence ? `(${(form.confidence * 100).toFixed(1)}%)` : ''}
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2 font-medium">{t('review_comments')}</label>
                                <textarea
                                    value={form.comments}
                                    onChange={(e) => setForm({ ...form, comments: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#C5757C]/50 min-h-[100px]"
                                    placeholder={t('review_comments_ph')}
                                />
                            </div>

                            {error && (
                                <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
                                    <p className="text-red-200">⚠️ {error}</p>
                                </div>
                            )}

                            {submitted && (
                                <div className="bg-[#C5757C]/20 border border-[#C5757C]/50 rounded-xl p-4">
                                    <p className="text-[#F9AAAD]">✅ {t('review_success')}</p>
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
                                    <span>{loading ? t('review_submitting') : t('review_submit')}</span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleDownload}
                                    className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-xl flex items-center gap-2"
                                >
                                    ⬇️ {t('review_download')}
                                </motion.button>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 bg-gradient-to-r from-[#C5757C]/10 to-[#683A46]/10 border border-[#C5757C]/30 rounded-xl p-4">
                            <p className="text-gray-300 text-sm">
                                <strong className="text-[#F9AAAD]">⚕️ Disclaimer:</strong> {t('review_disclaimer')} {language === 'en' ? 'English' : language === 'hi' ? 'हिन्दी' : 'मराठी'}.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
