import { useEffect, useState } from 'react'
import { imagePath } from '../utils/imagePath'


const RED_LILY = imagePath('photos/redlilys.png')
const LILY_IMG = imagePath('photos/lilys1.png')
const PHOTOS = Array.from({ length: 8 }, (_, i) => imagePath(`photos/foto${i + 1}.jpg`))

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

export default function EndScreen({ result, onReplay }) {
  const { score, shots } = result
  const [visible, setVisible] = useState(false)
  const [floatOffset, setFloatOffset] = useState(0)

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
    shots === 0
      ? 'Ongelooflijk! Nul shots! 🏆'
      : shots < 4
      ? 'Niet slecht gedaan! 😄'
      : 'Nou, lekker genoten zeker? 😂'

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

      {/* 🕵️ 02.PNG - DUIDELIJK ZICHTBAAR */}
      <img
        src={imagePath('public/photos/02.png')}
        alt=""
        className="absolute pointer-events-none opacity-90 hover:opacity-100 transition-opacity duration-300 drop-shadow-2xl"
        style={{
          bottom: '2rem',
          right: '2rem',
          width: '7rem',
          transform: 'rotate(10deg)',
          zIndex: 60,
        }}
      />

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

      {/* Scrollbare content */}
      <div
        className="relative z-30 w-full max-w-3xl mx-auto px-4 py-16 flex flex-col items-center gap-8"
        style={{
          transition: 'opacity 1s ease, transform 1s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        {/* Score kaart */}
        <div className="relative bg-white/20 backdrop-blur-md border border-white/30 p-8 rounded-3xl shadow-2xl w-full text-center">

          {/* Rode lily linksonder */}
          <img
            src={RED_LILY}
            alt=""
            className="absolute pointer-events-none w-36 z-10"
            style={{
              bottom: '-2.5rem',
              left: '-2rem',
              transform: `rotate(-25deg) translateY(${floatOffset}px)`,
              opacity: visible ? 1 : 0,
              transition: 'opacity 1s ease 0.5s',
            }}
          />

          {/* Rode lily rechtsonder */}
          <img
            src={RED_LILY}
            alt=""
            className="absolute pointer-events-none w-36 z-10"
            style={{
              bottom: '-2.5rem',
              right: '-2rem',
              transform: `rotate(25deg) scaleX(-1) translateY(${floatOffset}px)`,
              opacity: visible ? 1 : 0,
              transition: 'opacity 1s ease 0.65s',
            }}
          />

          <h2 className="text-4xl md:text-5xl font-cursive text-white drop-shadow-lg mb-2">
            Gefeliciteerd Elija! 
          </h2>
          
          {/* ✅ PUNTEN IN NORMAAL FONT */}
          <p className="text-2xl font-bold text-white/95 mt-1 tracking-wide">
            Eindstand: {score} punten ⭐
          </p>
          
          {/* ✅ SHOT COMMENT IN NORMAAL FONT (gewijzigd van font-cursive naar font-bold) */}
          <p className="text-lg font-bold text-white/70 mt-1">
            {shots} shots genomen — {shotComment}
          </p>
        </div>

        {/* Foto grid */}
        <div className="grid grid-cols-4 gap-2 w-full">
          {PHOTOS.map((src, i) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden border-2 border-white/30 shadow-md">
              <img src={src} alt={`Elija foto ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Verjaardagsbericht */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 text-left text-white/90 shadow-2xl w-full">
          <p className="font-cursive text-2xl mb-4 text-white">Lieve Elija,</p>
          
          <p className="font-cursive text-base md:text-lg mb-3 leading-relaxed">
            Vandaag, 22 april, word jij officieel 18 jaar — en wat een dag om te vieren! 
            Welkom in de wereld van de volwassenheid, al weten we allemaal dat jij allang
            veel meer verstand had dan menig volwassene.
          </p>
          <p className="font-cursive text-base md:text-lg mb-3 leading-relaxed">
            18 jaar geleden kwam er iemand de wereld in die alles wat ze aanraakt een beetje
            mooier maakt. Jouw lach werkt aanstekelijk, jouw energie is onstopbaar en jouw
            vriendelijkheid is iets heel bijzonders.
          </p>
          <p className="font-cursive text-base md:text-lg mb-3 leading-relaxed">
            Van stapavonden tot late nachtgesprekken, van hardop lachen om niets tot samen
            door de zware momenten — jij bent iemand die je altijd bij wil hebben. En nu je
            18 bent staan er zoveel mooie dingen te wachten: reizen, avonturen, dromen
            waarmaken — en wij zijn er allemaal bij! 
          </p>
          <p className="font-cursive text-base md:text-lg mb-3 leading-relaxed">
            Geniet van elke seconde van vandaag, want je verdient het volledig. Op jou,
            Elija — de mooiste, liefste, gekste en meest bijzondere 18-jarige die we kennen.
          </p>
          
          <p className="font-cursive text-xl text-white mt-4">
            Van harte gefeliciteerd met je 18e verjaardag! ik hou van je! ❤️
          </p>
        </div>

        {/* Replay knop */}
        <button
          onClick={onReplay}
          className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full px-12 py-4 text-lg font-bold shadow-lg hover:from-pink-600 hover:to-rose-700 hover:scale-105 transition-all cursor-pointer border border-white/20"
        >
          Nog een keer spelen 🔄
        </button>
      </div>
    </div>
  )
}