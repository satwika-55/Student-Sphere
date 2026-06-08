import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, MessageSquare, BookOpen, GraduationCap, ShieldCheck, Activity, Database, Cpu } from 'lucide-react'
import { getStoredUser, clearAuth } from '../lib/authStorage.js'
import { Header } from '../components/layout/Header.jsx'

function Home() {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => getStoredUser())
  const [metrics, setMetrics] = useState({
    vectors: 47280,
    latency: 12,
    onlineUsers: 342
  })

  useEffect(() => {
    const syncUser = () => setUser(getStoredUser())
    window.addEventListener('storage', syncUser)
    return () => window.removeEventListener('storage', syncUser)
  }, [])

  // Simulate dynamic metric updates for premium dashboard feel
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        vectors: prev.vectors + Math.floor(Math.random() * 3),
        latency: Math.max(8, Math.min(22, prev.latency + (Math.random() > 0.5 ? 1 : -1))),
        onlineUsers: prev.onlineUsers + (Math.random() > 0.5 ? 2 : -2)
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    clearAuth()
    setUser(null)
    navigate('/')
  }

  return (
    <div className="min-h-svh bg-[#030304] text-stone-200 flex flex-col relative overflow-x-hidden">
      
      {/* Dynamic CSS styles for complex tech grids and glowing keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes line-glow {
          0% { background-position: 0% 0%; }
          100% { background-position: 0% 100%; }
        }
        @keyframes face-boot-glow {
          0% { opacity: 0; filter: brightness(0.2) contrast(1.2) drop-shadow(0 0 0px rgba(255, 107, 74, 0)); }
          40% { opacity: 0.3; filter: brightness(0.6) contrast(1.4) drop-shadow(0 0 10px rgba(255, 107, 74, 0.2)); }
          70% { opacity: 0.7; filter: brightness(1.2) contrast(1.5) drop-shadow(0 0 25px rgba(255, 107, 74, 0.6)); }
          100% { opacity: 1; filter: brightness(1) contrast(1) drop-shadow(0 0 15px rgba(255, 107, 74, 0.3)); }
        }
        @keyframes float-badge {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-8px) translateX(4px); }
          66% { transform: translateY(4px) translateX(-4px); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.35; }
        }
        .animate-face-boot {
          animation: face-boot-glow 2.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .animate-float-1 {
          animation: float-badge 6s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-badge 7s ease-in-out infinite 1.5s;
        }
        .animate-float-3 {
          animation: float-badge 8s ease-in-out infinite 3s;
        }
        .tech-grid-bg {
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.01) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.01) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .radial-glow-orng {
          background: radial-gradient(circle at center, rgba(255, 107, 74, 0.12) 0%, transparent 65%);
        }
      `}} />

      {/* Decorative Cyber Grid Background */}
      <div className="absolute inset-0 tech-grid-bg opacity-45 pointer-events-none z-0" />
      
      {/* Ambient Radial glows */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] radial-glow-orng -translate-y-1/2 pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] radial-glow-orng pointer-events-none z-0" />

      {/* Header component */}
      <Header user={user} onLogout={handleLogout} />

      {/* Main Container */}
      <main className="relative flex-1 flex items-center justify-center py-16 md:py-24 z-10 px-6 sm:px-8 lg:px-16 max-w-[1500px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
          
          {/* Left Column: Copywriting & Interactive Dashboards */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Pill badge with live counter */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ff6b4a]/20 bg-[#ff6b4a]/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#ff9470] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b4a] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6b4a]"></span>
              </span>
              Campus Sync Active • {metrics.onlineUsers} online
            </div>
            
            <div className="space-y-4">
              <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
                Own your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b4a] to-[#ff9470] drop-shadow-[0_0_20px_rgba(255,107,74,0.15)]">health</span>.
              </h1>
              <p className="max-w-xl text-lg sm:text-xl text-stone-400 leading-relaxed font-normal">
                Superpower is a digital clinic designed to help you live a long, healthy life.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/gita-gpt" className="group relative">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#ff6b4a] to-[#ff9470] opacity-70 blur-md transition duration-300 group-hover:opacity-100" />
                <button className="relative flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#0c0d10] px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-[#121319] active:translate-y-px">
                  <Sparkles className="h-4 w-4 text-[#ff9470]" />
                  Enter Gita GPT
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              
              <Link to="/posts">
                <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] px-7 py-4 text-sm font-semibold text-stone-200 transition-all active:translate-y-px">
                  <MessageSquare className="h-4 w-4 text-[#ff6b4a]" />
                  Browse Campus Feed
                </button>
              </Link>
            </div>

            {/* Complex Live Stats Dashboard Panel */}
            <div className="pt-10 border-t border-white/[0.06] space-y-4">
              <p className="text-xs uppercase font-bold tracking-widest text-stone-500">System Parameters</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div className="rounded-xl border border-white/[0.04] bg-[#0c0d10]/40 p-4 space-y-2">
                  <div className="flex items-center justify-between text-[#ff9470]">
                    <Database className="h-4 w-4" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">RAG Vectors</span>
                  </div>
                  <p className="text-xl font-mono font-bold text-stone-200 tracking-tight">
                    {metrics.vectors.toLocaleString()}
                  </p>
                  <div className="h-1 bg-stone-900 rounded-full overflow-hidden">
                    <div className="h-full bg-[#ff6b4a] rounded-full w-4/5 animate-pulse" />
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.04] bg-[#0c0d10]/40 p-4 space-y-2">
                  <div className="flex items-center justify-between text-[#ff9470]">
                    <Activity className="h-4 w-4" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Query Latency</span>
                  </div>
                  <p className="text-xl font-mono font-bold text-stone-200 tracking-tight">
                    {metrics.latency}ms
                  </p>
                  <div className="h-1 bg-stone-900 rounded-full overflow-hidden">
                    <div className="h-full bg-[#3dd68c] rounded-full w-1/4" />
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.04] bg-[#0c0d10]/40 p-4 space-y-2">
                  <div className="flex items-center justify-between text-[#ff9470]">
                    <Cpu className="h-4 w-4" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Security Model</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <ShieldCheck className="h-4 w-4 text-[#3dd68c]" />
                    <span className="text-xs font-semibold text-stone-300">JWT / SHA-256</span>
                  </div>
                  <p className="text-[10px] text-stone-500 font-mono overflow-hidden whitespace-nowrap text-ellipsis">SHA: ea10d46855...</p>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Cybernetic AI Girl Glowing Visual */}
          <div className="lg:col-span-5 flex justify-center relative min-h-[450px]">
            
            {/* Ambient Background Glow tailored for her face center */}
            <div className="absolute w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-gradient-to-tr from-[#ff6b4a]/25 to-[#ff9470]/5 rounded-full blur-[80px] opacity-75 pointer-events-none z-0" />
            
            {/* Floating Visual Wrapper */}
            <div className="relative z-10 w-full max-w-[380px] sm:max-w-[420px] flex items-center justify-center">
              
              {/* Outer Cyber Grid container */}
              <div className="rounded-3xl border border-white/[0.08] bg-[#14161c]/45 p-4 backdrop-blur-md shadow-2xl shadow-black/80 w-full">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-gradient-to-b from-[#15171d] to-[#08090c] border border-white/[0.04] group">
                  
                  {/* Holographic glowing lines texture */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,107,74,0.05)_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none z-20" />
                  
                  {/* Glowing Face Graphic with Fade/Boot animation */}
                  <img
                    src="/futuristic_ai_girl.png"
                    alt="Futuristic AI Face Glow Illustration"
                    className="w-full h-full object-cover select-none animate-face-boot z-10 relative"
                  />

                  {/* Layered Color Dodge Face Glow Accent on Boot */}
                  <div className="absolute inset-0 bg-radial-gradient pointer-events-none mix-blend-color-dodge z-20"
                       style={{
                         background: 'radial-gradient(circle 120px at 50% 45%, rgba(255, 107, 74, 0.55) 0%, transparent 80%)',
                         animation: 'face-boot-glow 3.5s ease-out infinite alternate'
                       }} />

                  {/* HUD Scan lines */}
                  <div className="absolute inset-0 pointer-events-none border border-white/[0.04] rounded-2xl z-30" />
                  
                  {/* Cyber Scanner Bar */}
                  <div className="absolute inset-x-0 h-[2px] bg-[#ff9470] shadow-[0_0_12px_#ff6b4a] pointer-events-none opacity-40 z-20"
                       style={{
                         animation: 'scan 5s linear infinite',
                         backgroundImage: 'linear-gradient(90deg, transparent, #ff9470, transparent)'
                       }} />

                </div>
              </div>

              {/* Floating Badges with distinct delays */}
              <div className="absolute -top-4 -right-4 animate-float-1 z-30">
                <div className="rounded-xl bg-[#0c0d10]/95 border border-white/[0.08] p-3 shadow-lg flex items-center gap-2 backdrop-blur-md">
                  <Sparkles className="h-4 w-4 text-[#ff9470]" />
                  <div className="text-left">
                    <p className="text-[10px] text-stone-500 uppercase font-bold">Neural Engine</p>
                    <p className="text-xs font-semibold text-stone-200">Gita RAG Model</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-16 -left-8 animate-float-2 z-30">
                <div className="rounded-xl bg-[#0c0d10]/95 border border-white/[0.08] p-3 shadow-lg flex items-center gap-2.5 backdrop-blur-md">
                  <Cpu className="h-4 w-4 text-[#3dd68c]" />
                  <div className="text-left">
                    <p className="text-[10px] text-stone-500 uppercase font-bold">Latency</p>
                    <p className="text-xs font-semibold text-stone-200">12ms response</p>
                  </div>
                </div>
              </div>

              {/* Corner aesthetic highlights */}
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-[#ff6b4a]/30 rounded-br-2xl pointer-events-none" />
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-[#ff6b4a]/30 rounded-tl-2xl pointer-events-none" />
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
