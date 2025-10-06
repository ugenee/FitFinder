import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Heart, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/ugenee",
      color: "hover:text-gray-400"
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/ooiyuliang/?hl=en",
      color: "hover:text-pink-400"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ooi-yu-liang-796690377",
      color: "hover:text-red-400"
    }
  ];

  const features = [
    {
      icon: MapPin,
      title: "Precise Location",
      description: "Find gyms exactly where you need them with real-time location tracking"
    },
    {
      icon: Star,
      title: "Verified Reviews",
      description: "Make informed decisions with authentic ratings and user experiences"
    },
    {
      icon: Heart,
      title: "Health First",
      description: "Designed to help you achieve your fitness goals with the right facilities"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 100,
        duration: 0.6
      }
    }
  };

  const handleScrollSearch= () => {
    const element = document.getElementById("search-section");
    if (element) {
        const yOffset = -100;
        const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
    }
    };

  return (
    <section id="about-section" className="py-20 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            About <span className="text-blue-400">FitFinder</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-200 to-blue-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A passion project built to revolutionize how fitness enthusiasts discover and choose their perfect workout space. 
            No more guesswork, just the right gym for your needs.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - Mission */}
          <motion.div variants={itemVariants}>
            <Card className="backdrop-blur-lg bg-black/25 border-white/10 shadow-2xl shadow-black/40 rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">My Mission</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  As a developer passionate about fitness and technology, I created FitFinder to solve a real problem 
                  I faced when searching for the perfect gym. I believe everyone deserves access to the perfect fitness 
                  environment that matches their preferences and goals.
                </p>

                
                {/* Tech Stack */}
                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-4">Built With</h4>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Tailwind CSS", "FastAPI", "MySQL"].map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Side - Features */}
          <motion.div variants={itemVariants}>
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Card className="backdrop-blur-lg bg-black/20 border-white/5 hover:border-white/10 transition-all duration-300 rounded-xl overflow-hidden group">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                          <feature.icon className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Social Links & CTA */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <Card className="backdrop-blur-lg bg-gradient-to-r from-black/30 to-black/20 border-white/10 rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Connect with me</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                I'm always excited to connect with fellow developers, fitness enthusiasts, and potential collaborators. 
                Let's build something amazing together or just chat about tech and fitness!
              </p>
              
              {/* Social Links */}
              <div className="flex justify-center space-x-6 mb-8">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 ${social.color} backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-110`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-8 py-4 rounded-full transition-colors border border-white/20"
                  onClick={handleScrollSearch}
                >
                  Start Finding Gyms Now
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Note */}
        <motion.div 
          className="text-center mt-12"
          variants={itemVariants}
        >
          <p className="text-gray-500 text-sm flex items-center justify-center">
            Made for fitness enthusiasts everywhere
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;