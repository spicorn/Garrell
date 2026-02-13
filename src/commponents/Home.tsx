import { useState, useEffect, useRef } from 'react'
import ImageTrail from './ImageTrail'
import pic1 from '../assets/pic1.jpeg'
import pic2 from '../assets/pic2.jpeg'
import pic3 from '../assets/pic3.jpeg' 
import pic4 from '../assets/pic4.jpeg'
import pic5 from '../assets/pic5.jpeg'
import song from '../assets/zvikomborero.mp3'


function Home() {
  const [clicked, setClicked] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })
  // confetti state (precomputed on click to avoid impure calls during render)
  const [confetti, setConfetti] = useState<{ left: string; color: string; duration: string; delay: string }[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const emojis = ['❤️', '🥰', '🥲', '🫠']

  const handleYes = () => {
    setClicked(true)
    // generate confetti once here (safe, not during render)
    const colors = ['#ec4899', '#f472b6', '#fbcfe8', '#c71585']
    const items = Array.from({ length: 50 }).map(() => ({
      left: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: `${3 + Math.random() * 2}s`,
      delay: `${Math.random() * 1.5}s`,
    }))
    setConfetti(items)
    setShowConfetti(true)
    setTimeout(() => setConfetti([]), 5000)
    setTimeout(() => {
      alert('If its a NO just send No to my inbox hey 😒')
    }, 500)
  }

  const handleNoHover = () => {
    setNoButtonPos({
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
    })
  }

  const handleLetterScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget as HTMLDivElement
    const maxScroll = target.scrollHeight - target.clientHeight

    if (maxScroll <= 0) {
      setScrollProgress(0)
      return
    }

    const progress = target.scrollTop / maxScroll
    setScrollProgress(progress)
  }

 

   const hasStartedRef = useRef(false)

useEffect(() => {
  const audio = audioRef.current
  if (!audio) return

  audio.volume = 0.9

  const unlockAudio = async () => {
    if (hasStartedRef.current) return

    try {
      await audio.play()
      hasStartedRef.current = true

      window.removeEventListener('click', unlockAudio)
      window.removeEventListener('touchstart', unlockAudio)
      window.removeEventListener('keydown', unlockAudio)
    } catch (err) {
      console.warn('Audio still blocked', err)
    }
  }

  window.addEventListener('click', unlockAudio)
  window.addEventListener('touchstart', unlockAudio)
  window.addEventListener('keydown', unlockAudio)

  return () => {
    window.removeEventListener('click', unlockAudio)
    window.removeEventListener('touchstart', unlockAudio)
    window.removeEventListener('keydown', unlockAudio)
    // 🚫 DO NOT pause here
  }
}, [])




  return (
    <div className="w-full min-h-screen overflow-hidden bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative">
      <audio
        ref={audioRef}
        src={song}
        
        loop
        playsInline
        className="hidden"
      />
      {/* Animated background elements */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes confetti-fall {
          to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes letter-bounce {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.4); }
          50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.8); }
        }
        @keyframes emoji-pop {
          0% { transform: scale(0.4) translateY(8px); opacity: 0; }
          60% { transform: scale(1.15) translateY(-4px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        
        .heart { animation: float 3s ease-in-out infinite; }
        .heart-1 { animation-delay: 0s; }
        .heart-2 { animation-delay: 0.5s; }
        .heart-3 { animation-delay: 1s; }
        
        .blob-1 {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle at 30% 40%, rgba(236, 72, 153, 0.2), transparent);
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          top: -100px;
          left: -100px;
          animation: pulse-glow 4s ease-in-out infinite;
          filter: blur(60px);
        }
        
        .blob-2 {
          position: absolute;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle at 30% 40%, rgba(168, 85, 247, 0.2), transparent);
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          bottom: -100px;
          right: -100px;
          animation: pulse-glow 5s ease-in-out infinite 1s;
          filter: blur(60px);
        }
        
        
        
        .content {
          animation: slide-up 1s ease-out;
        }
        
        .btn-yes {
          animation: glow-pulse 2s ease-in-out infinite;
        }
        
        .btn-yes:hover {
          animation: none;
          box-shadow: 0 0 50px rgba(236, 72, 153, 0.8);
        }
        
        .success-appear {
          animation: bounce-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Redesigned success card */
        .success-card {
          width: 520px;
          max-width: calc(100% - 48px);
          border-radius: 20px;
          padding: 28px 28px 36px;
          background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(250,245,250,0.85));
          box-shadow: 0 10px 30px rgba(16,24,40,0.45), inset 0 1px 0 rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.6);
        }

        .success-card .avatar-heart {
          width: 80px;
          height: 80px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 34px;
          color: white;
          
          box-shadow: 0 8px 30px rgba(236,72,153,0.28);
          border: 4px solid rgba(255,255,255,0.6);
        }

        .success-card .accent-line {
          height: 6px;
          width: 120px;
          margin: 8px auto 0;
          border-radius: 9999px;
          background: linear-gradient(90deg,#fbcfe8,#f472b6,#ec4899);
          box-shadow: 0 6px 18px rgba(236,72,153,0.12);
        }

        .glass-btn {
          background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.22);
          color: #111827;
          backdrop-filter: blur(6px) saturate(120%);
        }

        /* Main content redesign */
        .main-panel {
          background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 28px;
          margin: 15px;
          box-shadow: 0 8px 40px rgba(2,6,23,0.6);
        }

       

        .feature-badge { width: 42px; height: 42px; border-radius: 10px; display:flex;align-items:center;justify-content:center; }

        .lead-text { color: rgba(226,226,232,0.9); white-space: pre-line; }

        .cta-primary { background: linear-gradient(90deg,#ff7aa2,#ec4899); color: white; padding: 12px 20px; border-radius: 9999px; box-shadow: 0 8px 22px rgba(236,72,153,0.16); border: none; }
        .cta-primary:hover { transform: translateY(-3px); box-shadow: 0 18px 40px rgba(236,72,153,0.18); }

        .cta-ghost { background: transparent; border: 1px solid rgba(255,255,255,0.12); color: #fff; padding: 12px 20px; border-radius: 9999px; }

        .illustration { border-radius: 14px; box-shadow: 0 20px 50px rgba(16,24,40,0.5); }

        .subtle-emoji { opacity: 0.95; filter: drop-shadow(0 6px 18px rgba(236,72,153,0.08)); }

        .scroll-emoji {
          filter: drop-shadow(0 6px 18px rgba(236,72,153,0.25));
          transition: opacity 220ms ease-out, transform 220ms ease-out;
          will-change: transform, opacity;
          animation: emoji-pop 380ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Scrollable love letter */
        .txt{
          font-size: 18px;
          line-height: 1.6;
          
        }
        .scrollable-paragraph {
          margin-bottom: 32px;
          margin-top: 32px;
          position: relative;
          max-height: 420px;
          padding-right: 8px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(236,72,153,0.8) rgba(15,23,42,0.6);
        }

        .scrollable-paragraph::-webkit-scrollbar {
          width: 6px;
        }

        .scrollable-paragraph::-webkit-scrollbar-track {
          background: radial-gradient(circle at 0 0, rgba(236,72,153,0.15), transparent),
                      radial-gradient(circle at 100% 100%, rgba(129,140,248,0.12), transparent);
          border-radius: 9999px;
        }

        .scrollable-paragraph::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg,#f472b6,#ec4899);
          border-radius: 9999px;
          box-shadow: 0 0 8px rgba(236,72,153,0.6);
        }

        .scrollable-paragraph::after {
          content: '';
          position: sticky;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 40px;
          pointer-events: none;
          background: linear-gradient(to top, rgba(15,23,42,0.96), transparent);
        }
      `}</style>

      {/* Background blobs */}
      <div className="blob-1"></div>
      <div className="blob-2"></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-pink-500/10 via-transparent to-purple-500/5"></div>

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {confetti.map((c, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: c.left,
                top: '-10px',
                background: c.color,
                animation: `confetti-fall ${c.duration} ease-in forwards`,
                animationDelay: c.delay,
              }}
            />
          ))}
        </div>
      )}


      {/* Main content */}
      <div className={`content relative z-10 max-w-3xl px-6 sm:px-8 text-center transition-all duration-500 ${clicked ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
         <div className=" w-full mt-4">
              <h1 className="txt text-pink-400 font-bold text-4xl sm:text-5xl">
                🥰Click anywhere before reading🥰
              </h1>
            </div>
          <ImageTrail
            key={clicked ? 'clicked' : 'default'}
            items={[
              pic1,
              pic2,
              pic3,
              pic4,
              pic5,
              pic4,
              pic2,
              // ...
            ]}
            variant={4}
          />
        
        <div className="main-panel mx-auto ">
          <div className="flex flex-col lg:flex-row items-center gap-8 ">
            
            <div className="flex-1 text-left">
              <div className="flex items-center gap-3 mb-4">
               
                <div className="feature-badge">💖</div>
                <span className="text-sm uppercase tracking-wide text-pink-200 font-semibold ">Dear  Rachel</span>
              </div>

              

              <div className="mb-6 max-w-xl">
                
                <div
                  className="scrollable-paragraph "
                  onScroll={handleLetterScroll}
                >
                  <p className="lead-text">
                    I do not even know where to start because words feel so small when I try to describe how I feel about you. Sometimes I just stare at your pictures and wonder how someone like me got so lucky to have someone like you. You have been my peace in chaos, my calm in storms and my reason to smile even on days when I feel completely lost.

                    Do you remember the first time we really talked? I did not know that day would change my life forever. I did not know that one day, your voice would become the sound that keeps me going, that your name would be the one I whisper to myself when I feel like giving up. You did not just walk into my life, you walked into my soul, quietly, softly and made a home there.

                    There are nights when I lie awake thinking about you(a lot ufunge), about everything we have shared the laughter, the small arguments, the tears and the apologies. And I realize that no matter how hard life gets, I never want to go through a single day without you in it. You have taught me what love truly feels like not just butterflies or excitement, but the kind of love that stays, that forgives, that understands.

                    Sometimes I am scared, you know? Scared of losing you. Scared that one day, life might take us in different directions. But even if it ever does, I want you to remember this: I will always carry you with me in my words, in my thoughts and in my heart. You are not just my friend; you are a part of who I am.

                    If I could, I would wrap every moment we have shared in a box and keep it close forever. Every laugh, every hug, every “I love you” whispered between breaths. they are pieces of my heart now, all belonging to you.

                    And maybe one day when you read this again, I want you to remember, I did not love you for how beautiful you are, though you are breathtaking, I loved you for how you made me feel. For how you looked at me like I was enough. For how you stood by me when you did not have to. For how you loved me even when I did not love myself enough.

                    So if ever you doubt it even for a second just know this, you have changed me in ways I can never explain. You have made me softer, kinder, better and l am yet to change and learn more. And if my life were to end tomorrow, I would go knowing that I truly lived....because I got to love you Rachel.
                  </p>

                  <div className="pointer-events-none absolute inset-0 text-2xl">
                    {emojis.map((emoji, index) => {
                      const center = 0.15 + index * 0.2
                      const fadeRadius = 0.25
                      const start = center - fadeRadius
                      const end = center + fadeRadius
                      const span = end - start

                      const raw = (scrollProgress - start) / span
                      let t = 0

                      if (raw > 0 && raw < 1) {
                        if (raw < 0.25) {
                          t = raw / 0.25
                        } else if (raw > 0.75) {
                          t = (1 - raw) / 0.25
                        } else {
                          t = 1
                        }
                      }

                      t = Math.max(0, Math.min(1, t))

                      const baseBottom = 8 + index * 6
                      const floatHeight = 90
                      const bottom = baseBottom + t * floatHeight

                      const lanes = [18, 42, 66, 32]
                      const lane = lanes[index] ?? 50

                      const drift = Math.sin(t * Math.PI) * (4 + index * 2)

                      return (
                        <span
                          key={emoji}
                          className="scroll-emoji"
                          style={{
                            position: 'absolute',
                            left: `${lane}%`,
                            bottom: `${bottom}px`,
                            transform: `translateX(${drift}px)`,
                            opacity: t,
                            transitionDelay: `${index * 80}ms`,
                          }}
                        >
                          {emoji}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <button
                  onClick={handleYes}
                  className="cta-primary font-semibold"
                >
                  Yes! 💕
                </button>

                <button
                  onMouseEnter={handleNoHover}
                  onTouchStart={handleNoHover}
                  style={{ transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`, transition: 'transform 0.25s ease-out' }}
                  className="cta-ghost font-semibold"
                >
                  No
                </button>
              </div>
            </div>

            <div className="hidden lg:flex flex-1 justify-center">
              <div className=" w-56 h-56  flex items-center justify-center ">
                <img src={pic2} alt="" className="rounded-full border-4 border-pink-200" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4 subtle-emoji text-3xl">
            <span>🌹</span>
            <span>Rachel</span>
            <span>🌹</span>
          </div>
          
        </div>
        
      </div>

      {/* Success message */}
      {clicked && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

          {/* Redesigned Success card */}
          <div className="success-appear relative success-card mx-4">
             <ImageTrail
            key={clicked ? 'clicked' : 'default'}
            items={[
              pic1,
              pic2,
              pic3,
              pic4,
              pic5,
              pic4,
              pic2,
              // ...
            ]}
            variant={4}
          />
            <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)' }}>
              <div className="avatar-heart bg-purple-900">💞</div>
            </div>

            <div style={{ paddingTop: 56, textAlign: 'center' }}>
              <h2 className="text-3xl sm:text-4xl font-extrabold bg-linear-to-r from-pink-600 to-rose-500 bg-clip-text text-purple-900">
                You Made Me The Happiest!
              </h2>

              <div className="accent-line" />

              <p className="text-gray-600 mt-3 text-base sm:text-lg">
                This moment means the world thank you for saying yes. Let's make new memorires together.
              </p>

              <div className="flex justify-center gap-3 mt-6 text-3xl text-purple-500 font-bold">
                {['✌️', 'Yours Garrell' ,'🥲'].map((emoji, i) => (
                  <span key={i} className="inline-block animate-bounce" style={{ animationDelay: `${i * 0.08}s` }}>{emoji}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
