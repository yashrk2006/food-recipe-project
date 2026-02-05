import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Heart, ArrowRight, Dna } from 'lucide-react';

const AboutView: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

            {/* HERRO SECTION */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <motion.div
                        style={{ y }}
                        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495195134817-aeb325a55b65?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                </div>

                <div className="relative z-10 text-center max-w-5xl px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="mb-8"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm font-bold tracking-widest uppercase text-muted-foreground mb-4">
                            Established 2026
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-6xl md:text-9xl font-black font-serif leading-none tracking-tighter mb-8"
                    >
                        Taste is <br />
                        <span className="text-primary selection:text-white">Computable</span>.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    >
                        We are mapping the world's flavor genome. Deconstructing culinary arts into molecular data to democratize creativity.
                    </motion.p>
                </div>

                <motion.div
                    style={{ opacity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground text-sm font-bold uppercase tracking-widest"
                >
                    <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-foreground/50" />
                    Our Manifesto
                </motion.div>
            </section>

            {/* MISSION GRID */}
            <section className="py-32 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-black font-serif mb-6">
                                The <span className="text-primary">Problem</span><br />With Food Today.
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                For centuries, culinary innovation has been limited by human intuition and trial-and-error.
                                We treat flavor not as an art, but as a solvable graph optimization problem.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: Database,
                                    title: "1M+ Compounds",
                                    desc: "The world's largest indexed library of volatile organic compounds."
                                },
                                {
                                    icon: Dna,
                                    title: "Genetic Matching",
                                    desc: "Predicting human receptor response to novel combinations."
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    viewport={{ once: true }}
                                    className="p-6 rounded-2xl bg-secondary/20 border border-transparent hover:border-primary/20 transition-colors group cursor-crosshair"
                                >
                                    <item.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative h-[600px]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            className="absolute inset-0 rounded-3xl overflow-hidden"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2000&auto=format&fit=crop"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 transform hover:scale-105"
                            />

                            {/* Floating Tech Elements */}
                            <div className="absolute top-10 right-10 bg-black/80 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-2xl skew-y-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs font-mono text-white">SIMULATION_ACTIVE</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="h-1 w-24 bg-white/20 rounded-full" />
                                    <div className="h-1 w-16 bg-white/20 rounded-full" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* TEAM / CULTURE */}
            <section className="py-32 bg-secondary/5 border-t border-border">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Heart className="w-12 h-12 text-primary mx-auto mb-6 fill-current" />
                        <h2 className="text-4xl md:text-5xl font-black font-serif mb-8">Built by Engineers & Chefs</h2>
                        <p className="text-xl text-muted-foreground mb-12">
                            AeroFlavor was founded in a small kitchen in New Delhi, by a team obsessed with the intersection of
                            Graph Theory and Gastronomy.
                        </p>

                        <button className="px-8 py-4 bg-foreground text-background font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 mx-auto cursor-pointer">
                            Join the Revolution <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutView;
