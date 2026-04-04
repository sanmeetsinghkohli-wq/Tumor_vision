'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import NavHeader from '@/components/ui/nav-header';

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
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? 'bg-white/80 backdrop-blur-xl border-b border-[#528DCB]/20 shadow-lg shadow-blue-200/30 translate-y-0 opacity-100'
                        : '-translate-y-full opacity-0 pointer-events-none'
                }`}
            >
                <div className="h-[2px] bg-gradient-to-r from-[#A4BFDB] via-[#528DCB] to-[#A4BFDB]" />

                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
                        <Image src="/logo.jpeg" alt="Tumor Vision" width={36} height={36} className="rounded-xl shadow-lg shadow-[#528DCB]/20 group-hover:shadow-[#528DCB]/40 transition-all duration-300" />
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden lg:block">
                        <NavHeader items={navItems} />
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                        {/* Language Selector */}
                        <div className="relative">
                            <button onClick={() => setShowLangMenu(!showLangMenu)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#528DCB]/10 border border-[#528DCB]/20 text-[#1a1a2e] text-xs font-bold hover:bg-[#528DCB]/20 transition-all">
                                🌐 {currentLang.label} <span className="text-[#528DCB]">▾</span>
                            </button>
                            <AnimatePresence>
                                {showLangMenu && (
                                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                                        className="absolute right-0 top-full mt-1 bg-white border border-[#528DCB]/20 rounded-xl shadow-xl overflow-hidden z-50 min-w-[130px]">
                                        {LANGS.map(l => (
                                            <button key={l.code} onClick={() => handleLang(l.code)}
                                                className={`w-full px-4 py-2 text-left text-sm font-medium transition-colors ${language === l.code ? 'bg-[#528DCB]/20 text-[#4B78A0] font-semibold' : 'text-[#6A7F92] hover:bg-[#528DCB]/10 hover:text-[#1a1a2e]'}`}>
                                                {l.full}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg bg-[#528DCB]/10 border border-[#528DCB]/20 text-[#1a1a2e]">
                            <motion.div animate={isMobileMenuOpen ? 'open' : 'closed'} className="w-5 h-5 flex flex-col justify-center gap-1">
                                <motion.span className="block w-5 h-0.5 bg-[#1a1a2e] rounded-full" variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 6 } }} />
                                <motion.span className="block w-5 h-0.5 bg-[#1a1a2e] rounded-full" variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }} />
                                <motion.span className="block w-5 h-0.5 bg-[#1a1a2e] rounded-full" variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -6 } }} />
                            </motion.div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)} />
                        <motion.div className="fixed top-0 left-0 h-full w-72 z-50 lg:hidden"
                            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}>
                            <div className="h-full bg-white border-r border-[#528DCB]/20 flex flex-col shadow-xl">
                                <div className="px-6 py-8 border-b border-[#528DCB]/15">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Image src="/logo.jpeg" alt="Tumor Vision" width={36} height={36} className="rounded-xl" />
                                        <div>
                                            <p className="text-[#1a1a2e] font-bold">Tumor Vision</p>
                                            <p className="text-[#528DCB] text-[10px] tracking-widest uppercase">{t('nav_tagline')}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {LANGS.map(l => (
                                            <button key={l.code} onClick={() => handleLang(l.code)}
                                                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${language === l.code ? 'bg-gradient-to-r from-[#528DCB] to-[#A4BFDB] text-white' : 'bg-[#528DCB]/10 text-[#6A7F92]'}`}>
                                                {l.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                                    {navItems.map((item) => (
                                        <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive(item.href) ? 'bg-[#528DCB]/10 text-[#1a1a2e] border border-[#528DCB]/20' : 'text-[#6A7F92] hover:text-[#1a1a2e] hover:bg-[#528DCB]/10'}`}>
                                            <span className="w-5 text-center">→</span> {item.label}
                                        </Link>
                                    ))}
                                </nav>

                                <div className="px-6 py-6 border-t border-[#528DCB]/15">
                                    <Link href="/upload" onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#528DCB] to-[#4B78A0] text-white text-sm font-bold">
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
