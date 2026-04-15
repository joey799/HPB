import { useState, useEffect, useCallback } from 'react'
import Card from '../components/Card'
import { imagePath } from '../utils/imagePath'
import FlowerBorder from '../components/FlowerBorder'

const PHOTOS = Array.from({ length: 9 }, (_, i) => imagePath(`photos/foto${i + 1}.jpg`))

const ANIMATIONS = `
@keyframes shake {
  0%,100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}
.animate-shake { animation: shake 0.4s ease-in-out; }

@keyframes pop {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-pop { animation: pop 0.3s ease-out; }
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
  const [showToast, setShowToast] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setCards(shuffle(PHOTOS))
    setTimeout(() => setVisible(true), 100)
  }, [])

  const handleFlip = useCallback((id) => {
    if (lock || flipped.includes(id) || matched.includes(id)) return

    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setLock(true)
      const [a, b] = newFlipped.map(fid => cards.find(c => c.id === fid))

      setTimeout(() => {
        if (a.src === b.src) {
          const newMatched = [...matched, a.id, b.id]
          setMatched(newMatched)
          const newScore = score + 10
          setScore(newScore)
          setToast('Match +10 🎉')
          setShowToast(true)
          if (newMatched.length === cards.length) {
            setTimeout(() => onEnd({ score: newScore, shots }), 800)
          }
        } else {
          setShots(shots + 1)
          setToast('Geen match! Shot 🍻')
          setShowToast(true)
        }
        setFlipped([])
        setLock(false)
        setTimeout(() => setShowToast(false), 1200)
      }, 700)
    }
  }, [flipped, matched, cards, score, shots, lock, onEnd])

  const pairs = matched.length / 2

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <style>{ANIMATIONS}</style>

      {/* BACKGROUND */}
      <div className="absolute inset-0 flex z-0">
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" alt="" />
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" alt="" />
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" alt="" />
      </div>
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* ✅ BLOEMENRAND */}
      <FlowerBorder visible={visible} />

      {/* MB LOGO */}
      <img src={imagePath('photos/mb.png')} className="absolute bottom-[-2rem] left-[-2rem] w-36 z-40" alt="" />

      {/* CONTENT */}
      <div className="relative z-30 flex flex-col items-center gap-10 w-full px-4">
        <div className="flex gap-6">
          {[
            { label: 'Punten', value: score },
            { label: 'Shots', value: shots },
            { label: 'Paren', value: `${pairs}/9` },
          ].map((s, i) => (
            <div key={i} className="min-w-[160px] px-10 py-6 rounded-2xl bg-white/20 backdrop-blur-2xl border border-white/30 shadow-xl text-center text-white flex flex-col items-center justify-center gap-1 hover:scale-[1.03] transition-all duration-200">
              <div className="text-sm opacity-70 tracking-wide">{s.label}</div>
              <div className="text-4xl font-bold leading-none">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-6 gap-8 max-w-6xl">
          {cards.map(card => (
            <Card key={card.id} photoSrc={card.src} isFlipped={flipped.includes(card.id)} isMatched={matched.includes(card.id)} onClick={() => handleFlip(card.id)} />
          ))}
        </div>

        <button onClick={() => onEnd({ score, shots })} className="px-10 py-4 rounded-full bg-white/20 border border-white/30 text-white backdrop-blur-xl hover:bg-white/30 transition-all">
          Stoppen 🏆
        </button>
      </div>

      {showToast && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-rose-600 text-white px-12 py-6 rounded-full text-2xl font-bold shadow-lg border border-white/20 backdrop-blur-xl animate-pop z-[999]">
          {toast}
        </div>
      )}
    </div>
  )
}