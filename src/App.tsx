import { useState, useEffect } from 'react';
import AtomizerSearch from './components/AtomizerSearch';
import TrendingSection from './components/TrendingSection';
import ComparisonTable from './components/ComparisonTable';
import { api } from './services/api';
import type { Recipe, Ingredient, PairingCandidate } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, ArrowLeft, Menu, X } from 'lucide-react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleBack = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
    } else if (activeRecipe) {
      setActiveRecipe(null);
      setTimeout(() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  const showBackButton = currentView !== 'home' || activeRecipe !== null;

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
      {/* ... */}

      {/* Navigation */}
      <nav className="fixed top-6 inset-x-0 mx-auto max-w-5xl h-16 bg-white/70 dark:bg-black/70 backdrop-blur-xl z-50 flex items-center px-6 justify-between rounded-full border border-white/20 shadow-sm transition-all duration-500">
        <div className="flex items-center gap-4">
          {showBackButton ? (
            <button
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors group"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-5 h-5 text-foreground group-hover:-translate-x-1 transition-transform" />
            </button>
          ) : (
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCurrentView('home')}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-orange-400 flex items-center justify-center text-white shadow-lg shadow-primary/20" >
                <span className="font-bold text-xs">AF</span>
              </div>
            </div>
          )}

          <span className="text-xl font-bold tracking-tight hidden sm:block">
            {currentView === 'home' && !activeRecipe ? 'AeroFlavor' :
              currentView === 'about' ? 'Our Mission' :
                currentView === 'api' ? 'API Reference' :
                  activeRecipe ? activeRecipe.name : 'AeroFlavor'}
          </span>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setCurrentView('home')}
              className={`text-sm font-medium transition-colors cursor-pointer ${currentView === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentView('about')}
              className={`text-sm font-medium transition-colors cursor-pointer ${currentView === 'about' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Mission
            </button>
            <button
              onClick={() => setCurrentView('api')}
              className={`text-sm font-medium transition-colors cursor-pointer ${currentView === 'api' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              API & Docs
            </button>
            <div className="h-4 w-[1px] bg-border"></div>
          </div>

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
            className="hidden md:block px-4 py-1.5 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors shadow-lg cursor-pointer"
          >
            Get Started
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-secondary/80 transition-colors text-foreground cursor-pointer"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 p-6 bg-white/90 dark:bg-black/90 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl z-40 md:hidden flex flex-col gap-4"
          >
            <button
              onClick={() => { setCurrentView('home'); setIsMenuOpen(false); }}
              className={`text-lg font-medium p-4 rounded-xl transition-colors ${currentView === 'home' ? 'bg-primary/10 text-primary' : 'hover:bg-secondary text-foreground'}`}
            >
              Home
            </button>
            <button
              onClick={() => { setCurrentView('about'); setIsMenuOpen(false); }}
              className={`text-lg font-medium p-4 rounded-xl transition-colors ${currentView === 'about' ? 'bg-primary/10 text-primary' : 'hover:bg-secondary text-foreground'}`}
            >
              Mission
            </button>
            <button
              onClick={() => { setCurrentView('api'); setIsMenuOpen(false); }}
              className={`text-lg font-medium p-4 rounded-xl transition-colors ${currentView === 'api' ? 'bg-primary/10 text-primary' : 'hover:bg-secondary text-foreground'}`}
            >
              API & Docs
            </button>
            <button
              onClick={() => {
                setCurrentView('home');
                setIsMenuOpen(false);
                setTimeout(() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="w-full py-4 bg-foreground text-background rounded-xl text-lg font-medium hover:bg-foreground/90 transition-colors shadow-lg"
            >
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
