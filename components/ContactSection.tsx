"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CONTACT } from "@/data/portfolio";

const REMOTES = [
  {
    label: "github",
    href: CONTACT.github,
    display: "github.com/fabriziosanino",
    color: "#e6edf3",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: "linkedin",
    href: CONTACT.linkedin,
    display: "linkedin.com/in/fabrizio-sanino-334307143",
    color: "#58a6ff",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "email",
    href: `mailto:${CONTACT.email}`,
    display: CONTACT.email,
    color: "#3fb950",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
];

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="contact"
      className="py-24"
      style={{ borderTop: "1px solid var(--border-2)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div
            className="text-xs mb-2 opacity-50"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
          >
            $ git remote -v
          </div>
          <h2
            className="text-2xl font-semibold"
            style={{ color: "var(--text)" }}
          >
            Contact
          </h2>
        </motion.div>

        {/* Remotes */}
        <div className="space-y-3">
          {REMOTES.map((remote, i) => (
            <motion.a
              key={remote.label}
              href={remote.href}
              target={remote.label !== "email" ? "_blank" : undefined}
              rel={remote.label !== "email" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: i * 0.1 }}
              className="flex items-center gap-4 p-5 rounded-lg group transition-all duration-200"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-2)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${remote.color}50`;
                e.currentTarget.style.background = `${remote.color}0a`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-2)";
                e.currentTarget.style.background = "var(--surface)";
              }}
            >
              <div style={{ color: remote.color, flexShrink: 0 }}>{remote.icon}</div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-xs opacity-50 mb-0.5"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
                >
                  {remote.label}
                </div>
                <div
                  className="text-sm truncate"
                  style={{ fontFamily: "var(--font-mono)", color: remote.color }}
                >
                  {remote.display}
                </div>
              </div>
              <div
                className="text-xs opacity-0 group-hover:opacity-40 transition-opacity"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
              >
                (fetch) →
              </div>
            </motion.a>
          ))}
        </div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 flex items-center gap-2"
          style={{ color: "var(--text-dim)" }}
        >
          <span className="text-sm">📍</span>
          <span
            className="text-sm"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {CONTACT.location}
          </span>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-16 pt-8 flex items-center justify-between"
          style={{ borderTop: "1px solid var(--border-2)" }}
        >
          <div
            className="text-xs opacity-30"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
          >
            © {new Date().getFullYear()} Fabrizio Sanino
          </div>
          <div
            className="text-xs opacity-30"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
          >
            built with Next.js · deployed on Vercel
          </div>
        </motion.div>
      </div>
    </section>
  );
}
