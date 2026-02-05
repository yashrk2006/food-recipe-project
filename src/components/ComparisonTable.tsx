import { Check, Wand2, Search, Globe, Database } from 'lucide-react';

const ComparisonTable = () => {
    return (
        <div className="py-20 bg-card/30 backdrop-blur-sm rounded-3xl border border-border mt-20 p-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">The AeroFlavor Advantage</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Why AeroFlavor is not just another recipe app. We are building the data layer for computational gastronomy.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-border text-muted-foreground font-medium w-1/4">Feature</th>
                            <th className="p-4 border-b border-border text-muted-foreground font-medium w-1/3 opacity-70">Legacy Apps (Yummly/Tasty)</th>
                            <th className="p-4 border-b border-border text-primary font-bold w-1/3 bg-primary/5 rounded-t-xl">AeroFlavor (Molecular-Based)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-medium flex items-center gap-2">
                                <Search className="w-4 h-4 text-muted-foreground" /> Search Engine
                            </td>
                            <td className="p-4 text-muted-foreground">Keyword/Tag Indexing</td>
                            <td className="p-4 text-foreground font-semibold bg-primary/10 rounded-lg">Molecular Chemical Signatures</td>
                        </tr>
                        <tr className="hover:bg-primary/5 transition-colors">
                            <td className="p-4 font-medium flex items-center gap-2">
                                <Wand2 className="w-4 h-4 text-muted-foreground" /> Substitution
                            </td>
                            <td className="p-4 text-muted-foreground">"Tastes Like" (Subjective)</td>
                            <td className="p-4 text-foreground font-semibold bg-primary/10 rounded-lg">"Shared Molecules" (Objective)</td>
                        </tr>
                        <tr className="hover:bg-primary/5 transition-colors">
                            <td className="p-4 font-medium flex items-center gap-2">
                                <Globe className="w-4 h-4 text-muted-foreground" /> Cultural Logic
                            </td>
                            <td className="p-4 text-muted-foreground">Recipe-level tagging</td>
                            <td className="p-4 text-foreground font-semibold bg-primary/10 rounded-lg">Geocultural Interaction Mapping</td>
                        </tr>
                        <tr className="hover:bg-primary/5 transition-colors">
                            <td className="p-4 font-medium flex items-center gap-2">
                                <Database className="w-4 h-4 text-muted-foreground" /> Primary Goal
                            </td>
                            <td className="p-4 text-muted-foreground">Discovery</td>
                            <td className="p-4 text-foreground font-semibold bg-primary/10 rounded-lg">Scientific Reconstruction</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                    <Check className="w-4 h-4" />
                    Backed by RecipeDB & Computational Chemistry
                </div>
            </div>
        </div>
    );
};

export default ComparisonTable;
