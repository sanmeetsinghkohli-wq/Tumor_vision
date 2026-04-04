'use client';

import Layout from '@/components/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = () => { v.play().catch(() => {}); };
    tryPlay();
    v.addEventListener('canplay', tryPlay);
    v.addEventListener('loadeddata', tryPlay);
    const t = setTimeout(tryPlay, 500);
    return () => { clearTimeout(t); v.removeEventListener('canplay', tryPlay); v.removeEventListener('loadeddata', tryPlay); };
  }, []);

  return (
    <Layout>
      <article>
        {/* Hero Section */}
        <section className="relative min-h-screen overflow-hidden bg-[#FAF0E6]">
          <video
            ref={videoRef}
            src="/brain-hero.mp4"
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF0E6]/40 via-transparent to-[#FAF0E6]/50" />

          <div className="relative z-20 flex flex-col items-center text-center px-6"
            style={{ paddingTop: 'clamp(200px, 52vh, 560px)', paddingBottom: '2rem' }}>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }} className="flex flex-col items-center gap-2">
              <h1 className="text-[2.8rem] sm:text-[5rem] md:text-[9rem] font-bold leading-none tracking-tight text-white uppercase"
                style={{ fontFamily: "var(--font-bebas, sans-serif)", textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 4px 32px rgba(0,0,0,0.5)' }}>
                Tumor Vision
              </h1>
              <p className="text-white/90 text-xs sm:text-sm tracking-[0.3em] uppercase font-medium mt-1" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>AI Powered Diagnostics</p>
              <p className="hidden sm:block text-white/80 text-base md:text-lg max-w-xl leading-relaxed mt-2" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
                Upload a brain MRI scan and receive an instant AI-powered diagnosis — bridging healthcare gaps in rural communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Link href="/upload">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#4B78A0] to-[#528DCB] text-white text-lg font-bold rounded-full hover:shadow-2xl hover:shadow-[#528DCB]/30 transition-all duration-300">
                    <span className="mr-2">Start Free Analysis</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.button>
                </Link>
                <Link href="/about">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-8 py-4 bg-white/60 backdrop-blur-sm text-[#1a1a2e] text-lg font-semibold rounded-full border-2 border-[#528DCB]/30 hover:bg-[#E0EFFF]/50 transition-all duration-300">
                    Learn More
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-16 px-6">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              {[
                { number: '98.7%', label: 'Accuracy' },
                { number: '4 Types', label: 'Tumor Classes' },
                { number: '<2 min', label: 'Analysis Time' },
                { number: '24/7', label: 'Availability' },
              ].map((stat, index) => (
                <motion.div key={index}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#528DCB]/20 hover:bg-[#E0EFFF]/50 hover:scale-105 transition-all duration-300 text-center"
                  whileHover={{ y: -5 }}>
                  <div className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-2">{stat.number}</div>
                  <div className="text-sm text-[#6A7F92]">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Rural Healthcare Impact */}
        <section className="relative py-20 px-6 overflow-hidden">
          <motion.div
            className="absolute -top-10 -left-10 w-96 h-96 bg-gradient-to-r from-[#528DCB]/15 to-[#A4BFDB]/15 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div className="mb-14 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-2 mb-3 bg-[#E0EFFF] rounded-full border border-[#528DCB]/25 text-[#4B78A0] text-sm font-semibold">
                OUR MISSION
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a2e]">
                Healthcare <span className="bg-gradient-to-r from-[#528DCB] to-[#A4BFDB] text-transparent bg-clip-text">For Everyone</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-[#528DCB]/20">
                <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-4">Bringing AI Diagnostics to Underserved Communities</h3>
                <p className="text-[#6A7F92] leading-relaxed mb-4">
                  In rural India, access to neurologists and specialized medical imaging is severely limited. Tumor Vision bridges this gap by providing AI-powered brain tumor detection that works anywhere with internet connectivity.
                </p>
                <ul className="space-y-3 text-[#6A7F92] mb-6">
                  <li className="flex items-start gap-3"><span className="mt-1 text-[#528DCB]">✓</span><span><span className="text-[#1a1a2e] font-semibold">Early detection:</span> Catch tumors before symptoms become severe</span></li>
                  <li className="flex items-start gap-3"><span className="mt-1 text-[#528DCB]">✓</span><span><span className="text-[#1a1a2e] font-semibold">No specialist needed:</span> AI analysis accessible to any healthcare worker</span></li>
                  <li className="flex items-start gap-3"><span className="mt-1 text-[#528DCB]">✓</span><span><span className="text-[#1a1a2e] font-semibold">Instant results:</span> Get diagnostic insights in under 2 minutes</span></li>
                </ul>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 rounded-full text-xs bg-emerald-50 text-emerald-600 border border-emerald-200">Rural Healthcare</span>
                  <span className="px-3 py-1 rounded-full text-xs bg-[#E0EFFF] text-[#4B78A0] border border-[#528DCB]/25">AI for Good</span>
                  <span className="px-3 py-1 rounded-full text-xs bg-purple-50 text-purple-600 border border-purple-200">Accessible Medicine</span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🏥', stat: '70%', label: 'Rural India lacks specialist doctors' },
                  { icon: '⏱️', stat: '<2 min', label: 'Average analysis time' },
                  { icon: '🎯', stat: '98.7%', label: 'Detection accuracy' },
                  { icon: '🌐', stat: '24/7', label: 'Cloud-based availability' },
                ].map((item, i) => (
                  <motion.div key={i} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-[#528DCB]/20 text-center hover:bg-[#E0EFFF]/50 transition-all duration-300" whileHover={{ y: -5, scale: 1.02 }}>
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <div className="text-2xl font-bold text-[#1a1a2e] mb-1">{item.stat}</div>
                    <div className="text-xs text-[#6A7F92]">{item.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="relative py-20 px-6">
          <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-[#528DCB]/15 to-[#A4BFDB]/15 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-4">
                Why Choose <span className="bg-gradient-to-r from-[#528DCB] to-[#A4BFDB] text-transparent bg-clip-text">Tumor Vision?</span>
              </h2>
              <p className="text-xl text-[#6A7F92] max-w-2xl mx-auto">Advanced AI technology meets healthcare expertise</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: '🧠', title: 'AI-Powered Analysis', description: 'Azure Custom Vision AI for precise tumor classification across 4 categories' },
                { icon: '⚡', title: 'Real-Time Results', description: 'Get accurate predictions in under 2 minutes' },
                { icon: '🎯', title: 'High Accuracy', description: '98.7% accuracy for gliomas, meningiomas, and pituitary tumors' },
                { icon: '🔒', title: 'Secure & Private', description: 'Enterprise-grade security for medical data' },
                { icon: '📊', title: 'Detailed Reports', description: 'Downloadable PDF reports with confidence metrics' },
                { icon: '🌍', title: 'Works Anywhere', description: 'Cloud-based platform accessible from any device' },
              ].map((feature, index) => (
                <motion.div key={index}
                  className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-[#528DCB]/20 hover:border-[#528DCB]/40 hover:bg-[#E0EFFF]/30 transition-all duration-500"
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -10, scale: 1.02 }}>
                  <motion.div className="text-5xl mb-6" whileHover={{ scale: 1.3, rotate: [0, -15, 15, 0] }}>{feature.icon}</motion.div>
                  <h3 className="text-2xl font-bold text-[#1a1a2e] mb-4">{feature.title}</h3>
                  <p className="text-[#6A7F92] leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Scroll Showcase Section */}
        <section className="relative overflow-hidden bg-transparent">
          <ContainerScroll
            titleComponent={
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 mb-4 bg-[#E0EFFF] border border-[#528DCB]/25 rounded-full text-[#4B78A0] text-sm font-semibold tracking-widest">
                  POWERED BY AI
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-[#1a1a2e] leading-tight">
                  Detect. Analyze.{' '}
                  <span className="bg-gradient-to-r from-[#528DCB] to-[#A4BFDB] text-transparent bg-clip-text">Save Lives.</span>
                </h2>
                <p className="mt-4 text-lg text-[#6A7F92] max-w-xl mx-auto">
                  Upload a brain MRI and get AI-powered tumor detection in under 2 minutes — with multilingual PDF reports for rural clinics.
                </p>
              </div>
            }
          >
            <div className="w-full h-full flex flex-col bg-[#FAF0E6] rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-3 border-b border-[#528DCB]/20 bg-[#4B78A0]">
                <div className="w-3 h-3 rounded-full bg-[#528DCB]" />
                <div className="w-3 h-3 rounded-full bg-[#A4BFDB]" />
                <div className="w-3 h-3 rounded-full bg-white/30" />
                <span className="ml-4 text-xs text-white/70 font-mono">tumor-vision.onrender.com/upload</span>
              </div>
              <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 flex flex-col items-center justify-center p-8 border-r border-[#528DCB]/20">
                  <div className="w-full max-w-xs aspect-square rounded-2xl border-2 border-dashed border-[#528DCB]/40 flex flex-col items-center justify-center gap-4 bg-[#E0EFFF]/50 hover:bg-[#E0EFFF] transition-colors">
                    <div className="text-6xl">🧠</div>
                    <p className="text-[#4B78A0] text-sm font-semibold">Drop MRI Scan Here</p>
                    <p className="text-[#6A7F92] text-xs">PNG, JPG up to 10MB</p>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-3 p-6 overflow-hidden">
                  <div className="text-[#1a1a2e] font-bold text-sm">AI Detection Results</div>
                  {[
                    { label: 'Glioma', pct: 87, color: '#528DCB' },
                    { label: 'Meningioma', pct: 8, color: '#A4BFDB' },
                    { label: 'Pituitary', pct: 3, color: '#4B78A0' },
                    { label: 'No Tumor', pct: 2, color: '#6A7F92' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className="text-[#6A7F92] text-xs w-20 shrink-0">{item.label}</span>
                      <div className="flex-1 h-2 bg-[#528DCB]/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
                      </div>
                      <span className="text-xs font-bold" style={{ color: item.color }}>{item.pct}%</span>
                    </div>
                  ))}
                  <div className="mt-4 p-3 rounded-xl bg-[#E0EFFF] border border-[#528DCB]/25">
                    <p className="text-[#4B78A0] text-xs font-semibold">Primary Detection: Glioma</p>
                    <p className="text-[#6A7F92] text-xs mt-1">Confidence: 87% · Report ready in English, हिंदी, मराठी</p>
                  </div>
                  <motion.div
                    className="mt-auto px-4 py-2 rounded-full bg-gradient-to-r from-[#528DCB] to-[#4B78A0] text-white text-xs font-bold text-center"
                    animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
                    Download PDF Report →
                  </motion.div>
                </div>
              </div>
            </div>
          </ContainerScroll>
        </section>

        {/* How It Works */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-2 mb-4 bg-[#E0EFFF] rounded-full border border-[#528DCB]/25 text-[#4B78A0] text-sm font-semibold">CLINICAL WORKFLOW</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-4">
                Diagnostic <span className="bg-gradient-to-r from-[#528DCB] to-[#A4BFDB] text-transparent bg-clip-text">Process</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Upload MRI Scan', description: 'Securely upload your brain MRI scan image.', time: '< 30s' },
                { step: '02', title: 'AI Analysis', description: 'Neural networks analyze for tumor detection and classification.', time: '~ 2 min' },
                { step: '03', title: 'Clinical Report', description: 'Get a report with confidence scores and next steps.', time: 'Instant' },
              ].map((step, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }}>
                  <motion.div className="relative h-full bg-white/70 backdrop-blur-md rounded-2xl p-8 border-2 border-[#528DCB]/20 hover:border-[#528DCB]/40 transition-all" whileHover={{ y: -10 }}>
                    <motion.div className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-[#528DCB] to-[#4B78A0] rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg border-4 border-[#FAF0E6]"
                      whileHover={{ scale: 1.15, rotate: 360 }} transition={{ duration: 0.6 }}>
                      {step.step}
                    </motion.div>
                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 bg-[#E0EFFF] rounded-full border border-[#528DCB]/25">
                      <span className="text-[#4B78A0] text-sm font-semibold">{step.time}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1a1a2e] mb-4">{step.title}</h3>
                    <p className="text-[#6A7F92] leading-relaxed">{step.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <motion.div className="text-center mt-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Link href="/upload">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-gradient-to-r from-[#528DCB] to-[#4B78A0] text-white text-lg font-bold rounded-full hover:shadow-2xl hover:shadow-[#528DCB]/30 transition-all duration-300">
                  Upload Your First Scan →
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </article>
    </Layout>
  );
}
