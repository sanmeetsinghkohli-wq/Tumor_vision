'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import { uploadAndPredict } from '@/lib/api'
import { useLang } from '@/contexts/LanguageContext'

export default function UploadPage() {
    const router = useRouter()
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [dragActive, setDragActive] = useState(false)
    const { t } = useLang()

    const handleFile = useCallback((f: File) => {
        if (!f.type.startsWith('image/')) {
            setError('Please upload an image file (JPG, PNG, etc.)')
            return
        }
        setFile(f)
        setError('')
        const reader = new FileReader()
        reader.onloadend = () => setPreview(reader.result as string)
        reader.readAsDataURL(f)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setDragActive(false)
        if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0])
    }, [handleFile])

    const handleSubmit = async () => {
        if (!file) return
        setLoading(true)
        setError('')
        try {
            const result = await uploadAndPredict(file)
            if (result.status === 'success') {
                localStorage.setItem('latestResult', JSON.stringify(result))
                router.push('/results')
            } else {
                setError(result.message || 'Analysis failed')
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Cannot connect to server'
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            <div className="min-h-screen relative overflow-hidden">
                <div className="container mx-auto px-6 pt-20 pb-12 relative z-10">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                        <div className="inline-block px-4 py-1.5 bg-[#E0EFFF] border border-[#528DCB]/25 rounded-full mb-4">
                            <span className="text-sm font-medium text-[#4B78A0]">MRI SCAN ANALYSIS</span>
                        </div>
                        <h1 className="text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-[#528DCB] to-[#4B78A0] text-transparent bg-clip-text">{t('upload_title')}</span>
                        </h1>
                        <p className="text-[#6A7F92] text-lg max-w-2xl mx-auto">{t('upload_sub')}</p>
                    </motion.div>

                    <div className="max-w-2xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className={`relative bg-white/70 backdrop-blur-xl border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${dragActive ? 'border-[#528DCB] bg-[#E0EFFF]/50' : 'border-[#528DCB]/25 hover:border-[#528DCB]/50'}`}
                            onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
                            onDragLeave={() => setDragActive(false)}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('fileInput')?.click()}
                        >
                            <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

                            {preview ? (
                                <div className="space-y-4">
                                    <img src={preview} alt="MRI Preview" className="max-h-64 mx-auto rounded-xl border border-[#528DCB]/20" />
                                    <p className="text-[#1a1a2e] font-medium">{file?.name}</p>
                                    <p className="text-[#6A7F92] text-sm">{t('upload_drag')}</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="text-6xl">🧠</div>
                                    <div>
                                        <p className="text-[#1a1a2e] text-xl font-semibold mb-2">{t('upload_drag')}</p>
                                        <p className="text-[#6A7F92]">{t('upload_or')} {t('upload_browse').toLowerCase()}</p>
                                    </div>
                                    <p className="text-[#6A7F92]/60 text-sm">{t('upload_formats')}</p>
                                </div>
                            )}
                        </motion.div>

                        {error && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
                                <p className="text-red-600">⚠️ {error}</p>
                            </motion.div>
                        )}

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSubmit}
                            disabled={!file || loading}
                            className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-[#528DCB] to-[#4B78A0] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#528DCB]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div><span>{t('upload_analyzing')}</span></>
                            ) : (
                                <><span>🔬</span><span>{t('upload_submit')}</span></>
                            )}
                        </motion.button>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-6 bg-[#E0EFFF] border border-[#528DCB]/20 rounded-xl p-4">
                            <p className="text-[#6A7F92] text-sm">
                                <strong className="text-[#4B78A0]">⚕️ Note:</strong> {t('upload_disclaimer')}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
