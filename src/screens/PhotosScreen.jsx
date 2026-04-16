import { useEffect, useState } from 'react'
import { imagePath } from '../utils/imagePath'
import FlowerBorder from '../components/FlowerBorder'

const RED_LILY = imagePath('photos/redlilys.png')
const CAMERA = imagePath('photos/cam.png')
const TAKIS = imagePath('photos/takis.png')

const ALL_PHOTOS = Array.from({ length: 28 }, (_, i) => ({
  src: imagePath(`photos/foto${i + 1}.jpg`),
}))

function getRandomPhotos() {
  return [...ALL_PHOTOS]
    .sort(() => Math.random() - 0.5)
    .slice(0, 18)
}

export default function PhotosScreen({ onBack }) {
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [floatOffset, setFloatOffset] = useState(0)
  const [takisClicked, setTakisClicked] = useState(false)

  const [photos, setPhotos] = useState(getRandomPhotos())

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

  const newSet = () => {
    setPhotos(getRandomPhotos())
    setSelected(null)
  }

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

      {/* TAKIS */}
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
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />

          <div className="relative h-full w-full flex items-center justify-center p-6 z-10">

            <div
              className="max-w-lg w-full bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[selected].src}
                className="w-full object-cover max-h-96"
                alt=""
              />

              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-4 text-white/70 hover:text-white text-2xl font-bold"
              >
                ✕
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
            className="absolute w-24 md:w-32"
            style={{
              bottom: '-2.5rem',
              left: '-1.5rem',
              transform: `rotate(-25deg) translateY(${floatOffset}px)`
            }}
          />
          <img
            src={RED_LILY}
            alt=""
            className="absolute w-24 md:w-32"
            style={{
              bottom: '-2.5rem',
              right: '-1.5rem',
              transform: `rotate(25deg) scaleX(-1) translateY(${floatOffset}px)`
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
          {photos.map((photo, i) => (
            <div
              key={i}
              onClick={() => setSelected(i)}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-white/30 shadow-md cursor-pointer hover:scale-105 transition-all duration-300"
              style={{
                transitionDelay: `${i * 0.03}s`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.9)',
              }}
            >
              <img
                src={photo.src}
                className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                alt=""
              />
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">

          <button
            onClick={newSet}
            className="min-w-[260px] bg-white/20 text-white px-6 py-4 text-lg font-bold rounded-full shadow-lg border border-white/30 hover:bg-white/30 hover:scale-105 transition-all"
          >
            🎲 Nieuwe foto set
          </button>

          <button
            onClick={onBack}
            className="min-w-[260px] bg-gradient-to-r from-pink-500 to-rose-600 text-white px-10 py-4 text-lg font-bold rounded-full shadow-lg hover:from-pink-600 hover:to-rose-700 hover:scale-105 transition-all border border-white/20"
          >
            ← Terug naar het bericht
          </button>

        </div>

      </div>
    </div>
  )
}   