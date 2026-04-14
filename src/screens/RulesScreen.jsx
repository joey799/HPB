import { useEffect, useState } from 'react'
import { imagePath } from '../utils/imagePath'


const LILY_IMG = imagePath('photos/lilys1.png')

const borderLilies = [
  // --- HOEKEN (Dubbel voor dikte) ---
  { t: '-4rem', l: '-4rem', r: 'auto', b: 'auto', rot: '-20deg', sc: 1.0 },
  { t: '0rem', l: '-2rem', r: 'auto', b: 'auto', rot: '10deg', sc: 0.8 },
  { t: '-4rem', r: '-4rem', l: 'auto', b: 'auto', rot: '70deg', sc: 1.0 },
  { t: '0rem', r: '-2rem', l: 'auto', b: 'auto', rot: '40deg', sc: 0.8 },
  { b: '-4rem', l: '-4rem', t: 'auto', r: 'auto', rot: '-110deg', sc: 1.0 },
  { b: '0rem', l: '-2rem', t: 'auto', r: 'auto', rot: '-140deg', sc: 0.8 },
  { b: '-4rem', r: '-4rem', t: 'auto', l: 'auto', rot: '160deg', sc: 1.0 },
  { b: '0rem', r: '-2rem', t: 'auto', l: 'auto', rot: '130deg', sc: 0.8 },

  // --- BOVENKANT ---
  { t: '-4rem', l: '8%', rot: '15deg', sc: 0.9 },
  { t: '-4rem', l: '18%', rot: '-5deg', sc: 0.85 },
  { t: '-4rem', l: '28%', rot: '10deg', sc: 0.9 },
  { t: '-4rem', l: '38%', rot: '-15deg', sc: 0.85 },
  { t: '-4rem', l: '50%', rot: '5deg', sc: 0.95 },
  { t: '-4rem', l: '62%', rot: '-10deg', sc: 0.85 },
  { t: '-4rem', l: '72%', rot: '15deg', sc: 0.9 },
  { t: '-4rem', l: '82%', rot: '-5deg', sc: 0.85 },
  { t: '-4rem', l: '92%', rot: '20deg', sc: 0.9 },

  // --- ONDERKANT ---
  { b: '-4rem', l: '8%', rot: '-160deg', sc: 0.9 },
  { b: '-4rem', l: '18%', rot: '170deg', sc: 0.85 },
  { b: '-4rem', l: '28%', rot: '-175deg', sc: 0.9 },
  { b: '-4rem', l: '38%', rot: '160deg', sc: 0.85 },
  { b: '-4rem', l: '50%', rot: '-180deg', sc: 0.95 },
  { b: '-4rem', l: '62%', rot: '175deg', sc: 0.85 },
  { b: '-4rem', l: '72%', rot: '-165deg', sc: 0.9 },
  { b: '-4rem', l: '82%', rot: '170deg', sc: 0.85 },
  { b: '-4rem', l: '92%', rot: '-170deg', sc: 0.9 },

  // --- LINKERKANT ---
  { t: '8%', l: '-4rem', rot: '-90deg', sc: 0.9 },
  { t: '20%', l: '-4rem', rot: '-85deg', sc: 0.85 },
  { t: '32%', l: '-4rem', rot: '-95deg', sc: 0.9 },
  { t: '50%', l: '-5rem', rot: '-90deg', sc: 0.95 },
  { t: '68%', l: '-4rem', rot: '-88deg', sc: 0.9 },
  { t: '80%', l: '-4rem', rot: '-85deg', sc: 0.85 },
  { t: '92%', l: '-4rem', rot: '-92deg', sc: 0.9 },

  // --- RECHTERKANT ---
  { t: '8%', r: '-4rem', rot: '90deg', sc: 0.9 },
  { t: '20%', r: '-4rem', rot: '85deg', sc: 0.85 },
  { t: '32%', r: '-4rem', rot: '95deg', sc: 0.9 },
  { t: '50%', r: '-5rem', rot: '90deg', sc: 0.95 },
  { t: '68%', r: '-4rem', rot: '88deg', sc: 0.9 },
  { t: '80%', r: '-4rem', rot: '85deg', sc: 0.85 },
  { t: '92%', r: '-4rem', rot: '92deg', sc: 0.9 },
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

  // 🎯 Trigger shake animatie bij hover
  const handleButtonHover = () => {
    setShake(true)
    setTimeout(() => setShake(false), 450) // Moet matchen met animatie-duration
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      
      {/* 🖼️ ACHTERGROND: 3 foto's naast elkaar */}
      <div className="absolute inset-0 flex w-full h-full z-0">
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" alt="" />
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" alt="" />
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" alt="" />
      </div>

      {/* 🌫️ OVERLAY */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* 🌸 LILY BLOEMEN RAND */}
      {borderLilies.map((pos, i) => (
        <img
          key={i}
          src={LILY_IMG}
          alt=""
          className="absolute w-72 z-20 pointer-events-none" 
          style={{
            top: pos.t,
            left: pos.l,
            bottom: pos.b,
            right: pos.r,
            transform: `rotate(${pos.rot}) scale(${pos.sc})`,
            transition: `opacity 1.5s ease ${i * 0.03}s`,
            opacity: visible ? 0.65 : 0,
          }}
        />
      ))}

      {/* 📝 CONTENT */}
      <div
        className="relative z-30 flex flex-col items-center text-center gap-8 py-10 px-4 w-full max-w-5xl"
        style={{
          transition: 'opacity 1s ease, transform 1s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        
    

        {/* Grote titel */}
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

        {/* 🔘 Startknop MET SHAKE ANIMATIE */}
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


