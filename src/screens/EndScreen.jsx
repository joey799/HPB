import { useEffect, useState } from 'react'
import { imagePath } from '../utils/imagePath'
import FlowerBorder from '../components/FlowerBorder'

const RED_LILY = imagePath('photos/redlilys.png')
const PHOTO_02 = imagePath('photos/02.png')

export default function EndScreen({ result, onReplay, onPhotos }) {
  const { score, shots } = result
  const [visible, setVisible] = useState(false)
  const [floatOffset, setFloatOffset] = useState(0)

  // 👇 NEW: click state voor 02.png
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
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

  const shotComment =
    shots === 0 ? 'Ongelooflijk! Nul shots! 🏆'
    : shots < 4 ? 'Niet slecht gedaan! 😄'
    : 'Nou, lekker genoten zeker? 😂'

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">

      {/* BACKGROUND */}
      <div className="absolute inset-0 flex w-full h-full z-0">
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" />
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" />
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" />
      </div>

      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* ✅ 02.png FIX (zelfde positie + click grow) */}
<img
  src={PHOTO_02}
  alt=""
  onClick={() => setClicked(!clicked)}
  className={`
    absolute bottom-8 right-8 z-[60]
    w-24 md:w-28
    cursor-pointer
    drop-shadow-2xl
    transition-all duration-500 ease-in-out
    ${clicked ? 'scale-150 rotate-6' : 'scale-15 rotate-0'}
  `}
  
/>

      <FlowerBorder visible={visible} />

      {/* SCORE CARD */}
      <div
        className="relative z-30 w-full max-w-3xl mx-auto px-4 py-10 flex flex-col items-center gap-8"
        style={{
          transition: 'opacity 1s ease, transform 1s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
        }}
      >

        <div
          className="relative bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl w-full text-center"
          style={{ padding: "16px 40px", maxWidth: "900px" }}
        >
          <img
            src={RED_LILY}
            className="absolute w-36 z-10"
            style={{
              bottom: '-2.5rem',
              left: '-2rem',
              transform: `rotate(-25deg) translateY(${floatOffset}px)`
            }}
          />

          <img
            src={RED_LILY}
            className="absolute w-36 z-10"
            style={{
              bottom: '-2.5rem',
              right: '-2rem',
              transform: `rotate(25deg) scaleX(-1) translateY(${floatOffset}px)`
            }}
          />

          <h2 className="text-2xl md:text-3xl font-cursive text-white mb-3">
            Gefeliciteerd Elija
          </h2>

          <p className="text-lg md:text-xl font-bold text-white/95">
            Eindstand: {score} punten ⭐
          </p>

          <p className="text-sm md:text-base font-semibold text-white/70 mt-2">
            {shots} shots genomen — {shotComment}
          </p>
        </div>

        {/* BRIEF */}
        <div
          className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl w-full text-left"
          style={{ padding: "30px 50px", maxWidth: "900px" }}
        >
          <p className="font-cursive text-3xl text-white mb-6">Lieve Elija,</p>

          <p className="font-cursive text-lg text-white/90 mb-5">
            Vandaag, 22 april, word jij officieel 18 jaar...
          </p>

          <p className="font-cursive text-lg text-white/90 mb-5">
            18 jaar geleden kwam er iemand de wereld in...
          </p>

          <p className="font-cursive text-lg text-white/90 mb-5">
            Van stapavonden tot late nachtgesprekken...
          </p>

          <p className="font-cursive text-lg text-white/90">
            Geniet van elke seconde van vandaag...
          </p>

          <p className="font-cursive text-2xl text-white mt-6 pt-6 border-t border-white/20">
            Van harte gefeliciteerd! ❤️
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={onPhotos}
            className="min-w-[300px] bg-gradient-to-r from-rose-400 to-pink-600 text-white rounded-full px-10 py-4 font-bold hover:scale-105 transition-all"
          >
            Bekijk 18 jaar herinneringen
          </button>

          <button
            onClick={onReplay}
            className="min-w-[300px] bg-white/20 text-white rounded-full px-10 py-4 font-bold hover:scale-105 transition-all"
          >
            Nog een keer spelen
          </button>
        </div>

      </div>
    </div>
  )
}