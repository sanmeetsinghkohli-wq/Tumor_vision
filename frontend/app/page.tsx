'use client';

import Layout from '@/components/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TubesCursor } from '@/components/ui/tube-cursor';

export default function Home() {
  return (
    <Layout>
      <article>
        {/* Hero Section with TubesCursor background */}
        <section className="relative min-h-screen overflow-hidden -mt-20 sm:-mt-24 lg:-mt-28">
          <TubesCursor
            title="Tumor Vision"
            subtitle="AI Detection"
            caption="Click to change colors"
            initialColors={["#C5757C", "#F9AAAD", "#683A46"]}
            lightColors={["#C5757C", "#F9AAAD", "#683A46", "#A1525F"]}
            lightIntensity={250}
            titleSize="text-[50px] md:text-[80px]"
            subtitleSize="text-[30px] md:text-[50px]"
            captionSize="text-sm md:text-base"
            enableRandomizeOnClick
          />

          {/* Overlay content on top of the tubes */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-20 pointer-events-none">
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Link href="/upload">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#C5757C] to-[#F9AAAD] text-white text-lg font-bold rounded-full hover:shadow-2xl hover:shadow-[#C5757C]/50 transition-all duration-300"
                >
                  <span className="mr-2">Start Free Analysis</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-16 px-6">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(to right, #C5757C 1px, transparent 1px), linear-gradient(to bottom, #F9AAAD 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }} />
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {[
                { number: '98.7%', label: 'Accuracy' },
                { number: '4 Types', label: 'Tumor Classes' },
                { number: '<2 min', label: 'Analysis Time' },
                { number: '24/7', label: 'Availability' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 text-center"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Rural Healthcare Impact */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(to right, #C5757C 1px, transparent 1px), linear-gradient(to bottom, #F9AAAD 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
            }} />
          </div>
          <motion.div
            className="absolute -top-10 -left-10 w-96 h-96 bg-gradient-to-r from-[#C5757C]/20 to-[#F9AAAD]/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div className="mb-14 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-2 mb-3 bg-gradient-to-r from-[#C5757C]/20 to-[#F9AAAD]/20 rounded-full border border-[#C5757C]/30 text-[#C5757C] text-sm font-semibold">
                OUR MISSION
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Healthcare <span className="bg-gradient-to-r from-[#C5757C] to-[#F9AAAD] text-transparent bg-clip-text">For Everyone</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Bringing AI Diagnostics to Underserved Communities</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  In rural India, access to neurologists and specialized medical imaging is severely limited. Tumor Vision bridges this gap by providing AI-powered brain tumor detection that works anywhere with internet connectivity.
                </p>
                <ul className="space-y-3 text-gray-300 mb-6">
                  <li className="flex items-start gap-3"><span className="mt-1 text-[#F9AAAD]">✓</span><span><span className="text-white font-semibold">Early detection:</span> Catch tumors before symptoms become severe</span></li>
                  <li className="flex items-start gap-3"><span className="mt-1 text-[#F9AAAD]">✓</span><span><span className="text-white font-semibold">No specialist needed:</span> AI analysis accessible to any healthcare worker</span></li>
                  <li className="flex items-start gap-3"><span className="mt-1 text-[#F9AAAD]">✓</span><span><span className="text-white font-semibold">Instant results:</span> Get diagnostic insights in under 2 minutes</span></li>
                </ul>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/20 text-[#F9AAAD] border border-emerald-500/30">Rural Healthcare</span>
                  <span className="px-3 py-1 rounded-full text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">AI for Good</span>
                  <span className="px-3 py-1 rounded-full text-xs bg-purple-500/20 text-purple-200 border border-purple-500/30">Accessible Medicine</span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🏥', stat: '70%', label: 'Rural India lacks specialist doctors' },
                  { icon: '⏱️', stat: '<2 min', label: 'Average analysis time' },
                  { icon: '🎯', stat: '98.7%', label: 'Detection accuracy' },
                  { icon: '🌐', stat: '24/7', label: 'Cloud-based availability' },
                ].map((item, i) => (
                  <motion.div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300" whileHover={{ y: -5, scale: 1.02 }}>
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <div className="text-2xl font-bold text-white mb-1">{item.stat}</div>
                    <div className="text-xs text-gray-400">{item.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="relative py-20 px-6">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, #C5757C 1px, transparent 1px), linear-gradient(to bottom, #F9AAAD 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
          </div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-[#C5757C]/30 to-[#F9AAAD]/30 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Why Choose <span className="bg-gradient-to-r from-[#C5757C] to-[#F9AAAD] text-transparent bg-clip-text">Tumor Vision?</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">Advanced AI technology meets healthcare expertise</p>
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
                <motion.div
                  key={index}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#C5757C]/50 hover:bg-white/10 transition-all duration-500"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <motion.div className="text-5xl mb-6" whileHover={{ scale: 1.3, rotate: [0, -15, 15, 0] }}>{feature.icon}</motion.div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, #C5757C 1px, transparent 1px), linear-gradient(to bottom, #F9AAAD 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-2 mb-4 bg-gradient-to-r from-[#C5757C]/20 to-[#F9AAAD]/20 rounded-full border border-[#C5757C]/30 text-[#C5757C] text-sm font-semibold">CLINICAL WORKFLOW</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Diagnostic <span className="bg-gradient-to-r from-[#C5757C] to-[#F9AAAD] text-transparent bg-clip-text">Process</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Upload MRI Scan', description: 'Securely upload your brain MRI scan image.', time: '< 30s' },
                { step: '02', title: 'AI Analysis', description: 'Neural networks analyze for tumor detection and classification.', time: '~ 2 min' },
                { step: '03', title: 'Clinical Report', description: 'Get a report with confidence scores and next steps.', time: 'Instant' },
              ].map((step, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }}>
                  <motion.div className="relative h-full bg-white/5 backdrop-blur-md rounded-2xl p-8 border-2 border-white/10 hover:border-[#C5757C]/50 transition-all" whileHover={{ y: -10 }}>
                    <motion.div className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-[#C5757C] to-[#F9AAAD] rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg border-4 border-[#140E1C]" whileHover={{ scale: 1.15, rotate: 360 }} transition={{ duration: 0.6 }}>
                      {step.step}
                    </motion.div>
                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 bg-[#C5757C]/10 rounded-full border border-[#C5757C]/30">
                      <span className="text-[#C5757C] text-sm font-semibold">{step.time}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{step.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <motion.div className="text-center mt-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Link href="/upload">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-10 py-4 bg-gradient-to-r from-[#C5757C] to-[#F9AAAD] text-white text-lg font-bold rounded-full hover:shadow-2xl hover:shadow-[#C5757C]/50 transition-all duration-300">
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
