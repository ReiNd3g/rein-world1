import { useEffect, useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, X } from "lucide-react";

/**
 * Monochrome Editorial Lab reminder:
 * This page treats the portfolio as a long-form technology publication. Use warm paper,
 * ink-black typography, offset editorial layouts, hairline rules, and motion that clarifies reading order.
 */

type Project = {
  number: string;
  title: string;
  description: string;
  tech: string;
  status: string;
  year: string;
  image: string;
  fields: string[];
  story: string[];
};

const projects: Project[] = [
  {
    number: "01",
    title: "STUDYLENS",
    description: "An AI-powered learning assistant that turns lecture material into summaries, flashcards, quizzes, and interactive explanations.",
    tech: "PYTHON · AI · RAG · FASTAPI",
    status: "PROTOTYPE",
    year: "2026",
    image: "/assets/studylens-system.jpg",
    fields: ["THE PROBLEM", "THE IDEA", "WHAT BROKE", "WHAT I LEARNED"],
    story: [
      "Dense lecture material is hard to revisit when the first pass did not stick.",
      "I wanted a study companion that could transform one source into several ways of understanding it.",
      "Retrieval quality and prompt structure were the first weak points; the system had to learn when not to invent an answer.",
      "The most useful AI feature is not speed. It is making the next question easier to ask."
    ]
  },
  {
    number: "02",
    title: "CAMPUS COMPANION",
    description: "A digital platform concept for organizing classes, assignments, study sessions, and the overlooked logistics of student life.",
    tech: "REACT · PYTHON · POSTGRESQL",
    status: "IN DEVELOPMENT",
    year: "2026",
    image: "/assets/hero-editorial.jpg",
    fields: ["THE PROBLEM", "THE IDEA", "THE PROCESS", "WHAT'S NEXT"],
    story: [
      "University life is a system of small deadlines, locations, and decisions that rarely live in one place.",
      "The concept started as a quiet layer between a calendar and a campus map: less dashboard, more context.",
      "I am testing information density, data relationships, and the difference between useful structure and visual noise.",
      "The next version should feel helpful before it feels impressive."
    ]
  },
  {
    number: "03",
    title: "STUDENT COST OF LIVING",
    description: "An interactive data project exploring the real cost of living for students through comparison, context, and careful visual framing.",
    tech: "PYTHON · PANDAS · DATA VISUALIZATION",
    status: "RESEARCH PROJECT",
    year: "2026",
    image: "/assets/data-research.jpg",
    fields: ["THE QUESTION", "THE DATA", "WHAT BROKE", "WHAT I LEARNED"],
    story: [
      "A single average can hide the very different realities behind student budgets.",
      "I am exploring how to compare everyday costs without pretending the data is more precise than it is.",
      "Cleaning inconsistent sources was a larger part of the work than the chart itself.",
      "Good data storytelling is partly an exercise in being honest about uncertainty."
    ]
  },
  {
    number: "04",
    title: "SECURITY LAB",
    description: "A small ethical cybersecurity laboratory exploring defensive monitoring, network fundamentals, and system security.",
    tech: "PYTHON · LINUX · NETWORKING",
    status: "LEARNING LAB",
    year: "2026",
    image: "/assets/security-lab.jpg",
    fields: ["THE QUESTION", "THE SETUP", "WHAT BROKE", "WHAT'S NEXT"],
    story: [
      "Security is easier to understand when the system is small enough to observe end to end.",
      "I am building controlled experiments around logs, network behavior, and defensive signals.",
      "The first lesson was that visibility is a prerequisite for confidence.",
      "Next: turn the lab into repeatable exercises with clear boundaries and better documentation."
    ]
  }
];

const chapters = ["INDEX", "ABOUT", "WORK", "JOURNEY", "SKILLS", "CONTACT"];
const learningWords = ["ALGORITHMS", "DATABASE SYSTEMS", "NETWORKING", "AI", "CYBERSECURITY", "SOFTWARE ENGINEERING", "CLOUD", "SYSTEM DESIGN"];
const skillGroups: [string, string, string[]][] = [["01", "PROGRAMMING", ["Python", "JavaScript", "SQL"]], ["02", "WEB", ["HTML", "CSS", "React", "APIs"]], ["03", "DATA", ["Pandas", "Data Visualization", "Data Analysis"]], ["04", "AI", ["LLM APIs", "RAG", "Prompt Engineering", "AI Applications"]], ["05", "FOUNDATIONS", ["Git", "Linux", "Networking", "Cybersecurity Fundamentals"]]];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function CosmicField() {
  const [charged, setCharged] = useState(false);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  return (
    <div
      className={`cosmic-field ${charged ? "is-charged" : ""}`}
      style={{ "--orbit-x": `${pointer.x}%`, "--orbit-y": `${pointer.y}%`, "--pull-x": `${(pointer.x - 50) / 7}%`, "--pull-y": `${(pointer.y - 50) / 7}%`, "--stretch-x": `${1 + Math.abs(pointer.x - 50) / 145}`, "--stretch-y": `${1 + Math.abs(pointer.y - 50) / 210}` } as React.CSSProperties}
      role="button"
      tabIndex={0}
      aria-label="Interactive orbital system. Move through the field to reveal connections and click to shift the orbits."
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 });
      }}
      onPointerEnter={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 });
      }}
      onPointerLeave={() => setPointer({ x: 50, y: 50 })}
      onClick={() => setCharged((value) => !value)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") setCharged((value) => !value);
      }}
    >
      <div className="cosmic-stars" />
      <div className="orbit orbit-one"><span className="orbit-sphere sphere-one" /></div>
      <div className="orbit orbit-two"><span className="orbit-sphere sphere-two" /></div>
      <div className="orbit orbit-three"><span className="orbit-sphere sphere-three" /></div>
      <div className="orbit orbit-four"><span className="orbit-sphere sphere-four" /></div>
      <div className="cosmic-core"><span>01</span></div>
      <div className="cosmic-links"><i className="link link-one" /><i className="link link-two" /><i className="link link-three" /><i className="link link-four" /></div>
      <div className="cosmic-cursor" />
      <div className="cosmic-label cosmic-label-top">ORBITAL SYSTEM / 001</div>
      <div className="cosmic-label cosmic-label-bottom">MOVE · CONNECT · EXPLORE</div>
      <div className="cosmic-prompt">{charged ? "ORBITAL SHIFT ACTIVE" : "HOVER TO FIND A CONNECTION"}</div>
    </div>
  );
}

export default function Home() {
  const [activeChapter, setActiveChapter] = useState("INDEX");
  const [gateOpen, setGateOpen] = useState(false);
  const [gateLeaving, setGateLeaving] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cursorLabel, setCursorLabel] = useState("");
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const sectionIds = ["index", "about", "work", "journey", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveChapter(visible.target.id.toUpperCase());
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.1, 0.35, 0.7] }
    );
    sectionIds.forEach((id) => document.getElementById(id) && observer.observe(document.getElementById(id)!));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (gateOpen) setCursorLabel("");
  }, [gateOpen]);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const projectCount = useMemo(() => projects.length.toString().padStart(2, "0"), []);
  const enterPortfolio = () => {
    setCursorLabel("");
    setGateLeaving(true);
    window.setTimeout(() => {
      setCursorLabel("");
      setGateOpen(true);
    }, 1050);
  };

  return (
    <div className={`site-shell ${gateOpen ? "portfolio-unlocked" : "portfolio-locked"}`} onMouseEnter={() => setCursorVisible(true)} onMouseLeave={() => setCursorVisible(false)}>
      {!gateOpen && <div className={`welcome-gate ${gateLeaving ? "is-leaving" : ""}`} role="dialog" aria-modal="true" aria-label="Welcome to the portfolio">
        <div className="gate-atmosphere" />
        <div className="gate-door gate-door-left" />
        <div className="gate-door gate-door-right" />
        <div className="gate-content">
          <div className="gate-topline"><span>REIN SCHLIEFFEN / 01</span><span>PORTFOLIO ENTRY · 2026</span></div>
          <div className="gate-center">
            <div className="portrait-frame" aria-label="Portrait of Rein Schlieffen"><img className="portrait-image" src="/assets/rein-schlieffen-portrait.png" alt="Portrait of Rein Schlieffen" /><span className="portrait-index">IDENTITY / 001</span></div>
            <div className="gate-copy"><p className="eyebrow">REIN SCHLIEFFEN · 22 · BUILDER IN PROGRESS</p><h1>WELCOME<br /><em>INSIDE.</em></h1><p className="gate-intro">I’m Rein — a student and local freelancer building my way into technology through real work, stubborn curiosity, and one imperfect prototype at a time.</p><button className="enter-button" onClick={enterPortfolio} autoFocus onMouseEnter={() => setCursorLabel("ENTER")} onMouseLeave={() => setCursorLabel("")}>ENTER THE PORTFOLIO <ArrowUpRight size={16} /></button></div>
          </div>
          <div className="gate-bottomline"><span>SOFTWARE · AI · DATA · SECURITY</span><span>THE DOOR OPENS ON YOUR CURIOSITY</span></div>
        </div>
        <div className="gate-seam" aria-hidden="true"><span>↕</span></div>
      </div>}
      <div className={`custom-cursor ${cursorLabel ? "is-active" : ""} ${cursorVisible ? "is-visible" : ""}`} aria-hidden="true"><span>{cursorLabel}</span></div>
      <header className="topbar">
        <button className="brand-lockup" onClick={() => scrollToId("index")} aria-label="Back to top">
          <img src="/assets/curiositymark.png" alt="" />
          <span>REIN SCHLIEFFEN / 01</span>
        </button>
        <div className="topbar-meta">IT ENTHUSIAST · BUILDER · 2026</div>
        <button className="menu-trigger" onClick={() => scrollToId("contact")} onMouseEnter={() => setCursorLabel("OPEN")} onMouseLeave={() => setCursorLabel("")}>LET'S TALK <ArrowUpRight size={14} /></button>
      </header>

      <aside className="chapter-rail" aria-label="Portfolio chapters">
        <span className="rail-caption">PORTFOLIO / 2026</span>
        <div className="rail-links">
          {chapters.map((chapter) => {
            const id = chapter.toLowerCase();
            return <button key={chapter} className={activeChapter === chapter ? "is-current" : ""} onClick={() => scrollToId(id)}>{chapter}</button>;
          })}
        </div>
        <span className="rail-caption rail-bottom">SCROLL TO EXPLORE</span>
      </aside>

      <main>
        <section id="index" className="hero section-anchor">
          <div className="hero-art" aria-hidden="false"><CosmicField /></div>
          <div className="hero-copy">
            <p className="eyebrow reveal reveal-1">REIN SCHLIEFFEN · 22 · STUDENT · FREELANCER</p>
            <h1 className="hero-title reveal reveal-2">BUILDING<br /><em>MY WAY</em><br />INTO TECHNOLOGY<span className="title-period">.</span></h1>
            <div className="hero-bottom reveal reveal-3">
              <p className="hero-intro">I’m Rein Schlieffen — a 22-year-old student and local freelancer building small systems, experimenting with emerging technologies, and turning working projects into a path toward university.</p>
              <div className="hero-actions"><button className="text-button" onClick={() => scrollToId("work")} onMouseEnter={() => setCursorLabel("VIEW")} onMouseLeave={() => setCursorLabel("")}>EXPLORE MY WORK <ArrowDownRight size={16} /></button><button className="text-button muted" onClick={() => scrollToId("journey")}>MY JOURNEY <ArrowDownRight size={16} /></button></div>
            </div>
          </div>
          <div className="hero-data reveal reveal-4"><span>BASED IN ASIA</span><span>FOCUS: SOFTWARE · AI · DATA · SECURITY</span><span>SCROLL <span className="scroll-line" /></span></div>
          <div className="hero-index"><span className="hero-mark">⌜⌟</span> INDEX <span>00 — 07</span></div>
        </section>

        <section id="about" className="about section-anchor paper-section">
          <div className="section-marker"><span>01</span><span>INTRODUCTION</span></div>
          <div className="about-grid">
            <div><p className="eyebrow">REIN SCHLIEFFEN / 22</p><h2>NOT AN<br /><em>EXPERT.</em><br />YET.</h2></div>
            <div className="about-copy"><p className="lead">I’m a student, a freelancer in my local community, and a builder trying to earn a place at university through the work I make. This portfolio documents the projects, experiments, and questions I’m using to turn ambition into evidence.</p><div className="principles">{[["01", "CURIOSITY", "I learn by asking questions and building experiments."], ["02", "BUILD", "I turn ideas into working prototypes instead of leaving them as concepts."], ["03", "ITERATE", "I treat mistakes as part of the engineering process."]].map(([num, title, text]) => <div className="principle" key={num}><span className="mono">{num}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight size={16} /></div>)}</div></div>
          </div>
        </section>

        <section id="work" className="work section-anchor">
          <div className="section-marker"><span>02</span><span>SELECTED EXPERIMENTS</span><span className="section-count">{projectCount} PROJECTS</span></div>
          <div className="work-heading"><h2>SELECTED<br /><em>EXPERIMENTS</em></h2><p>Projects built while learning software, AI, data, and technology.</p></div>
          <div className="project-list">{projects.map((project) => <article className="project-row" key={project.number} onClick={() => setSelectedProject(project)} onMouseEnter={() => setCursorLabel("OPEN")} onMouseLeave={() => setCursorLabel("")} tabIndex={0} onKeyDown={(event) => event.key === "Enter" && setSelectedProject(project)}><div className="project-serial">{project.number}</div><div className="project-visual"><img src={project.image} alt="" /><span className="specimen-stamp">SPECIMEN / {project.number} · {project.year}</span><span className="open-stamp">OPEN CASE STUDY <ArrowUpRight size={14} /></span></div><div className="project-info"><div className="project-topline"><span>{project.year}</span><span>{project.status}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-tech">{project.tech}</div></div><ArrowUpRight className="project-arrow" size={22} /></article>)}</div>
        </section>

        <section id="journey" className="journey section-anchor dark-section"><div className="journey-identity"><span className="mono">REIN SCHLIEFFEN / 22</span><span className="mono">STUDENT · FREELANCER · IT ENTHUSIAST</span></div>
          <div className="section-marker"><span>03</span><span>LEARNING JOURNEY</span></div>
          <div className="journey-grid"><div><p className="eyebrow">PROGRESS, NOT PERFORMANCE</p><h2>MY LEARNING<br /><em>JOURNEY</em></h2></div><div className="timeline">{[["2026", "PYTHON", "First serious programming experiments."], ["", "WEB DEVELOPMENT", "Built interactive websites and applications."], ["", "DATABASES", "Learned SQL and structured data."], ["", "AI", "Started experimenting with APIs, RAG, and AI-assisted applications."], ["", "CYBERSECURITY", "Started exploring networking and defensive security."], ["NEXT", "COMPUTER SCIENCE / IT", "Undergraduate study, deeper systems thinking, and a bigger set of questions."]].map(([time, title, text], index) => <div className="timeline-item" key={title}><div className="timeline-dot" /><div className="timeline-time">{time || "↳"}</div><div><h3>{title}</h3><p>{text}</p></div><span className="timeline-number">0{index + 1}</span></div>)}</div></div>
        </section>

        <section id="skills" className="skills section-anchor">
          <div className="section-marker"><span>04</span><span>CURRENT LEARNING AREAS</span></div>
          <div className="skills-heading"><h2>THE TOOLKIT<br /><em>IS STILL GROWING.</em></h2><p>These are current learning areas, not claims of professional mastery.</p></div>
          <div className="skill-columns">{skillGroups.map(([num, title, items]) => <div className="skill-column" key={title}><span className="mono">{num}</span><h3>{title}</h3>{items.map((item) => <p key={item}>{item}</p>)}</div>)}</div>
          <div className="marquee" aria-label="Currently learning"><div className="marquee-track">{[...learningWords, ...learningWords].map((word, index) => <span key={`${word}-${index}`}>{word}<i>✳</i></span>)}</div></div>
        </section>

        <section className="purpose paper-section"><div className="section-marker"><span>05</span><span>BEYOND CODE</span></div><div className="purpose-grid"><h2>TECHNOLOGY,<br /><em>WITH PURPOSE.</em></h2><div><p className="lead">I want to understand how technology can be used to solve problems that actually matter to people.</p><div className="purpose-list">{[["EDUCATION", "Building tools that make learning more accessible and effective."], ["SOCIAL IMPACT", "Exploring technology that can help communities and everyday users."], ["EXPERIMENTATION", "Building unconventional prototypes simply to understand how things work."]].map(([title, text]) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div></div></div></section>

        <section className="future"><div className="future-ghost">NEXT</div><div className="section-marker"><span>06</span><span>WHAT COMES NEXT?</span></div><div className="future-copy"><p className="eyebrow">A DIRECTION, NOT A DESTINATION</p><h2>WHAT COMES<br /><em>NEXT?</em></h2><p>I'm preparing to study Information Technology / Computer Science at university, where I hope to deepen my understanding of software engineering, artificial intelligence, data, and computer systems.</p><strong>THIS PORTFOLIO IS ONLY THE BEGINNING.</strong><div className="expanding-line" /></div></section>

        <section id="contact" className="contact section-anchor paper-section"><div className="section-marker"><span>07</span><span>CONTACT</span></div><div className="contact-grid"><div><p className="eyebrow">OPEN TO GOOD QUESTIONS</p><h2>LET'S<br /><em>CONNECT.</em></h2></div><div className="contact-links"><p>Open to learning, collaboration, research opportunities, and interesting technical problems.</p><a href="mailto:hello@example.com" onMouseEnter={() => setCursorLabel("MAIL")} onMouseLeave={() => setCursorLabel("")}>EMAIL <ArrowUpRight size={16} /></a><a href="https://github.com" target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={16} /></a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LINKEDIN <ArrowUpRight size={16} /></a></div></div></section>

        <section className="creative-bridge" aria-labelledby="creative-bridge-title"><div className="bridge-orbit bridge-orbit-one" /><div className="bridge-orbit bridge-orbit-two" /><div className="bridge-core"><span>02</span></div><div className="bridge-copy"><p className="eyebrow">THE OTHER SIDE OF THE SYSTEM</p><h2 id="creative-bridge-title">ENTER THE<br /><em>CREATIVE UNIVERSE.</em></h2><p>Technology is one way I build. Creativity is the other — a digital playground for design, fashion, AI, music, video, and the experiments that begin with “what if?”</p><a className="bridge-link" href="https://reinworld2.netlify.app/" target="_blank" rel="noreferrer" onMouseEnter={() => setCursorLabel("ENTER")} onMouseLeave={() => setCursorLabel("")}>ENTER REIN’S CREATIVE WORLD <ArrowUpRight size={16} /></a></div><div className="bridge-meta"><span>WORLD 01 / TECHNOLOGY</span><span>WORLD 02 / CREATIVITY</span></div></section>
      </main>

      <footer><span>REIN SCHLIEFFEN / 01</span><span>IT ENTHUSIAST · BUILDER · LIFELONG LEARNER</span><span>BUILT WITH CURIOSITY + CODE · © 2026</span></footer>

      {selectedProject && <div className="case-overlay" role="dialog" aria-modal="true" aria-label={`${selectedProject.title} case study`}><div className="case-panel"><button className="case-close" onClick={() => setSelectedProject(null)} aria-label="Close case study"><X size={22} /></button><div className="case-header"><span className="mono">{selectedProject.number} / CASE STUDY</span><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="case-meta"><span>{selectedProject.tech}</span><span>{selectedProject.status}</span><span>{selectedProject.year}</span></div></div><img className="case-image" src={selectedProject.image} alt="" /><div className="case-story">{selectedProject.fields.map((field, index) => <div key={field}><span className="mono">{field}</span><p>{selectedProject.story[index]}</p></div>)}</div><button className="case-next" onClick={() => { const next = projects[(projects.findIndex((item) => item.number === selectedProject.number) + 1) % projects.length]; setSelectedProject(next); }}>NEXT EXPERIMENT <ArrowUpRight size={16} /></button></div></div>}
    </div>
  );
}
