import { useEffect, useState } from 'react'
import { imagePath } from '../utils/imagePath'
import FlowerBorder from '../components/FlowerBorder'

const RED_LILY = imagePath('photos/redlilys.png')
const CAMERA = imagePath('photos/cam.png')
const TAKIS = imagePath('photos/takis.png')

const PHOTOS = Array.from({ length: 18 }, (_, i) => ({
  src: imagePath(`photos/foto${i + 1}.jpg`),
  year: 2007 + i,
  age: i + 1,
}))

export default function PhotosScreen({ onBack }) {
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [floatOffset, setFloatOffset] = useState(0)
  const [takisClicked, setTakisClicked] = useState(false)

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

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">

      {/* BACKGROUND */}
      <div className="absolute inset-0 flex w-full h-full z-0">
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" alt="" />
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" alt="" />
        <img src={imagePath('photos/elija.jpg')} className="w-1/3 h-full object-cover" alt="" />
      </div>

      <div className="absolute inset-0 bg-black/40 z-0" />

      <FlowerBorder visible={visible} />

      {/* 👉 TAKIS EASTER EGG (RECHTSBOVEN) */}
      <img
        src={TAKIS}
        alt=""
        onClick={() => setTakisClicked(!takisClicked)}
        className={`
          absolute top-6 right-6 z-40
          w-10 md:w-12
          cursor-pointer
          drop-shadow-2xl
          transition-all duration-300 ease-in-out
          ${takisClicked ? 'scale-300 rotate-12' : 'scale-18 rotate-0'}
        `}
      />

      {/* LIGHTBOX */}
      {selected !== null && (
        <div className="fixed inset-0 z-50">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />

          {/* CONTENT */}
          <div className="relative h-full w-full flex flex-col items-center justify-center p-6 z-10">

            <div
              className="relative max-w-lg w-full bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={PHOTOS[selected].src}
                alt={`Foto ${selected + 1}`}
                className="w-full object-cover max-h-96"
              />

              <div className="p-5 text-center">
                <p className="font-cursive text-3xl text-white mb-1">
                  {selected === 0 ? '🍼 Jaar 1' : `🎂 ${PHOTOS[selected].age} jaar`}
                </p>
                <p className="text-white/60 text-sm">{PHOTOS[selected].year}</p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-4 text-white/70 hover:text-white text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="h-12 md:h-16 lg:h-24" />

            <div className="w-full max-w-lg flex justify-between gap-5">

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelected((s) => Math.max(0, s - 1))
                }}
                disabled={selected === 0}
                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 px-4 text-sm font-bold rounded-full shadow-lg
                hover:from-pink-600 hover:to-rose-700 disabled:from-pink-300 disabled:to-rose-300 transition-all"
              >
                ← Vorige
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelected((s) => Math.min(PHOTOS.length - 1, s + 1))
                }}
                disabled={selected === PHOTOS.length - 1}
                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 px-4 text-sm font-bold rounded-full shadow-lg
                hover:from-pink-600 hover:to-rose-700 disabled:from-pink-300 disabled:to-rose-300 transition-all"
              >
                Volgende →
              </button>

            </div>

          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div
        className="relative z-30 w-full max-w-5xl mx-auto px-4 py-12 flex flex-col items-center gap-10"
        style={{
          transition: 'opacity 1s ease, transform 1s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
        }}
      >

        {/* HEADER */}
        <div
          className="relative bg-white/20 backdrop-blur-md border border-white/30 
          rounded-3xl shadow-2xl self-center w-full text-center"
          style={{ padding: "30px 50px", maxWidth: "900px" }}
        >
          <img
            src={RED_LILY}
            alt=""
            className="absolute pointer-events-none w-24 md:w-32 z-10"
            style={{
              bottom: '-2.5rem',
              left: '-1.5rem',
              transform: `rotate(-25deg) translateY(${floatOffset}px)`,
              opacity: visible ? 1 : 0,
              transition: 'opacity 1s ease 0.5s'
            }}
          />
          <img
            src={RED_LILY}
            alt=""
            className="absolute pointer-events-none w-24 md:w-32 z-10"
            style={{
              bottom: '-2.5rem',
              right: '-1.5rem',
              transform: `rotate(25deg) scaleX(-1) translateY(${floatOffset}px)`,
              opacity: visible ? 1 : 0,
              transition: 'opacity 1s ease 0.65s'
            }}
          />

          <h2 className="font-cursive text-4xl md:text-5xl text-white drop-shadow-lg mb-3 flex items-center justify-center gap-3">
            18 jaar Elija
            <img src={CAMERA} alt="" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
          </h2>

          <p className="text-white/70 text-sm md:text-base">
            Klik op een foto om hem groter te zien
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 w-full">
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              onClick={() => setSelected(i)}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-white/30 shadow-md cursor-pointer hover:scale-105 hover:border-pink-400/60 transition-all duration-300"
              style={{
                transitionDelay: `${i * 0.03}s`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.9)',
                transition: `opacity 0.6s ease ${i * 0.04}s, transform 0.6s ease ${i * 0.04}s, scale 0.2s`,
              }}
            >
              <img
                src={photo.src}
                alt={`Foto ${i + 1}`}
                className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
              />

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-cursive text-white text-center text-sm leading-none">
                  {i === 0 ? '🍼 Jaar 1' : `🎂 ${photo.age} jaar`}
                </p>
                <p className="text-white/60 text-center text-xs">{photo.year}</p>
              </div>
            </div>
          ))}
        </div>

        {/* BACK BUTTON */}
        <button
          onClick={onBack}
          className="min-w-[260px] bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full px-10 py-4 text-lg font-bold shadow-lg hover:from-pink-600 hover:to-rose-700 hover:scale-105 transition-all cursor-pointer border border-white/20 flex items-center justify-center"
        >
          ← Terug naar het bericht
        </button>

      </div>
    </div>
  )
}