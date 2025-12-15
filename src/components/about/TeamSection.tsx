// components/about/TeamSection.tsx
import { motion, Variants } from "framer-motion";
import long from "@/assets/team/Long.png";
import khoi from "@/assets/team/Khoi.png";
import sean from "@/assets/team/Sean.png";
import { useLanguage } from "@/contexts/LanguageContext";



// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    }
  }
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1
    }
  }
};

const imageVariants: Variants = {
  hidden: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.98 }
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0,
    rotateX: -15,
    transformPerspective: 1000
  },
  visible: { 
    opacity: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  },
  hover: {
    y: -10,
    rotateY: 2,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

const infoItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const TeamSection = () => {
  const { t } = useLanguage();
  const teamMembers = [
  {
    name: t("about.teamSection.members.tien.name"),
    position: t("about.teamSection.members.tien.position"),
    image: long,
    info: [
        t(`about.teamSection.members.tien.info.${0}`),
        t(`about.teamSection.members.tien.info.${1}`)
    ]
  },
  {
    name: t("about.teamSection.members.khoi.name"),
    position: t("about.teamSection.members.khoi.position"), 
    image: khoi,
    info: [
      t(`about.teamSection.members.khoi.info.${0}`),
      t(`about.teamSection.members.khoi.info.${1}`)
    ]
  },
  {
    name: t("about.teamSection.members.sean.name"),
    position: t("about.teamSection.members.sean.position"),
    image: sean,
    info: [
        t(`about.teamSection.members.khoi.info.${0}`),
      t(`about.teamSection.members.khoi.info.${1}`),
      t(`about.teamSection.members.khoi.info.${2}`)
    ]
  }
];


  return (
    <section className="py-20 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center text-foreground mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
        >
          Đội ngũ lãnh đạo
        </motion.h2>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-lg"
              variants={cardVariants}
              whileTap="tap"
              custom={index}
            >
              <motion.div 
                className="w-60 h-60 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/20"
                variants={imageVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.20 }}
                />
              </motion.div>
              
              <motion.h3 
                className="text-2xl font-bold text-center text-foreground mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {member.name}
              </motion.h3>
              
              <motion.p 
                className="text-vibrant-red text-center font-semibold mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {member.position}
              </motion.p>
              
              <div className="space-y-3">
                {member.info.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                    custom={itemIndex}
                    initial="hidden"
                    animate="visible"
                    variants={infoItemVariants}
                  >
                    <motion.div 
                      className="w-2 h-2 bg-vibrant-red rounded-full mt-2 flex-shrink-0"
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    />
                    <motion.span
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {item}
                    </motion.span>
                  </motion.div>
                ))}
              </div>

              {/* Hiệu ứng glow khi hover */}
              <motion.div 
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-vibrant-red/10 opacity-0 z-[-1]"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Hiệu ứng background particles */}
        <motion.div 
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
