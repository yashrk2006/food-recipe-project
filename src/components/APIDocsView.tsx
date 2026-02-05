import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Copy, Check, Server, Shield, Zap, Code, Database } from 'lucide-react';

const ENDPOINTS = [
    {
        method: 'GET',
        path: '/v1/molecular/analyze',
        title: 'Analyze Ingredient',
        desc: 'Deconstruct a specific ingredient into its dominant molecular compounds. Returns volatile profiles and flavor text.',
        response: `{
  "ingredient": "Basil",
  "compounds": [
    { "name": "Eugenol", "class": "Phenylpropene", "intensity": 0.8 },
    { "name": "Linalool", "class": "Terpene Alcohol", "intensity": 0.4 }
  ],
  "flavor_notes": ["Clove-like", "Peppery", "Sweet"]
}`
    },
    {
        method: 'POST',
        path: '/v1/pairing/candidates',
        title: 'Find Bridges',
        desc: 'Calculate flavor bridging stability between a source ingredient and a potential target. Uses our proprietary graft-theory algorithm.',
        response: `{
  "source": "Strawberry",
  "target": "Coriander",
  "bridge_strength": 0.92,
  "shared_volatiles": ["Linalool", "(Z)-3-Hexen-1-ol"],
  "culinary_application": "High"
}`
    },
    {
        method: 'GET',
        path: '/v1/recipes/trending',
        title: 'Fetch Trending',
        desc: 'Get globally trending recipes weighted by molecular novelty score and social engagement.',
        response: `[
  {
    "id": "rv_8823",
    "name": "Miso Caramel Glaze",
    "trend_score": 98.4,
    "tags": ["Umami", "Dessert", "Fusion"]
  }
]`
    }
];

const APIDocsView: React.FC = () => {
    const [activeEndpoint, setActiveEndpoint] = useState(0);
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-20 overflow-x-hidden">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* LEFT: Navigation & Context */}
                <div className="lg:col-span-4 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
                            <Terminal className="w-4 h-4" />
                            Developer Hub
                        </div>
                        <h1 className="text-5xl font-black font-serif leading-tight">
                            Build on the<br />
                            <span className="text-primary">Flavor Graph</span>.
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Access the world's first computational gastronomy engine.
                            Integrate molecular analysis, flavor bridging, and recipe generation directly into your own applications.
                        </p>

                        <div className="flex gap-4 pt-4">
                            <button className="px-6 py-3 bg-foreground text-background font-bold rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
                                <Zap className="w-4 h-4 fill-current" />
                                Get API Key
                            </button>
                            <button className="px-6 py-3 border border-border font-bold rounded-lg flex items-center gap-2 hover:bg-secondary transition-colors">
                                <Database className="w-4 h-4" />
                                View Schema
                            </button>
                        </div>
                    </motion.div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 gap-6">
                        {[
                            { icon: Shield, title: "Enterprise Grade", desc: "99.99% Uptime with SOC2 compliance." },
                            { icon: Server, title: "Global Edge", desc: "<50ms latency worldwide via edge caching." },
                            { icon: Code, title: "Type Safe", desc: "Full TypeScript SDKs available." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/30 transition-colors border border-transparent hover:border-border"
                            >
                                <div className="p-3 bg-secondary rounded-lg">
                                    <item.icon className="w-6 h-6 text-foreground" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Interactive Terminal */}
                <div className="lg:col-span-8">
                    <div className="sticky top-32 space-y-8">

                        {/* Interactive Endpoint Selector */}
                        <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
                            {ENDPOINTS.map((ep, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveEndpoint(i)}
                                    className={`
                                        flex items-center gap-3 px-5 py-3 rounded-xl border transition-all whitespace-nowrap cursor-pointer
                                        ${activeEndpoint === i
                                            ? 'bg-primary/10 border-primary text-primary shadow-lg shadow-primary/20'
                                            : 'bg-card border-border hover:border-foreground/20'}
                                    `}
                                >
                                    <span className={`
                                        text-xs font-black px-2 py-0.5 rounded
                                        ${ep.method === 'GET' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'}
                                    `}>
                                        {ep.method}
                                    </span>
                                    <span className="font-mono text-sm font-bold">{ep.path}</span>
                                </button>
                            ))}
                        </div>

                        {/* Terminal Window */}
                        <motion.div
                            key={activeEndpoint}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="bg-[#0D0D0D] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                        >
                            {/* Terminal Header */}
                            <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                                <div className="text-xs font-mono text-white/30 flex items-center gap-2">
                                    <Globe className="w-3 h-3" />
                                    api.aeroflavor.com
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-white text-xl font-bold mb-2">{ENDPOINTS[activeEndpoint].title}</h3>
                                        <p className="text-white/50 text-sm max-w-md">{ENDPOINTS[activeEndpoint].desc}</p>
                                    </div>
                                    <button
                                        onClick={() => handleCopy(ENDPOINTS[activeEndpoint].response)}
                                        className="text-white/40 hover:text-white transition-colors cursor-pointer"
                                    >
                                        {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                                    </button>
                                </div>

                                {/* Code Block */}
                                <div className="font-mono text-sm overflow-x-auto">
                                    <div className="text-purple-400 mb-2">
                                        <span className="text-purple-300">$</span> curl -X {ENDPOINTS[activeEndpoint].method} \
                                        <br />&nbsp;&nbsp;https://api.aeroflavor.com{ENDPOINTS[activeEndpoint].path} \
                                        <br />&nbsp;&nbsp;-H <span className="text-green-400">'Authorization: Bearer af_live_...'</span>
                                    </div>

                                    <div className="mt-6 text-blue-300"># Response ({Array.from({ length: 3 }).map((_, i) => <span key={i} className="animate-pulse">.</span>)})</div>

                                    <motion.pre
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="mt-4 text-gray-300 leading-relaxed"
                                    >
                                        <code>{ENDPOINTS[activeEndpoint].response}</code>
                                    </motion.pre>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default APIDocsView;
