import { motion } from "framer-motion";
import { Brain, Code2, Shield, Rocket } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Mentors = () => {
  const { isNight } = useTheme();

  const mentorRoles = [
    { role: "AI Architect", icon: Brain, color: "text-purple-400" },
    { role: "Full Stack Dev", icon: Code2, color: "text-blue-400" },
    { role: "Security Lead", icon: Shield, color: "text-green-400" },
    { role: "Product Lead", icon: Rocket, color: "text-orange-400" },
  ];

  // Night/Day themed characters and colors
  const floatingCharacter = "/characters/dart-goblin.webp";
  const buildingImage = "/Builder Hut.webp";
  const floatingGlow = isNight ? "rgba(139,92,246,0.6)" : "rgba(168,85,247,0.6)";
  const buildingGlow = isNight ? "rgba(139,92,246,0.6)" : "rgba(249,115,22,0.6)";
  const titleColor = isNight ? "text-purple-400" : "text-gold-coin";

  return (
    <section id="mentors" className="relative py-20 overflow-hidden">
      {/* Transparent background - uses global fixed background */}
      {!isNight && <div className="absolute inset-0 blend-y bg-grass-pattern opacity-10" />}
      <div className={`absolute inset-0 blend-y-bottom ${isNight
        ? 'bg-slate-900/50'
        : 'bg-gradient-to-b from-transparent via-dark-elixir/60 to-dark-elixir/70'}`}
      />

      {/* Night Witch / Wizard floating on left */}
      <motion.img
        src={floatingCharacter}
        alt=""
        className="absolute -left-4 top-1/2 -translate-y-1/2 h-40 object-contain opacity-40 hidden lg:block"
        animate={{
          y: [-10, 10, -10],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ filter: `drop-shadow(0 0 30px ${floatingGlow})` }}
      />

      {/* O.T.T.O Hut / Builder Hut on right */}
      <motion.img
        src={buildingImage}
        alt=""
        className="absolute right-8 bottom-10 h-48 object-contain opacity-40 hidden lg:block"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ filter: `drop-shadow(0 0 25px ${buildingGlow})` }}
      />

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.img
            src={buildingImage}
            alt=""
            className="w-24 sm:w-32 md:w-40 h-auto mx-auto mb-3 sm:mb-4 object-contain"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <h2 className={`font-heading font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 ${titleColor} ${isNight ? 'text-glow-purple' : 'text-glow-gold'}`}>
            MENTORS
          </h2>
          <p className="font-body text-sm sm:text-base md:text-lg text-muted-foreground">
            {isNight ? 'Night Builders Ready to Guide' : 'Master Builders Ready to Guide'}
          </p>
        </motion.div>

        {/* Mentor Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto px-2 sm:px-4">
          {mentorRoles.map((mentor, index) => (
            <motion.div
              key={mentor.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className={`${isNight ? 'panel-wood-night' : 'panel-wood'} p-3 sm:p-4 md:p-6 text-center relative overflow-hidden`}>
                {/* Sleep indicator */}
                <motion.div
                  className="absolute top-2 right-2 text-xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {isNight ? '🦇' : '💤'}
                </motion.div>

                {/* Icon */}
                <motion.div
                  className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-b from-dark-elixir/50 to-dark-elixir flex items-center justify-center border-4 ${
                    isNight ? 'border-purple-500/30' : 'border-gold-coin/30'
                  }`}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  <mentor.icon size={24} className={`${mentor.color} sm:w-8 sm:h-8 md:w-9 md:h-9`} />
                </motion.div>

                {/* Role */}
                <h3 className="font-display text-xs sm:text-sm md:text-base lg:text-lg text-foreground mb-2 sm:mb-3">
                  {mentor.role}
                </h3>

                {/* Coming Soon Badge */}
                <div className={`${
                  isNight 
                    ? 'bg-purple-500/20 border-purple-500/40' 
                    : 'bg-gold-coin/20 border-gold-coin/40'
                } border-2 rounded-lg p-1.5 sm:p-2`}>
                  <p className={`font-display text-[10px] sm:text-xs uppercase tracking-wider ${
                    isNight ? 'text-purple-300' : 'text-gold-coin'
                  }`}>
                    Coming Soon
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentors;
