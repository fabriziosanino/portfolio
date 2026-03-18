"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { COMMITS, VINEYARD_COMMIT, type Commit } from "@/data/portfolio";

// ─── Layout ──────────────────────────────────────────────────────────────────
// Dot centre Y for row i = i * ROW_H + ROW_H/2
// The SVG uses the exact same formula → dots and lines always align.
const ROW_H  = 84;
const VINE_X = 14;   // amber dashed — far left, always running
const MAIN_X = 50;   // blue  — career backbone
const EDU_X  = 86;   // green — education branch
const PROJ_X = 122;  // purple — projects branch
const SVG_W  = 148;  // width reserved for the graph column

const Y    = (i: number) => i * ROW_H + ROW_H / 2;
const midY = (a: number, b: number) => (Y(a) + Y(b)) / 2;

const N       = COMMITS.length; // 10 commits (excluding vineyard)
const TOTAL_H = Y(N) + ROW_H / 2 + 24;

// ─── Branch colours ───────────────────────────────────────────────────────────
const BC: Record<string, string> = {
  vineyard:  "#d4a853",
  main:      "#58a6ff",
  education: "#3fb950",
  projects:  "#bc8cff",
};

const BX: Record<string, number> = {
  vineyard:  VINE_X,
  main:      MAIN_X,
  education: EDU_X,
  projects:  PROJ_X,
};

// ─── COMMITS index reference ─────────────────────────────────────────────────
// 0  head        main
// 1  az900       main
// 2  divine      projects
// 3  master      education
// 4  rust        projects
// 5  sheshield   projects
// 6  arm         projects
// 7  bachelor    education
// 8  cambieri    main
// 9  highschool  education
// 10 vineyard    (special row)

// ─── SVG paths ───────────────────────────────────────────────────────────────
// 1. Main backbone — solid blue from row 0 → row 8
const mainD = `M ${MAIN_X} ${Y(0)} L ${MAIN_X} ${Y(8)}`;

// 2. Vineyard — full height dashed amber (uses opacity anim, not pathLength)
const vineD = `M ${VINE_X} ${Y(0)} L ${VINE_X} ${Y(N)}`;

// 3. Projects branch
//    Fork: S-curve from main at midY(1,2) → projects column at Y(2)
const projForkD  = `M ${MAIN_X} ${midY(1,2)} C ${MAIN_X} ${Y(2)}, ${PROJ_X} ${midY(1,2)}, ${PROJ_X} ${Y(2)}`;
//    Vertical: row 2 → row 6
const projLineD  = `M ${PROJ_X} ${Y(2)} L ${PROJ_X} ${Y(6)}`;
//    Merge: S-curve from projects at Y(6) back to main at midY(7,8)
const projMergeD = `M ${PROJ_X} ${Y(6)} C ${PROJ_X} ${midY(7,8)}, ${MAIN_X} ${Y(6)}, ${MAIN_X} ${midY(7,8)}`;

// 4. Education branch
//    Fork: S-curve from main at midY(2,3) → education column at Y(3)
const eduForkD   = `M ${MAIN_X} ${midY(2,3)} C ${MAIN_X} ${Y(3)}, ${EDU_X} ${midY(2,3)}, ${EDU_X} ${Y(3)}`;
//    Vertical: row 3 → row 9
const eduLineD   = `M ${EDU_X} ${Y(3)} L ${EDU_X} ${Y(9)}`;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function pathAnim(delay: number, duration = 0.8) {
  return {
    initial: { pathLength: 0 as number },
    animate: { pathLength: 1 as number },
    transition: { duration, ease: "easeInOut" as const, delay },
  };
}

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

// ─── Component ───────────────────────────────────────────────────────────────
interface GitGraphProps {
  onSelectCommit: (commit: Commit | null) => void;
  selectedId: string | null;
}

export default function GitGraph({ onSelectCommit, selectedId }: GitGraphProps) {
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGo(true), 250); return () => clearTimeout(t); }, []);

  return (
    <div className="relative w-full" style={{ minHeight: TOTAL_H }}>

      {/* ── SVG lines — absolute, sits behind the dot divs ── */}
      {go && (
        <svg
          className="absolute left-0 top-0 pointer-events-none overflow-visible"
          width={SVG_W}
          height={TOTAL_H}
        >
          <defs>
            {(["main","vineyard","education","projects"] as const).map(b => (
              <filter key={b} id={`g-${b}`} x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="2.5" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            ))}
          </defs>

          {/* Vineyard — fade in (pathLength conflicts with strokeDasharray) */}
          <motion.path d={vineD} stroke={BC.vineyard} strokeWidth={1.5}
            strokeDasharray="6 5" fill="none" filter="url(#g-vineyard)"
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
            transition={{ duration: 1.0, delay: 0.3 }}
          />

          {/* Main backbone */}
          <motion.path d={mainD} stroke={BC.main} strokeWidth={2}
            fill="none" filter="url(#g-main)" {...pathAnim(0.1, 1.3)}
          />

          {/* Projects fork → vertical → merge */}
          <motion.path d={projForkD}  stroke={BC.projects} strokeWidth={1.5} fill="none" filter="url(#g-projects)" {...pathAnim(0.55, 0.4)}/>
          <motion.path d={projLineD}  stroke={BC.projects} strokeWidth={1.5} fill="none" filter="url(#g-projects)" {...pathAnim(0.80, 0.7)}/>
          <motion.path d={projMergeD} stroke={BC.projects} strokeWidth={1.5} fill="none" filter="url(#g-projects)" {...pathAnim(1.30, 0.4)}/>

          {/* Education fork → vertical */}
          <motion.path d={eduForkD}  stroke={BC.education} strokeWidth={1.5} fill="none" filter="url(#g-education)" {...pathAnim(0.65, 0.4)}/>
          <motion.path d={eduLineD}  stroke={BC.education} strokeWidth={1.5} fill="none" filter="url(#g-education)" {...pathAnim(0.90, 0.9)}/>
        </svg>
      )}

      {/* ── Commit rows — normal flow, height = ROW_H each ── */}
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
            initial={{ opacity: 0, x: -10 }}
            animate={go ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.32, delay: 0.25 + i * 0.07 }}
            onClick={() => onSelectCommit(isSel ? null : commit)}
          >
            {/* Graph column — fixed width = SVG_W */}
            <div className="flex-shrink-0 relative" style={{ width: SVG_W }}>
              {/* Glow halo when selected */}
              {isSel && (
                <div className="absolute rounded-full pointer-events-none"
                  style={{
                    width: size + 16, height: size + 16,
                    left: bx - (size + 16) / 2, top: "50%", transform: "translateY(-50%)",
                    background: color, opacity: 0.22, filter: "blur(8px)",
                  }}
                />
              )}
              {/* Dot */}
              <motion.div
                className="absolute rounded-full border-2"
                style={{
                  width: size, height: size,
                  left: bx - size / 2, top: "50%", transform: "translateY(-50%)",
                  background: isSel ? color : "var(--bg)",
                  borderColor: color,
                  boxShadow: `0 0 ${isSel ? 14 : 5}px ${color}`,
                  transition: "background 0.2s, box-shadow 0.2s",
                }}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.85 }}
              />
            </div>

            {/* Text labels */}
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] opacity-35 group-hover:opacity-60 transition-opacity"
                  style={{ color, fontFamily: "var(--font-mono)" }}>
                  {commit.hash}
                </span>
                {commit.tag && <TagBadge tag={commit.tag} />}
              </div>
              <div className="text-sm font-medium mt-0.5 truncate transition-colors duration-150"
                style={{ color: isSel ? "var(--text)" : "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                {commit.message}
              </div>
              <div className="text-xs mt-0.5"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
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
            initial={{ opacity: 0, x: -10 }}
            animate={go ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.32, delay: 0.25 + N * 0.07 }}
            onClick={() => onSelectCommit(isSel ? null : VINEYARD_COMMIT)}
          >
            <div className="flex-shrink-0 relative" style={{ width: SVG_W }}>
              {isSel && (
                <div className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 26, height: 26,
                    left: VINE_X - 13, top: "50%", transform: "translateY(-50%)",
                    background: BC.vineyard, opacity: 0.22, filter: "blur(8px)",
                  }}
                />
              )}
              <motion.div
                className="absolute rounded-full border-2"
                style={{
                  width: 10, height: 10,
                  left: VINE_X - 5, top: "50%", transform: "translateY(-50%)",
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
                <span className="text-[11px] opacity-35 group-hover:opacity-60 transition-opacity"
                  style={{ color: BC.vineyard, fontFamily: "var(--font-mono)" }}>
                  {VINEYARD_COMMIT.hash}
                </span>
                <TagBadge tag="ongoing" />
              </div>
              <div className="text-sm font-medium mt-0.5 truncate transition-colors duration-150"
                style={{ color: isSel ? "var(--text)" : "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                {VINEYARD_COMMIT.message}
              </div>
              <div className="text-xs mt-0.5"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
                {VINEYARD_COMMIT.date}
              </div>
            </div>
          </motion.div>
        );
      })()}
    </div>
  );
}
