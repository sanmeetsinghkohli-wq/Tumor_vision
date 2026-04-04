'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/Layout'
import { useLang } from '@/contexts/LanguageContext'

export default function AboutPage() {
    const { t } = useLang()
    return (
        <Layout>
            <div className="min-h-screen relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
                    <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, #8B7AB5 1px, transparent 1px), linear-gradient(to bottom, #C4B5DE 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
                </div>

                <div className="container mx-auto px-6 pt-20 pb-12 relative z-10">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                        <h1 className="text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-[#8B7AB5] to-[#6B5B95] text-transparent bg-clip-text">{t('about_title')}</span>
                        </h1>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t('about_mission_text')}</p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto space-y-12">
                        {/* Mission */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="bg-white/70 backdrop-blur-xl border border-[#8B7AB5]/20 rounded-2xl p-8 shadow-sm">
                            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4">🎯 {t('about_mission')}</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Tumor Vision is an AI-assisted diagnostic tool designed to support radiologists and healthcare professionals in the early detection of brain tumors — especially in rural and underserved regions of India where specialist access is limited.
                            </p>
                            <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-4">
                                <p className="text-orange-700 text-sm">
                                    <strong>⚠️ Important:</strong> Tumor Vision is NOT a replacement for professional medical diagnosis. It is a suggestive assistance tool that provides AI-generated insights to help radiologists make faster, more informed decisions.
                                </p>
                            </div>
                        </motion.div>

                        {/* Problem */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="bg-white/70 backdrop-blur-xl border border-[#8B7AB5]/20 rounded-2xl p-8 shadow-sm">
                            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">📌 The Problem</h2>
                            <p className="text-gray-500 mb-6">Brain tumors account for 85–90% of all primary CNS tumors. Early detection is critical, but:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { icon: '🏥', title: 'Lack of Specialists', desc: 'Rural India has ~1 radiologist per 100,000 people' },
                                    { icon: '⏳', title: 'Delayed Diagnosis', desc: 'Patients wait weeks or months for expert interpretation' },
                                    { icon: '💰', title: 'Cost Barrier', desc: 'Specialist opinions are expensive and inaccessible' },
                                    { icon: '🌐', title: 'Language Barrier', desc: '57% of India does not speak English — tools must be multilingual' },
                                ].map((item, i) => (
                                    <motion.div key={i} whileHover={{ y: -5 }} className="bg-white/80 rounded-xl p-5 border border-[#8B7AB5]/20">
                                        <div className="text-3xl mb-2">{item.icon}</div>
                                        <h3 className="text-[#1a1a2e] font-bold text-lg mb-1">{item.title}</h3>
                                        <p className="text-gray-500 text-sm">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Detection Capabilities */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="bg-white/70 backdrop-blur-xl border border-[#8B7AB5]/20 rounded-2xl p-8 shadow-sm">
                            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">🧠 Detection Capabilities</h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {[
                                    { type: 'Glioma', desc: 'Tumors from glial cells', color: 'from-red-100 border-red-200' },
                                    { type: 'Meningioma', desc: 'Tumors from meninges', color: 'from-amber-100 border-amber-200' },
                                    { type: 'Pituitary', desc: 'Pituitary gland tumors', color: 'from-purple-100 border-purple-200' },
                                    { type: 'No Tumor', desc: 'Healthy brain scan', color: 'from-emerald-100 border-emerald-200' },
                                ].map((item, i) => (
                                    <motion.div key={i} whileHover={{ scale: 1.05 }} className={`bg-gradient-to-br ${item.color} to-transparent rounded-xl p-5 border text-center`}>
                                        <p className="text-[#1a1a2e] font-bold text-lg">{item.type}</p>
                                        <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Tech Stack */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="bg-white/70 backdrop-blur-xl border border-[#8B7AB5]/20 rounded-2xl p-8 shadow-sm">
                            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">⚙️ Technology</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { tech: 'Azure Custom Vision', role: 'AI Classification' },
                                    { tech: 'Python Flask', role: 'Backend API' },
                                    { tech: 'Next.js + React', role: 'Frontend UI' },
                                    { tech: 'ReportLab', role: 'PDF Generation' },
                                    { tech: 'Google OAuth', role: 'Authentication' },
                                    { tech: 'Render', role: 'Cloud Hosting' },
                                    { tech: 'Tailwind CSS', role: 'Styling' },
                                    { tech: 'Framer Motion', role: 'Animations' },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/80 rounded-xl p-4 border border-[#8B7AB5]/20 text-center">
                                        <p className="text-[#1a1a2e] font-semibold text-sm">{item.tech}</p>
                                        <p className="text-gray-400 text-xs mt-1">{item.role}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Multilingual */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="bg-white/70 backdrop-blur-xl border border-[#8B7AB5]/20 rounded-2xl p-8 shadow-sm">
                            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">🌐 Multilingual Support</h2>
                            <p className="text-gray-500 mb-6">The entire interface and generated reports are available in three languages:</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { lang: 'English', flag: '🇬🇧', status: '✅ Supported' },
                                    { lang: 'Hindi (हिन्दी)', flag: '🇮🇳', status: '✅ Supported' },
                                    { lang: 'Marathi (मराठी)', flag: '🇮🇳', status: '✅ Supported' },
                                ].map((item, i) => (
                                    <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
                                        <div className="text-3xl mb-2">{item.flag}</div>
                                        <p className="text-[#1a1a2e] font-bold">{item.lang}</p>
                                        <p className="text-[#8B7AB5] text-sm mt-1">{item.status}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Future Vision */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="bg-gradient-to-r from-[#8B7AB5]/10 to-cyan-100/30 backdrop-blur-xl border border-emerald-200 rounded-2xl p-8">
                            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4">🔬 Future Vision</h2>
                            <p className="text-gray-500 mb-4">Expanding beyond brain tumors to detect tumors across the entire body:</p>
                            <div className="flex flex-wrap gap-3">
                                {['🫁 Lung Tumors', '🩻 Bone Tumors', '🔬 Liver & Abdominal', '📡 Pan-India Deployment', '🏛️ Government Integration'].map((item, i) => (
                                    <span key={i} className="px-4 py-2 bg-white/70 rounded-full text-[#1a1a2e] text-sm border border-[#8B7AB5]/20">{item}</span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
