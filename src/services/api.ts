import type { Ingredient, PairingCandidate, Recipe, Molecule } from '../types';

// Mock Data
const API_KEY = import.meta.env.VITE_API_KEY;

console.log("Services Initialized. API Key loaded:", API_KEY ? "YES" : "NO");

const MOCK_MOLECULES: Record<string, Molecule> = {
    pyrazines: { id: 'm1', name: 'Pyrazines', category: 'savory', value: 0.9 },
    glutamates: { id: 'm2', name: 'Glutamates', category: 'savory', value: 0.8 },
    linalool: { id: 'm3', name: 'Linalool', category: 'herbaceous', value: 0.6 },
    methional: { id: 'm4', name: 'Methional', category: 'earthy', value: 0.7 },
    geosmin: { id: 'm5', name: 'Geosmin', category: 'earthy', value: 0.9 }, // Added to fix LENTILS crash
};

const BEEF: Ingredient = {
    id: 'i1',
    name: 'Beef (Stew)',
    state: 'cooked',
    molecularProfile: [MOCK_MOLECULES.pyrazines, MOCK_MOLECULES.glutamates, MOCK_MOLECULES.methional],
    carbonFootprint: 27.0,
    glycemicIndex: 0,
};

const SHIITAKE: Ingredient = {
    id: 'i2',
    name: 'Shiitake Mushrooms',
    state: 'dried',
    molecularProfile: [MOCK_MOLECULES.glutamates, MOCK_MOLECULES.methional],
    carbonFootprint: 0.5,
    glycemicIndex: 15,
};

const TOMATOES: Ingredient = {
    id: 'i3',
    name: 'Sun-dried Tomatoes',
    state: 'dried',
    molecularProfile: [MOCK_MOLECULES.glutamates, MOCK_MOLECULES.pyrazines],
    carbonFootprint: 1.1,
    glycemicIndex: 30,
};

const LENTILS: Ingredient = {
    id: 'i4',
    name: 'Lentils',
    state: 'cooked',
    molecularProfile: [MOCK_MOLECULES.geosmin], // Fixed: was undefined 'earthy'
    carbonFootprint: 0.9,
    glycemicIndex: 32
}

const BEEF_STEW: Recipe = {
    id: 'r1',
    name: 'Traditional Beef Stew',
    ingredients: [BEEF],
    region: 'Western Europe',
};

// Helper to generate a recipe if API fails, preventing "Beef Persistence"
// Helper to generate a recipe if API fails, preventing "Beef Persistence"
const createFallbackRecipe = (query: string): Recipe => {
    const term = query.toLowerCase();

    // Smart Defaults for common searches
    if (term.includes('chicken')) {
        return {
            id: `mock_chicken_${Date.now()}`,
            name: 'Classic Roast Chicken',
            region: 'French',
            ingredients: [
                { id: 'm1', name: 'Whole Chicken', state: 'roasted', molecularProfile: [MOCK_MOLECULES.glutamates], carbonFootprint: 6.9, glycemicIndex: 0 },
                { id: 'm2', name: 'Thyme', state: 'fresh', molecularProfile: [MOCK_MOLECULES.linalool], carbonFootprint: 0.1, glycemicIndex: 0 },
                { id: 'm3', name: 'Garlic', state: 'roasted', molecularProfile: [MOCK_MOLECULES.methional], carbonFootprint: 0.2, glycemicIndex: 10 }
            ]
        };
    }
    if (term.includes('pasta') || term.includes('spaghetti')) {
        return {
            id: `mock_pasta_${Date.now()}`,
            name: 'Spaghetti Pomodoro',
            region: 'Italian',
            ingredients: [
                { id: 'p1', name: 'Spaghetti', state: 'boiled', molecularProfile: [MOCK_MOLECULES.glutamates], carbonFootprint: 1.2, glycemicIndex: 45 },
                { id: 'p2', name: 'Tomato Sauce', state: 'simmered', molecularProfile: [MOCK_MOLECULES.glutamates, MOCK_MOLECULES.pyrazines], carbonFootprint: 1.1, glycemicIndex: 30 },
                { id: 'p3', name: 'Basil', state: 'fresh', molecularProfile: [MOCK_MOLECULES.linalool], carbonFootprint: 0.1, glycemicIndex: 0 }
            ]
        };
    }

    // Default Generic Fallback
    return {
        id: `mock_${Date.now()}`,
        name: `Searched: ${query.charAt(0).toUpperCase() + query.slice(1)}`,
        region: 'Global',
        ingredients: [
            {
                id: 'm1',
                name: `${query.charAt(0).toUpperCase() + query.slice(1)} (Main)`,
                state: 'cooked',
                molecularProfile: [MOCK_MOLECULES.glutamates, MOCK_MOLECULES.pyrazines], // Assume savory
                carbonFootprint: 12.5,
                glycemicIndex: 45
            },
            { ...SHIITAKE, id: 'm2' }, // Add some sides
            { ...TOMATOES, id: 'm3' }
        ]
    };
};

// API Service
export const api = {
    // 1. Context Extraction (Hybrid: Real API + Mock Enrichment)
    getContext: async (query: string): Promise<Recipe> => {
        console.log(`[API] Searching RecipeDB for: ${query}...`);

        if (!API_KEY || API_KEY === 'your_api_key_here') {
            console.warn("[API] No valid API Key found. Using fallback mock data.");
            await new Promise(resolve => setTimeout(resolve, 800));
            return createFallbackRecipe(query);
        }

        try {
            // Using the requested recipesinfo endpoint
            // Note: In a real search we might want a search endpoint, but using the provided snippet structure
            // We'll fetch a page of recipes and try to find a match or just pick the first one for the demo
            // Fix: Use the 'search' endpoint logic (simulated via recipe search if available, or filtering)
            // Since we need to use the provided API structure, we will use the 'search' endpoint for RecipeDB
            // (Assuming standard Foodoscope API pattern: /search_recipes?q=...)
            // If that is not exact, we will stick to the provided recipesinfo but try to filter, or mock the search.

            // CORRECTED: Integrating variable 'query' into the request
            // Note: The user's provided snippet was recipesinfo?page=1. 
            // We must attempt to pass the query. If recipesinfo doesn't support ?q=, 
            // we should ideally use a proper search endpoint. 
            // For now, we'll assume a search_query param or fallback to client filtering.

            let data;

            try {
                // Attempt 1: Try dedicated Search Endpoint
                // Update 2024: Try standardizing query params
                const searchResponse = await fetch(`https://api.foodoscope.com/recipe2-api/recipe/search_recipes?q=${encodeURIComponent(query)}&page=1&limit=5`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Authorization': API_KEY },
                });

                if (!searchResponse.ok) throw new Error("Search endpoint failed");
                data = await searchResponse.json();

            } catch (searchError) {
                console.warn("[API] Search endpoint unavailable, falling back to Client-Side Filtering...", searchError);

                // Attempt 2: Fallback to Listing Endpoint + Client Filter
                const listResponse = await fetch(`https://api.foodoscope.com/recipe2-api/recipe/recipesinfo?page=1&limit=50`, { // Fetch more for better filtering odds
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Authorization': API_KEY },
                });

                if (!listResponse.ok) throw new Error(`RecipeDB Error: ${listResponse.statusText}`);

                const listData = await listResponse.json();
                const allRecipes = Array.isArray(listData) ? listData : (listData.recipes || []);

                // Client-Side Fuzzy Filter
                const filtered = allRecipes.filter((r: any) => {
                    const title = r.Recipe_title || r.title || "";
                    return title.toLowerCase().includes(query.toLowerCase());
                });

                data = filtered.length > 0 ? filtered : allRecipes.slice(0, 1); // Return filtered or just first item
                console.log(`[API] Client-Side Filter found ${filtered.length} matches for "${query}"`);
            }

            console.log("[API] RecipeDB Response:", data);

            // Assuming standard response structure (adjust based on actual API return)
            // If data is array: data[0]
            // If data.recipes is array: data.recipes[0]
            const recipeData = Array.isArray(data) ? data[0] : (data.recipes ? data.recipes[0] : null);

            if (!recipeData) {
                console.warn("[API] No recipes found in response. Generating dynamic fallback.");
                return createFallbackRecipe(query);
            }

            // Map Real API Data to App Domain
            // We enrich the real ingredients with our Mock Molecular Data to keep the "Show" working
            const enrichedIngredients: Ingredient[] = (recipeData.ingredients || []).map((ingName: string | any, index: number) => {
                const nameStr = typeof ingName === 'string' ? ingName : ingName.text || "Unknown Ingredient";

                // Simple heuristic to map to our mock chemical profiles
                let profile = [MOCK_MOLECULES.geosmin]; // Default - fixed from undefined "earthy"
                if (nameStr.toLowerCase().includes('beef') || nameStr.toLowerCase().includes('meat')) profile = BEEF.molecularProfile;
                if (nameStr.toLowerCase().includes('mushroom')) profile = SHIITAKE.molecularProfile;
                if (nameStr.toLowerCase().includes('tomato')) profile = TOMATOES.molecularProfile;

                return {
                    id: `real_ing_${index}`,
                    name: nameStr,
                    state: 'raw', // Default, would need NLP to extract from recipe steps
                    molecularProfile: profile,
                    carbonFootprint: Math.random() * 5, // Mock environmental data
                    glycemicIndex: Math.floor(Math.random() * 100)
                };
            });

            return {
                id: recipeData.Recipe_id ? String(recipeData.Recipe_id) : 'real_r1',
                name: recipeData.Recipe_title || recipeData.title || "Imported Recipe",
                ingredients: enrichedIngredients.length > 0 ? enrichedIngredients : BEEF_STEW.ingredients,
                region: recipeData.Region || recipeData.cuisine || "International"
            };

        } catch (error) {
            console.error("[API] Failed to fetch from RecipeDB:", error);
            console.log("[API] Falling back to Dynamic Mock Data.");
            return createFallbackRecipe(query);
        }
    },
    // 2. Molecular Fingerprinting (Chained API: Heuristic -> FlavorDB Validation)
    getMolecularFingerprint: async (ingredientName: string): Promise<Ingredient> => {
        console.log(`[API] GET /ingredient/${ingredientName} - Fingerprinting...`);

        // 1. Identification (Mock/Local Database Simulation)
        let baseIngredient = BEEF;
        if (ingredientName.toLowerCase().includes('beef') || ingredientName.toLowerCase().includes('meat')) baseIngredient = BEEF;
        else if (ingredientName.toLowerCase().includes('shiitake')) baseIngredient = SHIITAKE;
        else if (ingredientName.toLowerCase().includes('tomato')) baseIngredient = TOMATOES;
        else if (ingredientName.toLowerCase().includes('lentil')) baseIngredient = LENTILS;

        // 2. Chained Enrichment: Call FlavorDB to get scientific properties of these molecules
        if (API_KEY && API_KEY !== 'your_api_key_here') {
            try {
                // Safe map
                const moleculeNames = baseIngredient.molecularProfile
                    .filter(m => m) // Filter undefineds
                    .map(m => m.name).join(',');

                console.log(`[API] Chaining Request > FlavorDB: /taste-threshold?values=${moleculeNames}`);

                const response = await fetch(`https://api.foodoscope.com/api/properties/taste-threshold?values=${encodeURIComponent(moleculeNames)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': API_KEY,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("[API] FlavorDB Response (Thresholds):", data);

                    // Demo Logic: If we get data back, we "calibrate" our intensity values based on it
                    // Assuming data maps name -> threshold value
                    // This creates a "Live Data" feeling even if the mapping is loose
                    const calibratedProfile = baseIngredient.molecularProfile.map(m => {
                        // If the API returns a threshold for this molecule, we use it to normalize intensity
                        // This is a simulation of "Scientific Accuracy"
                        const apiValue = data[m.name] || data[m.name.toLowerCase()];
                        return {
                            ...m,
                            value: apiValue ? (1 / Math.max(apiValue, 0.1)) % 1 : m.value // Invert threshold for intensity (lower threshold = higher potency)
                        };
                    });

                    return { ...baseIngredient, molecularProfile: calibratedProfile };
                }
            } catch (e) {
                console.error("[API] FlavorDB Chain Failed, proceeding with cached molecular data.", e);
            }
        }

        return baseIngredient;
    },

    // 3. The Scientific Swap & 4. Cultural Validation (Combined for demo)
    getPairing: async (sourceIngredient: Ingredient): Promise<PairingCandidate[]> => {
        console.log(`[API] FINDING MOLECULAR MATCHES for ${sourceIngredient.name}...`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Scientific compute delay

        // A. Candidate Database (The "Solution Space")
        // In a real system, this would be a Vector DB query
        const CANDIDATE_DB: Ingredient[] = [
            { ...SHIITAKE, name: 'Shiitake Mushrooms' },
            { ...TOMATOES, name: 'Sun-dried Tomatoes' },
            { ...LENTILS, name: 'French Lentils' },
            {
                id: 'c1', name: 'Walnuts', state: 'raw',
                molecularProfile: [MOCK_MOLECULES.pyrazines, MOCK_MOLECULES.linalool],
                carbonFootprint: 0.8, glycemicIndex: 15
            },
            {
                id: 'c2', name: 'Miso Paste', state: 'fermented',
                molecularProfile: [MOCK_MOLECULES.glutamates, MOCK_MOLECULES.methional],
                carbonFootprint: 1.2, glycemicIndex: 25
            },
            {
                id: 'c3', name: 'Portobello Mushrooms', state: 'grilled',
                // Check if 'geosmin' or others exist before using
                molecularProfile: [MOCK_MOLECULES.glutamates, MOCK_MOLECULES.geosmin || MOCK_MOLECULES.methional],
                carbonFootprint: 0.6, glycemicIndex: 10
            }
        ];

        // B. Similarity Engine (Jaccard/Overlap Simulation)
        // Guard against undefined molecules in source
        const sourceMolecules = new Set((sourceIngredient.molecularProfile || []).filter(m => m && m.id).map(m => m.id));

        const results: PairingCandidate[] = CANDIDATE_DB.map(candidate => {
            // 1. Calculate Overlap
            // Guard against undefined molecules in candidate
            const shared = (candidate.molecularProfile || []).filter(m => m && m.id && sourceMolecules.has(m.id));

            // 2. Score Calculation (Simple Overlap Ratio)
            // Weight heavier if exact matches on key compounds (Pyrazines/Glutamates)
            const overlapCount = shared.length;
            const totalCompounds = Math.max(candidate.molecularProfile.length, 1);
            let score = Math.round((overlapCount / totalCompounds) * 100);

            // Boost for specific "Umami" bridges if looking for meat replacements
            const isMeat = sourceIngredient.name.toLowerCase().match(/beef|pork|lamb|chicken|meat/);
            const hasUmami = shared.some(m => m.category === 'savory');
            if (isMeat && hasUmami) score += 15;

            // Cap at 98%
            score = Math.min(score, 98);

            // 3. Cultural/Dietary Logic (Mock)
            let validity: 'high' | 'medium' | 'low' = 'medium';
            if (score > 80) validity = 'high';
            if (score < 40) validity = 'low';

            return {
                ingredient: candidate,
                sharedMolecules: shared,
                matchScore: score,
                culturalValidity: validity
            };
        })
            .filter(c => c.matchScore > 30) // Filter out noise
            .sort((a, b) => b.matchScore - a.matchScore) // Best matches first
            .slice(0, 3); // Top 3

        console.log(`[API] Found ${results.length} matches for ${sourceIngredient.name}`);
        return results;
    },
};
