import { useState, useEffect } from 'react';
import AtomizerSearch from './components/AtomizerSearch';
import TrendingSection from './components/TrendingSection';
import ComparisonTable from './components/ComparisonTable';
import { api } from './services/api';
import type { Recipe, Ingredient, PairingCandidate } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import RecipeEditorialView from './components/RecipeEditorialView';
import APIDocsView from './components/APIDocsView';
import AboutView from './components/AboutView';

// Forces new Vercel build
function App() {
  const [currentView, setCurrentView] = useState<'home' | 'api' | 'about'>('home');
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [pairingCandidates, setPairingCandidates] = useState<PairingCandidate[]>([]);
  const [activeCandidate, setActiveCandidate] = useState<PairingCandidate | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Initialize theme
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleSearch = async (term: string) => {
    console.log("Searching for:", term);
    setLoading(true);
    setActiveRecipe(null);
    setSelectedIngredient(null);
    setPairingCandidates([]);
    setActiveCandidate(null);
    try {
      const recipe = await api.getContext(term);
      setActiveRecipe(recipe);

      // UX Improvement: Auto-select the first ingredient to avoid "empty" feeling
      if (recipe && recipe.ingredients.length > 0) {
        // Small delay to let the list animate in first
        setTimeout(() => {
          handleIngredientClick(recipe.ingredients[0]);
        }, 800);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleIngredientClick = async (ing: Ingredient) => {
    if (selectedIngredient?.id === ing.id) return;
    setSelectedIngredient(ing);
    setIsSwapping(true);
    // Fetch pairings
    try {
      const candidates = await api.getPairing(ing);
      setPairingCandidates(candidates);
      setActiveCandidate(null); // Reset choice
    } catch (e) {
      console.error(e);
    } finally {
      setIsSwapping(false);
    }
  };

  const handleApplySwap = () => {
    if (!activeRecipe || !selectedIngredient || !activeCandidate) return;

    // Create a new recipe state with the swapped ingredient
    const newIngredients = activeRecipe.ingredients.map(ing =>
      ing.id === selectedIngredient.id ? activeCandidate.ingredient : ing
    );

    setActiveRecipe({
      ...activeRecipe,
      ingredients: newIngredients
    });

    // Reset selection after swap to show the new state
    setSelectedIngredient(null);
    setPairingCandidates([]);
    setActiveCandidate(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 pb-20 bg-ambient overflow-x-hidden transition-colors duration-500">
      {/* Floating Ambient Shapes */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none mix-blend-multiply animate-blob dark:bg-primary/10" />
      <div className="fixed top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl pointer-events-none mix-blend-multiply animate-blob animation-delay-2000 dark:bg-accent/10" />

      {/* Navigation */}
      <nav className="fixed top-6 inset-x-0 mx-auto max-w-5xl h-16 bg-white/70 dark:bg-black/70 backdrop-blur-xl z-50 flex items-center px-6 justify-between rounded-full border border-white/20 shadow-sm transition-all duration-500">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setCurrentView('home')}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-orange-400 flex items-center justify-center text-white shadow-lg shadow-primary/20" >
            <span className="font-bold text-xs">AF</span>
          </div>
          <span className="text-xl font-bold tracking-tight">
            AeroFlavor
          </span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrentView('home')}
            className={`text-sm font-medium transition-colors hidden md:block cursor-pointer ${currentView === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentView('about')}
            className={`text-sm font-medium transition-colors hidden md:block cursor-pointer ${currentView === 'about' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Mission
          </button>
          <button
            onClick={() => setCurrentView('api')}
            className={`text-sm font-medium transition-colors hidden md:block cursor-pointer ${currentView === 'api' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            API & Docs
          </button>
          <div className="h-4 w-[1px] bg-border hidden md:block"></div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-secondary/80 transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => {
              setCurrentView('home');
              setTimeout(() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
            }}
            className="px-4 py-1.5 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors shadow-lg cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {currentView === 'api' ? (
          <motion.div
            key="api-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <APIDocsView />
          </motion.div>
        ) : currentView === 'about' ? (
          <motion.div
            key="about-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <AboutView />
          </motion.div>
        ) : (
          <main key="home-view" className="pt-40 relative z-10">
            {/* Header Section - Constrained */}
            <div className="container mx-auto px-4 max-w-6xl text-center mb-16 space-y-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4 border border-secondary"
              >
                ✨ Computational Gastronomy v1.0
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9]"
              >
                Food <span className="text-muted-foreground font-light italic">as</span> <span className="text-primary">Data</span>.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              >
                Deconstruct recipes. Identify molecular bridges. <br />Clone culinary experiences scientifically.
              </motion.p>
            </div>

            {/* Search - Constrained */}
            <div className="container mx-auto px-4 max-w-6xl mb-16" id="search-section">
              <AtomizerSearch onSearch={handleSearch} />

              {/* Trending Section - Only show when NOT searching/active to keep UI clean */}
              {!activeRecipe && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <TrendingSection onRecipeClick={handleSearch} />
                </motion.div>
              )}
            </div>

            {/* Main Workspace - Full Width for Editorial Experience */}
            <AnimatePresence mode="wait">
              {loading && (
                <div className="container mx-auto max-w-6xl">
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center py-20"
                  >
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                  </motion.div>
                </div>
              )}

              {activeRecipe && !loading && (
                <motion.div
                  key="workspace"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <RecipeEditorialView
                    recipe={activeRecipe}
                    selectedIngredient={selectedIngredient}
                    activeCandidate={activeCandidate}
                    pairingCandidates={pairingCandidates}
                    isSwapping={isSwapping}
                    onIngredientClick={handleIngredientClick}
                    onCandidateClick={(candidate) => setActiveCandidate(candidate)}
                    onApplySwap={handleApplySwap}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="container mx-auto px-4 max-w-6xl">
              <ComparisonTable />
            </div>
          </main>
        )}
      </AnimatePresence>
    </div>
  );
}


export default App;
