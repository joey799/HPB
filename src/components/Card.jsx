export default function Card({ photoSrc, isFlipped, isMatched, onClick }) {
  const isRevealed = isFlipped || isMatched

  return (
    <div
className="aspect-square w-12 sm:w-14 md:w-16 lg:w-20 xl:w-24"      onClick={onClick}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: isRevealed ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
  {/* BACK */}
  <div
  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 border-4 border-rose-300 flex items-center justify-center shadow-xl"
  style={{ backfaceVisibility: "hidden" }}
>
  <span
    className="text-white text-2xl text-center leading-none flex items-center justify-center w-full h-full"
    style={{
      fontFamily: '"Monsieur La Doulaise", cursive',
    }}
  >
    Happy<br />Birthday
  </span>
</div> 

        {/* FRONT */}
        <div
          className={`absolute inset-0 rounded-2xl overflow-hidden shadow-xl border-4 ${
            isMatched ? "border-green-400" : "border-white"
          }`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <img
            src={photoSrc}
            alt="memory"
            className="w-full h-full object-cover"
          />

          {isMatched && (
            <div className="absolute inset-0 bg-green-400/20 flex items-center justify-center">
              <span className="text-3xl">✅</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}