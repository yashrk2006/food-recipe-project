import React from 'react';
import { Leaf, Activity, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MetricProps {
    label: string;
    value: number;
    unit: string;
    icon: React.ReactNode;
    originalValue?: number;
    reverseColor?: boolean; // If true, lower is better (green)
}

const Metric: React.FC<MetricProps> = ({ label, value, unit, icon, originalValue, reverseColor = true }) => {
    const isDiff = originalValue !== undefined && originalValue !== value;
    const diff = isDiff ? value - originalValue! : 0;
    const percentChange = isDiff ? (diff / originalValue!) * 100 : 0;

    // Determine color based on whether the change is "good" or "bad"
    // For Carbon/GI, lower (negative diff) is better (green)
    const isBetter = reverseColor ? diff < 0 : diff > 0;


    return (
        <div className="bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-border/50">
            <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-secondary rounded-lg text-primary">
                    {icon}
                </div>
                {isDiff && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`text-xs font-bold px-2 py-1 rounded-full bg-background border ${isBetter ? 'border-green-500/30 bg-green-500/10 text-green-500' : 'border-red-500/30 bg-red-500/10 text-red-500'}`}
                    >
                        {diff > 0 ? '+' : ''}{diff.toFixed(1)} {unit} ({Math.abs(percentChange).toFixed(0)}%)
                    </motion.div>
                )}
            </div>
            <div className="text-sm text-muted-foreground font-medium">{label}</div>
            <div className="text-2xl font-bold flex items-baseline gap-1">
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={value}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {value.toFixed(1)}
                    </motion.span>
                </AnimatePresence>
                <span className="text-sm font-normal text-muted-foreground">{unit}</span>
            </div>
        </div>
    );
};

interface CarbonHealthDashboardProps {
    currentCarbon: number;
    currentGI: number;
    originalCarbon?: number;
    originalGI?: number;
}

const CarbonHealthDashboard: React.FC<CarbonHealthDashboardProps> = ({
    currentCarbon,
    currentGI,
    originalCarbon,
    originalGI
}) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 px-1">Impact Analysis</h3>
            <div className="grid grid-cols-1 gap-3">
                <Metric
                    label="Carbon Footprint"
                    value={currentCarbon}
                    originalValue={originalCarbon}
                    unit="kg CO2e"
                    icon={<Leaf className="w-5 h-5" />}
                />
                <Metric
                    label="Glycemic Index"
                    value={currentGI}
                    originalValue={originalGI}
                    unit="GI"
                    icon={<Activity className="w-5 h-5" />}
                />
                <Metric
                    label="Water Usage"
                    value={currentCarbon * 40} // Mock correlation
                    originalValue={originalCarbon ? originalCarbon * 40 : undefined}
                    unit="L"
                    icon={<Droplets className="w-5 h-5" />}
                />
            </div>
        </div>
    );
};

export default CarbonHealthDashboard;
