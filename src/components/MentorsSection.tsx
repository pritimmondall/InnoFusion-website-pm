import { memo } from "react";
import { motion } from "framer-motion";

/*
 * Mentors — rebuilt from scratch.
 *
 * Deliberately written as a NEW module path (the old one was
 * components/Mentors.tsx) so no dev-server module cache, HMR graph or
 * browser-cached chunk can resolve to the previous version.
 *
 * Kept intentionally small: no theme branching, no wood panels, no
 * per-card state. Just photo + name in a glass card, an accent colour and
 * a floating troop badge per card.
 */

interface Mentor {
  name: string;
  designation: string;
  image: string;
  gender: "m" | "f";
  /** CSS object-position override for photos that need reframing within the card. Defaults to centered. */
  imagePosition?: string;
}

// Designations pulled from each mentor's own "Welcome" card image.
const MENTORS: Mentor[] = [
  { name: "Alik Agarwala", designation: "Software Engineer @ Amazon", image: "/mentors/alik-agarwala.webp", gender: "m" },
  { name: "Aniket Chakraborty", designation: "Founder @ Pujo Planner", image: "/mentors/aniket-chakraborty.webp", gender: "m" },
  { name: "Avik Agarwala", designation: "AI Engineer @ Tata Consultancy Services", image: "/mentors/avik-agarwala.webp", gender: "m", imagePosition: "32% 50%" },
  { name: "Daipayan Guha", designation: "ML Engineer @ Tata Consultancy Services", image: "/mentors/daipayan-guha.webp", gender: "m" },
  { name: "Devesh Tulshyan", designation: "Fullstack (AI + Cloud) Engineer @ TCS", image: "/mentors/devesh-tulshyan.webp", gender: "m" },
  { name: "Jeevan Joshi", designation: "SDE Intern @ Amazon", image: "/mentors/jeevan-joshi.webp", gender: "m" },
  { name: "Jyotirmoy Roy", designation: "Software Engineer @ Rezolve AI (Crownpeak)", image: "/mentors/jyotirmoy-roy.webp", gender: "m" },
  { name: "Mayank Kumar", designation: "5x Hackathon Winner", image: "/mentors/mayank-kumar.webp", gender: "m" },
  { name: "Narendra Nath Chatterjee", designation: "Senior Android Engineer-II @ Ajaib", image: "/mentors/narendra-nath-chatterjee.webp", gender: "m" },
  { name: "Oheli Das", designation: "3x Hackathon Winner", image: "/mentors/oheli-das.webp", gender: "f", imagePosition: "68% 50%" },
  { name: "Parichay Das", designation: "Principal Architect, AI Solutions @ LTM", image: "/mentors/parichay-das.webp", gender: "m" },
  { name: "Prasun Das", designation: "SDE-II (Delivery Lead) @ Redoq", image: "/mentors/prasun-das.webp", gender: "m" },
  { name: "Raihan Khan", designation: "Founding AI Engineer @ Wyzr", image: "/mentors/raihan-khan.webp", gender: "m" },
  { name: "Raj Bhattacharyya", designation: "Systems Engineer @ TCS", image: "/mentors/raj-bhattacharyya.webp", gender: "m" },
  { name: "Rajdeep Banerjee", designation: "Software Developer @ Accenture", image: "/mentors/rajdeep-banerjee.webp", gender: "m" },
  { name: "Sanglap Mridha", designation: "SDE-II @ Cozeva", image: "/mentors/sanglap-mridha.webp", gender: "m" },
  { name: "Subrata Acharjee", designation: "Senior QA @ TCS", image: "/mentors/subrata-acharjee.webp", gender: "m" },
  { name: "Chandan Kumar Sarkar", designation: "Senior Data Engineer @ TCS", image: "/mentors/chandan-kumar-sarkar.webp", gender: "m" },
];

/*
 * Two separate pools so the badge always matches the mentor's gender —
 * male troops for the male photos, female troops for the female ones.
 * Each pool cycles independently (tracked in MentorsSection below) so
 * neighbours within the same gender still get visual variety.
 */
const MALE_TROOPS = [
  "/characters/track-warden.png",
  "/characters/track-pekka.png",
  "/characters/track-barbarian.png",
  "/characters/track-wizard.png",
  "/characters/track-minion.png",
  "/characters/track-king.png",
  "/characters/track-balloon.png",
];

const FEMALE_TROOPS = [
  "/characters/track-archer.png",
  "/characters/track-nightwitch.png",
];

const ACCENTS = [
  "234,179,8",   // gold
  "59,130,246",  // blue
  "168,85,247",  // violet
  "249,115,22",  // orange
  "236,72,153",  // pink
  "16,185,129",  // emerald
  "6,182,212",   // cyan
  "244,63,94",   // rose
];

const MentorCard = memo(({ mentor, troop, index }: { mentor: Mentor; troop: string; index: number }) => {
  const rgb = ACCENTS[index % ACCENTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.05 }}
      className="mentor-card group relative overflow-hidden rounded-2xl"
      style={{
        border: `1px solid rgba(${rgb},0.3)`,
        boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
        // Read by the shared hover rule at the bottom of the section.
        ["--mc" as string]: rgb,
      }}
    >
      {/* Tall portrait photo — the card's own shape, not a small circle inset */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <img
          src={mentor.image}
          alt={mentor.name}
          width={640}
          height={853}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: mentor.imagePosition ?? "50% 50%" }}
        />
        {/* Scrim so the name + role stay legible over any photo. Taller and
            darker than before so a two-line designation never washes out. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(10,10,12,0) 38%, rgba(10,10,12,0.75) 68%, rgba(6,6,8,0.97) 100%)" }}
        />
        {/* Floating troop badge — vertical drift only, never rotation */}
        <motion.img
          src={troop}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-3 right-2 w-12 h-12 sm:w-14 sm:h-14 object-contain"
          style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.7))" }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: (index % 5) * 0.35 }}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-2 text-center">
        <h3 className="font-display text-xs leading-tight text-foreground sm:text-sm">
          {mentor.name}
        </h3>
        <div
          className="mx-auto my-1.5 h-px w-8 opacity-70"
          style={{ background: `rgb(${rgb})` }}
        />
        <p
          className="font-body text-[10px] leading-snug text-muted-foreground sm:text-[11px]"
          style={{ color: `rgba(${rgb},0.9)` }}
        >
          {mentor.designation}
        </p>
      </div>
    </motion.div>
  );
});
MentorCard.displayName = "MentorCard";

// Walks the roster once, handing each mentor the next badge from their own
// gender's pool — so a male mentor never ends up with the Archer/Night
// Witch and vice versa, while same-gender neighbours still vary.
let maleCursor = 0;
let femaleCursor = 0;
const MENTORS_WITH_TROOPS = MENTORS.map((mentor) => ({
  mentor,
  troop:
    mentor.gender === "f"
      ? FEMALE_TROOPS[femaleCursor++ % FEMALE_TROOPS.length]
      : MALE_TROOPS[maleCursor++ % MALE_TROOPS.length],
}));

const MentorsSection = () => {
  return (
    <section id="mentors" className="relative overflow-hidden py-20">
      <div className="absolute inset-0 blend-y-bottom bg-gradient-to-b from-transparent via-dark-elixir/60 to-dark-elixir/70" />

      {/* Dart Goblin guarding the left gutter */}
      <motion.img
        src="/characters/dart-goblin.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 top-1/3 hidden h-40 object-contain opacity-40 lg:block"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 0 30px rgba(168,85,247,0.5))" }}
      />

      {/* Wall Breaker on the right, mirrored via a static wrapper so the
          flip never animates through zero width */}
      <div className="pointer-events-none absolute -right-4 top-1/2 hidden lg:block" style={{ transform: "scaleX(-1)" }}>
        <motion.img
          src="/characters/wall-breaker.webp"
          alt=""
          aria-hidden="true"
          className="h-32 object-contain opacity-35"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 24px rgba(249,115,22,0.45))" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center sm:mb-14"
        >
          <motion.img
            src="/Builder Hut.webp"
            alt=""
            aria-hidden="true"
            className="mx-auto mb-3 h-auto w-24 object-contain sm:w-32 md:w-40"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <h2 className="font-heading text-2xl font-semibold text-gold-coin text-glow-gold sm:text-3xl md:text-4xl lg:text-5xl">
            MENTORS
          </h2>
          <p className="mt-3 font-body text-sm text-muted-foreground sm:text-base md:text-lg">
            Master Builders Ready to Guide
          </p>
        </motion.div>

        {/* flex-wrap + justify-center (not CSS grid) so an incomplete last
            row — e.g. the trailing 2 cards once the roster isn't a clean
            multiple of the column count — centers instead of hugging left. */}
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-4 sm:gap-5 md:gap-6">
          {MENTORS_WITH_TROOPS.map(({ mentor, troop }, index) => (
            <div
              key={mentor.name}
              className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.834rem)] md:w-[calc(25%-1.125rem)]"
            >
              <MentorCard mentor={mentor} troop={troop} index={index} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .mentor-card { transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease; }
        .mentor-card:hover {
          transform: translateY(-6px);
          border-color: rgb(var(--mc)) !important;
          box-shadow: 0 14px 32px rgba(var(--mc), .3), 0 6px 18px rgba(0,0,0,.35) !important;
        }
      `}</style>
    </section>
  );
};

export default MentorsSection;
