'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DropdownOption {
    value: string
    label: string
}

interface AnimatedDropdownProps {
    label: string
    options: DropdownOption[]
    value: string
    onChange: (value: string) => void
    className?: string
}

export default function AnimatedDropdown({ label, options, value, onChange, className = '' }: AnimatedDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const selectedOption = options.find(opt => opt.value === value)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <label className="block text-gray-500 mb-2 font-medium">{label}</label>
            <motion.button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-[#8B7AB5]/20 rounded-xl text-[#1a1a2e] font-medium focus:outline-none focus:ring-2 focus:ring-[#8B7AB5]/30 transition-all relative overflow-hidden group"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#8B7AB5]/10 to-transparent" />
                <div className="flex items-center justify-between relative z-10">
                    <span className="text-left">{selectedOption?.label || 'Select...'}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <svg className="w-5 h-5 text-[#8B7AB5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </motion.div>
                </div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-xl border border-[#8B7AB5]/20 rounded-xl shadow-2xl overflow-hidden"
                    >
                        <div className="relative max-h-64 overflow-y-auto">
                            {options.map((option, index) => (
                                <motion.button
                                    key={option.value}
                                    type="button"
                                    onClick={() => { onChange(option.value); setIsOpen(false); }}
                                    className={`w-full px-4 py-3 text-left transition-all relative group ${value === option.value
                                        ? 'bg-gradient-to-r from-[#8B7AB5]/15 to-[#C4B5DE]/15 text-[#1a1a2e] font-semibold'
                                        : 'text-gray-600 hover:bg-[#8B7AB5]/10 hover:text-[#1a1a2e]'
                                        }`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ x: 4 }}
                                >
                                    {value === option.value && (
                                        <motion.div
                                            layoutId="activeOption"
                                            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8B7AB5] to-[#6B5B95]"
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center">
                                        {option.label}
                                        {value === option.value && (
                                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-2 text-[#8B7AB5]">✓</motion.span>
                                        )}
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
