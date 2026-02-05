import { useState, useEffect } from 'react';
import AtomizerSearch from './components/AtomizerSearch';
import TrendingSection from './components/TrendingSection';
import ComparisonTable from './components/ComparisonTable';
import { api } from './services/api';
import type { Recipe, Ingredient, PairingCandidate } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, ArrowLeft } from 'lucide-react';
// ... imports

// Forces new Vercel build
function App() {
  // ... state

  const handleBack = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
    } else if (activeRecipe) {
      setActiveRecipe(null);
      setTimeout(() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  const showBackButton = currentView !== 'home' || activeRecipe !== null;

  // ...

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
