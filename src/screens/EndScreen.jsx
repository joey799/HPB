import { useEffect, useState } from 'react'
import { imagePath } from '../utils/imagePath'
import FlowerBorder from '../components/FlowerBorder'

const RED_LILY = imagePath('photos/redlilys.png')
// ✅ Aangepast naar 18 foto's
const PHOTOS = Array.from({ length: 18 }, (_, i) => imagePath(`photos/foto${i + 1}.jpg`))

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
    shots === 0 ? 'Ongelooflijk! Nul shots! 🏆'
    : shots < 4 ? 'Niet slecht gedaan! 😄'
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

      {/* 02.PNG */}
      <img src={imagePath('photos/02.png')} alt="" className="absolute pointer-events-none opacity-90 hover:opacity-100 transition-opacity duration-300 drop-shadow-2xl"
        style={{ bottom: '2rem', right: '2rem', width: '7rem', transform: 'rotate(10deg)', zIndex: 60 }} />

      {/* ✅ BLOEMENRAND */}
      <FlowerBorder visible={visible} />

      {/* Scrollbare content */}
      <div
        className="relative z-30 w-full max-w-4xl mx-auto px-4 py-10 flex flex-col items-center gap-8"
        style={{
          transition: 'opacity 1s ease, transform 1s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        {/* Score kaart */}
<div className="relative bg-white/20 backdrop-blur-md border border-white/30 p-6 md:p-8 rounded-3xl shadow-2xl w-full text-center">
  <img src={RED_LILY} alt="" className="absolute pointer-events-none w-36 z-10"
    style={{ bottom: '-2.5rem', left: '-2rem', transform: `rotate(-25deg) translateY(${floatOffset}px)`, opacity: visible ? 1 : 0, transition: 'opacity 1s ease 0.5s' }} />
  <img src={RED_LILY} alt="" className="absolute pointer-events-none w-36 z-10"
    style={{ bottom: '-2.5rem', right: '-2rem', transform: `rotate(25deg) scaleX(-1) translateY(${floatOffset}px)`, opacity: visible ? 1 : 0, transition: 'opacity 1s ease 0.65s' }} />

  <h2 className="text-2xl md:text-3xl font-cursive text-white drop-shadow-lg mb-3">Gefeliciteerd Elija!</h2>
  <p className="text-lg md:text-xl font-bold text-white/95 tracking-wide">Eindstand: {score} punten ⭐</p>
  <p className="text-sm md:text-base font-semibold text-white/70 mt-2">{shots} shots genomen — {shotComment}</p>
</div>

 {/* Verjaardagsbericht - A4 Formaat */}
<div className="relative bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl w-full max-w-[210mm] mx-auto aspect-[210/297] p-8 pl-12 md:pl-16 md:p-12 lg:p-16 text-left">  <p className="font-cursive text-4xl mb-6 text-white">Lieve Elija,</p>
  <p className="font-cursive text-lg md:text-4xl mb-5 leading-relaxed md:leading-loose text-white/90">Vandaag, 22 april, word jij officieel 18 jaar — en wat een dag om te vieren! Welkom in de wereld van de volwassenheid, al weten we allemaal dat jij allang veel meer verstand had dan menig volwassene.</p>
  <p className="font-cursive text-lg md:text-4xl mb-5 leading-relaxed md:leading-loose text-white/90">18 jaar geleden kwam er iemand de wereld in die alles wat ze aanraakt een beetje mooier maakt. Jouw lach werkt aanstekelijk, jouw energie is onstopbaar en jouw vriendelijkheid is iets heel bijzonders.</p>
  <p className="font-cursive text-lg md:text-4xl mb-5 leading-relaxed md:leading-loose text-white/90">Van stapavonden tot late nachtgesprekken, van hardop lachen om niets tot samen door de zware momenten — jij bent iemand die je altijd bij wil hebben. En nu je 18 bent staan er zoveel mooie dingen te wachten: reizen, avonturen, dromen waarmaken — en wij zijn er allemaal bij!</p>
  <p className="font-cursive text-lg md:text-4xl text-white mt-auto pt-6 border-t border-white/20">Van harte gefeliciteerd met je 18e verjaardag! ik hou van je! ❤️</p>
</div>

        {/* ✅ FOTO GRID - 18 kleine foto's, helemaal onderaan, apart van de kaarten */}
        <div className="w-full mt-4">
          <h3 className="text-center text-white/80 font-cursive text-xl mb-4">📸 Herinneringen</h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 gap-2 w-full">
            {PHOTOS.map((src, i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden border border-white/30 shadow-sm bg-white/10">
                <img 
                  src={src} 
                  alt={`Foto ${i + 1}`} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Replay knop */}
        <button 
          onClick={onReplay} 
          className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full px-12 py-4 text-lg font-bold shadow-lg hover:from-pink-600 hover:to-rose-700 hover:scale-105 transition-all cursor-pointer border border-white/20 mt-4"
        >
          Nog een keer spelen 🔄
        </button>
      </div>
    </div>
  )
}