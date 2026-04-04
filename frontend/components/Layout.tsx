'use client';

import Navbar from './Navbar';
import { usePathname } from 'next/navigation';
import PageBackground from './ui/background-components';
import { useLang } from '@/contexts/LanguageContext';
import AIChatBot from './ui/ai-chat';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const { t } = useLang();

    return (
        <PageBackground className="flex flex-col overflow-x-hidden">
            <Navbar />
            <main className={`flex-grow ${isHomePage ? '' : 'pt-20'}`}>{children}</main>
            <footer className="relative border-t border-[#528DCB]/15">
                <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
                        <div className="text-center sm:text-left">
                            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#528DCB] to-[#4B78A0] text-transparent bg-clip-text mb-2 sm:mb-3">
                                Tumor Vision
                            </h3>
                            <p className="text-[#6A7F92] text-xs sm:text-sm leading-relaxed">
                                AI-powered brain tumor detection for accurate and reliable medical diagnostics — bridging healthcare gaps in underserved communities.
                            </p>
                        </div>

                        <div className="text-center sm:text-left">
                            <h4 className="text-base sm:text-lg font-semibold text-[#1a1a2e] mb-2 sm:mb-3">{t('footer_quick_links')}</h4>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                                <li><a href="/" className="text-[#6A7F92] hover:text-[#528DCB] transition-colors">Home</a></li>
                                <li><a href="/upload" className="text-[#6A7F92] hover:text-[#528DCB] transition-colors">Upload Scan</a></li>
                                <li><a href="/treatment" className="text-[#6A7F92] hover:text-[#528DCB] transition-colors">Treatment</a></li>
                                <li><a href="/about" className="text-[#6A7F92] hover:text-[#528DCB] transition-colors">About</a></li>
                            </ul>
                        </div>

                        <div className="text-center sm:text-left">
                            <h4 className="text-base sm:text-lg font-semibold text-[#1a1a2e] mb-2 sm:mb-3">{t('footer_powered_by')}</h4>
                            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2 sm:mb-3">
                                <div className="w-2 h-2 bg-[#528DCB] rounded-full animate-pulse"></div>
                                <p className="text-[#6A7F92] text-xs sm:text-sm">Azure Custom Vision AI</p>
                            </div>
                            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2 sm:mb-3">
                                <div className="w-2 h-2 bg-[#A4BFDB] rounded-full animate-pulse delay-150"></div>
                                <p className="text-[#6A7F92] text-xs sm:text-sm">Next.js & React</p>
                            </div>
                            <div className="flex items-center justify-center sm:justify-start space-x-2">
                                <div className="w-2 h-2 bg-[#4B78A0] rounded-full animate-pulse delay-300"></div>
                                <p className="text-[#6A7F92] text-xs sm:text-sm">Deep Learning Models</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-[#528DCB]/30 to-transparent mb-4 sm:mb-6"></div>

                    <div className="flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-[#6A7F92] gap-3">
                        <p className="text-center md:text-left">{t('footer_rights')}</p>
                        <div className="flex items-center space-x-2">
                            <span className="flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#528DCB] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#528DCB]"></span>
                            </span>
                            <span className="text-[#6A7F92]">{t('footer_powered')}</span>
                        </div>
                    </div>
                </div>
            </footer>
            <AIChatBot />
        </PageBackground>
    );
}
