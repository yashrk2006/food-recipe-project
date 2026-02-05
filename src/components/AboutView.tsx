import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Microscope, ArrowRight, Dna } from 'lucide-react';

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

            {/* MISSION GRID - REFACTORED */}
            <section className="py-24 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-5xl md:text-6xl font-black font-serif mb-6 leading-tight">
                                The <span className="text-primary">Problem</span><br />With Food Today.
                            </h2>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Traditional recipe platforms rely on subjective "tastes-like" guesses, failing to provide accurate alternatives for allergies, dietary restrictions, or sustainability.
                            </p>
                        </motion.div>

                        <div className="space-y-12">
                            {[
                                {
                                    icon: Microscope,
                                    title: "Molecular Twins",
                                    desc: "AeroFlavor utilizes Foodoscope’s molecular data to identify objective 'chemical twins' that preserve the authentic flavor profile of any dish."
                                },
                                {
                                    icon: Dna,
                                    title: "Computational Gastronomy",
                                    desc: "This transforms cooking from a game of trial-and-error into a computational science, enabling precise, healthy, and culturally sensitive substitutions."
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-6 group"
                                >
                                    <div className="text-primary group-hover:scale-110 transition-transform duration-500">
                                        <item.icon className="w-10 h-10 stroke-[1.5]" />
                                    </div>
                                    <div className="border-l-2 border-primary/20 pl-6 hover:border-primary transition-colors duration-500">
                                        <h3 className="font-bold text-2xl mb-3 font-serif">{item.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed text-lg">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative h-[700px]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2000&auto=format&fit=crop"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 transform hover:scale-105"
                            />

                            {/* Floating Tech Elements */}
                            <div className="absolute top-10 right-10 bg-black/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl skew-y-6 hover:skew-y-0 transition-transform duration-500">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs font-mono text-white tracking-widest">SIMULATION_ACTIVE</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-1.5 w-32 bg-white/20 rounded-full" />
                                    <div className="h-1.5 w-24 bg-white/20 rounded-full" />
                                    <div className="h-1.5 w-16 bg-white/20 rounded-full" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* NEW SECTION: OUR PHILOSOPHY */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32 border-t border-border pt-32">
                    <div className="relative h-[600px] order-2 md:order-1">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2000&auto=format&fit=crop"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                        </motion.div>
                    </div>
                    <div className="space-y-8 order-1 md:order-2">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Our Philosophy</span>
                            <h2 className="text-5xl md:text-6xl font-black font-serif mb-6 leading-tight">
                                Democratizing<br />Creativity.
                            </h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                We believe that the next Michelin-star recipe won't come from a famous chef in Paris, but from an algorithm running in a dorm room in Delhi.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                By mapping the molecular structure of 10,000+ ingredients, we empower anyone to bridge cultural gaps and invent entirely new cuisines.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* NEW SECTION: GLOBAL IMPACT */}
                <div className="text-center max-w-4xl mx-auto mb-32">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Global Impact</span>
                    <h2 className="text-5xl md:text-7xl font-black font-serif mb-16">
                        Computing Taste<br />at Scale.
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "Active Users", value: "125K+" },
                            { label: "Recipes Generated", value: "2.4M" },
                            { label: "Ingredients Indexed", value: "14,500" },
                            { label: "Restaurants Partnered", value: "85" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl bg-secondary/10 hover:bg-secondary/30 transition-colors"
                            >
                                <div className="text-4xl md:text-5xl font-black mb-2 text-foreground">{stat.value}</div>
                                <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TEAM / CULTURE - UPDATED */}
            <section className="py-32 bg-foreground text-background relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* Heart Removed */}
                        <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full" />

                        <h2 className="text-5xl md:text-7xl font-black font-serif mb-8 leading-tight">
                            Built by Engineers<br />& Chefs in Delhi.
                        </h2>
                        <p className="text-2xl text-background/70 mb-12 font-light leading-relaxed">
                            AeroFlavor was founded in a small kitchen, by a team obsessed with the intersection of
                            Graph Theory and Gastronomy.
                        </p>

                        <button className="px-10 py-5 bg-background text-foreground text-lg font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-3 mx-auto cursor-pointer shadow-2xl">
                            Join the Revolution <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutView;
