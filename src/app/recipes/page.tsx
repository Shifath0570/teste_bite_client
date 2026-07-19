'use client';

import Link from 'next/link';
import React, { useState, useEffect, useMemo } from 'react';

interface Recipe {
  _id?: string; 
  id?: string | number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface RecipeGridProps {
  recipes?: Recipe[];
}

export default function RecipeCatalog({ recipes }: RecipeGridProps) {
  const [fetchedRecipes, setFetchedRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // --- FILTER, SORT, & PAGINATION STATES ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [sortBy, setSortBy] = useState<string>('name-asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8; // Adjust card capacity view limit per layout block

  useEffect(() => {
    async function getRecipes() {
      try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SURVER_URL}/recipe`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Network response failure');
        
        const data = await res.json();
        setFetchedRecipes(data);
      } catch (error) {
        console.error("Failed fetching recipes from server:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (!recipes || recipes.length === 0) {
      getRecipes();
    } else {
      setIsLoading(false); 
    }
  }, [recipes]);

  const rawData = recipes && recipes.length > 0 ? recipes : fetchedRecipes;

  // --- DYNAMIC CATEGORY EXTRACTION ---
  const categories = useMemo(() => {
    const list = new Set(rawData.map(r => r.category).filter(Boolean));
    return ['All', ...Array.from(list)];
  }, [rawData]);

  // --- FILTERING & SORTING LOGIC DATA LAYER ---
  const processedRecipes = useMemo(() => {
    let result = [...rawData];

    // 1. Text Search Filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(recipe => 
        recipe.name?.toLowerCase().includes(query) || 
        recipe.description?.toLowerCase().includes(query)
      );
    }

    // 2. Field Filter A: Category
    if (selectedCategory !== 'All') {
      result = result.filter(recipe => recipe.category === selectedCategory);
    }

    // 3. Field Filter B: Price Range
    result = result.filter(recipe => {
      const numericPrice = typeof recipe.price === 'number' ? recipe.price : Number(recipe.price || 0);
      return numericPrice <= maxPrice;
    });

    // 4. Multi-Option Sorting System
    result.sort((a, b) => {
      const priceA = typeof a.price === 'number' ? a.price : Number(a.price || 0);
      const priceB = typeof b.price === 'number' ? b.price : Number(b.price || 0);
      const nameA = (a.name || '').toLowerCase();
      const nameB = (b.name || '').toLowerCase();

      switch (sortBy) {
        case 'price-asc': return priceA - priceB;
        case 'price-desc': return priceB - priceA;
        case 'name-desc': return nameB.localeCompare(nameA);
        case 'name-asc':
        default:
          return nameA.localeCompare(nameB);
      }
    });

    return result;
  }, [rawData, searchQuery, selectedCategory, maxPrice, sortBy]);

  // --- PAGINATION COMPUTE CALCULATIONS ---
  const totalPages = Math.ceil(processedRecipes.length / itemsPerPage) || 1;
  
  // Reset index view range constraints gracefully if data length changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [processedRecipes.length, totalPages, currentPage]);

  const paginatedRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedRecipes.slice(startIndex, startIndex + itemsPerPage);
  }, [processedRecipes, currentPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-2">
          <span className="text-4xl animate-spin inline-block">🍳</span>
          <p className="text-sm font-semibold text-gray-500">Loading TasteBite collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header Layout */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Explore Our Recipes
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Discover delicious culinary masterpieces curated by the Taste<span className="text-orange-500 font-semibold">Bite</span> community.
          </p>
        </div>

        {/* --- OPERATIONAL CONTROLS INTERACTIVE PANEL --- */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs space-y-4 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* 1. Real-time Search Box Input Component */}
            <div className="md:col-span-2 relative">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Search Catalog</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search recipes, ingredients, titles..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full text-sm pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                />
                <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
              </div>
            </div>

            {/* 2. Filter Field A: Category Selector Dropdown */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Filter Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                className="w-full text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 capitalize focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* 3. Sorting Engine Configurations Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Sort Metrics</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
              >
                <option value="name-asc">Alphabetical (A-Z)</option>
                <option value="name-desc">Alphabetical (Z-A)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* 4. Filter Field B: Interactive Price Range Filtering Slider */}
          <div className="border-t border-gray-50 pt-3 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-full sm:w-72">
              <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                <span>Max Price Threshold</span>
                <span className="text-orange-600 font-extrabold">${maxPrice.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="150"
                step="5"
                value={maxPrice}
                onChange={(e) => { setMaxPrice(Number(e.target.value)); setCurrentPage(1); }}
                className="w-full accent-orange-500 h-1.5 bg-gray-100 rounded-lg cursor-pointer"
              />
            </div>
            <div className="text-xs text-gray-400 font-medium sm:mt-4">
              Showing <span className="text-gray-700 font-bold">{processedRecipes.length}</span> matching item paths.
            </div>
          </div>
        </div>

        {/* --- GRID RENDER SYSTEM LAYOUT --- */}
        {paginatedRecipes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-xs">
            <span className="text-4xl">🍽️</span>
            <h3 className="text-lg font-bold text-gray-700 mt-3">No Recipes Located</h3>
            <p className="text-sm text-gray-400 mt-1 max-w-sm mx-auto">We couldn t find any recipes corresponding to your selected filter configurations.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedRecipes.map((recipe, index) => {
              const uniqueKey = recipe._id || recipe.id || `recipe-${index}`;
              const detailPath = recipe._id ? `/recipes/${recipe._id}` : '#';
              
              return (
                <div
                  key={uniqueKey}
                  className="group flex flex-col bg-white rounded-xl border border-gray-100 shadow-xs hover:shadow-md hover:border-orange-100 transition-all duration-200 overflow-hidden w-full h-[430px]"
                >
                  {/* Image Element Wrapper */}
                  <div className="relative h-48 w-full bg-gray-100 overflow-hidden shrink-0">
                    <img
                      src={recipe.imageUrl || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&auto=format&fit=crop&q=60"}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&auto=format&fit=crop&q=60";
                      }}
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-xs text-xs font-semibold text-orange-600 rounded-full shadow-xs capitalize">
                      {recipe.category || 'General'}
                    </span>
                  </div>

                  {/* Card Content Segment Block */}
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        TasteBite Original
                      </span>
                      <span className="text-sm font-extrabold text-gray-900">
                        ${typeof recipe.price === 'number' ? recipe.price.toFixed(2) : Number(recipe.price || 0).toFixed(2)}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 line-clamp-1 mb-2 group-hover:text-orange-500 transition-colors">
                      {recipe.name || 'Untitled Recipe'}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-auto">
                      {recipe.description || 'No description provided for this dish.'}
                    </p>

                    <div className="pt-4 mt-4 border-t border-gray-50">
                      <Link 
                        href={detailPath}
                        className="w-full py-2.5 px-4 bg-orange-50 hover:bg-orange-500 text-orange-700 hover:text-white font-semibold text-sm rounded-lg transition-all duration-200 text-center flex items-center justify-center gap-1.5 focus:outline-none"
                      >
                        View Details
                        <span className="text-xs transition-transform group-hover:translate-x-0.5">➔</span>
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* --- INTERACTIVE PAGINATION BOTTOM CONTROL HUD BAR --- */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              ⬅️ Previous
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 text-sm font-bold rounded-lg transition-all cursor-pointer ${
                    currentPage === page
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              Next ➡️
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

