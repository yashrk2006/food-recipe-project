export interface Molecule {
    id: string;
    name: string;
    category: 'savory' | 'herbaceous' | 'spicy' | 'sweet' | 'citrus' | 'earthy';
    value: number; // 0-1 range for intensity
}

export interface Ingredient {
    id: string;
    name: string;
    state: 'raw' | 'cooked' | 'dried' | 'roasted' | 'cubed' | 'simmered' | 'boiled' | 'fresh' | 'melted' | 'fermented' | 'grilled';
    molecularProfile: Molecule[];
    carbonFootprint: number; // kg CO2e per kg
    glycemicIndex: number;
}

export interface PairingCandidate {
    ingredient: Ingredient;
    sharedMolecules: Molecule[];
    matchScore: number; // 0-100%
    culturalValidity: 'high' | 'medium' | 'low';
}

export interface Recipe {
    id: string;
    name: string;
    ingredients: Ingredient[];
    region: string;
}
