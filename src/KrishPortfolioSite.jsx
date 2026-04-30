import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Download, Mail, ArrowDown } from "lucide-react";

// Brand icons not in this version of lucide-react — using inline SVGs (stroke-based to match lucide style)
function GithubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}
function LinkedinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// ----------------- ANIMATION -----------------
const FadeIn = ({ children, delay = 0, direction = "up", className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ----------------- DATA -----------------
const links = {
  resume: "/Krish_Jakhar_Resume.pdf",
  github: "https://github.com/krish10007",
  linkedin: "https://www.linkedin.com/in/krishjakhar/",
  email: "mailto:krishjakhar60@gmail.com",
  youtube: "https://www.youtube.com/@KrishJakhar7",
};

const projects = [
  {
    name: "AI Resume Screener",
    description:
      "A Flask-based web app that uses TF-IDF + cosine similarity to match resumes with job descriptions and generate relevance scores.",
    tags: ["Python", "Flask", "NLP", "TF-IDF", "Cosine"],
    github: "https://github.com/krish10007/AI_Resume_Screener",
    demo: "",
    color: "green",
    emoji: "📄",
    glowColor: "rgba(34,197,94,0.5)",
  },
  {
    name: "Collaborative Notes App",
    description:
      "Google Docs-lite: multiple users edit simultaneously using React + WebSockets + CRDT (Yjs). Offline-first with live presence.",
    tags: ["React", "WebSockets", "Yjs", "CRDT"],
    github: "https://github.com/krish10007/Real-Time-Collaborative-Notes-App",
    demo: "",
    color: "purple",
    emoji: "📝",
    glowColor: "rgba(168,85,247,0.5)",
  },
  {
    name: "Serverless URL Shortener",
    description:
      "Bit.ly-style short links with analytics on AWS (API Gateway, Lambda, DynamoDB, CDK). Scalable and cost-efficient.",
    tags: ["AWS", "API Gateway", "Lambda", "DynamoDB", "CDK"],
    github: "https://github.com/krish10007/ServerlessURLShortner",
    demo: "",
    color: "teal",
    emoji: "🔗",
    glowColor: "rgba(56,189,248,0.5)",
  },
];




const startups = [
  {
    name: "Afterly",
    description: "An AI-powered emotional support companion for people going through breakups. Personalized healing journeys, daily check-ins, and evidence-based recovery tools.",
    status: "completed",
    statusLabel: "Live on App Store",
    url: "https://useafterly.com",
    tags: ["React Native", "Supabase", "Claude API"],
    emoji: "💔",
  },
  {
    name: "ResuFixer",
    description: "Compare your resume against any job description in seconds. Get a clear match score, highlights, and AI rewrite suggestions.",
    status: "waitlist",
    statusLabel: "Waitlist Open",
    url: "https://resufixer.com",
    tags: ["Next.js", "TypeScript", "Tailwind", "Clerk"],
    emoji: "📄",
  },
];

const milestones = [
  { when: "2023", what: "Started pursuing Computer Science" },
  { when: "2024", what: "Web Dev & Marketing Intern — The Knowledge Shop" },
  {
    when: "2025",
    what: "Passed AWS Solutions Architect; started YouTube channel",
  },
  {
    when: "2026",
    what: "Building startups, creating more content; targeting tech roles",
  },
];

// ----------------- YOUTUBE HOOK -----------------
function useYouTubeVideos(channelId) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    if (!channelId) return;
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

    async function fetchVideos() {
      const key = import.meta.env.VITE_YOUTUBE_API_KEY;
      if (!key) {
        setError("API key missing — check .env file");
        setLoading(false);
        return;
      }

      try {
        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${key}`
        );
        const channelData = await channelRes.json();

        if (channelData.error) {
          setError(channelData.error.message);
          setLoading(false);
          return;
        }

        const uploadsPlaylistId =
          channelData?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

        if (!uploadsPlaylistId) throw new Error("No uploads playlist found");

        const videosRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=6&key=${key}`
        );
        const videosData = await videosRes.json();

        if (videosData.error) {
          setError(videosData.error.message);
          setLoading(false);
          return;
        }

        const formatted = videosData.items.map(function (item) {
          return {
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            thumbnail:
              item.snippet.thumbnails?.maxres?.url ||
              item.snippet.thumbnails?.high?.url ||
              item.snippet.thumbnails?.medium?.url,
            publishedAt: item.snippet.publishedAt,
            url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
          };
        });

        setVideos(formatted);
      } catch (err) {
        console.error("YouTube API error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [channelId]);

  return { videos, loading, error };
}

// ----------------- CUSTOM CURSOR -----------------
function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(function () {
    function handleMouseMove(e) {
      posRef.current = { x: e.clientX, y: e.clientY };
      setDotPos({ x: e.clientX, y: e.clientY });
    }
    function animate() {
      setPos(function (prev) {
        return {
          x: prev.x + (posRef.current.x - prev.x) * 0.12,
          y: prev.y + (posRef.current.y - prev.y) * 0.12,
        };
      });
      rafRef.current = requestAnimationFrame(animate);
    }
    function handleMouseOver(e) {
      if (e.target.closest("a, button")) setIsHovering(true);
    }
    function handleMouseOut(e) {
      if (e.target.closest("a, button")) setIsHovering(false);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    rafRef.current = requestAnimationFrame(animate);

    return function () {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Outer ring — lags behind, expands on hover */}
      <div
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          width: isHovering ? 44 : 32,
          height: isHovering ? 44 : 32,
          borderRadius: "50%",
          border: `1px solid ${isHovering ? "rgba(200,245,98,0.6)" : "rgba(200,245,98,0.25)"}`,
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      {/* Inner dot — follows exactly */}
      <div
        style={{
          position: "fixed",
          left: dotPos.x,
          top: dotPos.y,
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "var(--accent)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
    </>
  );
}

// ----------------- PAGE -----------------
export default function KrishPortfolioSite() {
  const whiteRef = useRef(null);

  useEffect(function () {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen font-sans">
      <CustomCursor />
      <Header />

      {/* Hero */}
      <section
        id="intro"
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20"
      >
        {/* Background glow */}
        <div
          className="pointer-events-none absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(200,245,98,0.05) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 select-none w-full">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold tracking-tight text-[var(--text)] leading-none mb-6"
          >
            I'm Krish.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-xs sm:text-sm text-[var(--muted)] tracking-wide mb-12 px-4 leading-relaxed text-center"
          >
            CS Student · Indie Developer · Startup Builder · YouTube Creator
          </motion.p>

          {/* Stats — 2×2 grid on mobile, single row on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:flex md:flex-row md:justify-center md:items-center mt-4 border border-[var(--border2)] rounded-2xl overflow-hidden w-full max-w-xs md:max-w-none md:w-auto md:border-0 md:rounded-none md:overflow-visible md:gap-12 lg:gap-16"
          >
            {[
              { number: "4+",   label: "Apps Shipped" },
              { number: "~1K",  label: "Subscribers" },
              { number: "CUNY", label: "Queens College" },
              { number: "NYC",  label: "Based In" },
            ].map(function (stat, i, arr) {
              return (
                <div
                  key={stat.label}
                  className={
                    "flex flex-col items-center py-4 md:py-0 md:px-0" +
                    " border-[var(--border2)]" +
                    (i % 2 === 0 && i < arr.length - 1 ? " border-r md:border-r-0" : "") +
                    (i < 2 ? " border-b md:border-b-0" : "")
                  }
                >
                  <span className="text-2xl md:text-3xl font-bold text-[var(--text)]">
                    {stat.number}
                  </span>
                  <span className="text-[10px] md:text-xs font-mono text-[var(--muted)] uppercase tracking-widest mt-1">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-widest text-[var(--muted)] uppercase">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-4 h-4 text-[var(--muted)]" />
          </motion.div>
        </div>
      </section>

      {/* Dark content */}
      <div ref={whiteRef}>
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
        <Footer />
      </div>
    </div>
  );
}

// ----------------- SECTIONS -----------------
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(function () {
    function handleScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener("scroll", handleScroll);
    return function () { window.removeEventListener("scroll", handleScroll); };
  }, []);

  return (
    <header className={
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 " +
      (scrolled
        ? "bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border)]"
        : "bg-transparent border-b border-transparent")
    }>
      <div className="mx-auto max-w-7xl px-5 py-4 grid grid-cols-3 items-center">
        {/* Left: brand */}
        <div>
          <a href="#intro" aria-label="Home" className="inline-flex items-center group">
            <span className="font-mono text-sm tracking-widest uppercase text-[var(--text)] group-hover:text-[var(--text)] transition-colors">
              KRISH<span style={{ color: "var(--accent)" }}>.</span>
            </span>
          </a>
        </div>

        {/* Center: nav — desktop only */}
        <nav className="hidden md:flex items-center justify-center gap-8 col-start-2 col-end-3">
          {["about", "projects", "startups", "videos", "timeline"].map(function (id) {
            return (
              <a
                key={id}
                href={"#" + id}
                className="font-mono text-xs tracking-wide text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200 capitalize"
              >
                {id}
              </a>
            );
          })}
          <a
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="font-mono text-xs tracking-wide text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200"
          >
            Resume
          </a>
        </nav>

        {/* Right: icons + contact — desktop only */}
        <div className="hidden md:flex items-center justify-end gap-2">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="border border-[var(--border2)] rounded-full p-2 flex items-center justify-center text-[var(--muted)] hover:border-accent hover:text-accent hover:bg-[rgba(200,245,98,0.08)] transition-all duration-200"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="border border-[var(--border2)] rounded-full p-2 flex items-center justify-center text-[var(--muted)] hover:border-accent hover:text-accent hover:bg-[rgba(200,245,98,0.08)] transition-all duration-200"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            download
            title="Download Resume"
            className="border border-[var(--border2)] rounded-full p-2 flex items-center justify-center text-[var(--muted)] hover:border-accent hover:text-accent hover:bg-[rgba(200,245,98,0.08)] transition-all duration-200"
          >
            <Download className="w-4 h-4" />
          </a>
          <a
            href={links.email}
            title="Email"
            className="border border-[var(--border2)] rounded-full p-2 flex items-center justify-center text-[var(--muted)] hover:border-accent hover:text-accent hover:bg-[rgba(200,245,98,0.08)] transition-all duration-200"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="ml-2 bg-accent text-[#0a0a0a] font-semibold text-xs px-4 py-2 rounded-md hover:bg-accent2 transition-all duration-200 active:scale-95"
          >
            Contact
          </a>
        </div>

        {/* Mobile: hamburger */}
        <div className="md:hidden flex items-center justify-end col-start-3">
          <button
            onClick={function () { setOpen(!open); }}
            className="flex flex-col gap-1.5 p-2 text-[var(--text)]"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className={"block h-0.5 w-5 bg-[var(--text)] transition-all duration-200 " + (open ? "rotate-45 translate-y-2" : "")} />
            <span className={"block h-0.5 w-5 bg-[var(--text)] transition-all duration-200 " + (open ? "opacity-0" : "")} />
            <span className={"block h-0.5 w-5 bg-[var(--text)] transition-all duration-200 " + (open ? "-rotate-45 -translate-y-2" : "")} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-300 bg-[var(--bg)]/95 backdrop-blur-xl " +
          (open ? "max-h-96 opacity-100 border-b border-[var(--border)]" : "max-h-0 opacity-0")
        }
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {["about", "projects", "startups", "videos", "timeline"].map(function (id) {
            return (
              <a
                key={id}
                onClick={function () { setOpen(false); }}
                href={"#" + id}
                className="font-mono text-sm text-[var(--muted)] hover:text-[var(--text)] py-3 border-b border-[var(--border)] capitalize transition-colors duration-200 last:border-b-0"
              >
                {id}
              </a>
            );
          })}
          <a
            onClick={function () { setOpen(false); }}
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-[var(--muted)] hover:text-[var(--text)] py-3 border-b border-[var(--border)] transition-colors duration-200"
          >
            Resume ↗
          </a>
          <div className="pt-3">
            <a
              onClick={function () { setOpen(false); }}
              href={links.email}
              className="block text-center bg-[var(--accent)] text-[#0a0a0a] font-semibold text-sm px-4 py-3 rounded-xl w-full transition-all duration-200 hover:bg-[var(--accent2)]"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="section-glow-top px-4 md:px-12 lg:px-16 pt-16 md:pt-24 pb-16 md:pb-24 bg-[var(--bg2)]"
    >
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-12 items-center">
        <FadeIn direction="right">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--text)]">
              Turning ideas into real products.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-[var(--muted)] border-l-2 border-[var(--accent)] pl-6">
              I'm Krish, a CS student at CUNY Queens College focused on Software
              Engineering and Cloud. I design, build, and ship practical tools —
              from AI APIs with Flask to full‑stack web apps on AWS.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={links.resume}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="px-5 py-2.5 rounded-xl border border-[var(--border2)] text-[var(--text)] hover:bg-[var(--bg3)] transition"
              >
                Resume ↓
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-accent text-[#0a0a0a] font-semibold hover:bg-accent2 transition"
              >
                LinkedIn →
              </a>
            </div>
          </div>
        </FadeIn>
        <FadeIn direction="left" delay={0.15}>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-300" />
              <div>
                <div className="font-semibold text-[var(--text)]">Krish Jakhar</div>
                <div className="text-[var(--muted)] text-sm">
                  Developer · Creator · Founder
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <Stat kpi="4+" label="Projects" />
              <Stat kpi="AWS" label="SAA Passed" />
              <Stat kpi="NYC" label="Based" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="section-glow-top py-24 px-4 md:px-16 bg-[var(--bg)]">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="font-mono text-xs text-[var(--accent)] tracking-[3px] uppercase mb-3 flex items-center gap-3">
            <span className="w-6 h-px bg-[var(--accent)] inline-block" />
            Projects
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text)] mb-4">
            Things I've built.
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="font-mono text-sm font-light tracking-wide text-[var(--muted)] mb-16">
            Personal projects, side experiments, and shipped work.
          </p>
        </FadeIn>

        {/* Featured first project */}
        <div className="mb-6">
          <FadeIn>
            <ProjectCard project={projects[0]} featured />
          </FadeIn>
        </div>

        {/* Remaining projects in 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.slice(1).map(function (p, i) {
            return (
              <FadeIn key={p.name} delay={i * 0.1}>
                <ProjectCard project={p} />
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StartupsSection() {
  return (
    <section id="startups" className="section-glow-top py-24 px-4 md:px-16 bg-[var(--bg2)]">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="font-mono text-xs text-[var(--accent)] tracking-[3px] uppercase mb-3 flex items-center gap-3">
            <span className="w-6 h-px bg-[var(--accent)] inline-block" />
            Startups
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text)] mb-4">
            Things I'm building.
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="font-mono text-sm font-light tracking-wide text-[var(--muted)] mb-16">
            Real products. Real users. Real stakes.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {startups.map(function (startup, i) {
            return (
              <FadeIn key={startup.name} delay={i * 0.1}>
                <StartupCard startup={startup} />
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function YouTubeSection() {
  const CHANNEL_ID = "UC8SxrtagHoT3eC8r2cQdCgw";
  const { videos, loading, error } = useYouTubeVideos(CHANNEL_ID);

  return (
    <section id="videos" className="section-glow-top py-24 px-4 md:px-16 bg-[var(--bg2)]">
      <div className="max-w-5xl mx-auto">

        {/* Section label */}
        <FadeIn>
          <p className="font-mono text-xs text-[var(--accent)] tracking-[3px] uppercase mb-3 flex items-center gap-3">
            <span className="w-6 h-px bg-[var(--accent)] inline-block" />
            YouTube
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text)] mb-2">
            Startup Diaries.
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex items-center justify-between mb-16">
            <p className="font-mono text-sm font-light tracking-wide text-[var(--muted)]">
              Documenting the journey — building, learning, and life in NYC.
            </p>
            <a
              href="https://youtube.com/@KrishJakhar7"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[var(--accent)] border border-[rgba(200,245,98,0.25)] bg-[rgba(200,245,98,0.07)] px-4 py-2 rounded-full hover:bg-[rgba(200,245,98,0.12)] transition-all duration-200 flex items-center gap-2 whitespace-nowrap ml-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              @KrishJakhar7
            </a>
          </div>
        </FadeIn>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map(function (_, i) {
              return (
                <div key={i} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-44 bg-[var(--bg3)]" />
                  <div className="p-5">
                    <div className="h-3 bg-[var(--bg3)] rounded mb-2 w-3/4" />
                    <div className="h-3 bg-[var(--bg3)] rounded w-1/2" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Error state — fallback cards */}
        {error && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "2 Years of Computer Science in 5 minutes", url: "https://youtube.com/@KrishJakhar7" },
              { title: "College + Big Goals", url: "https://youtube.com/@KrishJakhar7" },
              { title: "This is what coding with AI really looks like", url: "https://youtube.com/@KrishJakhar7" },
            ].map(function (v, i) {
              return (
                <a key={i} href={v.url} target="_blank" rel="noopener noreferrer"
                  className="group block bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[var(--border2)] hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(200,245,98,0.04)]">
                  <div className="h-44 bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1e] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                      }}
                    />
                    <div className="relative z-10 w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 2.5L13 8L4 13.5V2.5Z" fill="#0a0a0a" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-medium text-[var(--text)] leading-snug group-hover:text-[var(--accent)] transition-colors duration-200">
                      {v.title}
                    </p>
                    <p className="font-mono text-[11px] text-[var(--muted)] mt-2">
                      Watch on YouTube →
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* Videos grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map(function (video, i) {
              return (
                <FadeIn key={video.id} delay={i * 0.08}>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[var(--border2)] hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(200,245,98,0.04)]"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-44 overflow-hidden bg-[var(--bg3)]">
                      {video.thumbnail && (
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 2.5L13 8L4 13.5V2.5Z" fill="#0a0a0a" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <p className="text-sm font-medium text-[var(--text)] leading-snug mb-2 line-clamp-2 group-hover:text-[var(--accent)] transition-colors duration-200">
                        {video.title}
                      </p>
                      <p className="font-mono text-[11px] text-[var(--muted)]">
                        {new Date(video.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </a>
                </FadeIn>
              );
            })}
          </div>
        )}

        {/* See all link */}
        {!loading && !error && (
          <FadeIn delay={0.3}>
            <div className="mt-12 text-center">
              <a
                href="https://youtube.com/@KrishJakhar7"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-200 inline-flex items-center gap-2"
              >
                See all videos on YouTube →
              </a>
            </div>
          </FadeIn>
        )}

      </div>
    </section>
  );
}

function TimelineSection() {
  const lineRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="timeline" className="section-glow-top py-24 px-4 md:px-16 bg-[var(--bg)]">
      <div className="max-w-4xl mx-auto">

        {/* Section label */}
        <FadeIn>
          <p className="font-mono text-xs text-[var(--accent)] tracking-[3px] uppercase mb-3 flex items-center gap-3">
            <span className="w-6 h-px bg-[var(--accent)] inline-block" />
            Timeline
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text)] mb-4">
            The journey so far.
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="font-mono text-sm font-light tracking-wide text-[var(--muted)] mb-20">
            Every milestone that got me here.
          </p>
        </FadeIn>

        {/* Timeline container */}
        <div ref={containerRef} className="relative">

          {/* Animated accent line — desktop center, hidden on mobile */}
          <motion.div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-px bg-[var(--accent)] origin-top"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ height: "100%" }}
          />

          {/* Static background line — desktop center / mobile left */}
          <div className="absolute md:left-1/2 md:-translate-x-1/2 left-[11px] top-0 w-px h-full bg-[var(--border2)]" />

          {/* Milestone items */}
          <div className="flex flex-col gap-12 relative">
            {milestones.map(function (milestone, i) {
              const isLeft = i % 2 === 0;
              return (
                <FadeIn
                  key={i}
                  direction={isLeft ? "right" : "left"}
                  delay={0.2 + i * 0.15}
                >
                  {/* Mobile: left-rail layout. Desktop: alternating left/right */}
                  <div className={"relative pl-8 md:pl-0 flex items-center gap-4 md:gap-8 flex-row " + (isLeft ? "md:flex-row" : "md:flex-row-reverse")}>

                    {/* Mobile-only dot */}
                    <div className="md:hidden absolute left-0 top-6 w-3 h-3 rounded-full bg-[var(--accent)] ring-4 ring-[var(--bg)] flex-shrink-0 z-10" />

                    {/* Card */}
                    <div
                      className={
                        "w-full md:w-5/12 group bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 transition-all duration-300 hover:border-[var(--border2)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(200,245,98,0.04)] text-left " +
                        (isLeft ? "md:text-right" : "md:text-left")
                      }
                    >
                      <p className="font-mono text-[11px] text-[var(--accent)] tracking-widest uppercase mb-2">
                        {milestone.when}
                      </p>
                      <p className="text-sm font-medium text-[var(--text)] leading-relaxed">
                        {milestone.what}
                      </p>
                    </div>

                    {/* Center dot — desktop only */}
                    <div className="hidden md:flex relative z-10 flex-shrink-0 w-2/12 items-center justify-center">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + i * 0.15, ease: "backOut" }}
                        className="w-3 h-3 rounded-full bg-[var(--accent)] ring-4 ring-[var(--bg)]"
                      />
                    </div>

                    {/* Empty spacer — desktop only */}
                    <div className="hidden md:block w-5/12" />

                  </div>
                </FadeIn>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section-glow-top py-24 px-4 md:px-16 bg-[var(--bg)]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-[var(--card)] border rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
          animate={{
            borderColor: [
              "rgba(255,255,255,0.07)",
              "rgba(200,245,98,0.15)",
              "rgba(255,255,255,0.07)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at 50% -20%, rgba(200,245,98,0.08) 0%, transparent 60%),
                radial-gradient(ellipse at 50% 120%, rgba(200,245,98,0.04) 0%, transparent 60%)
              `,
            }}
          />

          <div className="relative z-10">
            {/* Label */}
            <FadeIn>
              <p className="font-mono text-xs text-[var(--accent)] tracking-[3px] uppercase mb-6 flex items-center justify-center gap-3">
                <span className="w-6 h-px bg-[var(--accent)]" />
                Let's connect
                <span className="w-6 h-px bg-[var(--accent)]" />
              </p>
            </FadeIn>

            {/* Heading */}
            <FadeIn delay={0.1}>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--text)] leading-tight mb-6">
                Ready to build<br />
                <span style={{ color: "var(--accent)" }}>something great?</span>
              </h2>
            </FadeIn>

            {/* Subtext */}
            <FadeIn delay={0.2}>
              <p className="text-sm text-[var(--muted)] font-light leading-relaxed max-w-md mx-auto mb-12">
                Always open to SWE internships, collabs, or feedback on my products.
                If something here resonates — reach out. I reply fast.
              </p>
            </FadeIn>

            {/* Buttons */}
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
                <a
                  href={links.email}
                  className="group inline-flex items-center justify-center gap-2 bg-accent text-[#0a0a0a] font-semibold text-sm px-8 py-4 rounded-xl hover:bg-accent2 transition-all duration-200 active:scale-95 w-full sm:w-auto"
                >
                  <Mail className="w-4 h-4" />
                  Email me
                </a>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[var(--border2)] text-[var(--text)] font-mono text-sm px-6 py-4 rounded-xl hover:border-accent hover:text-accent transition-all duration-200"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[var(--border2)] text-[var(--text)] font-mono text-sm px-6 py-4 rounded-xl hover:border-accent hover:text-accent transition-all duration-200"
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href={links.resume}
                  download
                  className="inline-flex items-center gap-2 border border-[var(--border2)] text-[var(--text)] font-mono text-sm px-6 py-4 rounded-xl hover:border-accent hover:text-accent transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  Resume
                </a>
              </div>
            </FadeIn>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 px-4 md:px-16 border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="font-mono text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} Krish Jakhar
        </span>
        <span className="font-mono text-xs text-[var(--muted)]">
          Built with React · Deployed on Vercel
        </span>
      </div>
    </footer>
  );
}

// ----------------- REUSABLE UI -----------------
function Divider() {
  return <div className="border-t border-[var(--border)]" />;
}

function Stat(props) {
  return (
    <div className="rounded-xl border border-[var(--border)] p-4 bg-[var(--bg3)]">
      <div className="text-2xl font-extrabold text-[var(--accent)]">{props.kpi}</div>
      <div className="text-[var(--muted)] text-xs mt-1">{props.label}</div>
    </div>
  );
}

function StartupCard({ startup }) {
  const statusStyles = {
    completed: {
      dot: "bg-[var(--accent)]",
      text: "text-[var(--accent)]",
      bg: "bg-[rgba(200,245,98,0.08)]",
      border: "border-[rgba(200,245,98,0.2)]",
    },
    waitlist: {
      dot: "bg-amber-400",
      text: "text-amber-400",
      bg: "bg-[rgba(251,191,36,0.08)]",
      border: "border-[rgba(251,191,36,0.2)]",
    },
  };
  const s = statusStyles[startup.status] || statusStyles.waitlist;

  return (
    <a
      href={startup.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 transition-all duration-300 hover:border-[var(--border2)] hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(200,245,98,0.04)]"
    >
      {/* Emoji + status */}
      <div className="flex items-start justify-between mb-6">
        <span className="text-4xl">{startup.emoji}</span>
        <span className={`inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide px-3 py-1 rounded-full border ${s.bg} ${s.text} ${s.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
          {startup.statusLabel}
        </span>
      </div>

      {/* Name */}
      <h3 className="text-xl font-bold text-[var(--text)] mb-3 group-hover:text-[var(--accent)] transition-colors duration-200">
        {startup.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-[var(--muted)] leading-relaxed mb-6 font-light">
        {startup.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {startup.tags.map(function (tag) {
          return (
            <span key={tag} className="font-mono text-[11px] text-[var(--muted)] border border-[var(--border)] px-2.5 py-1 rounded-md">
              {tag}
            </span>
          );
        })}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--accent)] group-hover:gap-3 transition-all duration-200">
        Visit site
        <span>→</span>
      </div>
    </a>
  );
}

function ProjectCard({ project, featured = false }) {
  const gradients = {
    default: "from-[#1a1a2e] to-[#16213e]",
    green:   "from-[#0a1f0a] to-[#0d2b0d]",
    purple:  "from-[#1a0a2e] to-[#2d1b4e]",
    orange:  "from-[#2e1a0a] to-[#3d2310]",
    teal:    "from-[#0a1e2e] to-[#0d2b3d]",
  };

  return (
    <div
      className={
        "group bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[var(--border2)] hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(200,245,98,0.04)]" +
        (featured ? " flex flex-col md:flex-row gap-0" : "")
      }
    >
      {/* Gradient visual */}
      <div
        className={
          "bg-gradient-to-br " +
          (gradients[project.color] || gradients.default) +
          " flex items-center justify-center relative overflow-hidden" +
          (featured ? " md:w-2/5 h-56 md:h-auto min-h-[220px]" : " h-44")
        }
      >
        {/* Color glow behind icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-32 h-32 rounded-full opacity-20 blur-2xl"
            style={{ background: project.glowColor || "rgba(200,245,98,0.4)" }}
          />
        </div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Styled icon container */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
            <span
              className="text-3xl"
              style={{ filter: "drop-shadow(0 0 12px rgba(255,255,255,0.15))" }}
            >
              {project.emoji || "⚡"}
            </span>
          </div>
          <span className="font-mono text-[11px] text-white/30 tracking-widest uppercase">
            {project.name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={"p-8 flex flex-col justify-between" + (featured ? " md:w-3/5" : "")}>
        <div>
          {/* Tags row */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags && project.tags.map(function (tag) {
              return (
                <span key={tag} className="font-mono text-[11px] text-[var(--muted)] border border-[var(--border)] px-2.5 py-1 rounded-md">
                  {tag}
                </span>
              );
            })}
          </div>

          {/* Name */}
          <h3 className={"font-bold text-[var(--text)] mb-3 group-hover:text-[var(--accent)] transition-colors duration-200" + (featured ? " text-2xl" : " text-lg")}>
            {project.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-[var(--muted)] leading-relaxed font-light mb-6">
            {project.description}
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-200 flex items-center gap-1.5"
            >
              <GithubIcon className="w-3.5 h-3.5" /> GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[var(--accent)] flex items-center gap-1.5 group-hover:gap-3 transition-all duration-200"
            >
              Live demo →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}


