import React, { useEffect, useRef, useState } from 'react'

// Minimal, stable build: no framer-motion, no object-destructuring in code

// ----------------- DATA -----------------
const links = {
  resume: '/Krish_Jakhar_Resume.pdf',
  github: 'https://github.com/krish10007',
  linkedin: 'https://www.linkedin.com/in/krishjakhar/',
  email: 'mailto:krishjakhar60@gmail.com',
  youtube: 'https://www.youtube.com/@KrishJakhar7'
}

const projects = [
  {
    title: 'AI Resume Screener',
    blurb:
      'A Flask-based web app that uses TF-IDF + cosine similarity to match resumes with job descriptions and generate relevance scores.',
    tags: ['Python', 'Flask', 'NLP', 'TF-IDF', 'Cosine'],
    repo: 'https://github.com/krish10007/AI_Resume_Screener',
    demo: '',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop' // resume/paperwork desk
  },
  {
    title: 'Collaborative Notes App',
    blurb:
      'Google Docs-lite: multiple users edit simultaneously using React + WebSockets + CRDT (Yjs). Offline-first with live presence.',
    tags: ['React', 'WebSockets', 'Yjs', 'CRDT'],
    repo: 'https://github.com/krish10007/Real-Time-Collaborative-Notes-App',
    demo: '',
    image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1600&auto=format&fit=crop' // collaboration laptops
  },
  {
    title: 'Serverless URL Shortener',
    blurb:
      'Bit.ly-style short links with analytics on AWS (API Gateway, Lambda, DynamoDB, CDK). Scalable and cost-efficient.',
    tags: ['AWS', 'API Gateway', 'Lambda', 'DynamoDB', 'CDK'],
    repo: 'https://github.com/krish10007/ServerlessURLShortner',
    demo: '',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop' // code screen
  }
]

const videos = [
  {
    title: '2 Years of Computer Science in 5 minutes',
    date: '',
    url: 'https://www.youtube.com/watch?v=B-QAd1IvyNg',
    thumb: 'https://img.youtube.com/vi/B-QAd1IvyNg/hqdefault.jpg'
  },
  {
    title: 'College + Big Goals',
    date: '',
    url: 'https://www.youtube.com/watch?v=qWLTOyyGBIA',
    thumb: 'https://img.youtube.com/vi/qWLTOyyGBIA/hqdefault.jpg'
  },
  {
    title: 'This is what coding with AI really looks like',
    date: '',
    url: 'https://www.youtube.com/watch?v=VHwFomOrYH8',
    thumb: 'https://img.youtube.com/vi/VHwFomOrYH8/hqdefault.jpg'
  }
]

const startups = [
  {
    title: 'MatchMyResume',
    status: 'In Build · Launching Dec 16',
    blurb:
      'Compare a resume against a job description in seconds. Clear score, highlights, and rewrite suggestions. Simple, fast, useful.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
    waitlist: '#',
    progress: 'https://www.youtube.com/@KrishJakhar7'
  }
]

const milestones = [
  { when: '2023', what: 'Started pursuing Computer Science' },
  { when: '2024', what: 'Web Dev & Marketing Intern — The Knowledge Shop' },
  { when: '2025', what: 'Passed AWS Solutions Architect; started YouTube channel' },
  { when: '2026', what: 'Building startups, creating more content; targeting tech roles' }
]

// ----------------- PAGE -----------------
export default function KrishPortfolioSite() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const whiteRef = useRef(null)

  useEffect(function () {
    function onScroll() { setScrolled(window.scrollY > 4) }
    onScroll()
    window.addEventListener('scroll', onScroll)
    document.documentElement.style.scrollBehavior = 'smooth'
    return function () { window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <div className="min-h-screen font-sans text-slate-900">
      <Header scrolled={scrolled} open={open} setOpen={setOpen} />

      {/* Hero */}
      <section id="intro" className="relative h-screen bg-black text-white overflow-hidden">
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 select-none">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">I’m Krish.</h1>
          <p className="mt-4 text-xl sm:text-2xl md:text-3xl text-white/80">A Developer, Creator, and Founder.</p>
          <div className="absolute bottom-10 flex flex-col items-center text-white/70">
            <span className="text-xs tracking-[0.2em]">SCROLL TO EXPLORE</span>
            <span className="mt-2 animate-bounce text-2xl">↓</span>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.6\'/></svg>")' }} />
      </section>

      {/* White content */}
      <div ref={whiteRef} className="bg-white text-slate-900">
        <AboutSection />
        <Divider />
        <ProjectsSection />
        <Divider />
        <StartupsSection />
        <Divider />
        <YouTubeSection />
        <Divider />
        <TimelineSection />
        <Divider />
        <ContactSection />
      </div>
    </div>
  )
}

// ----------------- SECTIONS -----------------
function Header(props) {
  const scrolled = props.scrolled
  const open = props.open
  const setOpen = props.setOpen
  return (
    <header className={'fixed top-0 left-0 right-0 z-30 transition-all ' + (scrolled ? 'bg-white/5 backdrop-blur-sm border-b border-white/10' : 'bg-transparent')}>
      <div className="mx-auto max-w-7xl px-5 py-4 grid grid-cols-3 items-center">
        {/* Left: brand */}
        <div className="flex items-center gap-3 text-white">
          <a href="#intro" aria-label="Home" className="flex items-center gap-3 group">
            <span className="relative inline-flex h-4 w-4" aria-hidden>
              <span className="absolute inline-flex h-full w-full rounded-full bg-white/80" />
              <span className="absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75 animate-ping" />
            </span>
            <span className="text-sm tracking-wider text-white/90 group-hover:text-white transition">KRISH</span>
          </a>
        </div>

        {/* Center: nav perfectly centered */}
        <nav className="hidden md:flex items-center justify-center gap-8 text-sm text-white col-start-2 col-end-3">
          <a href="#about" className="hover:opacity-90">About</a>
          <a href="#projects" className="hover:opacity-90">Projects</a>
          <a href="#startups" className="hover:opacity-90">Startups</a>
          <a href="#videos" className="hover:opacity-90">Videos</a>
          <a href="#timeline" className="hover:opacity-90">Timeline</a>
          <a href={links.resume} target="_blank" rel="noopener noreferrer" download className="hover:opacity-90">Resume</a>
        </nav>

        {/* Right: icon buttons (old style) */}
        <div className="hidden md:flex items-center justify-end gap-3 text-white">
          <a href={links.resume} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:border-white/40" title="Resume" download>
            {/* download icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:border-white/40" title="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 .5C5.73.5.77 5.46.77 11.73c0 4.9 3.17 9.06 7.57 10.53.55.1.75-.24.75-.53v-1.86c-3.08.67-3.73-1.3-3.73-1.3-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.08-.67.08-.67 1.09.08 1.66 1.12 1.66 1.12.97 1.66 2.55 1.18 3.17.9.1-.7.38-1.18.69-1.45-2.46-.28-5.05-1.23-5.05-5.49 0-1.21.43-2.2 1.12-2.98-.11-.28-.49-1.41.11-2.94 0 0 .93-.3 3.05 1.13a10.5 10.5 0 0 1 5.56 0c2.12-1.43 3.05-1.13 3.05-1.13.6 1.53.22 2.66.11 2.94.69.78 1.12 1.77 1.12 2.98 0 4.27-2.59 5.2-5.06 5.48.39.34.73 1 .73 2.02v2.99c0 .29.2.64.76.53 4.39-1.47 7.56-5.63 7.56-10.53C23.23 5.46 18.27.5 12 .5z"/></svg>
          </a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:border-white/40" title="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8.5h4V24h-4V8.5zM8 8.5h3.8v2.1h.1c.5-1 1.8-2.1 3.7-2.1 3.9 0 4.6 2.6 4.6 6V24h-4v-6.4c0-1.5 0-3.5-2.1-3.5s-2.4 1.7-2.4 3.4V24H8V8.5z"/></svg>
          </a>
          <a href="#contact" className="ml-1 text-xs rounded-full px-4 py-2 border border-white/20 hover:border-white/40 text-white/85 hover:text-white transition">Contact</a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center justify-end">
          <button onClick={function () { setOpen(!open) }} className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-white/15 hover:border-white/30" aria-label="Open menu">
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className={'block h-0.5 w-5 bg-white transition ' + (open ? 'rotate-45 translate-y-1.5' : '')}></span>
              <span className={'block h-0.5 w-5 bg-white transition ' + (open ? 'opacity-0' : '')}></span>
              <span className={'block h-0.5 w-5 bg-white transition ' + (open ? '-rotate-45 -translate-y-1.5' : '')}></span>
            </div>
          </button>
        </div>
      </div>
      {/* Mobile dropdown */}
      <div className={'md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ' + (open ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0')}>
        <div className="px-5 pb-4 pt-0 text-white">
          <ul className="flex flex-col gap-3 text-sm">
            <li><a onClick={function () { setOpen(false) }} href="#about" className="block py-2 text-white/80 hover:text-white">About</a></li>
            <li><a onClick={function () { setOpen(false) }} href="#projects" className="block py-2 text-white/80 hover:text-white">Projects</a></li>
            <li><a onClick={function () { setOpen(false) }} href="#startups" className="block py-2 text-white/80 hover:text-white">Startups</a></li>
            <li><a onClick={function () { setOpen(false) }} href="#videos" className="block py-2 text-white/80 hover:text-white">Videos</a></li>
            <li><a onClick={function () { setOpen(false) }} href="#timeline" className="block py-2 text-white/80 hover:text-white">Timeline</a></li>
            <li><a onClick={function () { setOpen(false) }} href={links.resume} className="block py-2 text-white/90 hover:text-white">Resume ↗</a></li>
            <li className="pt-1"><a onClick={function () { setOpen(false) }} href={links.email} className="inline-flex items-center gap-2 py-2 text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>Email</a></li>
          </ul>
        </div>
      </div>
    </header>
  )
}

function AboutSection() {
  return (
    <section id="about" className="px-6 md:px-12 lg:px-16 pt-16 md:pt-24 pb-16 md:pb-24">
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Turning ideas into real products.</h2>
          <p className="mt-4 text-lg md:text-xl text-slate-600">I’m Krish, a CS student at CUNY Queens College focused on Software Engineering and Cloud. I design, build, and ship practical tools — from AI APIs with Flask to full‑stack web apps on AWS.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={links.resume} target="_blank" rel="noopener noreferrer" download className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-50">Resume ↓</a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800">LinkedIn →</a>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 shadow-sm p-6 bg-white">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-300" />
            <div>
              <div className="font-semibold">Krish Jakhar</div>
              <div className="text-slate-500 text-sm">Developer · Creator · Founder</div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <Stat kpi="4+" label="Projects" />
            <Stat kpi="AWS" label="SAA Passed" />
            <Stat kpi="NYC" label="Based" />
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h3 className="text-2xl md:text-3xl font-bold">Featured Projects</h3>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(function (p) { return <ProjectCard key={p.title} item={p} /> })}
        </div>
      </div>
    </section>
  )
}

function StartupsSection() {
  return (
    <section id="startups" className="px-6 md:px-12 lg:px-16 py-12 md:py-16 bg-white">
      <div className="mx-auto max-w-7xl">
        <h3 className="text-2xl md:text-3xl font-bold">Startups</h3>
        <p className="mt-2 text-slate-600">Things I’m building and shipping.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {startups.map(function (s) {
            return (
              <div key={s.title} className="group overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm hover:shadow-lg transition">
                <div className="relative">
                  <img src={s.image} alt={s.title} className="h-44 w-full object-cover" />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> {s.status}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold">{s.title}</h4>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href={s.waitlist} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-50">Join Waitlist</a>
                    <a href={s.progress} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-50">Watch Progress</a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function YouTubeSection() {
  return (
    <section id="videos" className="px-6 md:px-12 lg:px-16 py-16 md:py-24 bg-[#F8FAFF]">
      <div className="mx-auto max-w-7xl">
        <h3 className="text-2xl md:text-3xl font-bold">Latest Videos</h3>
        <p className="mt-2 text-slate-600">Documenting the journey — building, learning, and life in NYC.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map(function (v) {
            return (
              <a key={v.title} href={v.url} target="_blank" rel="noopener noreferrer" className="group">
                <div className="relative overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm">
                  <img src={v.thumb} alt={v.title} className="h-44 w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div>
                      <div className="text-white text-sm font-semibold drop-shadow">{v.title}</div>
                      {v.date ? <div className="text-white/80 text-xs drop-shadow">{new Date(v.date).toLocaleDateString()}</div> : null}
                    </div>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-900">▶</span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
        <div className="mt-6">
          <a href={links.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-800 hover:text-slate-900">
            <span>See all on YouTube</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function TimelineSection() {
  return (
    <section id="timeline" className="px-6 md:px-12 lg:px-16 py-16 md:py-24 bg-[#F8FAFF]">
      <div className="mx-auto max-w-5xl">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">Timeline of Progress</h3>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-slate-200" />
          {milestones.map(function (t, idx) {
            return (
              <div key={idx} className={'relative mb-10 md:mb-14 md:w-1/2 ' + (idx % 2 ? 'md:ml-auto md:pl-8' : 'md:pr-8')}>
                <div className="absolute left-0 md:left-auto md:right-full md:translate-x-1/2 top-2 w-2 h-2 bg-[#6AA3FF] rounded-full shadow" />
                <div className="p-5 rounded-xl bg-white ring-1 ring-slate-200">
                  <div className="text-xs uppercase tracking-wide text-slate-500">{t.when}</div>
                  <div className="mt-1 font-medium">{t.what}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="px-6 md:px-12 lg:px-16 py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-4xl text-center">
        <h3 className="text-2xl md:text-3xl font-bold">Let’s Connect</h3>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto">Always open to SWE/Cloud internships, collabs, or feedback on my products. If something here resonates, reach out — I reply fast.</p>
        <div className="mt-7 flex flex-wrap gap-3 justify-center">
          <a href={links.email} className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800">Email Me</a>
          <a href={links.resume} target="_blank" rel="noopener noreferrer" download className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-50">Download Resume</a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-50">LinkedIn</a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-50">GitHub</a>
        </div>
        <p className="mt-8 text-center text-xs text-slate-500">© {new Date().getFullYear()} Krish Jakhar</p>
      </div>
    </section>
  )
}

// ----------------- REUSABLE UI -----------------
function Divider() { return <div className="border-t border-slate-200" /> }

function Stat(props) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="text-2xl font-extrabold">{props.kpi}</div>
      <div className="text-slate-500 text-xs mt-1">{props.label}</div>
    </div>
  )
}

function ProjectCard(props) {
  const p = props.item
  return (
    <div className="p-0 rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden">
      {p.image ? (
        <img src={p.image} alt={p.title} className="h-36 w-full object-cover" />
      ) : (
        <div className="h-36 w-full bg-gradient-to-br from-[#6AA3FF]/20 via-[#A48CF6]/20 to-[#67E8F9]/20 ring-1 ring-slate-200" />
      )}
      <div className="p-6">
        <h4 className="text-lg font-semibold">{p.title}</h4>
        <p className="mt-1 text-slate-600 text-sm leading-relaxed">{p.blurb}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.tags.map(function (t) { return <span key={t} className="px-3 py-1.5 rounded-full text-xs bg-slate-100 text-slate-700 ring-1 ring-slate-200">{t}</span> })}
        </div>
        <div className="mt-4 flex items-center gap-3">
          {p.repo ? <a href={p.repo} target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:text-slate-900 inline-flex items-center gap-1 text-sm"><span>View Repo</span><span>→</span></a> : null}
          {p.demo ? <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:text-slate-900 inline-flex items-center gap-1 text-sm"><span>Live Demo</span><span>↗</span></a> : null}
        </div>
      </div>
    </div>
  )
}
