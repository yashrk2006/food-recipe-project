import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { Ingredient, PairingCandidate } from '../types';

interface FlavorRadarProps {
    original: Ingredient;
    substitute?: PairingCandidate;
}

const FlavorRadar: React.FC<FlavorRadarProps> = ({ original, substitute }) => {
    // Normalize data for the chart
    // We need a union of molecules from both ingredients to show the full picture
    const allMolecules = new Set([
        ...original.molecularProfile.map(m => m.category),
        ...(substitute?.ingredient.molecularProfile.map(m => m.category) || [])
    ]);

    const categories = Array.from(allMolecules);

    const data = categories.map(cat => {
        const origMol = original.molecularProfile.find(m => m.category === cat);
        const subMol = substitute?.ingredient.molecularProfile.find(m => m.category === cat);

        return {
            subject: cat.charAt(0).toUpperCase() + cat.slice(1),
            original: origMol ? origMol.value * 100 : 0,
            substitute: subMol ? subMol.value * 100 : 0,
            fullMark: 100
        };
    });

    return (
        <div className="w-full h-[400px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />

                    <Radar
                        name={original.name}
                        dataKey="original"
                        stroke="var(--primary)"
                        strokeWidth={3}
                        fill="var(--primary)"
                        fillOpacity={0.3}
                    />
                    {substitute && (
                        <Radar
                            name={substitute.ingredient.name}
                            dataKey="substitute"
                            stroke="var(--accent-foreground)"
                            strokeWidth={3}
                            fill="var(--accent)"
                            fillOpacity={0.5}
                        />
                    )}
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        itemStyle={{ color: 'var(--foreground)' }}
                    />
                </RadarChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary/50 border border-primary"></span>
                    <span className="text-muted-foreground">{original.name}</span>
                </div>
                {substitute && (
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-accent/50 border border-accent-foreground"></span>
                        <span className="text-muted-foreground">{substitute.ingredient.name}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlavorRadar;
