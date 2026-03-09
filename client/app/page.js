"use client";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Users, Target, Globe, ArrowRight, Star, Award, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-grid">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-orange-50 border border-orange-100 px-4 py-2 rounded-full mb-8"
            >
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">The Future of Space is Here</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-dark mb-8 leading-[0.9] tracking-tighter"
            >
              Building the Next <br />
              <span className="text-gradient">Space Workforce</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl md:text-2xl text-dark/60 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Empowering the next generation of engineers, scientists, and visionaries
              to lead the global space industry into a new era of exploration.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Link href={user ? "/courses" : "/register"} className="orange-button text-lg group">
                <span className="flex items-center">
                  Get Started Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link href="/about" className="accent-button text-lg">
                View Curriculum
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      </section>

      {/* Stats/Proof Section */}
      <section className="py-20 border-y border-orange-50 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatItem label="Students Enrolled" value="12,000+" />
            <StatItem label="Space Partners" value="50+" />
            <StatItem label="Success Rate" value="94%" />
            <StatItem label="Global Chapters" value="15" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6">Why Launchpad?</h2>
            <p className="text-lg text-dark/60 max-w-2xl mx-auto">
              We provide the tools and network you need to transition from a student to a professional in the space sector.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard
              icon={<Users className="w-8 h-8 text-primary" />}
              title="Global Community"
              desc="Access a worldwide network of mentors, peers, and industry leaders who share your passion."
              delay={0.1}
            />
            <FeatureCard
              icon={<Award className="w-8 h-8 text-primary" />}
              title="Industry Certified"
              desc="Gain certifications recognized by leading space agencies and private aerospace companies."
              delay={0.2}
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-primary" />}
              title="Fast Track"
              desc="Accelerated programs designed to get you industry-ready in record time without compromising quality."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-dark rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-white text-primary mb-8 tracking-tight">Ready to launch your career?</h2>
              <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
                Join thousands of students who are already building the future of humanity in space.
              </p>
              <Link href="/register" className="bg-primary hover:bg-white hover:text-dark text-white font-black py-5 px-12 rounded-2xl transition-all duration-500 inline-block text-xl">
                Join the Program Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-orange-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-dark/40 font-medium">
          <p>© 2026 Launchpad Space workforce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div>
      <p className="text-4xl font-black text-dark mb-1 tracking-tighter">{value}</p>
      <p className="text-sm font-bold text-dark/40 uppercase tracking-widest">{label}</p>
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-card text-left"
    >
      <div className="inline-flex p-4 rounded-2xl bg-orange-50 mb-8 border border-orange-100">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-dark mb-4">{title}</h3>
      <p className="text-dark/60 leading-relaxed font-medium">{desc}</p>
    </motion.div>
  );
}
