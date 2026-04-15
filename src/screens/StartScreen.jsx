import { useEffect, useState } from 'react'
import { imagePath } from '../utils/imagePath'
import FlowerBorder from '../components/FlowerBorder'

const RED_LILY = imagePath('photos/redlilys.png')

export default function StartScreen({ onNext }) {
  const [visible, setVisible] = useState(false)
  const [shake, setShake] = useState(false)
  const [floatOffset, setFloatOffset] = useState(0)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let frame
    let start = null
    const animate = (ts) => {
      if (!start) start = ts
      const t = (ts - start) / 1000
      setFloatOffset(Math.sin(t * 0.8) * 6)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg) scale(1); }
          15% { transform: rotate(-6deg) scale(1.08); }
          30% { transform: rotate(6deg) scale(1.12); }
          45% { transform: rotate(-4deg) scale(1.1); }
          60% { transform: rotate(4deg) scale(1.08); }
          75% { transform: rotate(-2deg) scale(1.05); }
        }
        @keyframes smirnoff-shake {
          0%, 100% { transform: rotate(0deg) scale(1); }
          15% { transform: rotate(-10deg) scale(1.2); }
          30% { transform: rotate(10deg) scale(1.3); }
          45% { transform: rotate(-6deg) scale(1.25); }
          60% { transform: rotate(6deg) scale(1.2); }
          75% { transform: rotate(-3deg) scale(1.1); }
        }
        .btn-shake { animation: shake 0.6s ease; }
        .smirnoff-shake { animation: smirnoff-shake 0.6s ease; }
      `}</style>

      {/* Achtergrond */}
      <div className="absolute inset-0 flex w-full h-full z-0">
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" alt="" />
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" alt="" />
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" alt="" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* ✅ BLOEMENRAND */}
      <FlowerBorder visible={visible} />

      {/* Content */}
      <div
        className="relative z-30 flex flex-col items-center text-center gap-8 py-8 px-4 w-full max-w-4xl"
        style={{
          transition: 'opacity 1s ease, transform 1s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        <div 
          className="relative bg-white/20 backdrop-blur-md border border-white/30 
          rounded-3xl shadow-2xl self-center"
          style={{ padding: "50px", maxWidth: "900px" }}
        >  
          <img src={RED_LILY} alt="" className="absolute pointer-events-none w-24 md:w-32 z-40"
            style={{ bottom: '-2rem', left: '-2rem', transform: `rotate(-30deg) translateY(${floatOffset}px)`, transition: 'opacity 1s ease 0.5s', opacity: visible ? 1 : 0 }} />
          <img src={RED_LILY} alt="" className="absolute pointer-events-none w-24 md:w-32 z-40"
            style={{ bottom: '-2rem', right: '-2rem', transform: `rotate(30deg) scaleX(-1) translateY(${floatOffset}px)`, transition: 'opacity 1s ease 0.65s', opacity: visible ? 1 : 0 }} />

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-cursive text-white mb-4 tracking-tight leading-tight drop-shadow-lg">
            Happy Birthday Elija!
          </h1>
          <p className="text-2xl md:text-3xl font-cursive text-white/90 tracking-wide">
            22 april — 18 jaar!
          </p>
        </div>

        <button
          onClick={onNext}
          className={`relative bg-gradient-to-r from-pink-500 to-rose-600 text-white 
          rounded-full px-10 py-4 md:px-14 md:py-5 lg:px-16 lg:py-6
          text-sm md:text-base lg:text-lg font-bold shadow-lg transition-all duration-200
          hover:from-pink-600 hover:to-rose-700 hover:scale-[1.02] active:scale-[0.98]
          cursor-pointer border border-white/20 flex items-center justify-center
          ${shake ? 'btn-shake' : ''}`}
        >
          <span className="flex items-center gap-2 md:gap-3">
            <span className="relative left-[3px] md:left-[4px]">
              Speel het Memory Shot Spel
            </span>
            <img src={imagePath('photos/smirnoff.jpg')} alt="Smirnoff"
              className={`w-7 h-7 md:w-9 md:h-9 object-contain drop-shadow-md 
              relative -left-[2px] md:-left-[3px] ${shake ? 'smirnoff-shake' : ''}`} />
          </span>
        </button>
      </div>
    </div>
  )
}