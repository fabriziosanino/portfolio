"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "$ BIOS v2.6.1 — Fabrizio Sanino Systems", delay: 0 },
  { text: "  Initializing kernel modules...", delay: 300 },
  { text: "  Loading [cloud.ko]        ████████ OK", delay: 600 },
  { text: "  Loading [backend.ko]      ████████ OK", delay: 900 },
  { text: "  Loading [vineyard.ko]     ████████ OK", delay: 1200 },
  { text: "  Mounting /career ...      done", delay: 1500 },
  { text: "", delay: 1700 },
  { text: "$ git log --all --graph --decorate", delay: 1900 },
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(i + 1);
        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => {
            setDone(true);
            setTimeout(onComplete, 600);
          }, 400);
        }
      }, line.delay);
    });
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "var(--bg)" }}
        >
          <div className="w-full max-w-lg px-8">
            {/* Terminal window */}
            <div
              className="rounded-lg overflow-hidden border"
              style={{ borderColor: "var(--border)" }}
            >
              {/* Title bar */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}
              >
                <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28c941" }} />
                <span
                  className="ml-3 text-xs"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
                >
                  fabriziosanino — zsh — 80×24
                </span>
              </div>

              {/* Terminal body */}
              <div
                className="p-6 min-h-[260px]"
                style={{ background: "var(--surface)", fontFamily: "var(--font-mono)" }}
              >
                {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-sm leading-relaxed"
                    style={{
                      color:
                        line.text.startsWith("$")
                          ? "var(--education)"
                          : line.text.includes("OK")
                          ? "var(--text-muted)"
                          : "var(--text-muted)",
                    }}
                  >
                    {line.text.includes("OK") ? (
                      <>
                        <span style={{ color: "var(--text-dim)" }}>
                          {line.text.slice(0, line.text.indexOf("OK"))}
                        </span>
                        <span style={{ color: "var(--education)", fontWeight: 600 }}>OK</span>
                      </>
                    ) : line.text.startsWith("$") ? (
                      <>
                        <span style={{ color: "var(--education)" }}>$</span>
                        <span style={{ color: "var(--text)" }}>{line.text.slice(1)}</span>
                      </>
                    ) : (
                      line.text || "\u00A0"
                    )}
                  </motion.div>
                ))}
                {visibleLines < BOOT_LINES.length && (
                  <span
                    className="inline-block w-2 h-4 ml-0.5"
                    style={{
                      background: "var(--main)",
                      animation: "blink 1.1s step-end infinite",
                      verticalAlign: "middle",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
