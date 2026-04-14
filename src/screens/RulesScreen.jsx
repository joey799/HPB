import { useEffect, useState } from 'react'
import { imagePath } from '../utils/imagePath'

const LILY_IMG = imagePath('photos/lilys1.png')

const borderLilies = [
  // ... (zelfde array als hierboven)
]

const rules = [
  { icon: '🃏', text: 'Draai twee kaarten om. Zijn ze gelijk? Dan win je punten en mag je doorgaan!' },
  { icon: '🥃', text: 'Geen match? Pech! De kaarten gaan terug en je neemt een shot. Geintje... of niet?' },
  { icon: '⭐', text: 'Elke match = +10 punten. Probeer zo hoog mogelijk te scoren!' },
  { icon: '🌸', text: "Vind alle 8 paren om het spel te winnen en Elija's speciale bericht en foto's te zien!" },
  { icon: '🎁', text: "ps je kan prijzen winnen, op sommige paginas is er iets verstoppt vind ze en je wint ze!" },
]

export default function RulesScreen({ onStart }) {
  const [visible, setVisible] = useState(false)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  const handleButtonHover = () => {
    setShake(true)
    setTimeout(() => setShake(false), 450)
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
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
        <img
          key={i}
          src={LILY_IMG}
          alt=""
          className="absolute w-72 z-20 pointer-events-none" 
          style={{
            top: pos.t, left: pos.l, bottom: pos.b, right: pos.r,
            transform: `rotate(${pos.rot}) scale(${pos.sc})`,
            transition: `opacity 1.5s ease ${i * 0.03}s`,
            opacity: visible ? 0.65 : 0,
          }}
        />
      ))}

      {/* Content */}
      <div
        className="relative z-30 flex flex-col items-center text-center gap-8 py-10 px-4 w-full max-w-5xl"
        style={{
          transition: 'opacity 1s ease, transform 1s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        <h2 className="text-5xl md:text-6xl font-black text-white drop-shadow-lg">
          Hoe werkt het?
        </h2>

        {/* Regelbox */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 text-left w-full shadow-2xl max-w-3xl">
          <h3 className="font-bold text-2xl text-white mb-6 text-center drop-shadow-sm">
            Spelregels — Memory Shot 
          </h3>
          <div className="flex flex-col gap-5">
            {rules.map((rule, i) => (
              <div key={i} className="flex gap-4 items-start text-lg text-white/95 leading-relaxed">
                <span className="text-2xl shrink-0 mt-1">{rule.icon}</span>
                <span>{rule.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Knop */}
        <button
          onClick={() => {
            handleButtonHover()
            onStart()
          }}
          className={`bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full px-14 py-6 text-xl font-bold shadow-xl transition-colors hover:from-pink-600 hover:to-rose-700 cursor-pointer border-2 border-white/20 flex items-center justify-center gap-3 ${shake ? 'btn-shake' : ''}`}
        >
          Start het spel! 🎉
        </button>
      </div>
    </div>
  )
}