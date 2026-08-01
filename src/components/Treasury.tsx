import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Medal, Award, Sparkles, Brain, Shield, Cpu, Link, Glasses, Cloud, Code2, Lightbulb, Settings, Bell } from "lucide-react";

// Inline Venus icon
const VenusIcon = ({ size = 24, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <circle cx="12" cy="9" r="6" />
    <line x1="12" y1="15" x2="12" y2="22" />
    <line x1="9" y1="19" x2="15" y2="19" />
  </svg>
);
import { useTheme } from "@/contexts/ThemeContext";
import SpecialPrizes from "@/components/SpecialPrizes";

const prizes = [
  {
    id: 1,
    place: "1st Place",
    title: "Grand Warden's Alter",
    amount: "₹25000",
    extras: ["Trophy", "Mentorship", "Cloud Credits"],
    color: "gold-coin",
    icon: Crown,
    aura: "from-gold-coin/30 via-purple-500/20 to-transparent",
    characterImage: "/FIrst Prize.webp",
    chestGlow: "rgba(255,215,0,0.6)",
    burstColor: "#FFD700",
  },
  {
    id: 2,
    place: "2nd Place",
    title: "King's Alter",
    amount: "₹15000",
    extras: ["Silver Trophy", "Cloud Credits"],
    color: "foreground",
    icon: Medal,
    aura: "from-foreground/20 via-blue-500/10 to-transparent",
    characterImage: "/Second Prize.webp",
    chestGlow: "rgba(100,180,255,0.5)",
    burstColor: "#64B4FF",
  },
  {
    id: 3,
    place: "3rd Place",
    title: "Queen's Alter",
    amount: "₹10000",
    extras: ["Bronze Trophy", "Swag Pack"],
    color: "orange-400",
    icon: Award,
    aura: "from-orange-500/20 via-green-500/10 to-transparent",
    characterImage: "/Third Prize.webp",
    chestGlow: "rgba(192,120,255,0.5)",
    burstColor: "#C078FF",
  },
];

const NOTION_URL =
  "https://innofusion.notion.site/InnoFusion-3-0-Participant-Benefits-341e586c7bb480419a63ebfb42e81cd5";

const trackPrizes = [
  { id: 1, name: "Artificial Intelligence & Machine Learning", short: "AI & ML", icon: Brain, color: "#a855f7", prize: "₹3,000 + Premium Swags", troop: "Grand Warden", img: "/characters/track-warden.png" },
  { id: 2, name: "Cybersecurity", short: "Cybersecurity", icon: Shield, color: "#3b82f6", prize: "₹3,000 + Premium Swags", troop: "P.E.K.K.A", img: "/characters/track-pekka.png" },
  { id: 3, name: "Robotics & IoT", short: "Robotics & IoT", icon: Cpu, color: "#06b6d4", prize: "₹3,000 + Premium Swags", troop: "Minion", img: "/characters/track-minion.png" },
  { id: 4, name: "Blockchain & Web3", short: "Blockchain", icon: Link, color: "#f59e0b", prize: "₹3,000 + Premium Swags", troop: "Barbarian King", img: "/characters/track-king.png" },
  { id: 5, name: "Augmented & Virtual Reality", short: "AR & VR", icon: Glasses, color: "#ec4899", prize: "₹3,000 + Premium Swags", troop: "Archer", img: "/characters/track-archer.png" },
  { id: 6, name: "Cloud & Infrastructure", short: "Cloud", icon: Cloud, color: "#38bdf8", prize: "₹3,000 + Premium Swags", troop: "Balloon", img: "/characters/track-balloon.png" },
  { id: 7, name: "Web and App Development", short: "Web & App", icon: Code2, color: "#f97316", prize: "₹3,000 + Premium Swags", troop: "Dragon", img: "/characters/track-dragon.png" },
  { id: 8, name: "Best Innovative Idea Team", short: "Innovation", icon: Lightbulb, color: "#eab308", prize: "₹3,000 + Premium Swags", troop: "Wizard", img: "/characters/track-wizard.png" },
  { id: 9, name: "Best All Girls' Team", short: "All Girls", icon: VenusIcon, color: "#f43f5e", prize: "₹3,000 + Premium Swags", troop: "Night Witch", img: "/characters/track-nightwitch.png" },
  { id: 10, name: "Best Beginners' Team", short: "Beginners", icon: Award, color: "#10b981", prize: "₹3,000 + Premium Swags", troop: "Barbarian", img: "/characters/track-barbarian.png" },
];

/*
 * ── COC War Chest ──
 * No card. Just the chest itself sitting in the dark.
 *
 * idle     → closed chest floats, glow pool beneath, "TAP TO OPEN"
 * shaking  → chest rattles violently for 700ms, light leaks from the seams
 * open     → hard white flash, chest swaps to the open sprite, a pillar of
 *            light erupts upward, sparks + coins fly, then the rewards rise
 *            out of the chest. Rays keep rotating and sparkles keep drifting
 *            for as long as it stays open.
 */

const CHEST_CLOSED = "/chest-closed.png";
const CHEST_OPEN = "/chest-open.png";

/* Deterministic particle tables so re-renders don't reshuffle them */
const BURST_SPARKS = Array.from({ length: 30 }, (_, i) => {
  const angle = (i / 30) * 360 + (i % 3) * 7;
  const rad = (angle * Math.PI) / 180;
  const dist = 110 + (i % 6) * 28;
  return {
    id: i,
    x: Math.cos(rad) * dist,
    y: Math.sin(rad) * dist * 0.85,
    size: 3 + (i % 5) * 1.6,
    dur: 0.8 + (i % 4) * 0.18,
  };
});

const BURST_COINS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: -110 + i * 17,
  lift: 110 + (i % 5) * 34,
  rot: 360 + (i % 4) * 180,
  dur: 1.3 + (i % 5) * 0.16,
}));

const DRIFT_SPARKLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${6 + ((i * 29) % 88)}%`,
  top: `${10 + ((i * 41) % 70)}%`,
  size: 2 + (i % 4) * 1.4,
  dur: 2 + (i % 5) * 0.6,
  delay: (i % 7) * 0.35,
  rise: 14 + (i % 4) * 10,
}));

const ChestCard = ({
  prize,
  index,
  isOpen,
  onOpen,
  isNight,
}: {
  prize: (typeof prizes)[0];
  index: number;
  isOpen: boolean;
  onOpen: () => void;
  isNight: boolean;
}) => {
  const [phase, setPhase] = useState<"idle" | "shaking" | "open">("idle");

  useEffect(() => {
    if (isOpen && phase === "idle") {
      setPhase("shaking");
      const t = setTimeout(() => setPhase("open"), 700);
      return () => clearTimeout(t);
    }
    if (!isOpen && phase !== "idle") setPhase("idle");
  }, [isOpen]);

  const opened = phase === "open";
  const shaking = phase === "shaking";
  const glow = prize.chestGlow;
  const burst = prize.burstColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.18, duration: 0.6 }}
      className="chest-card relative flex flex-col items-center cursor-pointer select-none"
      style={{ minHeight: 420 }}
      onClick={onOpen}
    >
      {/* ═══ Place label ═══ */}
      <motion.h3
        className="font-display text-xl sm:text-2xl uppercase tracking-[0.18em] mb-2 z-20"
        animate={{
          color: opened ? burst : "#FFD700",
          textShadow: opened
            ? `0 0 24px ${glow}, 0 3px 5px rgba(0,0,0,0.9)`
            : "0 0 12px rgba(255,215,0,0.6), 0 3px 5px rgba(0,0,0,0.9)",
        }}
        transition={{ duration: 0.4 }}
      >
        {prize.place}
      </motion.h3>

      {/* ═══ Chest stage ═══ */}
      <div className="relative w-full flex items-center justify-center" style={{ height: 210 }}>
        {/* Ambient glow pool under the chest */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            bottom: 8,
            width: 200,
            height: 60,
            background: `radial-gradient(ellipse, ${glow} 0%, transparent 70%)`,
            filter: "blur(18px)",
          }}
          animate={{
            opacity: opened ? [0.9, 1, 0.9] : shaking ? 0.8 : [0.3, 0.5, 0.3],
            scaleX: opened ? 1.5 : 1,
          }}
          transition={{ duration: opened ? 2 : 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Light leaking from the seams while shaking ── */}
        <AnimatePresence>
          {shaking && (
            <motion.div
              key="seams"
              className="absolute inset-0 pointer-events-none z-[5] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="rounded-full"
                style={{ width: 90, height: 90, background: burst, filter: "blur(26px)" }}
                animate={{ scale: [0.4, 1.1, 0.7, 1.4, 1], opacity: [0.3, 0.7, 0.5, 0.95, 1] }}
                transition={{ duration: 0.7, ease: "easeIn" }}
              />
              {[20, 75, 130, 200, 250, 310].map((a, i) => (
                <motion.div
                  key={a}
                  className="absolute"
                  style={{
                    width: 3,
                    height: 70,
                    background: `linear-gradient(to top, ${burst}, transparent)`,
                    transform: `rotate(${a}deg)`,
                    transformOrigin: "bottom center",
                    bottom: "50%",
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: [0, 0.6, 1], opacity: [0, 0.8, 1] }}
                  transition={{ duration: 0.7, delay: i * 0.04 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Pillar of light + burst on open ── */}
        <AnimatePresence>
          {opened && (
            <motion.div
              key="eruption"
              className="absolute inset-0 pointer-events-none z-[4]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              {/* Hard white flash at the instant of opening */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ width: 340, height: 340, background: "#fff", filter: "blur(40px)" }}
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: [0.2, 1.6, 2.2], opacity: [0, 0.95, 0] }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />

              {/* Vertical pillar of light */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  bottom: "45%",
                  width: 80,
                  height: 320,
                  background: `linear-gradient(to top, #ffffff, ${burst}, transparent)`,
                  filter: "blur(14px)",
                  transformOrigin: "bottom center",
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0, 1.25, 0.9, 1], opacity: [0, 1, 0.55, 0.45] }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              />

              {/* Slowly rotating god-rays that persist */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ width: 300, height: 300 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              >
                {Array.from({ length: 14 }).map((_, i) => (
                  <motion.div
                    key={`ray-${i}`}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      width: i % 2 === 0 ? 5 : 2,
                      height: 150,
                      background: `linear-gradient(to top, ${burst}bb, transparent)`,
                      transformOrigin: "bottom center",
                      transform: `translate(-50%, -100%) rotate(${i * (360 / 14)}deg)`,
                      transformBox: "fill-box",
                    }}
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: i % 2 === 0 ? 0.45 : 0.22 }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.02 }}
                  />
                ))}
              </motion.div>

              {/* Expanding shockwave ring */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ border: `3px solid ${burst}`, width: 60, height: 60 }}
                initial={{ scale: 0.3, opacity: 0.9 }}
                animate={{ scale: 6, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ border: `2px solid #ffffff`, width: 60, height: 60 }}
                initial={{ scale: 0.3, opacity: 0.8 }}
                animate={{ scale: 4.5, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
              />

              {/* Spark shower */}
              {BURST_SPARKS.map((s) => (
                <motion.div
                  key={`sp-${s.id}`}
                  className="absolute left-1/2 top-1/2 rounded-full"
                  style={{
                    width: s.size,
                    height: s.size,
                    background: s.id % 3 === 0 ? "#ffffff" : burst,
                    boxShadow: `0 0 10px ${burst}`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: s.x, y: s.y, opacity: 0, scale: 0 }}
                  transition={{ duration: s.dur, delay: s.id * 0.015, ease: "easeOut" }}
                />
              ))}

              {/* Coins erupting and raining back down */}
              {BURST_COINS.map((c) => (
                <motion.div
                  key={`co-${c.id}`}
                  className="absolute left-1/2 top-1/2 text-2xl"
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0, rotate: 0 }}
                  animate={{
                    x: [0, c.x * 0.45, c.x],
                    y: [0, -c.lift, 150],
                    opacity: [0, 1, 1, 0],
                    scale: [0.2, 1.2, 1, 0.6],
                    rotate: [0, c.rot * 0.5, c.rot],
                  }}
                  transition={{ duration: c.dur, delay: 0.1 + c.id * 0.045, ease: "easeOut" }}
                >
                  🪙
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── The chest sprite itself ── */}
        <motion.div
          className="relative z-10"
          animate={
            shaking
              ? {
                  x: [0, -9, 11, -13, 10, -8, 13, -11, 7, -5, 0],
                  y: [0, -3, 4, -5, 3, -4, 6, -3, 4, -2, 0],
                  rotate: [0, -4, 5, -7, 5, -4, 7, -5, 3, -2, 0],
                  scale: [1, 1.05, 0.97, 1.07, 1.02, 1.06, 0.98, 1.05, 1, 1.03, 1],
                }
              : opened
              ? { x: 0, y: -6, rotate: 0, scale: 1 }
              : { x: 0, y: [0, -8, 0], rotate: [-1.5, 1.5, -1.5], scale: 1 }
          }
          transition={
            shaking
              ? { duration: 0.7, ease: "easeInOut" }
              : opened
              ? { type: "spring", stiffness: 260, damping: 12 }
              : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={opened ? "open" : "closed"}
              src={opened ? CHEST_OPEN : CHEST_CLOSED}
              alt={`${prize.place} war chest`}
              className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 object-contain"
              initial={opened ? { scale: 0.6, opacity: 0 } : { opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 14 }}
              style={{
                filter: opened
                  ? `drop-shadow(0 0 30px ${glow}) drop-shadow(0 0 60px ${glow}) brightness(1.15)`
                  : shaking
                  ? `drop-shadow(0 0 24px ${glow}) brightness(1.3)`
                  : `drop-shadow(0 8px 18px rgba(0,0,0,0.7)) drop-shadow(0 0 14px ${glow})`,
                transition: "filter 0.3s ease",
              }}
            />
          </AnimatePresence>
        </motion.div>

        {/* ── Drifting sparkles that persist while open ── */}
        {opened && (
          <div className="absolute inset-0 pointer-events-none z-[11]">
            {DRIFT_SPARKLES.map((s) => (
              <motion.div
                key={`dr-${s.id}`}
                className="absolute rounded-full"
                style={{
                  left: s.left,
                  top: s.top,
                  width: s.size,
                  height: s.size,
                  background: s.id % 4 === 0 ? "#ffffff" : burst,
                  boxShadow: `0 0 6px ${burst}`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.4, 1.3, 0.4],
                  y: [0, -s.rise, 0],
                }}
                transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ═══ Reward details ═══ */}
      <div className="relative z-20 w-full flex flex-col items-center mt-2 px-2" style={{ minHeight: 150 }}>
        <AnimatePresence mode="wait">
          {opened ? (
            <motion.div
              key="rewards"
              className="flex flex-col items-center text-center w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Amount */}
              <motion.div
                initial={{ y: 60, opacity: 0, scale: 0.4 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, type: "spring", stiffness: 180, damping: 12 }}
                className="font-display text-3xl sm:text-4xl md:text-[2.6rem] text-[#f5e6a8] tracking-wide leading-none"
                style={{
                  textShadow: `0 3px 3px rgba(0,0,0,0.95), 0 0 24px ${glow}, 0 0 50px ${glow}`,
                }}
              >
                {prize.amount}
              </motion.div>

              {/* Title */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.42 }}
                className="font-display text-[10px] sm:text-xs uppercase tracking-[0.22em] text-gray-200 mt-2 mb-4"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.9)" }}
              >
                {prize.title}
              </motion.p>

              {/* Extras */}
              <div className="flex flex-wrap justify-center gap-2">
                {prize.extras.map((extra, i) => {
                  const low = extra.toLowerCase();
                  let emoji = "✨";
                  if (low.includes("trophy")) emoji = "🏆";
                  if (low.includes("mentorship")) emoji = "🎓";
                  if (low.includes("cloud")) emoji = "☁️";
                  if (low.includes("swag")) emoji = "👕";

                  return (
                    <motion.div
                      key={extra}
                      initial={{ opacity: 0, y: 24, scale: 0.4 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.55 + i * 0.13, type: "spring", stiffness: 220, damping: 14 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                      style={{
                        background: "rgba(10,10,12,0.7)",
                        border: `1px solid ${burst}55`,
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        boxShadow: `0 2px 10px rgba(0,0,0,0.6), 0 0 16px ${glow}`,
                      }}
                    >
                      <span className="text-xs">{emoji}</span>
                      <span className="font-display text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-[#f5e8d0]">
                        + {extra}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <motion.div
                className="flex items-center gap-2 font-display text-[10px] sm:text-xs tracking-[0.22em] uppercase mt-6"
                style={{ color: "#c4920a", textShadow: "0 2px 4px rgba(0,0,0,0.9)" }}
                animate={{ opacity: [0.4, 1, 0.4], y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-sm">👆</span>
                <span>Tap to open</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ── Track Prize Card ──
 * A COC "troop card": the character stands on a glowing rune pedestal above
 * the plaque. On hover the troop leaps forward, the pedestal flares, a sheen
 * sweeps the card and the card tilts toward the cursor.
 */
const TrackPrizeCard = ({
  prize,
  index,
  isNight,
}: {
  prize: (typeof trackPrizes)[0];
  index: number;
  isNight: boolean;
}) => {
  const Icon = prize.icon;
  const c = prize.color;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={NOTION_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 26, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col items-center rounded-2xl pt-3 pb-4 px-3 overflow-hidden"
      style={{
        minHeight: 250,
        background: `linear-gradient(165deg, ${c}1f 0%, rgba(255,255,255,0.03) 40%, rgba(10,10,12,0.5) 100%)`,
        border: `1px solid ${c}38`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: hovered
          ? `0 18px 40px rgba(0,0,0,0.6), 0 0 42px ${c}44, inset 0 1px 0 ${c}55`
          : "0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        transition: "box-shadow 0.35s ease, border-color 0.35s ease",
        borderColor: hovered ? `${c}99` : `${c}38`,
      }}
    >
      {/* Ambient colour wash from the top */}
      <div
        className="absolute inset-x-0 top-0 h-2/3 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${c}2e 0%, transparent 70%)` }}
      />

      {/* Diagonal sheen sweep on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(115deg, transparent 35%, ${c}33 48%, rgba(255,255,255,0.18) 52%, transparent 65%)`,
        }}
        initial={{ x: "-130%" }}
        animate={hovered ? { x: "130%" } : { x: "-130%" }}
        transition={{ duration: 0.75, ease: "easeInOut" }}
      />

      {/* ── Character stage ── */}
      <div className="relative z-10 w-full flex items-end justify-center" style={{ height: 118 }}>
        {/* Rune pedestal glow */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            width: 92,
            height: 26,
            background: `radial-gradient(ellipse, ${c} 0%, ${c}55 40%, transparent 72%)`,
            filter: "blur(9px)",
          }}
          animate={{
            opacity: hovered ? [0.85, 1, 0.85] : [0.35, 0.55, 0.35],
            scaleX: hovered ? 1.35 : 1,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Pedestal ring */}
        <motion.div
          className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{ width: 62, height: 15, border: `1.5px solid ${c}` }}
          animate={{ opacity: hovered ? 0.75 : 0.28, scale: hovered ? 1.18 : 1 }}
          transition={{ duration: 0.35 }}
        />

        {/* Orbiting motes that appear on hover */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute bottom-2 left-1/2 rounded-full pointer-events-none"
            style={{ width: 3, height: 3, background: c, boxShadow: `0 0 7px ${c}` }}
            animate={
              hovered
                ? {
                    x: [0, Math.cos((i / 5) * 6.28) * 44],
                    y: [0, -30 - i * 13],
                    opacity: [0, 1, 0],
                    scale: [0.4, 1.2, 0.3],
                  }
                : { opacity: 0 }
            }
            transition={{ duration: 1.6, repeat: hovered ? Infinity : 0, delay: i * 0.22, ease: "easeOut" }}
          />
        ))}

        {/* The troop */}
        <motion.img
          src={prize.img}
          alt={prize.troop}
          loading="lazy"
          className="relative z-10 object-contain"
          style={{ height: 108, transformOrigin: "bottom center" }}
          /* Float only — no tilt. */
          animate={hovered ? { y: -14, scale: 1.16 } : { y: [0, -6, 0], scale: 1 }}
          transition={
            hovered
              ? { type: "spring", stiffness: 320, damping: 16 }
              : { duration: 3.4 + (index % 4) * 0.4, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </div>

      {/* ── Plaque ── */}
      <div className="relative z-10 w-full flex flex-col items-center text-center mt-3">
        {/* Icon + short label chip */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-2"
          style={{ background: `${c}1f`, border: `1px solid ${c}4d` }}
        >
          <Icon size={12} style={{ color: c }} />
          <span
            className="font-display text-[8px] uppercase tracking-[0.14em]"
            style={{ color: c }}
          >
            {prize.short}
          </span>
        </div>

        {/* Full track name */}
        <p className="font-heading font-semibold text-[11px] sm:text-xs leading-snug text-foreground/90 px-1 min-h-[2.5em] flex items-center justify-center">
          {prize.name}
        </p>

        {/* Divider */}
        <div
          className="w-10 h-px my-2"
          style={{ background: `linear-gradient(90deg, transparent, ${c}aa, transparent)` }}
        />

        {/* Prize */}
        <p
          className="font-display text-[9px] sm:text-[10px] uppercase tracking-wider"
          style={{ color: c, textShadow: `0 0 12px ${c}77` }}
        >
          {prize.prize}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${c}, transparent)` }}
      />
    </motion.a>
  );
};

/* ── Treasury Section ── */
const Treasury = () => {
  const [openedChest, setOpenedChest] = useState<number | null>(null);
  const { isNight } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".chest-card")) {
        setOpenedChest(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/Coins.mp3");
    audioRef.current.volume = 1.0;
  }, []);

  const playCoinsSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
    }
  };

  const handleChestClick = (id: number) => {
    playCoinsSound();
    setOpenedChest(openedChest === id ? null : id);
  };

  return (
    <section id="prizes" className="relative py-20 overflow-hidden" style={{ background: "#0a0a0c" }}>
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isNight
            ? `radial-gradient(ellipse 80% 45% at 50% 45%, rgba(120,60,200,0.10) 0%, transparent 72%),
               linear-gradient(180deg, #0a0a0c 0%, #0c0a14 30%, #0d0b16 50%, #0b0910 74%, #0a0a0c 92%, #0a0a0c 100%)`
            : `radial-gradient(ellipse 80% 45% at 50% 45%, rgba(200,150,40,0.07) 0%, transparent 72%),
               linear-gradient(180deg, #0a0a0c 0%, #0d0c0a 30%, #0e0d0b 50%, #0c0b0a 74%, #0a0a0c 92%, #0a0a0c 100%)`,
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.img
            src="/TrophyIcon.webp"
            alt=""
            className="w-32 sm:w-40 md:w-56 h-auto mx-auto mb-4 object-contain"
            animate={{ scale: [1, 1.1, 1], rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              filter: isNight
                ? "drop-shadow(0 0 20px rgba(139,92,246,0.5))"
                : "drop-shadow(0 0 20px rgba(255,215,0,0.5))",
            }}
          />
          <h2
            className={`font-heading font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 ${
              isNight ? "text-purple-400 text-glow-purple" : "text-gold-coin text-glow-gold"
            }`}
          >
            {isNight ? "The Builder's Vault" : "The Treasury"}
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Click the war chests to reveal your rewards
          </p>
        </motion.div>

        {/* Prize Chests */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto px-2 sm:px-4">
          {prizes.map((prize, index) => (
            <ChestCard
              key={prize.id}
              prize={prize}
              index={index}
              isOpen={openedChest === prize.id}
              onOpen={() => handleChestClick(prize.id)}
              isNight={isNight}
            />
          ))}
        </div>

        {/* Track Prizes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20"
        >
          <div className="text-center mb-8 sm:mb-10">
            <h3
              className={`font-display text-2xl sm:text-3xl md:text-4xl mb-2 ${
                isNight ? "text-purple-400 text-glow-purple" : "text-gold-coin text-glow-gold"
              }`}
            >
              ⚔️ {isNight ? "Builder Track Loot" : "Clan Track Spoils"}
            </h3>
            <p className="font-body text-sm sm:text-base text-muted-foreground">
              Dominate your track and claim the war chest
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {trackPrizes.slice(0, 4).map((p, i) => (
                <TrackPrizeCard key={p.id} prize={p} index={i} isNight={isNight} />
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {trackPrizes.slice(4, 8).map((p, i) => (
                <TrackPrizeCard key={p.id} prize={p} index={i + 4} isNight={isNight} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xs sm:max-w-sm md:max-w-[50%] mx-auto">
              {trackPrizes.slice(8).map((p, i) => (
                <TrackPrizeCard key={p.id} prize={p} index={i + 8} isNight={isNight} />
              ))}
            </div>
          </div>
        </motion.div>

        <SpecialPrizes />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 text-center px-4"
        >
          <p className="font-body text-sm sm:text-base md:text-lg text-muted-foreground mb-3 sm:mb-4">
            For more details check the <span className="text-gold-coin font-bold">Notion page</span>
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://innofusion.notion.site/InnoFusion-3-0-Participant-Benefits-341e586c7bb480419a63ebfb42e81cd5" target="_blank">
              <span className="px-6 py-3 rounded-full bg-purple-500/20 border-2 border-purple-500/40 font-display text-base text-purple-300 uppercase tracking-wider">
                Click Here
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Treasury;
