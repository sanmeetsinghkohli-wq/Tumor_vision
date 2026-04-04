'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { type LangCode, type TranslationKey, t as translate } from '@/lib/translations'

interface LanguageContextType {
  lang: LangCode
  setLang: (l: LangCode) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('en')

  useEffect(() => {
    const saved = (localStorage.getItem('appLanguage') || 'en') as LangCode
    setLangState(saved)
  }, [])

  const setLang = (l: LangCode) => {
    setLangState(l)
    localStorage.setItem('appLanguage', l)
  }

  const t = (key: TranslationKey) => translate(lang, key)

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
