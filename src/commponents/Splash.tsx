import { useEffect } from 'react'
import dancel from '../assets/pic4.jpeg'

type Props = {
  onFinish: () => void
  duration?: number
}

export default function Splash({ onFinish, duration = 3500 }: Props) {
  useEffect(() => {
    const t = setTimeout(onFinish, duration)
    return () => clearTimeout(t)
  }, [onFinish, duration])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-slate-900 via-purple-900 to-pink-900">
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-pink-600/30 via-rose-500/15 to-transparent opacity-60"></div>

        <div className="relative z-10 max-w-3xl text-center px-6">
          <div className="mx-auto w-40 h-40 sm:w-56 sm:h-56 rounded-3xl  shadow-2xl flex items-center justify-center transform -rotate-6">
            <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-4xl sm:text-5xl"><img src={dancel} alt="" className='w-full h-full object-cover rounded-full' /></div>
          </div>

          <h1 className="mt-8 text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-xl">
            <span className="block">Will you be my valentines</span>
            <span className="block text-pink-300">Yours Garrell</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-white/80 max-w-xl mx-auto">
             Take a breath  take your time to read it. Get ready.....
          </p>
        </div>

        {/* floating hearts */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-10 top-20 text-2xl opacity-80 animate-animate-float">💖</div>
          <div className="absolute right-16 top-32 text-3xl opacity-70 animate-animate-float animation-delay-200">💗</div>
          <div className="absolute left-1/2 bottom-24 -translate-x-1/2 text-4xl opacity-60 animate-animate-float animation-delay-400">🌹</div>
        </div>
      </div>
      <style>{`
        @keyframes floatUp { 0%{transform:translateY(0)}50%{transform:translateY(-20px)}100%{transform:translateY(0)} }
        .animate-animate-float{ animation: floatUp 3.5s ease-in-out infinite; }
        .animation-delay-200{ animation-delay: .2s }
        .animation-delay-400{ animation-delay: .4s }
      `}</style>
    </div>
  )
}
