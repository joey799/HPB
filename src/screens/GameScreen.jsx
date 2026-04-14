import { useState, useEffect, useCallback } from 'react'
import Card from '../components/Card'
import { imagePath } from '../utils/imagePath'


const LILY_IMG = 'public/photos/lilys1.png'
const PHOTOS = Array.from({ length: 9 }, (_, i) => `public/photos/foto${i + 1}.jpg`)

const borderLilies = [
  { t: '-4rem', l: '-4rem', r: 'auto', b: 'auto', rot: '-20deg', sc: 1.0 },
  { t: '0rem', l: '-2rem', r: 'auto', b: 'auto', rot: '10deg', sc: 0.8 },
  { t: '-4rem', r: '-4rem', l: 'auto', b: 'auto', rot: '70deg', sc: 1.0 },
  { t: '0rem', r: '-2rem', l: 'auto', b: 'auto', rot: '40deg', sc: 0.8 },
  { b: '-4rem', l: '-4rem', t: 'auto', r: 'auto', rot: '-110deg', sc: 1.0 },
  { b: '0rem', l: '-2rem', t: 'auto', r: 'auto', rot: '-140deg', sc: 0.8 },
  { b: '-4rem', r: '-4rem', t: 'auto', l: 'auto', rot: '160deg', sc: 1.0 },
  { b: '0rem', r: '-2rem', t: 'auto', l: 'auto', rot: '130deg', sc: 0.8 },
  { t: '-4rem', l: '8%', rot: '15deg', sc: 0.9 },
  { t: '-4rem', l: '18%', rot: '-5deg', sc: 0.85 },
  { t: '-4rem', l: '28%', rot: '10deg', sc: 0.9 },
  { t: '-4rem', l: '38%', rot: '-15deg', sc: 0.85 },
  { t: '-4rem', l: '50%', rot: '5deg', sc: 0.95 },
  { t: '-4rem', l: '62%', rot: '-10deg', sc: 0.85 },
  { t: '-4rem', l: '72%', rot: '15deg', sc: 0.9 },
  { t: '-4rem', l: '82%', rot: '-5deg', sc: 0.85 },
  { t: '-4rem', l: '92%', rot: '20deg', sc: 0.9 },
  { b: '-4rem', l: '8%', rot: '-160deg', sc: 0.9 },
  { b: '-4rem', l: '18%', rot: '170deg', sc: 0.85 },
  { b: '-4rem', l: '28%', rot: '-175deg', sc: 0.9 },
  { b: '-4rem', l: '38%', rot: '160deg', sc: 0.85 },
  { b: '-4rem', l: '50%', rot: '-180deg', sc: 0.95 },
  { b: '-4rem', l: '62%', rot: '175deg', sc: 0.85 },
  { b: '-4rem', l: '72%', rot: '-165deg', sc: 0.9 },
  { b: '-4rem', l: '82%', rot: '170deg', sc: 0.85 },
  { b: '-4rem', l: '92%', rot: '-170deg', sc: 0.9 },
  { t: '8%', l: '-4rem', rot: '-90deg', sc: 0.9 },
  { t: '20%', l: '-4rem', rot: '-85deg', sc: 0.85 },
  { t: '32%', l: '-4rem', rot: '-95deg', sc: 0.9 },
  { t: '50%', l: '-5rem', rot: '-90deg', sc: 0.95 },
  { t: '68%', l: '-4rem', rot: '-88deg', sc: 0.9 },
  { t: '80%', l: '-4rem', rot: '-85deg', sc: 0.85 },
  { t: '92%', l: '-4rem', rot: '-92deg', sc: 0.9 },
  { t: '8%', r: '-4rem', rot: '90deg', sc: 0.9 },
  { t: '20%', r: '-4rem', rot: '85deg', sc: 0.85 },
  { t: '32%', r: '-4rem', rot: '95deg', sc: 0.9 },
  { t: '50%', r: '-5rem', rot: '90deg', sc: 0.95 },
  { t: '68%', r: '-4rem', rot: '88deg', sc: 0.9 },
  { t: '80%', r: '-4rem', rot: '85deg', sc: 0.85 },
  { t: '92%', r: '-4rem', rot: '92deg', sc: 0.9 },
]

const ANIMATIONS = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px) scale(1.1); }
    40% { transform: translateX(8px) scale(1.1); }
    60% { transform: translateX(-5px) scale(1.05); }
    80% { transform: translateX(5px) scale(1.05); }
  }
  @keyframes pulse-large {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.9; box-shadow: 0 0 40px rgba(244, 63, 94, 0.9); }
    100% { transform: scale(1); opacity: 1; }
  }
  .animate-shake { animation: shake 0.4s ease-in-out; }
  .animate-pulse-large { animation: pulse-large 0.6s ease-out; }
`

function shuffle(arr) {
  return [...arr, ...arr].map((src, i) => ({ id: i, src })).sort(() => Math.random() - 0.5)
}

export default function GameScreen({ onEnd }) {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [score, setScore] = useState(0)
  const [shots, setShots] = useState(0)
  const [lock, setLock] = useState(false)
  const [toast, setToast] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [visible, setVisible] = useState(false)
  const [animatingStat, setAnimatingStat] = useState(null)
  const [shotAlert, setShotAlert] = useState(false)

  useEffect(() => {
    setCards(shuffle(PHOTOS))
    setTimeout(() => setVisible(true), 100)
  }, [])

  const triggerStatAnimation = (statName, isShot = false) => {
    setAnimatingStat(statName)
    if (isShot) setShotAlert(true)
    setTimeout(() => {
      setAnimatingStat(null)
      setShotAlert(false)
    }, 600)
  }

  const showToast = (msg) => {
    setToast(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 4000)
  }

  const handleFlip = useCallback((id) => {
    if (lock) return
    if (flipped.includes(id)) return
    if (matched.includes(id)) return

    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setLock(true)
      const [a, b] = newFlipped.map((fid) => cards.find((c) => c.id === fid))

      setTimeout(() => {
        if (a.src === b.src) {
          const newMatched = [...matched, a.id, b.id]
          setMatched(newMatched)
          const newScore = score + 10
          setScore(newScore)
          triggerStatAnimation('score')
          showToast('Match! +10 punten 🎉')
          if (newMatched.length === cards.length) setTimeout(() => onEnd({ score: newScore, shots }), 700)
        } else {
          const newShots = shots + 1
          setShots(newShots)
          triggerStatAnimation('shots', true)
          showToast('Geen match! Shot nemen!')
        }
        setFlipped([])
        setLock(false)
      }, 800)
    }
  }, [lock, flipped, matched, cards, score, shots, onEnd])

  const pairs = matched.length / 2
  const getStatAnimationClass = (statName) => {
    if (animatingStat !== statName) return ''
    if (statName === 'shots' && shotAlert) return 'animate-pulse-large'
    return 'animate-shake'
  }

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

      {/* ✅ MB.PNG LOGO - Links onder, offscreen & groter */}
      <img
        src={imagePath('public/photos/mb.png')}
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

        {/* 🏁 KNOP NAAR EINDSCHERM */}
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