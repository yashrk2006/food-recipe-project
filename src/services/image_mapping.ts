// Premium Curated Images from Unsplash to ensure "Landing Boys" aesthetic
// These are high-res, moody, editorial shots.

const IMAGE_DB: Record<string, string[]> = {
    'default': [
        'https://images.unsplash.com/photo-1543353071-87d877b63c4d?q=80&w=2000&auto=format&fit=crop', // Elegant dark plate
        'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=2000&auto=format&fit=crop', // Rustic table
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop', // Banquet
    ],
    'beef': [
        'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=2000&auto=format&fit=crop', // Rich stew
        'https://images.unsplash.com/photo-1547051912-881e7d8258e7?q=80&w=2000&auto=format&fit=crop', // Steak plated
    ],
    'chicken': [
        'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2000&auto=format&fit=crop', // Roast chicken
        'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=2000&auto=format&fit=crop', // Grilled chicken
    ],
    'pasta': [
        'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2000&auto=format&fit=crop', // Green pesto
        'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=2000&auto=format&fit=crop', // Tomato pasta
    ],
    'salad': [
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2000&auto=format&fit=crop', // Fresh green salad
        'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=2000&auto=format&fit=crop', // Healthy bowl
    ],
    'desert': [
        'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=2000&auto=format&fit=crop', // Chocolate cake
        'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=2000&auto=format&fit=crop', // Pastries
    ],
    'breakfast': [
        'https://images.unsplash.com/photo-1533089862017-5614ca671446?q=80&w=2000&auto=format&fit=crop', // Pancakes
        'https://images.unsplash.com/photo-1525351463974-b1ad7d95d488?q=80&w=2000&auto=format&fit=crop', // Toast
        'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=2000&auto=format&fit=crop', // Eggs toast
    ]
};

export const getRecipeImage = (query: string): string => {
    const term = query.toLowerCase();

    let key = 'default';
    if (term.includes('beef') || term.includes('steak') || term.includes('meat') || term.includes('stew') || term.includes('pork') || term.includes('lamb')) key = 'beef';
    else if (term.includes('chicken') || term.includes('bird') || term.includes('roast') || term.includes('turkey')) key = 'chicken';
    else if (term.includes('pasta') || term.includes('spaghetti') || term.includes('noodle') || term.includes('macaroni') || term.includes('italian')) key = 'pasta';
    else if (term.includes('salad') || term.includes('lettuce') || term.includes('veg') || term.includes('green') || term.includes('vegan')) key = 'salad';
    else if (term.includes('cake') || term.includes('sweet') || term.includes('chocolate') || term.includes('desert') || term.includes('cookie') || term.includes('pie')) key = 'desert';
    else if (term.includes('breakfast') || term.includes('egg') || term.includes('toast') || term.includes('pancake') || term.includes('morning') || term.includes('avocado')) key = 'breakfast';

    const candidates = IMAGE_DB[key];
    // Return a random image from the matching category to keep it fresh
    return candidates[Math.floor(Math.random() * candidates.length)];
};
