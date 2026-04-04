'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '@/components/Layout'
import { submitReview, downloadReport, type ReviewData, type Prediction } from '@/lib/api'
import { useLang } from '@/contexts/LanguageContext'

export default function ReviewPage() {
    const [form, setForm] = useState<ReviewData>({
        patient_name: '', patient_age: 0, patient_number: '',
        patient_gender: 'Male', patient_email: '', comments: '',
        diagnosis: '', tumor_type: '', confidence: 0,
        radiologist_name: '', radiologist_id: '',
        radiologist_verified: undefined, radiologist_diagnosis: '',
        final_diagnosis: '',
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
                    confidence: preds[0].probability,
                    final_diagnosis: preds[0].tagName,
                }))
            }
        }
    }, [])

    // Keep final_diagnosis in sync whenever verification state changes
    const setVerification = (verified: boolean) => {
        setForm(prev => ({
            ...prev,
            radiologist_verified: verified,
            final_diagnosis: verified ? prev.diagnosis : (prev.radiologist_diagnosis || ''),
        }))
    }

    const setRadiologistDiagnosis = (value: string) => {
        setForm(prev => ({
            ...prev,
            radiologist_diagnosis: value,
            final_diagnosis: prev.radiologist_verified === false ? value : prev.diagnosis,
        }))
    }

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

    const aiLabel = form.diagnosis
        ? `${form.diagnosis}${form.confidence ? ` (${(form.confidence * 100).toFixed(1)}%)` : ''}`
        : 'No analysis data found'

    const finalLabel = form.radiologist_verified === false
        ? (form.radiologist_diagnosis || '—')
        : (form.diagnosis || '—')

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
                        <p className="text-[#683A46]/60 text-lg">{t('review_sub')}</p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-6">
                        {/* Main form card */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-sm border border-[#C5757C]/15 shadow-sm rounded-2xl p-8 space-y-6">
                            {/* Language Selection */}
                            <div>
                                <label className="block text-[#683A46]/70 mb-2 font-medium">{t('review_lang_label')}</label>
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
                                                : 'bg-white/60 border border-[#C5757C]/20 text-[#683A46]/70 hover:bg-white/80'
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
                                    <label className="block text-[#683A46]/70 mb-2 font-medium">{t('review_name')} *</label>
                                    <input
                                        type="text"
                                        value={form.patient_name}
                                        onChange={(e) => setForm({ ...form, patient_name: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/60 border border-[#C5757C]/20 rounded-xl text-[#462037] focus:outline-none focus:ring-2 focus:ring-[#C5757C]/50"
                                        placeholder={t('review_name_ph')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#683A46]/70 mb-2 font-medium">{t('review_age')} *</label>
                                    <input
                                        type="number"
                                        value={form.patient_age || ''}
                                        onChange={(e) => setForm({ ...form, patient_age: Number(e.target.value) })}
                                        className="w-full px-4 py-3 bg-white/60 border border-[#C5757C]/20 rounded-xl text-[#462037] focus:outline-none focus:ring-2 focus:ring-[#C5757C]/50"
                                        placeholder={t('review_age')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#683A46]/70 mb-2 font-medium">{t('review_gender')}</label>
                                    <select
                                        value={form.patient_gender}
                                        onChange={(e) => setForm({ ...form, patient_gender: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/60 border border-[#C5757C]/20 rounded-xl text-[#462037] focus:outline-none focus:ring-2 focus:ring-[#C5757C]/50"
                                    >
                                        <option value="Male">{t('gender_male')}</option>
                                        <option value="Female">{t('gender_female')}</option>
                                        <option value="Other">{t('gender_other')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[#683A46]/70 mb-2 font-medium">{t('review_phone')}</label>
                                    <input
                                        type="tel"
                                        value={form.patient_number}
                                        onChange={(e) => setForm({ ...form, patient_number: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/60 border border-[#C5757C]/20 rounded-xl text-[#462037] focus:outline-none focus:ring-2 focus:ring-[#C5757C]/50"
                                        placeholder={t('review_phone_ph')}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[#683A46]/70 mb-2 font-medium">{t('review_comments')}</label>
                                <textarea
                                    value={form.comments}
                                    onChange={(e) => setForm({ ...form, comments: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/60 border border-[#C5757C]/20 rounded-xl text-[#462037] focus:outline-none focus:ring-2 focus:ring-[#C5757C]/50 min-h-[100px]"
                                    placeholder={t('review_comments_ph')}
                                />
                            </div>
                        </motion.div>

                        {/* Radiologist Verification Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="bg-white/80 backdrop-blur-sm border border-[#C5757C]/20 shadow-sm rounded-2xl p-8 space-y-6"
                        >
                            {/* Section header */}
                            <div className="flex items-center gap-3 pb-4 border-b border-[#C5757C]/15">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C5757C] to-[#A1525F] flex items-center justify-center text-white text-lg">
                                    🩺
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-[#462037]">{t('review_radiologist_section')}</h2>
                                    <p className="text-sm text-[#683A46]/60">{t('review_radiologist_note')}</p>
                                </div>
                            </div>

                            {/* AI suggested diagnosis */}
                            <div>
                                <label className="block text-[#683A46]/70 mb-2 font-medium text-sm">{t('review_ai_suggested')}</label>
                                <div className="px-4 py-3 bg-[#F9AAAD]/15 border border-[#C5757C]/30 rounded-xl text-[#462037] font-semibold flex items-center gap-2">
                                    <span className="text-[#C5757C]">🤖</span>
                                    {aiLabel}
                                </div>
                            </div>

                            {/* Radiologist name + ID */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[#683A46]/70 mb-2 font-medium text-sm">{t('review_radiologist_name')}</label>
                                    <input
                                        type="text"
                                        value={form.radiologist_name}
                                        onChange={(e) => setForm({ ...form, radiologist_name: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/60 border border-[#C5757C]/20 rounded-xl text-[#462037] focus:outline-none focus:ring-2 focus:ring-[#C5757C]/50"
                                        placeholder={t('review_radiologist_name_ph')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#683A46]/70 mb-2 font-medium text-sm">{t('review_radiologist_id')}</label>
                                    <input
                                        type="text"
                                        value={form.radiologist_id}
                                        onChange={(e) => setForm({ ...form, radiologist_id: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/60 border border-[#C5757C]/20 rounded-xl text-[#462037] focus:outline-none focus:ring-2 focus:ring-[#C5757C]/50"
                                        placeholder={t('review_radiologist_id_ph')}
                                    />
                                </div>
                            </div>

                            {/* Verification toggle */}
                            <div className="space-y-3">
                                <label className="block text-[#683A46]/70 font-medium text-sm">{t('review_diagnosis')}</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {/* Correct */}
                                    <button
                                        type="button"
                                        onClick={() => setVerification(true)}
                                        className={`flex items-center gap-3 px-5 py-4 rounded-xl border-2 transition-all font-medium text-left ${
                                            form.radiologist_verified === true
                                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                                : 'border-[#C5757C]/20 bg-white/60 text-[#683A46]/70 hover:bg-white/80'
                                        }`}
                                    >
                                        <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                            form.radiologist_verified === true ? 'border-emerald-500 bg-emerald-500' : 'border-[#C5757C]/40'
                                        }`}>
                                            {form.radiologist_verified === true && <span className="w-2 h-2 rounded-full bg-white" />}
                                        </span>
                                        <span>✅ {t('review_ai_correct')}</span>
                                    </button>

                                    {/* Incorrect */}
                                    <button
                                        type="button"
                                        onClick={() => setVerification(false)}
                                        className={`flex items-center gap-3 px-5 py-4 rounded-xl border-2 transition-all font-medium text-left ${
                                            form.radiologist_verified === false
                                                ? 'border-red-400 bg-red-50 text-red-700'
                                                : 'border-[#C5757C]/20 bg-white/60 text-[#683A46]/70 hover:bg-white/80'
                                        }`}
                                    >
                                        <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                            form.radiologist_verified === false ? 'border-red-400 bg-red-400' : 'border-[#C5757C]/40'
                                        }`}>
                                            {form.radiologist_verified === false && <span className="w-2 h-2 rounded-full bg-white" />}
                                        </span>
                                        <span>❌ {t('review_ai_incorrect')}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Radiologist's own diagnosis — shown only when AI is marked incorrect */}
                            <AnimatePresence>
                                {form.radiologist_verified === false && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <label className="block text-[#683A46]/70 mb-2 font-medium text-sm">{t('review_radiologist_diagnosis')}</label>
                                        <input
                                            type="text"
                                            value={form.radiologist_diagnosis}
                                            onChange={(e) => setRadiologistDiagnosis(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/60 border-2 border-red-300 rounded-xl text-[#462037] focus:outline-none focus:ring-2 focus:ring-red-300"
                                            placeholder={t('review_radiologist_diagnosis_ph')}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Final diagnosis summary */}
                            {form.radiologist_verified !== undefined && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`rounded-xl p-4 border-2 ${
                                        form.radiologist_verified
                                            ? 'bg-emerald-50 border-emerald-300'
                                            : 'bg-[#FFF5F5] border-red-300'
                                    }`}
                                >
                                    <p className="text-xs font-semibold uppercase tracking-wide mb-1 text-[#683A46]/60">{t('review_final_diagnosis')}</p>
                                    <p className={`text-xl font-bold ${form.radiologist_verified ? 'text-emerald-700' : 'text-red-700'}`}>
                                        {finalLabel}
                                    </p>
                                    <p className="text-xs mt-1 text-[#683A46]/50">
                                        {form.radiologist_verified
                                            ? '✅ Confirmed by radiologist'
                                            : '⚠️ Overridden by radiologist'}
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Action buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="bg-white/80 backdrop-blur-sm border border-[#C5757C]/15 shadow-sm rounded-2xl p-6 space-y-4"
                        >
                            {error && (
                                <div className="bg-red-50 border border-red-300 rounded-xl p-4">
                                    <p className="text-red-600">⚠️ {error}</p>
                                </div>
                            )}

                            {submitted && (
                                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4">
                                    <p className="text-emerald-700">✅ {t('review_success')}</p>
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
                                    className="px-8 py-4 bg-white/80 border border-[#C5757C]/30 text-[#462037] font-bold rounded-xl flex items-center gap-2 hover:bg-white"
                                >
                                    ⬇️ {t('review_download')}
                                </motion.button>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-gradient-to-r from-[#C5757C]/10 to-[#683A46]/10 border border-[#C5757C]/30 rounded-xl p-4">
                            <p className="text-[#683A46]/70 text-sm">
                                <strong className="text-[#A1525F]">⚕️ Disclaimer:</strong> {t('review_disclaimer')} {language === 'en' ? 'English' : language === 'hi' ? 'हिन्दी' : 'मराठी'}.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
