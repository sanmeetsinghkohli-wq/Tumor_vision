'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLang } from '@/contexts/LanguageContext';

const LANGS = [
    { code: 'en', label: 'EN', full: '🇬🇧 English' },
    { code: 'hi', label: 'हिं', full: '🇮🇳 हिन्दी' },
    { code: 'mr', label: 'मरा', full: '🇮🇳 मराठी' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);
    const { lang: language, setLang, t } = useLang();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    }, [isMobileMenuOpen]);

    const handleLang = (code: string) => {
        setLang(code as 'en' | 'hi' | 'mr');
        setShowLangMenu(false);
    };

    const isActive = (path: string) => pathname === path;
    const currentLang = LANGS.find(l => l.code === language) || LANGS[0];

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/upload', label: t('nav_upload') },
        { href: '/results', label: t('nav_results') },
        { href: '/review', label: t('nav_report') },
        { href: '/treatment', label: t('nav_treatment') },
        { href: '/knowledge', label: 'Knowledge' },
        { href: '/about', label: t('nav_about') },
    ];

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? 'bg-[#140E1C]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30 translate-y-0 opacity-100'
                        : '-translate-y-full opacity-0 pointer-events-none'
                }`}
            >
                <div className="h-[2px] bg-gradient-to-r from-[#462037] via-[#C5757C] to-[#462037]" />

                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C5757C] to-[#683A46] flex items-center justify-center shadow-lg shadow-[#C5757C]/20 group-hover:shadow-[#C5757C]/40 transition-all duration-300">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-white font-bold text-lg leading-none block">Tumor Vision</span>
                            <span className="text-[#C5757C] text-[10px] font-medium tracking-widest uppercase">{t('nav_tagline')}</span>
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href}
                                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive(item.href) ? 'text-white' : 'text-white/60 hover:text-white'
                                }`}>
                                {isActive(item.href) && (
                                    <motion.div layoutId="nav-active"
                                        className="absolute inset-0 rounded-lg bg-white/10 border border-white/20"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />
                                )}
                                <span className="relative z-10">{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        {/* 🌐 Language Selector */}
                        <div className="relative">
                            <button onClick={() => setShowLangMenu(!showLangMenu)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-bold hover:bg-white/20 transition-all">
                                🌐 {currentLang.label} <span className="text-[#C5757C]">▾</span>
                            </button>
                            <AnimatePresence>
                                {showLangMenu && (
                                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                                        className="absolute right-0 top-full mt-1 bg-[#1E1228] border border-white/15 rounded-xl shadow-xl overflow-hidden z-50 min-w-[130px]">
                                        {LANGS.map(l => (
                                            <button key={l.code} onClick={() => handleLang(l.code)}
                                                className={`w-full px-4 py-2 text-left text-sm font-medium transition-colors ${language === l.code ? 'bg-[#C5757C]/20 text-[#F9AAAD] font-semibold' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
                                                {l.full}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/upload" className="hidden lg:inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-[#C5757C] to-[#A1525F] text-white text-sm font-semibold shadow-lg shadow-[#C5757C]/20 hover:shadow-[#C5757C]/40 hover:scale-105 transition-all duration-200">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            {t('nav_new_scan')}
                        </Link>

                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg bg-white/10 border border-white/20 text-white">
                            <motion.div animate={isMobileMenuOpen ? 'open' : 'closed'} className="w-5 h-5 flex flex-col justify-center gap-1">
                                <motion.span className="block w-5 h-0.5 bg-white rounded-full" variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 6 } }} />
                                <motion.span className="block w-5 h-0.5 bg-white rounded-full" variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }} />
                                <motion.span className="block w-5 h-0.5 bg-white rounded-full" variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -6 } }} />
                            </motion.div>
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)} />
                        <motion.div className="fixed top-0 left-0 h-full w-72 z-50 lg:hidden"
                            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}>
                            <div className="h-full bg-[#140E1C] border-r border-white/10 flex flex-col shadow-xl">
                                <div className="px-6 py-8 border-b border-[#C5757C]/15">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C5757C] to-[#683A46] flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-white font-bold">Tumor Vision</p>
                                            <p className="text-[#C5757C] text-[10px] tracking-widest uppercase">{t('nav_tagline')}</p>
                                        </div>
                                    </div>
                                    {/* Mobile language picker */}
                                    <div className="flex gap-2">
                                        {LANGS.map(l => (
                                            <button key={l.code} onClick={() => handleLang(l.code)}
                                                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${language === l.code ? 'bg-gradient-to-r from-[#C5757C] to-[#F9AAAD] text-white' : 'bg-[#F9AAAD]/20 text-[#683A46]'}`}>
                                                {l.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                                    {navItems.map((item) => (
                                        <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive(item.href) ? 'bg-white/10 text-white border border-white/20' : 'text-white/60 hover:text-white hover:bg-white/10'}`}>
                                            <span className="w-5 text-center">→</span> {item.label}
                                        </Link>
                                    ))}
                                </nav>

                                <div className="px-6 py-6 border-t border-[#C5757C]/15">
                                    <Link href="/upload" onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#C5757C] to-[#A1525F] text-white text-sm font-bold">
                                        {t('nav_new_scan')}
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
