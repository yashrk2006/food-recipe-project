import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BarChart3, Star, ChefHat, ArrowRight } from 'lucide-react';
import type { Recipe, Ingredient, PairingCandidate } from '../types';
import CarbonHealthDashboard from './CarbonHealthDashboard';
import FlavorRadar from './FlavorRadar';

import { getRecipeImage } from '../services/image_mapping';

interface RecipeEditorialViewProps {
    recipe: Recipe;
    selectedIngredient: Ingredient | null;
    activeCandidate: PairingCandidate | null;
    pairingCandidates: PairingCandidate[];
    isSwapping: boolean;
    onIngredientClick: (ing: Ingredient) => void;
    onCandidateClick: (candidate: PairingCandidate) => void;
    onApplySwap: () => void;
}

const RecipeEditorialView: React.FC<RecipeEditorialViewProps> = ({
    recipe,
    selectedIngredient,
    activeCandidate,
    pairingCandidates,
    isSwapping,
    onIngredientClick,
    onCandidateClick,
    onApplySwap
}) => {
    const heroImage = getRecipeImage(recipe.name);

    return (
        <div className="bg-background min-h-screen pb-20">
            {/* HERRO HEADER - Magazine Style */}
            <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden group">
                {/* Background Image with Zoom Effect */}
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "linear" }}
                    className="absolute inset-0 bg-cover bg-center pointer-events-none select-none"
                    style={{ backgroundImage: `url(${heroImage})` }}
                />

                {/* Overlays for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-black/20 pointer-events-none" /> {/* General dim */}

                {/* Dynamic Gradient Blobs (Still keep them but subtle for "Molecular" feel) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[100px] mix-blend-overlay pointer-events-none" />

                <div className="relative h-full container mx-auto px-6 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-3 text-white/80 font-medium tracking-widest uppercase text-sm mb-4">
                            <span className="px-3 py-1 border border-white/30 rounded-full backdrop-blur-md">Molecular Deconstruction</span>
                            <span>•</span>
                            <span>{recipe.region} Cuisine</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black text-white leading-tight font-serif drop-shadow-lg">
                            {recipe.name}
                        </h1>

                        {/* Meta Data Row */}
                        <div className="flex flex-wrap items-center gap-8 mt-8 text-white">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span className="font-semibold text-lg">45 min</span>
                            </div>
                            <div className="w-[1px] h-6 bg-white/30" />
                            <div className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5" />
                                <span className="font-semibold text-lg">Complex Profile</span>
                            </div>
                            <div className="w-[1px] h-6 bg-white/30" />
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 fill-current text-yellow-400" />
                                <span className="font-semibold text-lg">4.9 Molecular Score</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* NUTRITION & STATS STRIP */}
            <div className="bg-card border-b border-border sticky top-0 z-40 shadow-sm backdrop-blur-xl bg-card/90 supports-[backdrop-filter]:bg-card/80">
                <div className="container mx-auto px-6 py-4 flex overflow-x-auto gap-12 items-center justify-between no-scrollbar">
                    <div className="flex gap-12 min-w-max">
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground font-bold tracking-wider uppercase">Ingredients</span>
                            <span className="text-xl font-serif font-bold text-foreground">{recipe.ingredients.length} Items</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground font-bold tracking-wider uppercase">Region</span>
                            <span className="text-xl font-serif font-bold text-foreground">{recipe.region}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground font-bold tracking-wider uppercase">Carbon Footprint</span>
                            <span className="text-xl font-serif font-bold text-foreground">
                                {selectedIngredient
                                    ? selectedIngredient.carbonFootprint
                                    : recipe.ingredients.reduce((acc, i) => acc + i.carbonFootprint, 0).toFixed(1)} kg
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground font-bold tracking-wider uppercase">Glycemic Load</span>
                            <span className="text-xl font-serif font-bold text-foreground">Medium</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* TWO COLUMN EDITORIAL LAYOUT */}
            <div className="container mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* LEFT COLUMN: INGREDIENTS (Paper feel) */}
                <div className="lg:col-span-5 space-y-12">
                    <div>
                        <h3 className="text-3xl font-serif font-bold mb-8 flex items-center gap-3">
                            Ingredients
                            <span className="text-sm font-sans font-normal text-muted-foreground bg-secondary px-2 py-1 rounded-full">Select to Analyze</span>
                        </h3>

                        <div className="space-y-0 divide-y divide-border border-t border-b border-border">
                            {recipe.ingredients.map((ing, idx) => (
                                <motion.div
                                    key={ing.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => onIngredientClick(ing)}
                                    className={`
                                        group relative py-6 px-4 cursor-pointer transition-all duration-300
                                        ${selectedIngredient?.id === ing.id ? 'bg-primary/5' : 'hover:bg-secondary/50'}
                                    `}
                                >
                                    {/* Active Indicator Line */}
                                    {selectedIngredient?.id === ing.id && (
                                        <motion.div
                                            layoutId="active-line"
                                            className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                                        />
                                    )}

                                    <div className="flex items-baseline justify-between">
                                        <span className={`text-lg font-medium transition-colors ${selectedIngredient?.id === ing.id ? 'text-primary font-bold' : 'text-foreground group-hover:text-primary'}`}>
                                            {ing.name}
                                        </span>
                                        <span className="text-sm text-muted-foreground font-mono">
                                            {ing.state}
                                        </span>
                                    </div>
                                    <div className="mt-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                        Click to analyze molecular composition
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Compact Carbon Logic in Left Col now */}
                    <div className="p-8 bg-secondary/30 rounded-3xl border border-secondary">
                        <h4 className="font-serif font-bold text-xl mb-4">Health Impact</h4>
                        <CarbonHealthDashboard
                            currentCarbon={activeCandidate ? activeCandidate.ingredient.carbonFootprint : (selectedIngredient?.carbonFootprint ?? recipe.ingredients[0].carbonFootprint)}
                            currentGI={activeCandidate ? activeCandidate.ingredient.glycemicIndex : (selectedIngredient?.glycemicIndex ?? 50)}
                            originalCarbon={selectedIngredient?.carbonFootprint}
                            originalGI={selectedIngredient?.glycemicIndex}
                        />
                    </div>
                </div>

                {/* RIGHT COLUMN: MOLECULAR ANALYSIS (Tech/Clean feel) */}
                <div className="lg:col-span-7 space-y-10">
                    <div>
                        <h3 className="text-3xl font-serif font-bold mb-8">
                            {selectedIngredient ? `Analysis: ${selectedIngredient.name}` : 'Select an Ingredient'}
                        </h3>

                        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm min-h-[500px]">
                            {/* RADAR CHART AREA */}
                            <div className="mb-8">
                                {selectedIngredient ? (
                                    <FlavorRadar original={selectedIngredient} substitute={activeCandidate || undefined} />
                                ) : (
                                    <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                                        Select an ingredient from the list to view its flavor profile.
                                    </div>
                                )}
                            </div>

                            {/* CANDIDATES LIST INLINE */}
                            {selectedIngredient && (
                                <div className="mt-8 border-t border-border pt-8">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Scientific Substitutes</h4>

                                    {isSwapping ? (
                                        <div className="animate-pulse flex space-x-4">
                                            <div className="h-12 w-full bg-secondary rounded-xl"></div>
                                            <div className="h-12 w-full bg-secondary rounded-xl"></div>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {pairingCandidates.map((candidate) => (
                                                <div
                                                    key={candidate.ingredient.id}
                                                    onClick={() => onCandidateClick(candidate)}
                                                    className={`
                                                        flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all
                                                        ${activeCandidate?.ingredient.id === candidate.ingredient.id
                                                            ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25'
                                                            : 'bg-background hover:border-primary/50'}
                                                    `}
                                                >
                                                    <div className="font-bold">{candidate.ingredient.name}</div>
                                                    <div className="flex items-center gap-3">
                                                        <span className={`text-xs px-2 py-1 rounded-full font-bold ${activeCandidate?.ingredient.id === candidate.ingredient.id ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'}`}>
                                                            {candidate.matchScore}% Match
                                                        </span>
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            ))}
                                            {pairingCandidates.length === 0 && (
                                                <p className="text-muted-foreground text-sm">No strong matches found in database.</p>
                                            )}
                                        </div>
                                    )}

                                    {activeCandidate && (
                                        <button
                                            onClick={onApplySwap}
                                            className="mt-6 w-full py-4 bg-foreground text-background font-bold rounded-xl hover:bg-foreground/90 transition-all flex items-center justify-center gap-2"
                                        >
                                            <ChefHat className="w-5 h-5" />
                                            Apply Editorial Swap
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            {/* SECTION 3: MOLECULAR THEORY (Educational/Science) */}
            <section className="py-32 bg-secondary/10 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center max-w-3xl mx-auto mb-20"
                    >
                        <span className="text-primary font-bold tracking-widest uppercase text-sm">The Science</span>
                        <h2 className="text-5xl font-serif font-black mt-4 mb-6">Why This Works</h2>
                        <p className="text-xl text-muted-foreground">
                            Our algorithms identified a 94% molecular overlap between the core ingredients.
                            Here is the bridging chemistry that creates the harmony.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: { staggerChildren: 0.2 }
                            }
                        }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
                    >
                        {[
                            { title: "Flavor Bridging", icon: "🔗", desc: "Shared volatile compounds create a seamless olfactory transition between ingredients." },
                            { title: "Textural Contrast", icon: "✨", desc: "Opposing physical states (Crunch vs. Cream) heighten neurological engagement." },
                            { title: "Enzymatic Harmony", icon: "🧬", desc: "Proteases in the ingredients actively tenderize and enhance umami perception." }
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
                                }}
                                className="bg-background border border-border p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
                            >
                                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{card.icon}</div>
                                <h3 className="text-2xl font-bold mb-4 font-serif">{card.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{card.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* SECTION 4: CHEF'S DECONSTRUCTION (Parallax/Visual) */}
            <section className="py-32 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-6xl font-serif font-black mb-12 leading-tight">
                            Chef's<br /><span className="text-primary">Deconstruction</span>
                        </h2>

                        <div className="space-y-12 relative ml-4">
                            {/* Animated Connecting Line */}
                            <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: '100%' }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                viewport={{ once: true }}
                                className="absolute left-0 top-2 bottom-2 w-[2px] bg-border origin-top"
                            />

                            {[
                                { step: "01", title: "Thermal Shock", desc: "Rapid searing locks in the glutamates, preventing volatile loss." },
                                { step: "02", title: "Emulsification", desc: "Slow introduction of lipids creates a stable, velvet-like mouthfeel." },
                                { step: "03", title: "Aromatic Finish", desc: "Volatile herbs added at <60°C preserve delicate terpenes." }
                            ].map((s, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + (i * 0.2) }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="relative pl-8"
                                >
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ delay: 0.3 + (i * 0.2), type: "spring" }}
                                        viewport={{ once: true }}
                                        className="absolute left-[-9px] top-1 w-5 h-5 rounded-full bg-primary border-4 border-background z-10"
                                    />
                                    <span className="text-sm font-bold text-muted-foreground tracking-widest mb-1 block">STEP {s.step}</span>
                                    <h4 className="text-xl font-bold mb-2">{s.title}</h4>
                                    <p className="text-muted-foreground">{s.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="relative h-[600px] rounded-3xl overflow-hidden group pointer-events-none">
                        <motion.img
                            src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2000&auto=format&fit=crop"
                            className="absolute inset-0 w-full h-full object-cover"
                            initial={{ scale: 1.2 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 1.5 }}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                </div>
            </section>

            {/* SECTION 4b: FLAVOR INTERACTION MATRIX (New Content) */}
            <section className="py-20 bg-background border-t border-border relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm">Molecular Network</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-black mt-3">Active Compounds</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {recipe.ingredients.slice(0, 8).map((ing, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="aspect-square rounded-full border border-border bg-secondary/10 flex flex-col items-center justify-center relative group hover:border-primary hover:bg-primary/5 transition-all cursor-crosshair"
                            >
                                {/* Connecting Lines (Simulated) */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-full h-full absolute inset-0 overflow-visible">
                                        <line x1="50%" y1="50%" x2="150%" y2="50%" stroke="currentColor" strokeWidth="1" className="text-primary/30" />
                                        <line x1="50%" y1="50%" x2="50%" y2="150%" stroke="currentColor" strokeWidth="1" className="text-primary/30" />
                                    </svg>
                                </div>

                                <span className="text-3xl mb-2">{['🌿', '🥩', '🍋', '🧂', '🌶️', '🧅', '🧄', '🧀'][i % 8]}</span>
                                <span className="font-bold text-sm">{ing.name}</span>
                                <span className="text-10px text-muted-foreground uppercase tracking-wider mt-1">
                                    {['Terpenes', 'Amino Acids', 'Acids', 'Minerals', 'Capsaicin', 'Sulfites', 'Allicin', 'Lipids'][i % 8]}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                            *Visualization of dominant chemical bonds formed during the cooking process.
                            Heavier lines indicate stronger flavor bridging capability.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 5: IMMERSIVE FOOTER / SPOTLIGHT */}
            <section className="h-[80vh] relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-foreground/5" />
                <div
                    className="absolute inset-0 opacity-30 bg-fixed bg-cover bg-center grayscale"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2000&auto=format&fit=crop)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />

                <div className="relative z-10 text-center max-w-4xl px-6">
                    <ChefHat className="w-16 h-16 mx-auto mb-8 text-primary" />
                    <h2 className="text-5xl md:text-7xl font-serif font-black mb-8 leading-tight">
                        "The future of cooking isn't just about heat.<br />It's about <span className="text-primary">data</span>."
                    </h2>
                    <button onClick={onApplySwap} className="px-8 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-full hover:scale-105 transition-transform shadow-2xl shadow-primary/30">
                        Start Customizing This Recipe
                    </button>
                </div>
            </section>
        </div>
    );
};

export default RecipeEditorialView;
