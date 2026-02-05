import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface AtomizerSearchProps {
    onSearch: (term: string) => void;
    className?: string;
}

export function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

const AtomizerSearch: React.FC<AtomizerSearchProps> = ({ onSearch, className }) => {
    const [query, setQuery] = useState('');
    const [isAtomizing, setIsAtomizing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;

        setIsAtomizing(true);

        // Simulate the "Atomization" process time
        setTimeout(() => {
            onSearch(query);
            setIsAtomizing(false);
            setQuery('');
        }, 1500);
    };

    return (
        <div className={cn("relative w-full max-w-2xl mx-auto", className)}>
            <form onSubmit={handleSubmit} className="relative z-10 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter a recipe to decompose (e.g., 'Beef Stew')"
                    className={cn(
                        "block w-full pl-11 pr-12 py-4 bg-background/80 backdrop-blur-md border border-input rounded-2xl",
                        "text-lg shadow-lg transition-all duration-300",
                        "focus:ring-2 focus:ring-primary/50 focus:border-primary focus:shadow-primary/20",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                    disabled={isAtomizing}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                        type="submit"
                        disabled={!query || isAtomizing}
                        className="p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-colors disabled:opacity-0"
                    >
                        <Sparkles className="h-5 w-5" />
                    </button>
                </div>
            </form>

            {/* Atomization Animation Layer */}
            <AnimatePresence>
                {isAtomizing && (
                    <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
                        {query.split('').map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{
                                    opacity: 1,
                                    x: index * 10 + 20, // Rough estimation of position
                                    y: 15
                                }}
                                animate={{
                                    opacity: [1, 1, 0],
                                    x: Math.random() * 400 - 200,
                                    y: Math.random() * 200 - 100,
                                    scale: [1, 1.5, 0],
                                    rotate: Math.random() * 720,
                                    filter: "blur(4px)"
                                }}
                                transition={{ duration: 1.2, ease: "circOut" }}
                                className="absolute text-lg font-bold text-primary inline-block"
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
                        {/* Extra Particles */}
                        {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div
                                key={`p-${i}`}
                                initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    x: (Math.random() - 0.5) * 500,
                                    y: (Math.random() - 0.5) * 300,
                                    scale: Math.random() * 2,
                                }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
                                className="absolute top-1/2 left-1/2 w-2 h-2 bg-accent rounded-full"
                                style={{ backgroundColor: i % 2 === 0 ? 'var(--primary)' : 'var(--accent)' }}
                            />
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AtomizerSearch;
