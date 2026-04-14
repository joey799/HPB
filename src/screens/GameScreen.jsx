import { useState, useEffect, useCallback } from 'react'
import Card from '../components/Card'
import { imagePath } from '../utils/imagePath'

const LILY_IMG = imagePath('photos/lilys1.png')
const PHOTOS = Array.from({ length: 9 }, (_, i) => imagePath(`photos/foto${i + 1}.jpg`))

// ... (borderLilies en ANIMATIONS hetzelfde)

export default function GameScreen({ onEnd }) {
  // ... (state en effects hetzelfde)

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      <style>{ANIMATIONS}</style>
      
      {/* Achtergrond */}
      <div className="absolute inset-0 flex w-full h-full z-0">
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" alt="" />
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" alt="" />
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" alt="" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* Bloemenrand */}
      {borderLilies.map((pos, i) => (
        <img key={i} src={LILY_IMG} alt="" className="absolute w-72 z-20 pointer-events-none" 
          style={{ top: pos.t, left: pos.l, bottom: pos.b, right: pos.r, transform: `rotate(${pos.rot}) scale(${pos.sc})`, transition: `opacity 1.5s ease ${i * 0.03}s`, opacity: visible ? 0.65 : 0 }} 
        />
      ))}

      {/* MB Logo */}
      <img
        src={imagePath('photos/mb.png')}
        alt="MB Logo"
        className="absolute pointer-events-none opacity-95 hover:opacity-100 transition-opacity duration-300 drop-shadow-2xl"
        style={{
          bottom: '-2rem',
          left: '-2rem',
          width: '9rem',
          transform: 'rotate(-10deg)',
          zIndex: 40,
        }}
      />

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-center gap-8 py-6 px-4 w-full max-w-[95vw]"
        style={{ transition: 'opacity 1s ease, transform 1s ease', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}>
        
        {/* Stats Bar */}
        <div className="flex justify-center w-full gap-6 md:gap-10">
          {[
            { key: 'score', label: 'Punten', value: score, color: 'from-green-400 to-emerald-500' },
            { key: 'shots', label: 'Shots', value: shots, color: 'from-rose-400 to-pink-500' },
            { key: 'pairs', label: 'Paren', value: `${pairs}/9`, color: 'from-purple-400 to-violet-500' },
          ].map((s) => (
            <div
              key={s.key}
              className={`flex-1 max-w-md bg-white/20 backdrop-blur-md border border-white/40 rounded-3xl py-6 px-8 shadow-2xl transition-all duration-300 flex flex-col items-center ${getStatAnimationClass(s.key)}`}
            >
              <span className="text-xl md:text-2xl text-white/90 font-bold mb-3">
                {s.label}
              </span>
              <p className={`text-6xl md:text-5xl font-black text-white drop-shadow-lg bg-gradient-to-r ${s.color} bg-clip-text text-transparent leading-none`}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-6 gap-8 md:gap-10 w-full max-w-7xl">
          {cards.map((card) => (
            <Card key={card.id} photoSrc={card.src} isFlipped={flipped.includes(card.id)} isMatched={matched.includes(card.id)} onClick={() => handleFlip(card.id)} />
          ))}
        </div>

        {/* Knop naar eind */}
        <button
          onClick={() => onEnd({ score, shots })}
          className="mt-4 bg-white/20 hover:bg-white/30 text-white rounded-full px-10 py-4 text-xl font-bold shadow-xl transition-all border-2 border-white/40 hover:scale-105 active:scale-95"
        >
          Stoppen & Naar Eindresultaten 🏆
        </button>

        {/* Toast */}
        {toastVisible && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-[2.5rem] px-12 py-6 text-3xl font-black shadow-[0_0_60px_rgba(244,63,94,0.6)] z-50 pointer-events-none border-4 border-white/40 backdrop-blur-md animate-bounce" style={{ animationDuration: '0.4s', animationIterationCount: '2', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            {toast}
          </div>
        )}
      </div>
    </div>
  )
}