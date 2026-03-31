import { useEffect, useRef, useState, useMemo } from 'react'

type Project = {
  id: string
  title: string
  tagline: string
  description: string
  highlights: string[]
  stack: string[]
  links?: { label: string; href: string }[]
  featured?: boolean
}

const projects: Project[] = [
  {
    id: 'abhay-parth',
    title: 'Abhay Parth',
    tagline: 'AI learning companion for JEE/NEET aspirants',
    description:
      'An intelligent, conversation-first study partner that delivers real-time doubt solving, personalized learning pathways, and concept explanations sourced from trusted academic materials.',
    highlights: [
      'Real-time doubt solving with chain-of-thought reasoning',
      'Adaptive study plans that respond to performance signals',
      'Concept briefs with citations from curated sources',
    ],
    stack: ['React', 'TypeScript', 'Tailwind', 'Node', 'AI APIs'],
    links: [{ label: 'Case Study', href: '#work' }],
    featured: true,
  },
  {
    id: 'college-erp',
    title: 'College ERP Management System',
    tagline: 'Unified academic and administrative workflows',
    description:
      'A modular ERP that orchestrates student, faculty and course management with attendance tracking, hierarchical data models and an admin dashboard for precise control.',
    highlights: [
      'Schools → Programs → Semesters → Sections data model',
      'Role-based access for students, faculty, and admins',
      'Bulk operations and audit trails for compliance',
    ],
    stack: ['React', 'Flask', 'SQL', 'REST', 'JWT'],
    links: [{ label: 'Overview', href: '#work' }],
  },
  {
    id: 'future',
    title: 'Next Experiment',
    tagline: 'Placeholder for upcoming work',
    description:
      'A slot reserved for ongoing R&D in intelligent tutoring and retrieval-augmented learning systems. Experiments in multimodal explanations and self-assessment loops.',
    highlights: ['Exploratory architecture', 'Benchmarking pipelines', 'Human-in-the-loop evaluation'],
    stack: ['Python', 'PyTorch', 'Weaviate', 'Next.js'],
  },
]

const skills = {
  Programming: ['Python', 'JavaScript', 'TypeScript'],
  'Web Development': ['React', 'Flask', 'Vite', 'Tailwind CSS', 'REST APIs'],
  'AI / ML': ['Prompt Engineering', 'AI APIs', 'Model Integration', 'RAG'],
  'Tools & Database': ['Git', 'GitHub', 'SQL', 'Data Handling', 'Postman'],
}

const achievements = [
  {
    title: '3rd Prize — Dev Clash Hackathon (NIT Raipur)',
    detail: 'Built Abhay Parth — AI-powered learning platform for competitive exams.',
    meta: '2024 • Team of 4',
  },
  {
    title: 'Shortlisted — Humanitarian Hackathon (Symbiosis Pune)',
    detail: 'Led team InnoUnity as Team Leader under time constraints.',
    meta: '2024 • Top 12',
  },
  {
    title: 'Active in technical innovation events',
    detail: 'Consistent participation in hackathons and build sprints.',
    meta: '2023–2025',
  },
]

const research = [
  {
    title: 'Pollution Abatement: A Way to Live Healthier',
    focus: 'Pollution mitigation strategies and health impact analysis.',
    venue: 'Presented at RICCE 2024, MANIT Bhopal',
    points: [
      'Explored practical approaches to reduce pollution levels',
      'Analyzed correlation between pollution and public health',
      'Proposed sustainable solutions for improved quality of life',
    ],
  },
  {
    title: 'Mitigating Pollution: A Gateway to a Healthier Life',
    focus: 'AQI analysis across Indian cities with predictive insights and actionable mitigations.',
    venue: 'Presented at RAEMPS 2025 Conference',
    points: [
      'Collected and cleaned multi-year AQI datasets for major metros',
      'Forecasting models for short-term pollution spikes',
      'Policy and lifestyle recommendations based on spatial trends',
    ],
  },
  {
    title: 'From Chalkboards to Chatbots',
    focus: 'Transformation of education through AI: intelligent tutoring and personalized learning.',
    venue: 'Presented at Academic Conference',
    points: [
      'Survey of ITS architectures and learner modeling',
      'Design patterns for safe, cited explanations',
      'Prototype of adaptive questioning and spaced repetition',
    ],
  },
]

function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY
      const d = document.documentElement.scrollHeight - window.innerHeight
      setProgress(d > 0 ? Math.min(1, Math.max(0, s / d)) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return progress
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(id)
          })
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: [0, 1] }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [ids])
  return active
}

function cn(...classes: Array<string | boolean | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export default function App() {
  const progress = useScrollProgress()
  const sections = useMemo(() => ['home', 'achievements', 'research', 'work', 'skills', 'leadership', 'about', 'contact'], [])
  const active = useActiveSection(sections)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      el.style.setProperty('--mx', String(x))
      el.style.setProperty('--my', String(y))
    }
    el.addEventListener('mousemove', move)
    return () => el.removeEventListener('mousemove', move)
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('shreyajaiswal0575@gmail.com')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2200)
    } catch {}
  }

  return (
    <div className="min-h-screen bg-[#05060a] text-zinc-100 antialiased selection:bg-fuchsia-500/30 selection:text-white">
      <style>{`
        :root {
          --font-sans: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
          --font-display: Poppins, Inter, system-ui, sans-serif;
        }
        html { font-family: var(--font-sans); }
        h1,h2,.display { font-family: var(--font-display); letter-spacing: -0.02em; }
        * { scrollbar-width: thin; scrollbar-color: #6b7280 transparent; }
        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#7c3aed66,#2563eb66); border-radius: 999px; border: 2px solid #0b0c12; }
        .glass {
          background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));
          backdrop-filter: blur(12px) saturate(120%);
          -webkit-backdrop-filter: blur(12px) saturate(120%);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.05);
        }
        .grid-bg {
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse at center, black 60%, transparent 75%);
        }
        .glow {
          filter: blur(40px);
          opacity: .55;
        }
        .shine {
          position: relative;
          overflow: hidden;
        }
        .shine:before {
          content:"";
          position:absolute;
          inset:-200%;
          background: conic-gradient(from 0deg, transparent 0 20%, rgba(124,58,237,.5), rgba(37,99,235,.5), transparent 60% 100%);
          animation: spin 12s linear infinite;
          opacity: .25;
          pointer-events:none;
        }
        @keyframes spin { to { transform: rotate(1turn); } }
        @media (prefers-reduced-motion: reduce) {
          .shine:before { animation: none; }
        }
      `}</style>

      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(124,58,237,.25),transparent),radial-gradient(1000px_600px_at_90%_10%,rgba(37,99,235,.18),transparent),radial-gradient(800px_500px_at_50%_120%,rgba(14,165,233,.15),transparent)]" />
        <div className="absolute inset-0 opacity-[0.35] grid-bg" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[920px] rounded-full bg-gradient-to-r from-violet-600/30 to-sky-500/30 blur-[90px]" />
      </div>

      {/* Progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
        <div
          className="h-full w-full origin-left bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-500"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="#home" className="group inline-flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 to-sky-500 p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0a0b12] text-sm font-semibold tracking-wide">
                  SJ
                </div>
              </div>
              <div className="hidden sm:block">
                <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400">Portfolio</p>
                <p className="text-sm font-medium -mt-1">Shreya Jaiswal</p>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-1 py-1">
              {sections.slice(0, 7).map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={cn(
                    'relative rounded-full px-3.5 py-1.5 text-sm transition',
                    active === id ? 'text-white' : 'text-zinc-300 hover:text-white'
                  )}
                >
                  {active === id && (
                    <span className="absolute inset-0 rounded-full bg-white/10" />
                  )}
                  <span className="relative capitalize">{id === 'work' ? 'Projects' : id}</span>
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white text-black px-4 h-9 text-sm font-medium hover:bg-zinc-200 transition"
              >
                Contact
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
              <button
                className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
              </button>
            </div>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/70 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 py-3 grid grid-cols-2 gap-2">
              {sections.slice(0, 8).map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm capitalize"
                >
                  {id === 'work' ? 'Projects' : id}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" ref={heroRef} className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16">
          <div className="relative isolate overflow-hidden rounded-[28px] border border-white/10 glass shine">
            <div className="absolute -top-24 -right-24 h-[380px] w-[380px] rounded-full bg-violet-600/25 glow" />
            <div className="absolute -bottom-28 -left-28 h-[420px] w-[420px] rounded-full bg-sky-500/20 glow" />
            <div
              className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-8 p-6 sm:p-10 lg:p-14"
              style={{
                transform: 'perspective(1200px) rotateX(calc(var(--my,0)*3deg)) rotateY(calc(var(--mx,0)*-3deg))',
                transition: 'transform 200ms ease-out',
              } as React.CSSProperties}
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-wide text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open to internships • Bhopal, India
                </div>
                <h1 className="display mt-5 text-4xl sm:text-5xl lg:text-[56px] font-[700] leading-[1.05]">
                  Designing Intelligent Systems
                  <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-sky-300 bg-clip-text text-transparent">
                    for Smarter Learning
                  </span>
                </h1>
                <p className="mt-5 max-w-xl text-zinc-300 text-base sm:text-lg">
                  AI-focused developer building impactful solutions for education and real-world challenges. B.Tech Computer Science student with a bias for shipping.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href="#work"
                    className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-5 h-11 text-sm font-semibold hover:bg-zinc-200 transition"
                  >
                    Explore Work
                    <svg className="transition translate-x-0 group-hover:translate-x-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 h-11 text-sm font-medium text-white hover:bg-white/10 transition"
                  >
                    Contact Me
                  </a>
                  <button
                    onClick={copyEmail}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 h-11 text-sm text-zinc-300 hover:text-white hover:border-white/20 transition"
                    title="Copy email"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    Copy email
                  </button>
                </div>

                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
                  {[
                    { k: 'AI Developer', v: 'RAG • APIs • Prompting' },
                    { k: 'Web Dev', v: 'React • Flask • TS' },
                    { k: 'Location', v: 'Bhopal, India' },
                    { k: 'Focus', v: 'Education • Impact' },
                  ].map((item) => (
                    <div key={item.k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                      <p className="text-[10px] uppercase tracking-widest text-zinc-400">{item.k}</p>
                      <p className="mt-1 text-sm font-medium">{item.v}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative mx-auto aspect-[4/3] max-w-[520px] overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                  <div className="absolute inset-0 grid-bg opacity-40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[82%] rounded-2xl border border-white/10 bg-black/60 p-4 shadow-2xl">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                        <p className="ml-auto text-[11px] text-zinc-400">abhay-parth • preview</p>
                      </div>
                      <div className="mt-3 grid grid-cols-12 gap-3">
                        <div className="col-span-5 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                          <p className="text-[10px] uppercase tracking-widest text-zinc-400">Concept</p>
                          <p className="mt-1 text-sm font-medium">JEE • Thermodynamics</p>
                          <div className="mt-3 h-20 rounded-lg bg-gradient-to-br from-violet-600/30 to-sky-600/30" />
                          <div className="mt-3 space-y-2">
                            <div className="h-2 w-3/4 rounded bg-white/10" />
                            <div className="h-2 w-2/3 rounded bg-white/10" />
                            <div className="h-2 w-1/2 rounded bg-white/10" />
                          </div>
                        </div>
                        <div className="col-span-7 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V5a2 2 0 0 1 2-2h14a4 4 0 0 1 4 4z"/></svg>
                            Live assistant
                          </div>
                          <div className="mt-3 space-y-3 text-sm">
                            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                              Why does entropy increase in an isolated system?
                            </div>
                            <div className="rounded-lg border border-white/10 bg-black/40 p-3">
                              Because the number of accessible microstates grows, increasing disorder as per the second law. Formally, ΔS ≥ 0 for isolated systems reaching equilibrium…
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              {['Step-by-step', 'Worked examples', 'Citations'].map((b) => (
                                <div key={b} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5 text-[11px] text-zinc-300 text-center">{b}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-[11px] text-zinc-400">
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/> RAG enabled</span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1">Latency ~ 320ms</span>
                        <span className="ml-auto">v0.2.1</span>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -right-10 -bottom-10 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
                  <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-[12px] text-zinc-400">
            <span className="uppercase tracking-widest">Trusted by hackathons</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            <div className="flex items-center gap-6 opacity-80">
              <span className="font-medium tracking-wide">NIT Raipur</span>
              <span className="font-medium tracking-wide">Symbiosis Pune</span>
              <span className="font-medium tracking-wide">Innovation Labs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">Highlights</p>
              <h2 className="display text-3xl sm:text-4xl font-bold mt-2">Achievements</h2>
            </div>
            <p className="max-w-xl text-zinc-400">Recognition for building under constraints, leading teams, and shipping AI products that matter.</p>
          </div>

          <div className="mt-10 grid gap-5 sm:gap-6 md:grid-cols-3">
            {achievements.map((a, i) => (
              <div
                key={a.title}
                className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-[1px]"
                style={{ transform: `translateY(${i === 1 ? -8 : 0}px)` }}
              >
                <div className="relative rounded-[23px] h-full glass p-6">
                  <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-violet-600/25 blur-2xl" />
                  <div className="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-sky-500/20 blur-2xl" />
                  <div className="flex items-start gap-3">
                    <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/10">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10l1 5H6l1-5z"/><path d="M7 4L5 2M17 4l2-2M9 9h6"/></svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold leading-snug">{a.title}</h3>
                      <p className="mt-1 text-sm text-zinc-300">{a.detail}</p>
                      <p className="mt-3 text-[11px] uppercase tracking-widest text-zinc-400">{a.meta}</p>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-2 text-[11px]">
                    {['Impact', 'Leadership', 'Speed'].map((t) => (
                      <div key={t} className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1.5 text-center text-zinc-300">{t}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research */}
      <section id="research" className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">Research</p>
              <h2 className="display text-3xl sm:text-4xl font-bold mt-2">Selected Work</h2>
            </div>
            <p className="max-w-xl text-zinc-400">Analytical depth and systems thinking applied to AI in education and environmental data.</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {research.map((r) => (
              <article key={r.title} className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-[1px]">
                <div className="rounded-[27px] glass p-6 sm:p-8 h-full">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl font-semibold leading-snug">{r.title}</h3>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-300">{r.venue}</span>
                  </div>
                  <p className="mt-3 text-zinc-300">{r.focus}</p>
                  <ul className="mt-5 grid gap-3">
                    {r.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-md border border-white/10 bg-white/5">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>
                        </span>
                        <span className="text-sm text-zinc-200">{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-zinc-400">
                    {['Analysis', 'Modeling', 'Writing'].map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="work" className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">Projects</p>
              <h2 className="display text-3xl sm:text-4xl font-bold mt-2">Building Intelligent Products</h2>
            </div>
            <a href="#contact" className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 h-10 text-sm">Collaborate</a>
          </div>

          <div className="mt-10 grid gap-6">
            {projects.map((p) => (
              <div
                key={p.id}
                className={cn(
                  'relative overflow-hidden rounded-[30px] border border-white/10',
                  p.featured ? 'bg-gradient-to-b from-white/[0.08] to-white/[0.02]' : 'bg-white/[0.03]'
                )}
              >
                <div className={cn('relative glass p-6 sm:p-8', p.featured && 'shine')}>
                  <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
                  <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" />
                  <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/10">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v10a2 2 0 0 0 2 2h3"/><path d="M21 7V5a2 2 0 0 0-2-2h-3"/><path d="M21 17v-4M3 7h18M11 7v10"/></svg>
                        </span>
                        <div>
                          <h3 className="text-2xl font-semibold">{p.title}</h3>
                          <p className="text-sm text-zinc-300">{p.tagline}</p>
                        </div>
                        {p.featured && (
                          <span className="ml-auto rounded-full bg-white text-black px-2.5 py-1 text-[11px] font-semibold">Featured</span>
                        )}
                      </div>

                      <p className="mt-4 text-zinc-300 max-w-2xl">{p.description}</p>

                      <ul className="mt-5 grid gap-3">
                        {p.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-3">
                            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md border border-white/10 bg-white/5">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>
                            </span>
                            <span className="text-sm text-zinc-200">{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <span key={s} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[12px] text-zinc-200">{s}</span>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        {(p.links ?? []).map((l) => (
                          <a
                            key={l.label}
                            href={l.href}
                            className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 h-10 text-sm font-medium hover:bg-zinc-200"
                          >
                            {l.label}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                          </a>
                        ))}
                        <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 h-10 text-sm">Request demo</a>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="relative mx-auto aspect-[4/3] w-full max-w-[520px] overflow-hidden rounded-[24px] border border-white/10 bg-black/50">
                        <div className="absolute inset-0 grid-bg opacity-25" />
                        {/* Visual mock per project */}
                        {p.id === 'abhay-parth' && (
                          <div className="absolute inset-0 p-5 flex flex-col">
                            <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Assistant online
                              <span className="ml-auto">JEE • Physics</span>
                            </div>
                            <div className="mt-4 grid grid-cols-12 gap-3 flex-1">
                              <div className="col-span-5 rounded-xl border border-white/10 bg-white/[0.05] p-3">
                                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Path</p>
                                <div className="mt-2 space-y-2">
                                  {['Basics','Work-energy','Rotational','Mock test'].map((t,i)=>(
                                    <div key={t} className={cn('rounded-lg px-3 py-2 text-sm border', i===1 ? 'bg-white text-black border-white' : 'border-white/10 bg-white/[0.03] text-zinc-200')}>{t}</div>
                                  ))}
                                </div>
                              </div>
                              <div className="col-span-7 rounded-xl border border-white/10 bg-white/[0.03] p-3 flex flex-col">
                                <div className="flex-1 space-y-2 overflow-hidden">
                                  <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-sm">Explain work-energy theorem with example.</div>
                                  <div className="rounded-lg bg-black/40 border border-white/10 p-3 text-sm">The net work done by all forces equals change in kinetic energy: W = ΔK. Consider a 2kg block pushed by 10N over 5m…</div>
                                  <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-xs text-zinc-300">Sources: NCERT Class 11 • HC Verma Ch.8</div>
                                </div>
                                <div className="mt-3 flex items-center gap-2">
                                  <input className="flex-1 rounded-lg bg-black/60 border border-white/10 px-3 py-2 text-sm outline-none placeholder:text-zinc-500" placeholder="Ask a doubt…" disabled />
                                  <button className="rounded-lg bg-white text-black px-3 py-2 text-sm font-medium">Send</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {p.id === 'college-erp' && (
                          <div className="absolute inset-0 p-5">
                            <div className="grid grid-cols-12 gap-3 h-full">
                              <div className="col-span-4 rounded-xl border border-white/10 bg-white/[0.05] p-3">
                                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Hierarchy</p>
                                <div className="mt-3 space-y-2 text-sm">
                                  {['School of Engineering','B.Tech CSE','Semester 5','Section A'].map((t,i)=>(
                                    <div key={t} className="flex items-center gap-2">
                                      <span className={cn('h-2 w-2 rounded-full', i<2 ? 'bg-sky-400' : 'bg-zinc-500')} />
                                      <span className="text-zinc-200">{t}</span>
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-4 rounded-lg bg-black/40 border border-white/10 p-2 text-[11px] text-zinc-400">Records sync • last 2m ago</div>
                              </div>
                              <div className="col-span-8 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                                <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                                  <span>Dashboard</span><span className="ml-auto">2025-26</span>
                                </div>
                                <div className="mt-3 grid grid-cols-3 gap-2">
                                  {[
                                    {k:'Students',v:'1,284'},
                                    {k:'Faculty',v:'96'},
                                    {k:'Attendance',v:'92.4%'}
                                  ].map(m=>(
                                    <div key={m.k} className="rounded-lg border border-white/10 bg-black/40 p-3">
                                      <p className="text-[10px] uppercase tracking-widest text-zinc-500">{m.k}</p>
                                      <p className="mt-1 text-lg font-semibold">{m.v}</p>
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-3 h-[140px] rounded-lg border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent relative overflow-hidden">
                                  <div className="absolute inset-0 grid-bg opacity-20" />
                                  <svg viewBox="0 0 400 140" className="absolute inset-0 w-full h-full">
                                    <path d="M0,100 C40,80 80,120 120,90 C160,60 200,110 240,80 C280,50 320,90 360,60 C380,50 400,55 400,55" fill="none" stroke="url(#g)" strokeWidth="3"/>
                                    <defs>
                                      <linearGradient id="g" x1="0" x2="1">
                                        <stop offset="0%" stopColor="#8b5cf6"/>
                                        <stop offset="100%" stopColor="#38bdf8"/>
                                      </linearGradient>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {p.id === 'future' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400">Next</p>
                              <p className="mt-1 text-2xl font-semibold">Intelligent Tutoring • RAG</p>
                              <p className="mt-2 text-sm text-zinc-400 max-w-sm mx-auto">Exploring multimodal explanations, automated assessment, and human-in-the-loop refinement.</p>
                            </div>
                          </div>
                        )}
                        <div className="pointer-events-none absolute -right-10 -bottom-10 h-44 w-44 rounded-full bg-fuchsia-500/20 blur-3xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">Skills</p>
              <h2 className="display text-3xl sm:text-4xl font-bold mt-2">Stack & Capabilities</h2>
            </div>
            <p className="max-w-xl text-zinc-400">Focus on fundamentals with practical integration of modern AI and web technologies.</p>
          </div>

          <div className="mt-10 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(skills).map(([group, list]) => (
              <div key={group} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-[1px]">
                <div className="rounded-[23px] glass p-5 h-full">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 border border-white/10">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v18"/><path d="M3 12h18"/></svg>
                    </span>
                    <h3 className="font-semibold">{group}</h3>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {list.map((s) => (
                      <span key={s} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[12px] text-zinc-200">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-gradient-to-r from-white/[0.06] to-white/[0.02] p-[1px]">
            <div className="rounded-[23px] glass p-5 flex flex-wrap items-center gap-4">
              <span className="text-[11px] uppercase tracking-widest text-zinc-400">Highlights</span>
              <div className="h-px flex-1 bg-white/10 hidden sm:block" />
              <div className="flex flex-wrap gap-2">
                {['Clean architecture','Prompt engineering','API design','Performance','Accessibility'].map((t) => (
                  <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-[12px]">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">Leadership</p>
              <h2 className="display text-3xl sm:text-4xl font-bold mt-2">Team Leader — InnoUnity</h2>
              <p className="mt-4 text-zinc-300 max-w-xl">
                Led a focused team at the Humanitarian Hackathon (Symbiosis Pune), coordinating research, architecture, and rapid prototyping to deliver impactful solutions under time constraints.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 max-w-md">
                {[
                  {k:'Role', v:'Planning • Delivery'},
                  {k:'Outcome', v:'Shortlisted'},
                  {k:'Focus', v:'Education • Impact'},
                  {k:'Strength', v:'Clear communication'},
                ].map((x) => (
                  <div key={x.k} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400">{x.k}</p>
                    <p className="mt-1 text-sm font-medium">{x.v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-[28px] border border-white/10 bg-white/[0.03] p-[1px]">
              <div className="rounded-[27px] glass p-6 sm:p-8">
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { title: 'Discovery', desc: 'Problem framing and user mapping' },
                    { title: 'Prototype', desc: 'Rapid build with AI integration' },
                    { title: 'Narrative', desc: 'Clear demo and measurable outcomes' },
                  ].map((s) => (
                    <div key={s.title} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                      <p className="text-sm font-semibold">{s.title}</p>
                      <p className="mt-1 text-sm text-zinc-300">{s.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[11px] uppercase tracking-widest text-zinc-400">Approach</p>
                  <p className="mt-2 text-sm text-zinc-200">
                    Divide the challenge into verifiable milestones, prioritize high-impact features, maintain a tight feedback loop, and communicate decisions clearly to keep momentum high.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] p-[1px]">
            <div className="rounded-[29px] glass p-6 sm:p-10">
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
              <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" />
              <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">About</p>
                  <h2 className="display text-3xl sm:text-4xl font-bold mt-2">Clarity, craft, and real impact</h2>
                  <p className="mt-4 text-zinc-300 max-w-2xl">
                    I am a Computer Science student passionate about artificial intelligence and innovation. I focus on building intelligent, scalable systems that enhance learning experiences and solve meaningful real-world problems.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {['Detail-oriented','Systems thinker','Fast learner'].map((t)=>(
                      <span key={t} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[12px]">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="rounded-2xl border border-white/10 bg-black/50 p-5">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {k:'Focus', v:'Education AI'},
                        {k:'Location', v:'Bhopal, India'},
                        {k:'Open to', v:'Internships'},
                      ].map((m)=>(
                        <div key={m.k} className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
                          <p className="text-[10px] uppercase tracking-widest text-zinc-400">{m.k}</p>
                          <p className="mt-1 font-medium">{m.v}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 h-px w-full bg-white/10" />
                    <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                        <p className="text-zinc-400 text-[12px]">Email</p>
                        <p className="mt-1 font-medium break-all">shreyajaiswal0575@gmail.com</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                        <p className="text-zinc-400 text-[12px]">Phone</p>
                        <p className="mt-1 font-medium">+91 7389915967</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-[1px]">
            <div className="rounded-[29px] glass p-6 sm:p-10 shine">
              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-fuchsia-600/20 blur-3xl" />
              <div className="absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-sky-600/20 blur-3xl" />
              <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">Contact</p>
                  <h2 className="display text-3xl sm:text-4xl font-bold mt-2">Let’s build something meaningful</h2>
                  <p className="mt-4 text-zinc-300 max-w-xl">
                    Interested in collaboration, internships, or a quick chat about AI in education? I’m open to new opportunities and thoughtful conversations.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a href="mailto:shreyajaiswal0575@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 h-11 text-sm font-semibold hover:bg-zinc-200">
                      Email me
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z"/><path d="m22 6-10 7L2 6"/></svg>
                    </a>
                    <button onClick={copyEmail} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 h-11 text-sm">
                      Copy email
                    </button>
                    <a href="tel:+917389915967" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 h-11 text-sm text-zinc-200 hover:text-white">
                      +91 7389915967
                    </a>
                  </div>
                  <div className="mt-6 flex items-center gap-4 text-zinc-400">
                    <span className="text-[11px] uppercase tracking-widest">Social</span>
                    <div className="h-px w-16 bg-white/10" />
                    <div className="flex items-center gap-3">
                      {[
                        {label:'GitHub', icon:'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'},
                        {label:'LinkedIn', icon:'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'},
                        {label:'Twitter', icon:'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z'},
                      ].map((s)=>(
                        <a key={s.label} href="#" aria-label={s.label} className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={(e) => { e.preventDefault(); setShowToast(true); setTimeout(()=>setShowToast(false), 2200) }}
                  className="rounded-2xl border border-white/10 bg-black/50 p-5"
                >
                  <div className="grid gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="grid gap-1 text-sm">
                        <span className="text-zinc-400">Name</span>
                        <input required className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-3 outline-none focus:border-violet-500/50" placeholder="Your name" />
                      </label>
                      <label className="grid gap-1 text-sm">
                        <span className="text-zinc-400">Email</span>
                        <input required type="email" className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-3 outline-none focus:border-violet-500/50" placeholder="you@domain.com" />
                      </label>
                    </div>
                    <label className="grid gap-1 text-sm">
                      <span className="text-zinc-400">Message</span>
                      <textarea required rows={4} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 outline-none focus:border-violet-500/50" placeholder="Tell me about your project…" />
                    </label>
                    <div className="flex items-center gap-3">
                      <button className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 h-11 text-sm font-semibold hover:bg-zinc-200">
                        Send message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg>
                      </button>
                      <span className="text-[12px] text-zinc-500">I usually reply within 24 hours.</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 to-sky-500 p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0a0b12] text-sm font-semibold">SJ</div>
              </div>
              <div>
                <p className="font-medium leading-tight">Shreya Jaiswal</p>
                <p className="text-[12px] text-zinc-400">AI Developer • Web Developer • B.Tech CSE</p>
              </div>
            </div>
            <div className="text-sm text-zinc-400">
              © {new Date().getFullYear()} Shreya Jaiswal. Built with React, Vite, and Tailwind.
            </div>
          </div>
        </div>
      </footer>

      {/* Toast */}
      <div
        className={cn(
          'fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] transition-all',
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
        )}
      >
        <div className="rounded-full border border-white/10 bg-black/80 backdrop-blur-xl px-4 py-2 text-sm shadow-2xl">
          Email copied to clipboard.
        </div>
      </div>
    </div>
  )
}