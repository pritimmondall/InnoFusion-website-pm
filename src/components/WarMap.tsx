import { motion } from "framer-motion";
import { Star, Swords, Lock, Flag, Rocket, Code, Trophy, PartyPopper, Flame, ChevronRight, FileText, CheckCircle } from "lucide-react";

const timelineEvents = [
  {
    id: 1,
    title: "Registration Opens",
    date: "Jan 16, 2026 • 8 PM",
    description: "Assemble your clan",
    icon: Flag,
    status: "active",
    buildingImage: "/TownHall.webp",
    characterImage: "/Barbarian.webp",
    position: { left: "10%", top: "65%" },
    side: "green",
  },
  {
    id: 2,
    title: "Idea Submission",
    date: "May 15-June 15, 2026",
    description: "Submit your battle plans",
    icon: FileText,
    status: "active",
    buildingImage: "/ArmyCamp.webp",
    characterImage: "/P.E.K.K.A.webp",
    position: { left: "22%", top: "28%" },
    side: "bridge",
  },
  {
    id: 3,
    title: "Registration Closes",
    date: "June 12, 2026 • 11:59 PM",
    description: "Last call for warriors",
    icon: Star,
    status: "active",
    buildingImage: "/Barracks.webp",
    characterImage: "/Giant.webp",
    position: { left: "40%", top: "50%" },
    side: "green",
  },

  {
    id: 4,
    title: "Evaluation",
    date: "Ongoing",
    description: "Plans under review",
    icon: Code,
    status: "active",
    buildingImage: "/Laboratory.webp",
    characterImage: "/Wizard.webp",
    position: { left: "55%", top: "32%" },
    side: "desert",
  },
  {
    id: 5,
    title: "Finalists Declaration",
    date: "June 25th, 2026",
    description: "Top warriors revealed",
    icon: CheckCircle,
    status: "active",
    buildingImage: "/ClanCastle.webp",
    characterImage: "/ArcherQueen.webp",
    position: { left: "68%", top: "58%" },
    side: "desert",
  },
  {
    id: 6,
    title: "Grand Finale",
    date: "22-23 August, 2026",
    description: "Claim your glory!",
    icon: Trophy,
    status: "locked",
    buildingImage: "/TrophyStand.webp",
    characterImage: "/TrophyIcon.webp",
    position: { left: "82%", top: "25%" },
    side: "desert",
  },
];

// Flying dragons configuration
const flyingDragons = [
  { id: 1, startX: -15, endX: 115, y: 12, duration: 16, delay: 0, size: "w-20 h-20 md:w-32 md:h-32", flip: false, type: "dragon" },
  { id: 2, startX: 115, endX: -15, y: 30, duration: 20, delay: 4, size: "w-16 h-16 md:w-28 md:h-28", flip: true, type: "electro" },
  { id: 3, startX: -15, endX: 115, y: 50, duration: 18, delay: 8, size: "w-18 h-18 md:w-30 md:h-30", flip: false, type: "dragon" },
  { id: 4, startX: 115, endX: -15, y: 70, duration: 22, delay: 12, size: "w-14 h-14 md:w-24 md:h-24", flip: true, type: "electro" },
];

// Torch positions
const torchPositions = [
  { left: "8%", top: "50%" },
  { left: "18%", top: "20%" },
  { left: "35%", top: "65%" },
  { left: "48%", top: "40%" },
  { left: "62%", top: "68%" },
  { left: "75%", top: "35%" },
  { left: "88%", top: "50%" },
];

const WarMap = () => {
  return (
    <section id="timeline" className="relative py-8 md:py-20 overflow-hidden" style={{ background: '#1a1207' }}>
      {/* Cavern background — continues the warm brown from StorySection, fades back to page black at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #1a1207 0%, #2d1f0f 20%, #2d1f0f 50%, #1a1207 80%, #0a0a0c 100%)',
        }}
      />
      {/* Subtle noise texture overlay at low opacity for stone/parchment feel */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />
      {/* Ambient ember glow — soft diffused warm light bleeding down from the battlefield above */}
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(200,120,30,0.12) 0%, rgba(200,120,30,0.04) 40%, transparent 100%)',
        }}
      />
      {/* Map gradient overlay — no blend-y mask to avoid transparent seams */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1207]/80 via-[#2d1f0f]/60 to-[#1a1207]/80" />

      {/* Title Section */}
      <div className="relative z-20 container mx-auto px-4 mb-6 md:mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 md:mb-4">
            <motion.img
              src="/ShieldClan Badge Icon.webp"
              alt=""
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 object-contain"
              animate={{ rotate: [-5, 5, -5], scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.6))' }}
            />
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-gold-coin"
              style={{
                textShadow: '0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3), 0 4px 0 #8B6914',
              }}>
              The War Map
            </h2>
            <motion.img
              src="/ShieldClan Badge Icon.webp"
              alt=""
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 object-contain"
              transition={{ duration: 2, repeat: Infinity }}
              style={{ filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.6))' }}
            />
          </motion.div>
          <p className="font-body text-sm md:text-lg text-amber-200/80">
            Your journey through the Clan Wars
          </p>
        </motion.div>
      </div>

      {/* ===== MOBILE TIMELINE VIEW ===== */}
      <div className="md:hidden relative z-10 container mx-auto px-4">
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-gold-coin via-pink-500 to-gray-600 rounded-full" />

          {/* Timeline Events */}
          <div className="space-y-4">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-4 top-4 w-5 h-5 rounded-full border-3 z-10 ${event.status === "active"
                    ? "bg-pink-500 border-pink-300"
                    : event.status === "completed"
                      ? "bg-gold-coin border-yellow-300"
                      : "bg-gray-600 border-gray-400"
                    }`}
                  style={{
                    boxShadow: event.status === "active"
                      ? '0 0 12px rgba(255,105,180,0.8)'
                      : event.status === "completed"
                        ? '0 0 12px rgba(255,215,0,0.6)'
                        : 'none',
                  }}
                >
                  {event.status === "active" && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-pink-400"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Event Card */}
                <motion.div
                  className={`relative rounded-xl overflow-hidden ${event.status === "locked" ? "opacity-70" : ""
                    }`}
                  style={{
                    background: 'linear-gradient(135deg, rgba(60,40,20,0.95) 0%, rgba(40,25,10,0.95) 100%)',
                    border: event.status === "active"
                      ? '3px solid #FF69B4'
                      : event.status === "completed"
                        ? '3px solid #DAA520'
                        : '2px solid #555',
                    boxShadow: event.status === "active"
                      ? '0 4px 20px rgba(255,105,180,0.4)'
                      : '0 4px 15px rgba(0,0,0,0.5)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3 p-3">
                    {/* Building Image */}
                    <div className="relative flex-shrink-0 w-16 h-16">
                      <img
                        src={event.buildingImage}
                        alt={event.title}
                        className="w-full h-full object-contain"
                        style={{
                          filter: event.status === "locked"
                            ? 'grayscale(70%) brightness(0.6)'
                            : 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
                        }}
                      loading="lazy" decoding="async" />
                      {/* Character */}
                      <img
                        src={event.characterImage}
                        alt=""
                        className="absolute -bottom-1 -right-1 w-8 h-8 object-contain"
                        style={{
                          filter: event.status === "locked"
                            ? 'grayscale(70%) brightness(0.6)'
                            : 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))',
                        }}
                      loading="lazy" decoding="async" />
                      {/* Lock overlay */}
                      {event.status === "locked" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock size={20} className="text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <event.icon
                          size={14}
                          className={
                            event.status === "active"
                              ? "text-pink-400"
                              : event.status === "completed"
                                ? "text-gold-coin"
                                : "text-gray-500"
                          }
                        />
                        <h4 className={`font-display text-sm ${event.status === "active"
                          ? "text-pink-400"
                          : event.status === "completed"
                            ? "text-gold-coin"
                            : "text-gray-400"
                          }`}>
                          {event.title}
                        </h4>
                      </div>
                      <p className={`font-body text-xs font-semibold ${event.status === "locked" ? "text-gray-500" : "text-amber-300"
                        }`}>
                        {event.date}
                      </p>
                      <p className={`font-body text-xs ${event.status === "locked" ? "text-gray-600" : "text-amber-100/70"
                        }`}>
                        {event.description}
                      </p>
                    </div>

                    {/* Status indicator */}
                    <div className="flex-shrink-0">
                      {event.status === "active" && (
                        <motion.div
                          className="flex items-center gap-1 text-pink-400 bg-pink-500/20 px-2 py-1 rounded-full"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Flame size={12} />
                          <span className="text-[10px] font-bold">LIVE</span>
                        </motion.div>
                      )}
                      {event.status === "completed" && (
                        <div className="flex gap-0.5">
                          {[1, 2, 3].map((star) => (
                            <Star key={star} size={12} className="text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      )}
                      {event.status === "locked" && (
                        <ChevronRight size={16} className="text-gray-500" />
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <motion.div
          className="flex justify-center gap-6 mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gold-coin" style={{ boxShadow: '0 0 8px rgba(255,215,0,0.6)' }} />
            <span className="text-xs text-amber-200">Done</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-500" style={{ boxShadow: '0 0 8px rgba(255,105,180,0.6)' }} />
            <span className="text-xs text-amber-200">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500" />
            <span className="text-xs text-amber-200">Locked</span>
          </div>
        </motion.div>
      </div>

      {/* ===== DESKTOP MAP VIEW ===== */}
      <div className="hidden md:block relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-6xl"
        >
          {/* Wooden frame border */}
          <div
            className="absolute -inset-3 md:-inset-4 rounded-lg z-0"
            style={{
              background: 'linear-gradient(180deg, #5D3A1A 0%, #3D2510 50%, #2A1A0A 100%)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,200,100,0.2)',
            }}
          />

          {/* Inner wooden border */}
          <div
            className="absolute -inset-1 md:-inset-2 rounded-md z-0"
            style={{
              background: 'linear-gradient(180deg, #8B5A2B 0%, #6B4423 100%)',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
            }}
          />

          {/* Map Image Container */}
          <div className="relative rounded overflow-hidden" style={{ aspectRatio: '16/10' }}>
            {/* War Map Background */}
            <img
              src="/War Map Background.webp"
              alt=""
              className="w-full h-full object-cover"
            loading="lazy" decoding="async" width={1536} height={1024} />

            {/* Animated overlay effects */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Day side - bright and sunny */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1/2"
                style={{
                  background: 'linear-gradient(90deg, rgba(255,250,200,0.1) 0%, rgba(255,200,100,0.05) 80%, transparent 100%)',
                }}
              />

              {/* Night side - dark and mysterious */}
              <motion.div
                className="absolute right-0 top-0 bottom-0 w-1/2"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(10,10,40,0.4) 30%, rgba(5,5,30,0.6) 100%)',
                }}
                animate={{ opacity: [0.6, 0.75, 0.6] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* River shimmer effect */}
              <motion.div
                className="absolute left-1/2 top-0 bottom-0 w-24 -translate-x-1/2"
                style={{
                  background: 'linear-gradient(180deg, transparent 0%, rgba(100,180,255,0.1) 30%, rgba(100,180,255,0.2) 50%, rgba(100,180,255,0.1) 70%, transparent 100%)',
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scaleY: [1, 1.02, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>

            {/* Flying Dragons */}
            {flyingDragons.map((dragon) => (
              <motion.div
                key={`dragon-${dragon.id}`}
                className={`absolute z-30 pointer-events-none ${dragon.size}`}
                style={{
                  top: `${dragon.y}%`,
                  transform: dragon.flip ? 'scaleX(-1)' : 'scaleX(1)',
                }}
                initial={{ left: `${dragon.startX}%` }}
                animate={{
                  left: `${dragon.endX}%`,
                  y: [0, -15, 5, -10, 0],
                }}
                transition={{
                  left: {
                    duration: dragon.duration,
                    repeat: Infinity,
                    delay: dragon.delay,
                    ease: "linear",
                  },
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <motion.img
                  src={dragon.type === "electro" ? "/DragonElectro_Dragon-removebg-preview.webp" : "/Dragon.webp"}
                  alt=""
                  className="w-full h-full object-contain"
                  style={{
                    filter: dragon.type === "electro"
                      ? 'drop-shadow(0 5px 15px rgba(100,150,255,0.5))'
                      : 'drop-shadow(0 5px 15px rgba(255,100,0,0.4))',
                  }}
                  animate={{
                    y: [-3, 3, -3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {/* Fire/Lightning trail effect */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{
                    left: dragon.flip ? '80%' : '-20%',
                    width: '30%',
                    height: '20%',
                  }}
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    scaleX: [1, 1.3, 1],
                  }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                >
                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      background: dragon.type === "electro"
                        ? dragon.flip
                          ? 'linear-gradient(90deg, transparent, rgba(100,150,255,0.4), rgba(150,200,255,0.6))'
                          : 'linear-gradient(270deg, transparent, rgba(100,150,255,0.4), rgba(150,200,255,0.6))'
                        : dragon.flip
                          ? 'linear-gradient(90deg, transparent, rgba(255,100,0,0.4), rgba(255,200,0,0.6))'
                          : 'linear-gradient(270deg, transparent, rgba(255,100,0,0.4), rgba(255,200,0,0.6))',
                      filter: 'blur(4px)',
                    }}
                  />
                </motion.div>
                {/* Lightning sparks for electro dragon */}
                {dragon.type === "electro" && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-300 rounded-full"
                        style={{
                          left: `${30 + i * 20}%`,
                          top: `${40 + i * 10}%`,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                        }}
                        transition={{
                          duration: 0.4,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            ))}

            {/* Animated Torches */}
            {torchPositions.map((torch, i) => (
              <motion.div
                key={`torch-${i}`}
                className="absolute z-15 pointer-events-none"
                style={{ left: torch.left, top: torch.top }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className="relative">
                  <img
                    src="/TorchCampfire.webp"
                    alt=""
                    className="w-10 h-12 md:w-14 md:h-16 object-contain"
                  loading="lazy" decoding="async" width={500} height={500} />
                  {/* Torch glow */}
                  <motion.div
                    className="absolute -inset-6"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,150,50,0.5) 0%, rgba(255,100,0,0.3) 40%, transparent 70%)',
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity }}
                  />
                  {/* Fire flicker particles */}
                  {[...Array(4)].map((_, j) => (
                    <motion.div
                      key={j}
                      className="absolute w-1.5 h-1.5 bg-orange-400 rounded-full"
                      style={{ left: '50%', top: '0' }}
                      animate={{
                        y: [-5, -30],
                        x: [-8 + j * 5, 8 - j * 4],
                        opacity: [1, 0],
                        scale: [1, 0.3],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: j * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Floating particles on green side */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`particle-green-${i}`}
                className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-green-400/60"
                style={{
                  left: `${5 + Math.random() * 35}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  y: [-10, -30, -10],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* Floating dust particles on desert side */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`particle-desert-${i}`}
                className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-amber-300/40"
                style={{
                  left: `${55 + Math.random() * 40}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  x: [-5, 15, -5],
                  y: [-5, -15, -5],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}

            {/* Connecting path line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="33%" stopColor="#FFD700" />
                  <stop offset="40%" stopColor="#FF69B4" />
                  <stop offset="50%" stopColor="#FF69B4" />
                  <stop offset="60%" stopColor="#666666" />
                  <stop offset="100%" stopColor="#444444" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <motion.path
                d="M 10 65 Q 15 50 24 32 Q 35 40 44 50 Q 52 45 60 37 Q 70 48 77 58 Q 85 45 90 32"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeDasharray="2 1"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>

            {/* Event Markers */}
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="absolute z-20"
                style={{
                  left: event.position.left,
                  top: event.position.top,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.15, type: "spring", stiffness: 200 }}
              >
                {/* Marker glow effect */}
                {event.status === "active" && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,105,180,0.6) 0%, transparent 70%)',
                      width: '120px',
                      height: '120px',
                      left: '-35px',
                      top: '-35px',
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 0.3, 0.6],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {event.status === "completed" && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)',
                      width: '100px',
                      height: '100px',
                      left: '-25px',
                      top: '-25px',
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.2, 0.4],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                )}

                {/* Flag/Banner for active event */}
                {event.status === "active" && (
                  <motion.div
                    className="absolute -top-8 left-1/2 -translate-x-1/2"
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className="relative">
                      <div className="w-1 h-8 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full" />
                      <motion.div
                        className="absolute top-0 left-1 w-6 h-4 bg-gradient-to-r from-red-600 to-red-700 rounded-r-sm"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 80% 50%, 100% 100%, 0 100%)' }}
                        animate={{ skewX: [-2, 2, -2] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Main marker container */}
                <motion.div
                  className={`relative cursor-pointer transition-all duration-300 ${event.status === "locked" ? "opacity-70" : ""
                    }`}
                  whileHover={event.status !== "locked" ? { scale: 1.15, y: -5 } : {}}
                  whileTap={event.status !== "locked" ? { scale: 0.95 } : {}}
                >
                  {/* Building image with effects */}
                  <div className="relative">
                    {/* Ground shadow */}
                    <div
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-5 md:w-28 md:h-6 rounded-full blur-sm"
                      style={{
                        background: 'rgba(0,0,0,0.5)',
                      }}
                    />

                    {/* Building container */}
                    <motion.div
                      className={`relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center overflow-visible`}
                      animate={event.status === "active" ? {
                        scale: [1, 1.05, 1],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {/* Building glow for active/completed */}
                      {(event.status === "active" || event.status === "completed") && (
                        <motion.div
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background: event.status === "active"
                              ? 'radial-gradient(circle, rgba(255,105,180,0.4) 0%, transparent 70%)'
                              : 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)',
                            transform: 'scale(2)',
                          }}
                          animate={{
                            scale: [2, 2.3, 2],
                            opacity: [0.6, 0.9, 0.6],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}

                      {/* Building Image */}
                      <motion.img
                        src={event.buildingImage}
                        alt={event.title}
                        className="w-18 h-18 md:w-24 md:h-24 object-contain z-10"
                        animate={event.status === "active" ? {
                          y: [-2, 2, -2],
                        } : event.status === "completed" ? {
                          y: [-1.5, 1.5, -1.5],
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                          filter: event.status === "locked"
                            ? 'grayscale(70%) brightness(0.6)'
                            : 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))',
                        }}
                      />

                      {/* Small character beside building */}
                      <motion.img
                        src={event.characterImage}
                        alt=""
                        className="absolute -bottom-2 -right-4 w-10 h-10 md:w-14 md:h-14 object-contain z-20"
                        animate={event.status !== "locked" ? {
                          y: [-1, 1, -1],
                          x: [-1, 1, -1],
                        } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{
                          filter: event.status === "locked"
                            ? 'grayscale(70%) brightness(0.6)'
                            : 'drop-shadow(0 3px 6px rgba(0,0,0,0.7))',
                        }}
                      />

                      {/* Lock overlay for locked events */}
                      {event.status === "locked" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg z-30">
                          <Lock size={28} className="text-gray-400" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
                        </div>
                      )}
                    </motion.div>

                    {/* Stars for completed */}
                    {event.status === "completed" && (
                      <motion.div
                        className="absolute -top-5 left-1/2 -translate-x-1/2 flex gap-0.5"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        {[1, 2, 3].map((star, i) => (
                          <motion.div
                            key={star}
                            animate={{
                              rotate: [0, 10, -10, 0],
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          >
                            <Star
                              size={14}
                              className="text-yellow-400 fill-yellow-400"
                              style={{ filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.8))' }}
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    {/* Battle effect for active */}
                    {event.status === "active" && (
                      <>
                        <motion.div
                          className="absolute -top-4 left-1/2 -translate-x-1/2"
                          animate={{
                            rotate: [-15, 15, -15],
                            y: [-2, 2, -2],
                          }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        >
                          <Swords size={20} className="text-pink-400" style={{ filter: 'drop-shadow(0 0 6px rgba(255,105,180,0.8))' }} />
                        </motion.div>

                        {/* Sparkle effects */}
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-pink-300 rounded-full"
                            style={{
                              left: `${20 + i * 25}%`,
                              top: `${10 + i * 15}%`,
                            }}
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </motion.div>

                {/* Always visible label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="absolute z-30 top-full mt-3 left-1/2 -translate-x-1/2 w-32 md:w-40"
                >
                  <div
                    className="p-2 md:p-3 rounded-lg text-center"
                    style={{
                      background: 'linear-gradient(180deg, rgba(60,40,20,0.95) 0%, rgba(40,25,10,0.95) 100%)',
                      border: event.status === "active"
                        ? '2px solid #FF69B4'
                        : event.status === "completed"
                          ? '2px solid #DAA520'
                          : '2px solid #555',
                      boxShadow: event.status === "active"
                        ? '0 4px 15px rgba(255,105,180,0.4), inset 0 1px 0 rgba(255,200,100,0.2)'
                        : '0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,200,100,0.2)',
                    }}
                  >
                    {/* Arrow pointing up */}
                    <div
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
                      style={{
                        background: event.status === "active"
                          ? '#FF69B4'
                          : event.status === "completed"
                            ? '#DAA520'
                            : '#555',
                      }}
                    />
                    <div
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                      style={{ background: 'rgba(60,40,20,0.95)' }}
                    />

                    <h4 className={`font-display text-xs md:text-sm mb-0.5 ${event.status === "active"
                      ? "text-pink-400"
                      : event.status === "completed"
                        ? "text-gold-coin"
                        : "text-gray-400"
                      }`} style={{
                        textDecoration: 'underline',
                        textUnderlineOffset: '2px',
                      }}>
                      {event.title}
                    </h4>
                    <p className={`font-body text-xs ${event.status === "locked" ? "text-gray-500" : "text-amber-300"
                      }`}>
                      {event.date}
                    </p>
                    <p className={`font-body text-[10px] md:text-xs ${event.status === "locked" ? "text-gray-600" : "text-amber-100/70"
                      }`}>
                      {event.description}
                    </p>

                    {event.status === "active" && (
                      <motion.div
                        className="mt-1 flex items-center justify-center gap-1 text-pink-400"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Flame size={10} />
                        <span className="text-[10px] font-bold">ACTIVE</span>
                        <Flame size={10} />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Animated troops marching on completed path */}
            <motion.img
              src="/Barbarian.webp"
              alt=""
              className="absolute w-6 h-6 md:w-8 md:h-8 z-15 pointer-events-none"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
              animate={{
                left: ['12%', '20%', '35%', '42%'],
                top: ['55%', '35%', '45%', '50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* Corner decorations */}
          {[
            { pos: '-top-1 -left-1', rotate: 0 },
            { pos: '-top-1 -right-1', rotate: 90 },
            { pos: '-bottom-1 -left-1', rotate: -90 },
            { pos: '-bottom-1 -right-1', rotate: 180 },
          ].map((corner, i) => (
            <div
              key={i}
              className={`absolute ${corner.pos} w-6 h-6 md:w-8 md:h-8 z-10`}
              style={{
                background: 'radial-gradient(circle at 30% 30%, #DAA520 0%, #8B6914 50%, #5D4510 100%)',
                borderRadius: '50%',
                boxShadow: '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.3)',
                transform: `rotate(${corner.rotate}deg)`,
              }}
            />
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gold-coin" style={{ boxShadow: '0 0 8px rgba(255,215,0,0.6)' }} />
            <span className="text-xs md:text-sm text-amber-200">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-500" style={{ boxShadow: '0 0 8px rgba(255,105,180,0.6)' }} />
            <span className="text-xs md:text-sm text-amber-200">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500" />
            <span className="text-xs md:text-sm text-amber-200">Locked</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WarMap;
