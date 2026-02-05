import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, Star, ArrowRight } from 'lucide-react';

const TRENDING_ITEMS = [
    {
        id: 1,
        title: "Spicy Basil Chicken",
        category: "Asian Fusion",
        image: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=500&auto=format&fit=crop&q=60",
        time: "25 min",
        rating: 4.8,
        calories: 320
    },
    {
        id: 2,
        title: "Avocado Toast Deluxe",
        category: "Breakfast",
        image: "https://images.unsplash.com/photo-1525351463974-b1ad7d95d488?w=500&auto=format&fit=crop&q=60",
        time: "10 min",
        rating: 4.9,
        calories: 280
    },
    {
        id: 3,
        title: "Truffle Mushroom Pasta",
        category: "Italian",
        image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=500&auto=format&fit=crop&q=60",
        time: "40 min",
        rating: 4.7,
        calories: 550
    },
    {
        id: 4,
        title: "Berry Acai Bowl",
        category: "Healthy",
        image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500&auto=format&fit=crop&q=60",
        time: "15 min",
        rating: 4.6,
        calories: 210
    }
];

const TrendingSection: React.FC<{ onRecipeClick?: (recipeName: string) => void }> = ({ onRecipeClick }) => {
    return (
        <section className="py-12">
            <div className="flex justify-between items-end mb-8 px-2">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <span className="p-2 bg-orange-100 text-orange-600 rounded-full dark:bg-orange-900/30">
                            <Flame className="w-5 h-5" />
                        </span>
                        Best Trending Now
                    </h2>
                    <p className="text-muted-foreground mt-1">Curated recipes based on molecular popularity.</p>
                </div>
                <button className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
                    View all <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {TRENDING_ITEMS.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-card rounded-3xl p-3 border border-border shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                        onClick={() => onRecipeClick?.(item.title)}
                    >
                        <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-md px-2 py-1 rounded-full text-xs font-bold text-foreground shadow-sm">
                                {item.category}
                            </div>
                            <button className="absolute bottom-3 right-3 p-2 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full text-foreground shadow-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="px-1 space-y-2">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">{item.title}</h3>
                                <div className="flex items-center gap-1 text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 px-1.5 py-0.5 rounded-md">
                                    <Star className="w-3 h-3 fill-current" />
                                    {item.rating}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {item.time}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Flame className="w-3 h-3" />
                                    {item.calories} kcal
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TrendingSection;
