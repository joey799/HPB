import { useEffect, useState } from 'react'
import { imagePath } from '../utils/imagePath'
import FlowerBorder from '../components/FlowerBorder'

const rules = [
  { icon: '🃏', text: 'Draai twee kaarten om. Zijn ze gelijk? Dan win je punten!' },
  { icon: '🥃', text: 'Geen match? Dan gaan ze terug en probeer je opnieuw.' },
  { icon: '⭐', text: 'Elke match = +10 punten.' },
  { icon: '🌸', text: "Vind alle paren om het spel te winnen." },
  { icon: '🎁', text: "PS je kan prijzen winnen, maar je zal ze moeten vinden!" }
]

export default function RulesScreen({ onStart }) {
  const [visible, setVisible] = useState(false)
  const [shake, setShake] = useState(false)
  const [rickBig, setRickBig] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  const handleButtonHover = () => {
    setShake(true)
    setTimeout(() => setShake(false), 450)
  }

  const toggleRick = () => {
    setRickBig(prev => !prev)
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">

      {/* BACKGROUND */}
      <div className="absolute inset-0 flex w-full h-full z-0">
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" alt="" />
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" alt="" />
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" alt="" />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* FLOWER BORDER */}
      <FlowerBorder visible={visible} />

      {/* 👇 RICK (klikbaar + grow animatie) */}
      <img
        src={imagePath('photos/Rick.png')}
        alt=""
        onClick={toggleRick}
        className={`
  absolute -top-2 left-1/2 -translate-x-1/2
  cursor-pointer
  transition-all duration-300 ease-in-out
  ${rickBig ? 'w-40 md:w-52 scale-110' : 'w-16 md:w-5'}
`}
      />

      {/* CONTENT */}
      <div
        className="relative z-30 flex flex-col items-center text-center gap-8 py-8 px-4 w-full max-w-4xl"
        style={{
          transition: 'opacity 1s ease, transform 1s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
        }}
      >

        <h2 className="text-5xl md:text-6xl lg:text-7xl font-cursive text-white drop-shadow-lg">
          Hoe werkt het?
        </h2>

        <div
          className="relative bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl self-center"
          style={{ padding: "30px", maxWidth: "900px" }}
        >
          <h3 className="text-2xl md:text-3xl font-cursive text-white/90 text-center mb-6">
            Spelregels — Memory Shot
          </h3>

          <div className="flex flex-col gap-5">
            {rules.map((rule, i) => (
              <div
                key={i}
                className="flex gap-4 items-start text-lg md:text-xl text-white/95"
              >
                <span className="text-2xl">{rule.icon}</span>
                <span>{rule.text}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => { handleButtonHover(); onStart() }}
          className={`relative bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full 
          px-10 py-4 md:px-14 md:py-5 lg:px-16 lg:py-6 text-sm md:text-base lg:text-lg
          font-bold shadow-lg transition-all duration-200 hover:from-pink-600 hover:to-rose-700 
          hover:scale-[1.02] active:scale-[0.98] cursor-pointer border border-white/20 
          flex items-center justify-center min-w-[170px] ${shake ? 'btn-shake' : ''}`}
        >
          <span className="flex items-center gap-2 md:gap-3">
            <span className="relative left-[3px] md:left-[4px]">
              Start het spel!
            </span>
          </span>
        </button>

      </div>
    </div>
  )
}