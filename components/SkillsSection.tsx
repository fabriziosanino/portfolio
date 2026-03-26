"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SKILLS } from "@/data/portfolio";

const CATEGORY_COLORS: Record<string, string> = {
  "Cloud & Infrastructure": "#58a6ff",
  "Backend Development": "#3fb950",
  "Systems & Low-level": "#f78166",
  "AI / ML": "#bc8cff",
  "Frontend & Tools": "#d4a853",
  "Networking": "#79c0ff",
};

const BAR_WIDTHS: Record<string, number> = {
  "Cloud & Infrastructure": 85,
  "Backend Development": 90,
  "Systems & Low-level": 70,
  "AI / ML": 65,
  "Frontend & Tools": 75,
  "Networking": 60,
};

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const entries = Object.entries(SKILLS);

  return (
    <section
      ref={ref}
      id="skills"
      className="py-24"
      style={{ borderTop: "1px solid var(--border-2)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
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
            $ git diff --stat HEAD~∞..HEAD
          </div>
          <h2
            className="text-2xl font-semibold"
            style={{ color: "var(--text)" }}
          >
            Skills
          </h2>
          <p
            className="text-sm mt-1 opacity-60"
            style={{ color: "var(--text-muted)" }}
          >
            Technologies acquired across all branches.
          </p>
        </motion.div>

        {/* Diff output */}
        <div className="space-y-6">
          {entries.map(([category, skills], catIdx) => {
            const color = CATEGORY_COLORS[category] || "var(--main)";
            const barW = BAR_WIDTHS[category] || 70;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: catIdx * 0.08 }}
              >
                {/* Filename header */}
                <div
                  className="text-sm mb-2 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <span style={{ color }}>+++</span>
                  <span style={{ color: "var(--text-muted)" }}>
                    {category.toLowerCase().replace(/ /g, "_")}.skills
                  </span>
                  <span
                    className="text-xs opacity-40"
                    style={{ color: "var(--text-dim)" }}
                  >
                    | {skills.length} {skills.length === 1 ? "addition" : "additions"}
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  className="h-1 rounded-full mb-3"
                  style={{ background: "var(--border-2)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: color, boxShadow: `0 0 8px ${color}60` }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${barW}%` } : {}}
                    transition={{ duration: 0.8, delay: catIdx * 0.1, ease: "easeOut" }}
                  />
                </div>

                {/* Skills chips */}
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, skillIdx) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.25,
                        delay: catIdx * 0.08 + skillIdx * 0.04,
                      }}
                      className="text-xs px-3 py-1.5 rounded-md transition-all duration-200"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color,
                        background: `${color}12`,
                        border: `1px solid ${color}25`,
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${color}22`;
                        e.currentTarget.style.boxShadow = `0 0 10px ${color}30`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `${color}12`;
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      + {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 pt-6"
          style={{ borderTop: "1px solid var(--border-2)" }}
        >
          <div
            className="text-xs"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
          >
            <span style={{ color: "var(--education)" }}>6 categories</span>
            <span className="opacity-50"> changed, </span>
            <span style={{ color: "var(--education)" }}>
              {Object.values(SKILLS).flat().length} insertions(+)
            </span>
            <span className="opacity-50">, 0 deletions(-)</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
