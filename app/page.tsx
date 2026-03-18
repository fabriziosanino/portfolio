"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import GitGraph from "@/components/GitGraph";
import CommitPanel from "@/components/CommitPanel";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import { type Commit } from "@/data/portfolio";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null);

  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      <LoadingScreen onComplete={handleLoaded} />

      <AnimatePresence>
        {loaded && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen"
            style={{ background: "var(--bg)" }}
          >
            {/* ── Hero ── */}
            <section className="min-h-screen grid-bg">
              {/* Ambient glow blobs */}
              <div
                className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(88,166,255,0.06) 0%, transparent 70%)",
                  transform: "translate(-30%, -30%)",
                  zIndex: 0,
                }}
              />
              <div
                className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(212,168,83,0.05) 0%, transparent 70%)",
                  transform: "translate(30%, 30%)",
                  zIndex: 0,
                }}
              />

              <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-12 lg:py-16">
                {/* Top bar */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="flex items-center justify-between mb-12"
                >
                  <div
                    className="text-xs flex items-center gap-3"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
                  >
                    <span style={{ color: "var(--education)" }}>❯</span>
                    <span>fabriziosanino</span>
                    <span className="opacity-40">~</span>
                    <span style={{ color: "var(--main)" }}>git log --all --graph --decorate</span>
                  </div>
                  <nav className="hidden md:flex items-center gap-6">
                    {["#skills", "#contact"].map((href) => (
                      <a
                        key={href}
                        href={href}
                        className="text-xs animated-link transition-colors"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--text-dim)",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--text-muted)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--text-dim)")
                        }
                      >
                        {href.replace("#", "")}
                      </a>
                    ))}
                  </nav>
                </motion.div>

                {/* Main layout: identity + graph + panel */}
                <div className="lg:grid lg:grid-cols-[1fr_2fr_1fr] lg:gap-12 space-y-10 lg:space-y-0">

                  {/* ── Left: Identity ── */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-col justify-start pt-2"
                  >
                    {/* Avatar placeholder */}
                    <div
                      className="w-16 h-16 rounded-full mb-5 flex items-center justify-center text-2xl font-bold border-2"
                      style={{
                        background: "var(--surface-2)",
                        borderColor: "var(--border-2)",
                        color: "var(--main)",
                        fontFamily: "var(--font-mono)",
                        boxShadow: "0 0 20px rgba(88,166,255,0.15)",
                      }}
                    >
                      FS
                    </div>

                    <h1
                      className="text-3xl font-bold leading-tight mb-1"
                      style={{ color: "var(--text)" }}
                    >
                      Fabrizio
                      <br />
                      <span style={{ color: "var(--main)" }}>Sanino</span>
                    </h1>
                    <div
                      className="text-sm mb-4 opacity-70"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                    >
                      Backend Engineer · Cloud Architect
                    </div>

                    {/* Key facts */}
                    <div className="space-y-2 mb-6">
                      {[
                        { icon: "☁️", text: "AWS & Azure" },
                        { icon: "🎓", text: "MSc 110L cum Laude" },
                        { icon: "🍷", text: "Barolo vineyard co-owner" },
                        { icon: "📍", text: "Turin, Italy" },
                      ].map(({ icon, text }) => (
                        <div
                          key={text}
                          className="flex items-center gap-2 text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <span>{icon}</span>
                          <span style={{ fontFamily: "var(--font-mono)" }}>{text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Branch legend */}
                    <div
                      className="p-5 rounded-lg"
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border-2)",
                      }}
                    >
                      <div
                        className="text-xs mb-2 opacity-40"
                        style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
                      >
                        branches
                      </div>
                      {[
                        { color: "#58a6ff", label: "main", desc: "career" },
                        { color: "#3fb950", label: "education", desc: "academic" },
                        { color: "#bc8cff", label: "projects", desc: "OSS & side" },
                        { color: "#d4a853", label: "winery", desc: "Sanino Bruno Vini", dashed: true },
                      ].map(({ color, label, desc, dashed }) => (
                        <div key={label} className="flex items-center gap-2 mb-1">
                          <div
                            className="w-6 h-0.5"
                            style={{
                              background: dashed
                                ? `repeating-linear-gradient(90deg, ${color} 0, ${color} 4px, transparent 4px, transparent 8px)`
                                : color,
                              opacity: dashed ? 0.7 : 1,
                            }}
                          />
                          <span
                            className="text-[11px]"
                            style={{ fontFamily: "var(--font-mono)", color }}
                          >
                            {label}
                          </span>
                          <span
                            className="text-[10px] opacity-40"
                            style={{ color: "var(--text-dim)" }}
                          >
                            {desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* ── Center: Git Graph ── */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="overflow-visible"
                  >
                    <div
                      className="rounded-xl p-6 pb-10"
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border-2)",
                      }}
                    >
                      {/* Graph header */}
                      <div
                        className="flex items-center gap-2 pb-3 mb-1"
                        style={{ borderBottom: "1px solid var(--border-2)" }}
                      >
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c941" }} />
                        <span
                          className="ml-2 text-xs opacity-30"
                          style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
                        >
                          git log --all --graph --decorate
                        </span>
                      </div>

                      <GitGraph
                        onSelectCommit={setSelectedCommit}
                        selectedId={selectedCommit?.id ?? null}
                      />
                    </div>
                  </motion.div>

                  {/* ── Right: Commit Detail Panel ── */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="hidden lg:block"
                  >
                    <div
                      className="rounded-xl sticky top-8 overflow-hidden"
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border-2)",
                        minHeight: "320px",
                        maxHeight: "calc(100vh - 4rem)",
                        overflowY: "auto",
                      }}
                    >
                      <CommitPanel
                        commit={selectedCommit}
                        onClose={() => setSelectedCommit(null)}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Mobile commit detail (below graph on small screens) */}
                <AnimatePresence>
                  {selectedCommit && (
                    <motion.div
                      key="mobile-panel"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="lg:hidden mt-6 overflow-hidden"
                    >
                      <div
                        className="rounded-xl overflow-hidden"
                        style={{
                          background: "var(--surface)",
                          border: "1px solid var(--border-2)",
                        }}
                      >
                        <CommitPanel
                          commit={selectedCommit}
                          onClose={() => setSelectedCommit(null)}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Scroll hint */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                  className="flex justify-center mt-16"
                >
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-1 cursor-pointer opacity-30 hover:opacity-50 transition-opacity"
                    onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <span
                      className="text-xs"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
                    >
                      scroll to explore
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" strokeWidth="2">
                      <path d="M12 5v14M5 12l7 7 7-7"/>
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* ── Skills ── */}
            <SkillsSection />

            {/* ── Contact ── */}
            <ContactSection />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
