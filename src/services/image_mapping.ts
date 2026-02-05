// Premium Curated Images from Unsplash to ensure "Landing Boys" aesthetic
// These are high-res, moody, editorial shots.

const IMAGE_DB: Record<string, string[]> = {
    'default': [
        'https://images.unsplash.com/photo-1543353071-87d877b63c4d?q=80&w=2000&auto=format&fit=crop', // Elegant dark plate
        'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=2000&auto=format&fit=crop', // Rustic table
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop', // Banquet
    ],
    'curry': [
        'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=2000&auto=format&fit=crop', // Butter Chicken
        'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=2000&auto=format&fit=crop', // Paneer
    ],
    'chicken': [
        'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=2000&auto=format&fit=crop', // Chicken Tikka
        'https://images.unsplash.com/photo-1563379091339-03b279f80336?w=2000&auto=format&fit=crop', // Biryani
    ],
    'rice': [
        'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=2000&auto=format&fit=crop', // Biryani Rice
        'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=2000&auto=format&fit=crop', // Jeera Rice
    ],
    'paneer': [
        'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=2000&auto=format&fit=crop', // Palak Paneer
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
    if (term.includes('curry') || term.includes('masala') || term.includes('gravy') || term.includes('dal') || term.includes('makhani')) key = 'curry';
    else if (term.includes('paneer') || term.includes('cottage cheese')) key = 'paneer';
    else if (term.includes('rice') || term.includes('biryani') || term.includes('pulao')) key = 'rice';
    else if (term.includes('chicken') || term.includes('murgh') || term.includes('tikka')) key = 'chicken';
    else if (term.includes('pasta') || term.includes('spaghetti') || term.includes('noodle') || term.includes('macaroni') || term.includes('italian')) key = 'pasta';
    else if (term.includes('salad') || term.includes('lettuce') || term.includes('veg') || term.includes('green') || term.includes('vegan')) key = 'salad';
    else if (term.includes('cake') || term.includes('sweet') || term.includes('chocolate') || term.includes('desert') || term.includes('cookie') || term.includes('pie')) key = 'desert';
    else if (term.includes('breakfast') || term.includes('egg') || term.includes('toast') || term.includes('pancake') || term.includes('morning') || term.includes('avocado')) key = 'breakfast';

    const candidates = IMAGE_DB[key];
    // Return a random image from the matching category to keep it fresh
    return candidates[Math.floor(Math.random() * candidates.length)];
};
