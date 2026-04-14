import { useEffect, useState } from 'react'

    const LILY_IMG = 'public/photos/lilys1.png'
    const RED_LILY = 'public/photos/redlilys.png'

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

    export default function StartScreen({ onNext }) {
    const [visible, setVisible] = useState(false)
    const [shake, setShake] = useState(false)
    const [floatOffset, setFloatOffset] = useState(0)

    useEffect(() => {
        setTimeout(() => setVisible(true), 100)
    }, [])

    // Knop shake elke 3 seconden
    useEffect(() => {
        const interval = setInterval(() => {
        setShake(true)
        setTimeout(() => setShake(false), 600)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    // Zachte float animatie voor rode lilies
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

        <style>{`
            @keyframes shake {
            0%, 100% { transform: rotate(0deg) scale(1); }
            15% { transform: rotate(-6deg) scale(1.08); }
            30% { transform: rotate(6deg) scale(1.12); }
            45% { transform: rotate(-4deg) scale(1.1); }
            60% { transform: rotate(4deg) scale(1.08); }
            75% { transform: rotate(-2deg) scale(1.05); }
            }
            @keyframes smirnoff-shake {
            0%, 100% { transform: rotate(0deg) scale(1); }
            15% { transform: rotate(-10deg) scale(1.2); }
            30% { transform: rotate(10deg) scale(1.3); }
            45% { transform: rotate(-6deg) scale(1.25); }
            60% { transform: rotate(6deg) scale(1.2); }
            75% { transform: rotate(-3deg) scale(1.1); }
            }
            .btn-shake { animation: shake 0.6s ease; }
            .smirnoff-shake { animation: smirnoff-shake 0.6s ease; }
        `}</style>

        {/* Achtergrond */}
        <div className="absolute inset-0 flex w-full h-full z-0">
            <img src="public/photos/elija.jpg" className="w-1/3 h-full object-cover" alt="" />
            <img src="public/photos/elija.jpg" className="w-1/3 h-full object-cover" alt="" />
            <img src="public/photos/elija.jpg" className="w-1/3 h-full object-cover" alt="" />
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
            className="relative z-30 flex flex-col items-center text-center gap-10 py-12 px-4 w-full"
            style={{
            transition: 'opacity 1s ease, transform 1s ease',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            }}
        >
            {/* Titel kaart met rode lilies links/rechts onderaan */}
            <div className="relative bg-white/20 backdrop-blur-md border border-white/30 p-10 rounded-3xl shadow-2xl max-w-4xl w-full mx-4">
            
            {/* Rode lily linksonder van de kaart */}
            <img
                src={RED_LILY}
                alt=""
                className="absolute pointer-events-none w-75 z-40"
                style={{
                bottom: '-3rem',
                left: '-8rem',
                transform: `rotate(-30deg) translateY(${floatOffset}px)`,
                transition: 'opacity 1s ease 0.5s',
                opacity: visible ? 1 : 0,
                }}
            />

            {/* Rode lily rechtsonder van de kaart */}
            <img
                src={RED_LILY}
                alt=""
                className="absolute pointer-events-none w-75 z-40"
                style={{
                bottom: '-3rem',
                right: '-8rem',
                transform: `rotate(30deg) scaleX(-1) translateY(${floatOffset}px)`,
                transition: 'opacity 1s ease 0.65s',
                opacity: visible ? 1 : 0,
                }}
            />

            <h1 className="text-6xl md:text-7xl font-cursive text-white mb-4 tracking-tight leading-tight drop-shadow-lg whitespace-nowrap">
                Happy Birthday Elija!
            </h1>
            <p className="text-3xl md:text-4xl font-cursive text-white/90 tracking-wide">
                22 april — 18 jaar!
            </p>
            </div>

            {/* Knop met shake animatie */}
            <button
            onClick={onNext}
            className={`bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full px-14 py-4 text-xl md:text-2xl font-bold shadow-lg transition-colors hover:from-pink-600 hover:to-rose-700 cursor-pointer border border-white/20 flex items-center justify-center gap-3 ${shake ? 'btn-shake' : ''}`}
            >
            Speel het Memory Shot Spel
            <img
                src="public/photos/smirnoff.jpg"
                alt="Smirnoff"
                className={`w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-md ${shake ? 'smirnoff-shake' : ''}`}
            />
            </button>
        </div>
        </div>
    )
    }