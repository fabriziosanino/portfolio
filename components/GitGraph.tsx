"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { COMMITS, VINEYARD_COMMIT, type Commit } from "@/data/portfolio";

// ─── Column x positions (fixed, like git log --graph columns) ─────────────────
const ROW_H  = 84;
const MAIN_X = 40;   // blue   — career backbone (leftmost trunk)
const EDU_X  = 100;  // green  — education branch
const PROJ_X = 160;  // purple — projects branch
const VINE_X = 220;  // amber  — winery branch (rightmost)
const SVG_W  = 244;

// Row Y = vertical centre of row i. Matches dot and path positions exactly.
const Y    = (i: number) => i * ROW_H + ROW_H / 2;

const N       = COMMITS.length;
const TOTAL_H = Y(N) + ROW_H / 2 + 24;

// ─── Branch colours ───────────────────────────────────────────────────────────
const BC: Record<string, string> = {
  main:      "#58a6ff",
  education: "#3fb950",
  projects:  "#bc8cff",
  vineyard:  "#d4a853",
};

// x position for each branch's commit dot
const BX: Record<string, number> = {
  main:      MAIN_X,
  education: EDU_X,
  projects:  PROJ_X,
  vineyard:  VINE_X,
};


function TagBadge({ tag }: { tag: string }) {
  const cls =
    tag === "HEAD"      ? "git-tag git-tag-head"    :
    tag.startsWith("v") ? "git-tag git-tag-version" :
                          "git-tag git-tag-other";
  return (
    <span className={cls}>
      {tag === "HEAD" ? "◆ HEAD" : tag.startsWith("v") ? `⬡ ${tag}` : `◈ ${tag}`}
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
interface GitGraphProps {
  onSelectCommit: (commit: Commit | null) => void;
  selectedId: string | null;
}

export default function GitGraph({ onSelectCommit, selectedId }: GitGraphProps) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGo(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full" style={{ minHeight: TOTAL_H }}>

      {/* ── Commit rows ── */}
      {COMMITS.map((commit, i) => {
        const bx    = BX[commit.branch];
        const color = BC[commit.branch];
        const isSel = selectedId === commit.id;
        const size  = commit.branch === "main" ? 12 : 10;

        return (
          <motion.div
            key={commit.id}
            className="relative flex items-center cursor-pointer group"
            style={{ height: ROW_H }}
            initial={{ opacity: 0, x: -8 }}
            animate={go ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.30, delay: 0.25 + i * 0.06 }}
            onClick={() => onSelectCommit(isSel ? null : commit)}
          >
            {/* Graph column */}
            <div className="flex-shrink-0 relative" style={{ width: SVG_W }}>
              {isSel && (
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: size + 16, height: size + 16,
                    left: bx - (size + 16) / 2,
                    top: "50%", transform: "translateY(-50%)",
                    background: color, opacity: 0.22, filter: "blur(8px)",
                  }}
                />
              )}
              <motion.div
                className="absolute rounded-full border-2"
                style={{
                  width: size, height: size,
                  left: bx - size / 2,
                  top: "50%", transform: "translateY(-50%)",
                  background: isSel ? color : "var(--bg)",
                  borderColor: color,
                  boxShadow: `0 0 ${isSel ? 14 : 5}px ${color}`,
                  transition: "background 0.2s, box-shadow 0.2s",
                }}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.85 }}
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-[11px] opacity-35 group-hover:opacity-60 transition-opacity"
                  style={{ color, fontFamily: "var(--font-mono)" }}
                >
                  {commit.hash}
                </span>
                {commit.tag && <TagBadge tag={commit.tag} />}
              </div>
              <div
                className="text-sm font-medium mt-0.5 truncate transition-colors duration-150"
                style={{ color: isSel ? "var(--text)" : "var(--text-muted)", fontFamily: "var(--font-mono)" }}
              >
                {commit.message}
              </div>
              <div
                className="text-xs mt-0.5"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
              >
                {commit.date}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* ── Vineyard special row ── */}
      {(() => {
        const isSel = selectedId === VINEYARD_COMMIT.id;
        return (
          <motion.div
            className="relative flex items-center cursor-pointer group mt-1"
            style={{ height: ROW_H }}
            initial={{ opacity: 0, x: -8 }}
            animate={go ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.30, delay: 0.25 + N * 0.06 }}
            onClick={() => onSelectCommit(isSel ? null : VINEYARD_COMMIT)}
          >
            <div className="flex-shrink-0 relative" style={{ width: SVG_W }}>
              {isSel && (
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 26, height: 26,
                    left: VINE_X - 13,
                    top: "50%", transform: "translateY(-50%)",
                    background: BC.vineyard, opacity: 0.22, filter: "blur(8px)",
                  }}
                />
              )}
              <motion.div
                className="absolute rounded-full border-2"
                style={{
                  width: 10, height: 10,
                  left: VINE_X - 5,
                  top: "50%", transform: "translateY(-50%)",
                  background: isSel ? BC.vineyard : "var(--bg)",
                  borderColor: BC.vineyard,
                  boxShadow: `0 0 ${isSel ? 14 : 5}px ${BC.vineyard}`,
                  transition: "background 0.2s, box-shadow 0.2s",
                }}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.85 }}
              />
            </div>
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-[11px] opacity-35 group-hover:opacity-60 transition-opacity"
                  style={{ color: BC.vineyard, fontFamily: "var(--font-mono)" }}
                >
                  {VINEYARD_COMMIT.hash}
                </span>
                <TagBadge tag="ongoing" />
              </div>
              <div
                className="text-sm font-medium mt-0.5 truncate transition-colors duration-150"
                style={{ color: isSel ? "var(--text)" : "var(--text-muted)", fontFamily: "var(--font-mono)" }}
              >
                {VINEYARD_COMMIT.message}
              </div>
              <div
                className="text-xs mt-0.5"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
              >
                {VINEYARD_COMMIT.date}
              </div>
            </div>
          </motion.div>
        );
      })()}
    </div>
  );
}
