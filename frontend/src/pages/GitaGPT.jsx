import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Sparkles, Send, GraduationCap, Cpu, ShieldCheck } from 'lucide-react'

function GitaGPT() {
  const [messages] = useState([
    {
      sender: 'bot',
      text: 'Greetings. I am Gita GPT, your spiritual guide and companion. I am currently being prepared to help answer your life questions with wisdom from the Bhagavad Gita using advanced RAG capabilities. Ask me anything, and I will search the sacred verses to guide you.',
    },
  ])

  return (
    <div className="min-h-svh bg-[#050506] text-stone-200 flex flex-col relative overflow-x-hidden">
      
      {/* Background glow and grids */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35] z-0"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(circle 800px at 50% -200px, rgba(255, 107, 74, 0.16), transparent),
            radial-gradient(circle 600px at 80% 60%, rgba(255, 107, 74, 0.05), transparent),
            linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px',
        }}
      />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
      `}} />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0c0d10]/80 backdrop-blur-xl w-full">
        <div className="flex h-[4.25rem] w-full items-center justify-between gap-4 px-6 md:px-12">
          
          <Link to="/" className="group flex items-center gap-2 text-stone-400 hover:text-stone-100 transition-colors">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff6b4a] to-[#ff9470] text-[#0c0d10]">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight text-stone-50">
              Gita GPT
            </span>
          </div>

        </div>
      </header>

      {/* Two Column Layout Body */}
      <main className="flex-1 max-w-[1300px] w-full mx-auto px-6 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-stretch">
        
        {/* Left Column: Mock Chat Window (Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff6b4a]/10 px-3 py-1 text-xs font-semibold text-[#ff6b4a] border border-[#ff6b4a]/20">
              <Cpu className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '4s' }} />
              RAG Model Context Loaded
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-stone-50 sm:text-4xl">
              Gita GPT Chatbot
            </h1>
            <p className="text-sm text-stone-400 leading-relaxed max-w-xl">
              Receive personalized life answers grounded in the wisdom of the Bhagavad Gita. Our vector embedding model maps scripture verses into semantic space to fetch immediate guidance.
            </p>
          </div>

          {/* Chat Mockup Container */}
          <div className="flex-1 min-h-[420px] rounded-2xl border border-white/[0.08] bg-[#14161c]/50 backdrop-blur-md flex flex-col overflow-hidden shadow-2xl shadow-black/45">
            {/* Mock message list */}
            <div className="flex-1 p-6 space-y-5 overflow-y-auto">
              <div className="flex gap-4 items-start max-w-2xl">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff6b4a] to-[#ff9470] text-[#0c0d10] font-extrabold text-xs shadow-md">
                  G
                </span>
                <div className="rounded-2xl border border-white/[0.06] bg-[#1c1f26]/80 px-4 py-3 text-sm leading-relaxed text-stone-300">
                  {messages[0].text}
                </div>
              </div>
              
              <div className="flex gap-4 items-start max-w-xl ml-auto flex-row-reverse">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-800 text-stone-300 font-extrabold text-xs">
                  U
                </span>
                <div className="rounded-2xl border border-[#ff6b4a]/20 bg-[#ff6b4a]/5 px-4 py-3 text-sm leading-relaxed text-[#ff9470] opacity-90">
                  How can I stay calm and focused during my final examinations?
                </div>
              </div>
            </div>

            {/* Locked Chat Input overlay */}
            <div className="border-t border-white/[0.06] bg-[#0c0d10]/40 p-4 relative">
              <div className="absolute inset-0 bg-[#14161c]/85 backdrop-blur-[2px] flex items-center justify-center z-20">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#ff6b4a] flex items-center gap-2 bg-[#ff6b4a]/10 border border-[#ff6b4a]/20 px-4 py-2.5 rounded-xl">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                  RAG Pipeline under development • Connected LLM coming soon
                </p>
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  disabled
                  placeholder="Ask Gita GPT about duty, focus, anxiety..."
                  className="flex-1 rounded-xl border border-white/10 bg-[#0c0d10]/60 px-4 py-3 text-sm placeholder:text-stone-600 outline-none"
                />
                <button disabled className="rounded-xl bg-stone-800 p-3 text-stone-600">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Krishna Preaching Arjuna visual (Span 5) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          
          {/* Background orange glow */}
          <div className="absolute w-[280px] h-[280px] bg-gradient-to-tr from-[#ff6b4a]/20 to-[#ff9470]/5 rounded-full blur-[60px] opacity-60 pointer-events-none z-0" />
          
          {/* Animated Illustration wrapper */}
          <div className="relative w-full max-w-[360px] animate-float-slow z-10">
            
            {/* Glassmorphic border container */}
            <div className="rounded-3xl border border-white/[0.08] bg-[#14161c]/45 p-4 backdrop-blur-md shadow-2xl shadow-black/80 w-full">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-gradient-to-b from-[#1c1e24] to-[#0c0d10] border border-white/[0.04]">
                
                {/* Holographic overlay grid texture */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#ff6b4a]/5 to-[#ff9470]/10 pointer-events-none mix-blend-overlay z-20" />
                
                {/* Image element */}
                <img
                  src="/krishna_preaching_arjun.png"
                  alt="Lord Krishna Preaching Prince Arjuna"
                  className="w-full h-full object-cover select-none"
                />
                
                {/* Scanner bar animation */}
                <div className="absolute inset-x-0 h-[2px] bg-[#ff6b4a] shadow-[0_0_10px_#ff6b4a] pointer-events-none opacity-40 z-20 animate-[scan_4s_linear_infinite]" />

                {/* Live Hologram Tag */}
                <div className="absolute top-4 left-4 z-30">
                  <span className="flex items-center gap-1.5 rounded-lg bg-[#0c0d10]/85 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-[#ff9470] border border-white/[0.06] backdrop-blur-md uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b4a] animate-pulse" />
                    Scripture Anchor
                  </span>
                </div>
                
                {/* Quote details */}
                <div className="absolute bottom-4 left-4 right-4 z-30 space-y-1.5">
                  <div className="rounded-xl bg-[#0c0d10]/95 p-4.5 border border-white/[0.08] shadow-lg">
                    <p className="text-[10px] uppercase font-extrabold tracking-widest text-[#ff9470]">Gita Verse 2.47</p>
                    <p className="text-xs text-stone-200 mt-1 font-medium italic leading-relaxed">
                      &quot;Perform your prescribed duty without attachment to the fruits. Never consider yourself to be the cause of the results of your activities, and never be attached to not doing your duty.&quot;
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Aesthetic highlight corners */}
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-[#ff6b4a]/30 rounded-br-2xl pointer-events-none" />
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-[#ff6b4a]/30 rounded-tl-2xl pointer-events-none" />
          </div>

        </div>
      </main>
    </div>
  )
}

export default GitaGPT
