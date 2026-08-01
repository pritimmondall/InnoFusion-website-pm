import type { CSSProperties } from "react";
import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

interface SpecialPrize {
  name: string;
  logo: string;
  link: string;
  description: string;
  themeColor: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SAFARI FIX EXPLAINED
// ─────────────────────────────────────────────────────────────────────────────
// Safari has a longstanding bug where `backface-visibility: hidden` fails when
// the parent uses `transform-style: preserve-3d`. The previous implementation
// relied on exactly that pattern, causing the front face to show through (mirrored)
// during the flip in Safari.
//
// THE FIX: Eliminate `transform-style: preserve-3d` entirely.
// Instead, each face gets its own `perspective(1000px)` baked directly into its
// `transform` value (e.g. `perspective(1000px) rotateY(0deg)`). This gives each
// face its own independent 3D context — no parent preserve-3d needed.
// Visibility is controlled via Framer Motion's `useTransform` → opacity MotionValue,
// so we don't rely on `backface-visibility` at all. The result is pixel-identical
// to the intended design, but works correctly in Safari, Chrome, and Firefox.
// ─────────────────────────────────────────────────────────────────────────────

const BountyCard: React.FC<{ prize: SpecialPrize; isNight: boolean }> = ({
  prize,
  isNight,
}) => {
  const isNavigable = prize.link && prize.link !== "#";

  // Single motion value drives the whole animation: 0 = front, 180 = back.
  const rotateY = useMotionValue(0);

  // ── Per-face transforms ──────────────────────────────────────────────────
  // Each face carries `perspective(1000px)` in its own transform so no parent
  // preserve-3d is required (that's the root cause of the Safari bug).
  const frontTransform = useTransform(
    rotateY,
    (v) => `perspective(1000px) rotateY(${v}deg)`
  );
  // Back face starts at -180 deg (facing away) and ends at 0 deg (facing us).
  const backTransform = useTransform(
    rotateY,
    (v) => `perspective(1000px) rotateY(${v - 180}deg)`
  );

  // ── Opacity ─────────────────────────────────────────────────────────────
  // Hard step at 90 deg: only one face is ever visible at a time.
  // This replaces backface-visibility entirely — 100% reliable in Safari.
  const frontOpacity = useTransform(rotateY, [0, 89.99, 90, 180], [1, 1, 0, 0]);
  const backOpacity  = useTransform(rotateY, [0, 89.99, 90, 180], [0, 0, 1, 1]);

  // ── Pointer events ───────────────────────────────────────────────────────
  // Prevent the hidden face from intercepting clicks.
  const frontPointer = useTransform<number, CSSProperties["pointerEvents"]>(
    frontOpacity,
    (o) => (o > 0 ? "auto" : "none")
  );
  const backPointer = useTransform<number, CSSProperties["pointerEvents"]>(
    backOpacity,
    (o) => (o > 0 ? "auto" : "none")
  );

  // ── Flip handlers ────────────────────────────────────────────────────────
  const flipIn  = () => animate(rotateY, 180, { duration: 0.6, ease: [0.4, 0.2, 0.2, 1] });
  const flipOut = () => animate(rotateY, 0,   { duration: 0.6, ease: [0.4, 0.2, 0.2, 1] });

  const handleMouseEnter = () => flipIn();
  const handleMouseLeave = () => flipOut();

  const handleClick = () => {
    // Touch-only devices (no hover): toggle on tap
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches
    ) {
      if (rotateY.get() < 90) {
        flipIn();
      } else {
        flipOut();
      }
    }
  };

  // ── Visual tokens ────────────────────────────────────────────────────────
  const borderColor  = "#C4920A";
  const bottomShadow = "#7A5808";
  const frontBg = "linear-gradient(180deg, #ffdc73 0%, #df9926 100%)";
  const backBg  = isNight
    ? "linear-gradient(180deg, #1e1630 0%, #130d20 100%)"
    : "linear-gradient(180deg, #1e1525 0%, #110b17 100%)";
  const sharedBorder = `3px solid ${borderColor}`;
  const sharedShadow = `0 6px 0 ${bottomShadow}, 0 10px 20px rgba(0,0,0,0.5)`;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      // `cursor` follows the current visible face
      className="relative w-72 h-[300px] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* ── FRONT FACE (Gold logo panel) ──────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center overflow-hidden"
        style={{
          transform:     frontTransform,
          opacity:       frontOpacity,
          pointerEvents: frontPointer,
          background:    frontBg,
          border:        sharedBorder,
          boxShadow:     sharedShadow,
        }}
      >
        {/* Rivets */}
        <span className="absolute top-2 left-2  w-2 h-2 rounded-full bg-[#1a110a] border border-[#4a3320]" />
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#1a110a] border border-[#4a3320]" />
        <span className="absolute bottom-2 left-2  w-2 h-2 rounded-full bg-[#1a110a] border border-[#4a3320]" />
        <span className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#1a110a] border border-[#4a3320]" />

        <img
          src={prize.logo}
          alt={prize.name}
          className="relative z-10 max-h-[120px] max-w-[70%] object-contain drop-shadow-md"
        loading="lazy" decoding="async" />
      </motion.div>

      {/* ── BACK FACE (Dark description panel) ────────────────────────────── */}
      <motion.div
        className="absolute inset-0 rounded-2xl flex flex-col items-center p-5 overflow-hidden"
        style={{
          transform:     backTransform,
          opacity:       backOpacity,
          pointerEvents: backPointer,
          background:    backBg,
          border:        sharedBorder,
          boxShadow:     sharedShadow,
        }}
      >
        {/* Rivets */}
        <span className="absolute top-2 left-2  w-2 h-2 rounded-full bg-[#1a110a] border border-[#4a3320]" />
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#1a110a] border border-[#4a3320]" />
        <span className="absolute bottom-2 left-2  w-2 h-2 rounded-full bg-[#1a110a] border border-[#4a3320]" />
        <span className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#1a110a] border border-[#4a3320]" />

        <h4
          className="relative z-10 font-display text-2xl tracking-wider text-center mb-1 mt-2 text-[#FFD700]"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
        >
          {prize.name}
        </h4>

        <div className="w-16 h-[2px] rounded-full mb-4 opacity-60 bg-[#C4920A]" />

        <div className="relative z-10 w-full flex-1">
          <p className="font-body text-[14px] leading-relaxed text-[#e6e0d4] text-center drop-shadow-md px-1">
            {prize.description}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="w-full flex gap-2 z-20 mt-2">
          <button type="button"
            onClick={(e) => {
              e.stopPropagation();
              window.open(
                "https://innofusion.notion.site/InnoFusion-3-0-Participant-Benefits-341e586c7bb480419a63ebfb42e81cd5",
                "_blank",
                "noopener,noreferrer"
              );
            }}
            className="flex-1 flex items-center justify-center py-2.5 rounded-lg text-xs font-bold font-display tracking-widest uppercase transition-all duration-100 hover:brightness-110 active:translate-y-1"
            style={{
              background:  "linear-gradient(180deg, #5aacf5 0%, #1a6fd4 100%)",
              border:      "1.5px solid #1050a0",
              boxShadow:   "0 3px 0 #1050a0, 0 4px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.4)",
              color:       "white",
              textShadow:  "0 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            Details
          </button>

          {isNavigable && (
            <button type="button"
              onClick={(e) => {
                e.stopPropagation();
                window.open(prize.link, "_blank", "noopener,noreferrer");
              }}
              className="flex-1 flex items-center justify-center py-2.5 rounded-lg text-xs font-bold font-display tracking-widest uppercase transition-all duration-100 hover:brightness-110 active:translate-y-1"
              style={{
                background:  "linear-gradient(180deg, #8ede43 0%, #519b16 100%)",
                border:      "1.5px solid #2d5a0c",
                boxShadow:   "0 3px 0 #2d5a0c, 0 4px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.4)",
                color:       "white",
                textShadow:  "0 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              Visit
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const SpecialPrizes = () => {
  const { isNight } = useTheme();

  const specialPrizes: SpecialPrize[] = [
    {
      name: "N8N",
      logo: "/Sponsers/N8N.webp",
      link: "https://www.n8n.io/",
      description:
        "Every finalist gets n8n Cloud Pro access (valued at €60/license) to build complete automation workflows.",
      themeColor: "#a855f7",
    },
    {
      name: "Wolfram",
      logo: "/Sponsers/wolfram.webp",
      link: "#",
      description:
        "1 month of Wolfram|One: full Wolfram Language access, 5k API calls, 5k Cloud Credits, 2 installs & 2GB Storage.",
      themeColor: "#a855f7",
    },
    {
      name: "Avalanche",
      logo: "/Sponsers/Avalanche.webp",
      link: "https://www.avax.network/",
      description:
        "₹3,000 cash prize for winning teams in Blockchain/Web3 & AR/VR tracks, plus exclusive Avalanche-branded merch.",
      themeColor: "#eab308",
    },
    {
      name: "CodeCrafters",
      logo: "/Sponsers/CodeCrafters.webp",
      link: "https://codecrafters.io/",
      description:
        "Top 3 teams win VIP memberships ($360/yr): 🥇 2-year, 🥈 1-year, 🥉 6-month — build Git, Docker & SQLite.",
      themeColor: "#eab308",
    },
    {
      name: "Edubuk",
      logo: "/Sponsers/Edubuk.webp",
      link: "https://edubuk.com/",
      description:
        "Lifetime blockchain-verified digital badges via eSeal, plus 3 months free access to TruCV and TruJobs.",
      themeColor: "#ef4444",
    },
    {
      name: "Mastra AI",
      logo: "/Sponsers/mastra.webp",
      link: "https://www.mastra.ai/",
      description:
        "Every finalist receives a copy of a technical book to level up their AI and software development skill sets.",
      themeColor: "#ef4444",
    },
    {
      name: "navan ai",
      logo: "/Sponsers/navan.webp",
      link: "https://www.navan.ai/",
      description:
        "Access to multi-agent framework + free Skool community access ($19/month) for coding courses & networking.",
      themeColor: "#ef4444",
    },
    {
      name: "Keploy",
      logo: "/Sponsers/keploy.webp",
      link: "https://www.keploy.io/",
      description:
        "Exclusive API testing credits + official Keploy Gift Hamper (T-shirt & swag) for Web/App and Cloud track winners.",
      themeColor: "#22c55e",
    },
    {
      name: ".XYZ",
      logo: "/Sponsers/xyz-logo-white.webp",
      link: "https://gen.xyz/",
      description:
        "Free .xyz domains for all Finalists, Evangelists & Top 30 teams to host their hackathon builds.",
      themeColor: "#22c55e",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 sm:mt-24 max-w-6xl mx-auto px-4"
    >
      <div className="text-center mb-10 sm:mb-16">
        <h3
          className={`font-display text-2xl sm:text-3xl md:text-4xl mb-3 ${
            isNight
              ? "text-purple-400 text-glow-purple"
              : "text-gold-coin text-glow-gold"
          }`}
        >
          💎 Special Bounties
        </h3>
        <p className="font-body text-sm sm:text-base md:text-lg text-muted-foreground">
          Unlock exclusive tools, licenses, and rewards from our ecosystem allies
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 sm:gap-10">
        {specialPrizes.map((prize, index) => (
          <motion.div
            key={prize.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <BountyCard prize={prize} isNight={isNight} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SpecialPrizes;
