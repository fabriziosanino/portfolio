"use client";

import { motion, AnimatePresence } from "framer-motion";
import { type Commit } from "@/data/portfolio";

const BC: Record<string, string> = {
  vineyard: "#d4a853",
  main: "#58a6ff",
  education: "#3fb950",
  projects: "#bc8cff",
};

const BRANCH_LABELS: Record<string, string> = {
  main: "career",
  education: "education",
  projects: "projects",
  vineyard: "winery",
};

interface CommitPanelProps {
  commit: Commit | null;
  onClose: () => void;
}

export default function CommitPanel({ commit, onClose }: CommitPanelProps) {
  const color = commit ? BC[commit.branch] : BC.main;

  return (
    <AnimatePresence mode="wait">
      {commit ? (
        <motion.div
          key={commit.id}
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 32 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full flex flex-col"
        >
          {/* Header */}
          <div
            className="flex-shrink-0 px-7 py-6 border-b"
            style={{ borderColor: "var(--border-2)" }}
          >
            {/* Branch badge */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: color,
                    boxShadow: `0 0 8px ${color}`,
                  }}
                />
                <span
                  className="text-xs"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color,
                  }}
                >
                  branch/{BRANCH_LABELS[commit.branch]}
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-xs px-2 py-1 rounded transition-colors"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-dim)",
                  background: "transparent",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text)";
                  e.currentTarget.style.borderColor = "var(--border-2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-dim)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                ✕ close
              </button>
            </div>

            {/* git show header */}
            <div
              className="text-xs mb-2 opacity-50 truncate"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
            >
              commit {commit.hash}
            </div>

            <div
              className="text-base font-semibold leading-snug"
              style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}
            >
              {commit.message}
            </div>

            {commit.detail.period && (
              <div
                className="text-xs mt-1 opacity-60"
                style={{ fontFamily: "var(--font-mono)", color }}
              >
                {commit.detail.period}
              </div>
            )}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-7 py-6 space-y-5">
            {/* Role / company */}
            {(commit.detail.company || commit.detail.role) && (
              <div
                className="px-3 py-3 rounded-lg"
                style={{
                  border: `1px solid ${color}30`,
                  borderLeft: `3px solid ${color}`,
                  background: `${color}08`,
                }}
              >
                {commit.detail.company && (
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    {commit.detail.company}
                  </div>
                )}
                {commit.detail.role && (
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                  >
                    {commit.detail.role}
                  </div>
                )}
                {commit.detail.location && (
                  <div
                    className="text-xs mt-1 flex items-center gap-1 opacity-60"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span>📍</span>
                    <span>{commit.detail.location}</span>
                  </div>
                )}
              </div>
            )}

            {/* Separator */}
            <div
              className="text-xs opacity-30 truncate"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
            >
              ── diff ──────────────────────────────────
            </div>

            {/* Description */}
            <div
              className="text-sm leading-relaxed px-3 py-3 rounded-lg"
              style={{
                color: "var(--text-muted)",
                border: "1px solid var(--border-2)",
                background: "var(--surface-2)",
              }}
            >
              {commit.detail.description}
            </div>

            {/* Grade */}
            {commit.detail.grade && (
              <div
                className="inline-flex items-center gap-2 px-3 py-2 rounded"
                style={{
                  background: `rgba(${color === "#3fb950" ? "63,185,80" : "88,166,255"}, 0.08)`,
                  border: `1px solid ${color}30`,
                }}
              >
                <span className="text-lg">🎓</span>
                <div>
                  <div
                    className="text-xs font-semibold"
                    style={{ color }}
                  >
                    {commit.detail.grade}
                  </div>
                  {commit.detail.thesis && (
                    <div
                      className="text-xs opacity-60 mt-0.5 italic"
                      style={{ color: "var(--text-muted)" }}
                    >
                      "{commit.detail.thesis}"
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Skills */}
            {commit.detail.skills && commit.detail.skills.length > 0 && (
              <div>
                <div
                  className="text-xs mb-2 opacity-50"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
                >
                  +++ skills
                </div>
                <div className="flex flex-wrap gap-2">
                  {commit.detail.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color,
                        background: `${color}14`,
                        border: `1px solid ${color}30`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* GitHub link */}
            {commit.detail.link && (
              <div
                className="px-3 py-3 rounded-lg"
                style={{
                  border: "1px solid var(--border-2)",
                  background: "var(--surface-2)",
                }}
              >
                <div
                  className="text-xs mb-2 opacity-50"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
                >
                  +++ remote
                </div>
                <a
                  href={commit.detail.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animated-link text-sm flex items-center gap-2"
                  style={{ color, fontFamily: "var(--font-mono)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  View on GitHub
                </a>
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full flex flex-col items-center justify-center p-8 text-center"
        >
          <div
            className="text-4xl mb-4 opacity-20"
          >
            ●
          </div>
          <div
            className="text-sm opacity-30"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
          >
            click any commit to explore
          </div>
          <div
            className="text-xs mt-2 opacity-20"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
          >
            git show &lt;hash&gt;
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
