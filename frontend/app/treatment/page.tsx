'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '@/components/Layout'
import AnimatedDropdown from '@/components/AnimatedDropdown'
import { getTreatmentRecommendation, downloadTreatmentSummary, type TreatmentResponse } from '@/lib/api'
import { useLang } from '@/contexts/LanguageContext'

export default function TreatmentPage() {
    const [tumorType, setTumorType] = useState('Glioma')
    const [patientAge, setPatientAge] = useState(45)
    const [confidence, setConfidence] = useState(0.85)
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState<TreatmentResponse | null>(null)
    const [error, setError] = useState('')
    const [selectedTreatment, setSelectedTreatment] = useState(0)
    const { t } = useLang()

    const handleSimulation = async () => {
        setLoading(true)
        setError('')
        try {
            const data = await getTreatmentRecommendation({ tumor_type: tumorType, patient_age: patientAge, confidence })
            setResults(data)
            setSelectedTreatment(0)
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Cannot connect to backend server')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            <div className="min-h-screen relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
                    <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, #8B7AB5 1px, transparent 1px), linear-gradient(to bottom, #C4B5DE 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
                </div>

                <div className="container mx-auto px-6 pt-20 pb-12 relative z-10">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                        <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#8B7AB5]/15 to-[#C4B5DE]/15 border border-[#8B7AB5]/25 rounded-full mb-4">
                            <span className="text-sm font-medium bg-gradient-to-r from-[#8B7AB5] to-[#6B5B95] text-transparent bg-clip-text">AI-POWERED TREATMENT PLANNING</span>
                        </div>
                        <h1 className="text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-[#8B7AB5] to-[#6B5B95] text-transparent bg-clip-text">{t('treatment_title')}</span>
                        </h1>
                        <p className="text-gray-500 text-lg">{t('treatment_sub')}</p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto">
                        {/* Input Form */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/70 backdrop-blur-xl border border-[#8B7AB5]/20 rounded-2xl p-8 mb-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-8 flex items-center gap-3"><span className="text-3xl">👤</span> Patient Parameters</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <AnimatedDropdown
                                    label="Tumor Type"
                                    options={[
                                        { value: 'Glioma', label: '🧠 Glioma' },
                                        { value: 'Meningioma', label: '🔬 Meningioma' },
                                        { value: 'Pituitary', label: '🧬 Pituitary' },
                                        { value: 'No Tumor', label: '✅ No Tumor' }
                                    ]}
                                    value={tumorType}
                                    onChange={setTumorType}
                                />

                                <div>
                                    <label className="block text-gray-500 mb-3 font-medium text-sm">Patient Age</label>
                                    <div className="space-y-3">
                                        <div className="flex items-baseline justify-between">
                                            <span className="text-4xl font-bold text-[#1a1a2e]">{patientAge}</span>
                                            <span className="text-sm text-gray-500">years old</span>
                                        </div>
                                        <input type="range" min="1" max="100" value={patientAge} onChange={(e) => setPatientAge(Number(e.target.value))}
                                            className="w-full h-2 bg-[#8B7AB5]/15 rounded-full appearance-none cursor-pointer"
                                            style={{ background: `linear-gradient(to right, #8B7AB5 0%, #8B7AB5 ${patientAge}%, rgba(139,122,181,0.15) ${patientAge}%, rgba(139,122,181,0.15) 100%)` }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-500 mb-3 font-medium text-sm">AI Confidence</label>
                                    <div className="space-y-3">
                                        <div className="flex items-baseline justify-between">
                                            <span className="text-4xl font-bold text-[#1a1a2e]">{(confidence * 100).toFixed(0)}%</span>
                                            <span className="text-sm text-gray-500">certainty</span>
                                        </div>
                                        <input type="range" min="0.5" max="1" step="0.01" value={confidence} onChange={(e) => setConfidence(Number(e.target.value))}
                                            className="w-full h-2 bg-[#8B7AB5]/15 rounded-full appearance-none cursor-pointer"
                                            style={{ background: `linear-gradient(to right, #C4B5DE 0%, #C4B5DE ${(confidence - 0.5) * 200}%, rgba(139,122,181,0.15) ${(confidence - 0.5) * 200}%, rgba(139,122,181,0.15) 100%)` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSimulation} disabled={loading}
                                className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-[#8B7AB5] to-[#6B5B95] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#8B7AB5]/30 transition-all disabled:opacity-50 flex items-center justify-center gap-3">
                                {loading ? (<><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div><span>Generating...</span></>) : (<><span>✨</span><span>Generate Treatment Recommendations</span></>)}
                            </motion.button>
                        </motion.div>

                        {error && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                                <p className="text-red-600">⚠️ {error}</p>
                            </motion.div>
                        )}

                        {results && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                {/* Overview */}
                                <div className="bg-white/70 backdrop-blur-xl border border-[#8B7AB5]/20 rounded-2xl p-8 mb-8 shadow-sm">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="text-center p-4 bg-[#8B7AB5]/10 rounded-lg">
                                            <p className="text-[#8B7AB5] text-sm mb-1">Diagnosis</p>
                                            <p className="text-[#1a1a2e] text-2xl font-bold">{results.tumor_type}</p>
                                        </div>
                                        <div className="text-center p-4 bg-[#6B5B95]/10 rounded-lg">
                                            <p className="text-[#6B5B95] text-sm mb-1">Severity</p>
                                            <p className="text-[#1a1a2e] text-2xl font-bold">{results.severity}</p>
                                        </div>
                                        <div className="text-center p-4 bg-[#8B7AB5]/10 rounded-lg">
                                            <p className="text-[#8B7AB5] text-sm mb-1">Age</p>
                                            <p className="text-[#1a1a2e] text-2xl font-bold">{results.patient_age}</p>
                                        </div>
                                        <div className="text-center p-4 bg-[#6B5B95]/10 rounded-lg">
                                            <p className="text-[#6B5B95] text-sm mb-1">Confidence</p>
                                            <p className="text-[#1a1a2e] text-2xl font-bold">{(results.ai_confidence * 100).toFixed(0)}%</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                        <p className="text-orange-700 text-sm"><strong>⏰ Urgency:</strong> {results.urgency}</p>
                                    </div>
                                </div>

                                {/* Treatment Options */}
                                <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-[#8B7AB5]/20 mb-8 shadow-sm">
                                    <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">💊 Treatment Options</h2>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {results.recommendations.map((treatment, index) => (
                                            <button key={index} onClick={() => setSelectedTreatment(index)}
                                                className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedTreatment === index ? 'bg-gradient-to-r from-[#8B7AB5] to-[#6B5B95] text-white shadow-lg' : 'bg-[#8B7AB5]/10 text-gray-500 hover:bg-[#8B7AB5]/20'}`}>
                                                Option {index + 1} {treatment.suitability_score && <span className="ml-2 text-xs opacity-80">({treatment.suitability_score}% match)</span>}
                                            </button>
                                        ))}
                                    </div>

                                    {results.recommendations[selectedTreatment] && (
                                        <motion.div key={selectedTreatment} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                            <div className="border-b border-[#8B7AB5]/15 pb-4">
                                                <h3 className="text-3xl font-bold bg-gradient-to-r from-[#8B7AB5] to-[#6B5B95] bg-clip-text text-transparent mb-2">
                                                    {results.recommendations[selectedTreatment].name}
                                                </h3>
                                                <p className="text-gray-500">{results.recommendations[selectedTreatment].description}</p>
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    <span className="px-3 py-1 bg-[#8B7AB5]/15 border border-[#8B7AB5]/30 rounded-full text-[#6B5B95] text-sm">{results.recommendations[selectedTreatment].type}</span>
                                                    <span className="px-3 py-1 bg-[#C4B5DE]/20 border border-[#C4B5DE]/40 rounded-full text-[#6B5B95] text-sm">{results.recommendations[selectedTreatment].success_rate}% Success Rate</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="bg-[#8B7AB5]/10 rounded-xl p-4 border border-[#8B7AB5]/20">
                                                    <p className="text-[#8B7AB5] text-sm mb-1">⏱️ Duration</p>
                                                    <p className="text-[#1a1a2e] text-lg font-bold">{results.recommendations[selectedTreatment].duration}</p>
                                                </div>
                                                <div className="bg-[#C4B5DE]/15 rounded-xl p-4 border border-[#C4B5DE]/30">
                                                    <p className="text-[#6B5B95] text-sm mb-1">🏥 Recovery</p>
                                                    <p className="text-[#1a1a2e] text-lg font-bold">{results.recommendations[selectedTreatment].recovery_time}</p>
                                                </div>
                                                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                                                    <p className="text-purple-600 text-sm mb-1">💰 Cost</p>
                                                    <p className="text-[#1a1a2e] text-lg font-bold">{results.recommendations[selectedTreatment].cost_estimate?.replace(/\$/g, '₹')}</p>
                                                </div>
                                            </div>

                                            {/* Survival Rates */}
                                            <div className="bg-white/80 rounded-xl p-6 border border-[#8B7AB5]/20">
                                                <h4 className="text-[#1a1a2e] text-lg font-bold mb-4">📊 Survival Rates</h4>
                                                {Object.entries(results.recommendations[selectedTreatment].survival_rates).map(([key, value]) => (
                                                    <div key={key} className="mb-3">
                                                        <div className="flex justify-between text-sm mb-1">
                                                            <span className="text-gray-500">{key.replace('_', '-Year ')}</span>
                                                            <span className="text-[#1a1a2e] font-bold">{value}%</span>
                                                        </div>
                                                        <div className="w-full bg-[#8B7AB5]/10 rounded-full h-3 overflow-hidden">
                                                            <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1 }}
                                                                className="bg-gradient-to-r from-[#8B7AB5] to-[#C4B5DE] h-3 rounded-full" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="bg-red-50/80 rounded-xl p-6 border border-red-200">
                                                    <h4 className="text-[#1a1a2e] text-lg font-bold mb-3">⚠️ Side Effects</h4>
                                                    <ul className="space-y-2">
                                                        {results.recommendations[selectedTreatment].side_effects.map((e, i) => (
                                                            <li key={i} className="flex items-start text-gray-600"><span className="text-red-400 mr-2">•</span>{e}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="bg-white/80 rounded-xl p-6 border border-[#8B7AB5]/20">
                                                    <h4 className="text-[#1a1a2e] text-lg font-bold mb-3">✅ Recommended For</h4>
                                                    <ul className="space-y-2">
                                                        {results.recommendations[selectedTreatment].recommended_for.map((r, i) => (
                                                            <li key={i} className="flex items-start text-gray-600"><span className="text-[#8B7AB5] mr-2">✓</span>{r}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                        onClick={() => downloadTreatmentSummary({ tumor_type: results.tumor_type, patient_age: results.patient_age, confidence: results.ai_confidence, recommendations: results.recommendations })}
                                        className="px-6 py-3 bg-gradient-to-r from-[#8B7AB5] to-[#6B5B95] text-white font-semibold rounded-lg shadow-lg shadow-[#8B7AB5]/20">
                                        ⬇️ Download Treatment PDF
                                    </motion.button>
                                </div>

                                <div className="mt-6 bg-[#8B7AB5]/10 border border-[#8B7AB5]/20 rounded-xl p-5">
                                    <p className="text-gray-500 text-sm"><strong className="text-[#6B5B95]">⚕️ Disclaimer:</strong> {results.disclaimer}</p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
