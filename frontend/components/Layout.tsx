'use client';

import Navbar from './Navbar';
import { usePathname } from 'next/navigation';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    return (
        <div className="min-h-screen flex flex-col bg-[#140E1C] overflow-x-hidden">
            <Navbar />
            <main className={`flex-grow ${isHomePage ? '' : 'pt-20'}`}>{children}</main>
            <footer className="relative text-white border-t border-white/5">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `
                            linear-gradient(to right, #C5757C 1px, transparent 1px),
                            linear-gradient(to bottom, #F9AAAD 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-r from-[#C5757C]/20 to-[#F9AAAD]/20 rounded-full blur-3xl"></div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
                        <div className="text-center sm:text-left">
                            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#C5757C] to-[#F9AAAD] text-transparent bg-clip-text mb-2 sm:mb-3">
                                Tumor Vision
                            </h3>
                            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                                AI-powered brain tumor detection for accurate and reliable medical diagnostics — bridging healthcare gaps in underserved communities.
                            </p>
                        </div>

                        <div className="text-center sm:text-left">
                            <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Quick Links</h4>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                                <li><a href="/" className="text-gray-400 hover:text-[#C5757C] transition-colors">Home</a></li>
                                <li><a href="/upload" className="text-gray-400 hover:text-[#C5757C] transition-colors">Upload Scan</a></li>
                                <li><a href="/treatment" className="text-gray-400 hover:text-[#C5757C] transition-colors">Treatment</a></li>
                                <li><a href="/about" className="text-gray-400 hover:text-[#C5757C] transition-colors">About</a></li>
                            </ul>
                        </div>

                        <div className="text-center sm:text-left">
                            <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Powered By</h4>
                            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2 sm:mb-3">
                                <div className="w-2 h-2 bg-[#C5757C] rounded-full animate-pulse"></div>
                                <p className="text-gray-400 text-xs sm:text-sm">Azure Custom Vision AI</p>
                            </div>
                            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2 sm:mb-3">
                                <div className="w-2 h-2 bg-[#F9AAAD] rounded-full animate-pulse delay-150"></div>
                                <p className="text-gray-400 text-xs sm:text-sm">Next.js & React</p>
                            </div>
                            <div className="flex items-center justify-center sm:justify-start space-x-2">
                                <div className="w-2 h-2 bg-[#683A46] rounded-full animate-pulse delay-300"></div>
                                <p className="text-gray-400 text-xs sm:text-sm">Deep Learning Models</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4 sm:mb-6"></div>

                    <div className="flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-gray-400 gap-3">
                        <p className="text-center md:text-left">&copy; 2026 Tumor Vision. All rights reserved.</p>
                        <div className="flex items-center space-x-2">
                            <span className="flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#C5757C] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5757C]"></span>
                            </span>
                            <span className="text-gray-300">AI-Powered Diagnostics</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
