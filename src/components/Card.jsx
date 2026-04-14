import { imagePath } from '../utils/imagePath'

export default function Card({ photoSrc, isFlipped, isMatched, onClick }) {
  const isRevealed = isFlipped || isMatched;

  return (
    <div
      className="aspect-square w-20 sm:w-24 md:w-32 lg:w-40 xl:w-48 cursor-pointer select-none"
      onClick={onClick}
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Achterkant */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 border-4 border-rose-300 flex items-center justify-center shadow-xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span 
            className="text-white font-cursive font-bold text-center px-1 drop-shadow-lg leading-tight"
            style={{ fontSize: 'clamp(1.1rem, 4.5vw, 1.9rem)' }}
          >
            Happy<br/>Birthday!
          </span>
        </div>

        {/* Voorkant */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-xl border-4 ${
            isMatched ? 'border-green-400' : 'border-white'
          }`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <img src={photoSrc} alt="Elija" className="w-full h-full object-cover" />
          {isMatched && (
            <div className="absolute inset-0 bg-green-400/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-4xl md:text-5xl drop-shadow-md">✅</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}