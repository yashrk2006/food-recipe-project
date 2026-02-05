import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, Star, ArrowRight } from 'lucide-react';

const TRENDING_ITEMS = [
    {
        id: 1,
        title: "Butter Chicken (Murgh Makhani)",
        category: "North Indian",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=60",
        time: "45 min",
        rating: 4.9,
        calories: 480
    },
    {
        id: 2,
        title: "Paneer Tikka Masala",
        category: "Vegetarian",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=60",
        time: "35 min",
        rating: 4.8,
        calories: 360
    },
    {
        id: 3,
        title: "Hyderabadi Biryani",
        category: "Royal Mughlai",
        image: "https://images.unsplash.com/photo-1563379091339-03b279f80336?w=500&auto=format&fit=crop&q=60",
        time: "60 min",
        rating: 4.9,
        calories: 650
    },
    {
        id: 4,
        title: "Masala Dosa",
        category: "South Indian",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60",
        time: "20 min",
        rating: 4.7,
        calories: 220
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
                            <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-md px-2 py-1 rounded-full text-xs font-bold text-black dark:text-white shadow-sm">
                                {item.category}
                            </div>
                            <button className="absolute bottom-3 right-3 p-2 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full text-black dark:text-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
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
