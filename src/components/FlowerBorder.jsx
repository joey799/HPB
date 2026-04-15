import { imagePath } from '../utils/imagePath'

const LILY_IMG = imagePath('photos/lilys1.png')

const borderLilies = [
  { t: '-2rem', l: '-2rem', r: 'auto', b: 'auto', rot: '-20deg', sc: 1.0 },
  { t: '0rem', l: '-1rem', r: 'auto', b: 'auto', rot: '10deg', sc: 0.8 },
  { t: '-2rem', r: '-2rem', l: 'auto', b: 'auto', rot: '70deg', sc: 1.0 },
  { t: '0rem', r: '-1rem', l: 'auto', b: 'auto', rot: '40deg', sc: 0.8 },
  { b: '-2rem', l: '-2rem', t: 'auto', r: 'auto', rot: '-110deg', sc: 1.0 },
  { b: '0rem', l: '-1rem', t: 'auto', r: 'auto', rot: '-140deg', sc: 0.8 },
  { b: '-2rem', r: '-2rem', t: 'auto', l: 'auto', rot: '160deg', sc: 1.0 },
  { b: '0rem', r: '-1rem', t: 'auto', l: 'auto', rot: '130deg', sc: 0.8 },
  { t: '-1.5rem', l: '5%', rot: '15deg', sc: 0.9 },
  { t: '-1.5rem', l: '15%', rot: '-5deg', sc: 0.85 },
  { t: '-1.5rem', l: '25%', rot: '10deg', sc: 0.9 },
  { t: '-1.5rem', l: '35%', rot: '-15deg', sc: 0.85 },
  { t: '-1.5rem', l: '45%', rot: '5deg', sc: 0.95 },
  { t: '-1.5rem', l: '55%', rot: '-10deg', sc: 0.85 },
  { t: '-1.5rem', l: '65%', rot: '15deg', sc: 0.9 },
  { t: '-1.5rem', l: '75%', rot: '-5deg', sc: 0.85 },
  { t: '-1.5rem', l: '85%', rot: '20deg', sc: 0.9 },
  { t: '-1.5rem', l: '95%', rot: '-5deg', sc: 0.85 },
  { b: '-1.5rem', l: '5%', rot: '-160deg', sc: 0.9 },
  { b: '-1.5rem', l: '15%', rot: '170deg', sc: 0.85 },
  { b: '-1.5rem', l: '25%', rot: '-175deg', sc: 0.9 },
  { b: '-1.5rem', l: '35%', rot: '160deg', sc: 0.85 },
  { b: '-1.5rem', l: '45%', rot: '-180deg', sc: 0.95 },
  { b: '-1.5rem', l: '55%', rot: '175deg', sc: 0.85 },
  { b: '-1.5rem', l: '65%', rot: '-165deg', sc: 0.9 },
  { b: '-1.5rem', l: '75%', rot: '170deg', sc: 0.85 },
  { b: '-1.5rem', l: '85%', rot: '-170deg', sc: 0.9 },
  { b: '-1.5rem', l: '95%', rot: '170deg', sc: 0.85 },
  { t: '5%', l: '-1.5rem', rot: '-90deg', sc: 0.9 },
  { t: '15%', l: '-1.5rem', rot: '-85deg', sc: 0.85 },
  { t: '25%', l: '-1.5rem', rot: '-95deg', sc: 0.9 },
  { t: '35%', l: '-2rem', rot: '-90deg', sc: 0.95 },
  { t: '50%', l: '-2rem', rot: '-90deg', sc: 0.95 },
  { t: '65%', l: '-1.5rem', rot: '-88deg', sc: 0.9 },
  { t: '75%', l: '-1.5rem', rot: '-85deg', sc: 0.85 },
  { t: '85%', l: '-1.5rem', rot: '-92deg', sc: 0.9 },
  { t: '95%', l: '-1.5rem', rot: '-85deg', sc: 0.85 },
  { t: '5%', r: '-1.5rem', rot: '90deg', sc: 0.9 },
  { t: '15%', r: '-1.5rem', rot: '85deg', sc: 0.85 },
  { t: '25%', r: '-1.5rem', rot: '95deg', sc: 0.9 },
  { t: '35%', r: '-2rem', rot: '90deg', sc: 0.95 },
  { t: '50%', r: '-2rem', rot: '90deg', sc: 0.95 },
  { t: '65%', r: '-1.5rem', rot: '88deg', sc: 0.9 },
  { t: '75%', r: '-1.5rem', rot: '85deg', sc: 0.85 },
  { t: '85%', r: '-1.5rem', rot: '92deg', sc: 0.9 },
  { t: '95%', r: '-1.5rem', rot: '85deg', sc: 0.85 },
]

export default function FlowerBorder({ visible = true }) {
  return (
    <>
      {borderLilies.map((pos, i) => (
        <img
          key={i}
          src={LILY_IMG}
          alt=""
          className="absolute w-28 md:w-36 lg:w-40 z-20 pointer-events-none"
          style={{
            top: pos.t,
            left: pos.l,
            bottom: pos.b,
            right: pos.r,
            transform: `rotate(${pos.rot}) scale(${pos.sc})`,
            transition: `opacity 1.5s ease ${i * 0.02}s`,
            opacity: visible ? 0.8 : 0,
          }}
        />
      ))}
    </>
  )
}