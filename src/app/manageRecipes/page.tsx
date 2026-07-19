// "use client";

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useSession } from '../lib/auth-client';

// interface RecipeListItem {
//     _id: string;
//     name: string;
//     category: string;
//     price: number;
//     difficulty: 'Easy' | 'Medium' | 'Hard';
//     chefName: string;
//     rating: number;
//     imageUrl: string;
// }

// export default function ManageRecipesPage() {
//     const { data: session, isPending: sessionLoading } = useSession();
//     const user = session?.user;

//     const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // Synchronize data fetching via React lifecycle hooks safely
//     useEffect(() => {
//         if (sessionLoading) return;
        
//         if (!user?.id && !user?._id) {
//             setIsLoading(false);
//             return;
//         }

//         const fetchRecipes = async () => {
//             try {
//                 setIsLoading(true);
//                 // Note: Changed /pets/ to /recipe/ based on your application model
//                 const targetId = user.id || user._id;
//                 const res = await fetch(`${process.env.NEXT_PUBLIC_SURVER_URL}/recipeChef/${targetId}`);
                
//                 if (!res.ok) throw new Error("Failed to retrieve your catalogs.");
                
//                 const data = await res.json();
//                 setRecipes(data || []);
//             } catch (err) {
//                 console.error(err);
//                 setError(err instanceof Error ? err.message : "An error occurred");
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchRecipes();
//     }, [user?.id, user?._id, sessionLoading]);

//     // Handle catalog removal interactions 
//     const handleDelete = async (id: string, name: string) => {
//         if (confirm(`Are you sure you want to delete "${name}" from TasteBite?`)) {
//             try {
//                 // Optimistic UI update
//                 setRecipes(prev => prev.filter(recipe => recipe._id !== id));
                
//                 await fetch(`${process.env.NEXT_PUBLIC_SURVER_URL}/removeRecipe/${id}`, { 
//                     method: 'DELETE' 
//                 });
//             } catch (err) {
//                 console.error("Failed to delete recipe:", err);
//                 alert("Could not remove item from database. Please try again.");
//             }
//         }
//     };

//     // Global loading guard states
//     if (sessionLoading || isLoading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
//                 <div className="text-center space-y-2">
//                     <div className="animate-spin text-3xl">⏳</div>
//                     <p className="text-sm font-medium text-gray-500">Loading catalog matrix...</p>
//                 </div>
//             </div>
//         );
//     }

//     // Unauthenticated status fallback
//     if (!user) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4">
//                 <div className="max-w-md w-full bg-white p-6 rounded-xl border border-gray-100 text-center shadow-xs">
//                     <span className="text-3xl">🔒</span>
//                     <h2 className="text-xl font-bold text-gray-900 mt-3">Access Restrictions</h2>
//                     <p className="text-sm text-gray-500 mt-1">Please sign in to manage your private chef catalogs.</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto space-y-8">

//                 {/* --- HEADER BLOCK --- */}
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">
//                     <div>
//                         <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">TasteBite Catalog Control</h1>
//                         <p className="text-sm text-gray-500 mt-1">Manage, audit, monitor, and remove cataloged active culinary box setups.</p>
//                     </div>
//                     <Link
//                         href="/addRecipes"
//                         className="inline-flex items-center justify-center px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-xs hover:shadow-md transition-all h-fit"
//                     >
//                         ➕ Create New Recipe
//                     </Link>
//                 </div>

//                 {error && (
//                     <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 text-sm font-medium">
//                         ⚠️ Error: {error}
//                     </div>
//                 )}

//                 {/* --- PERFORMANCE SNAPSHOT CARD SUMMARY GRID --- */}
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
//                     <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs flex items-center justify-between">
//                         <div>
//                             <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Listings</p>
//                             <p className="text-2xl font-black text-gray-900 mt-1">{recipes.length} Items</p>
//                         </div>
//                         <span className="text-2xl bg-orange-50 p-2.5 rounded-lg">🍽️</span>
//                     </div>
//                     <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs flex items-center justify-between">
//                         <div>
//                             <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Average Evaluation</p>
//                             <p className="text-2xl font-black text-gray-900 mt-1">
//                                 {(recipes.reduce((acc, curr) => acc + (curr.rating || 0), 0) / (recipes.length || 1)).toFixed(1)} ★
//                             </p>
//                         </div>
//                         <span className="text-2xl bg-amber-50 p-2.5 rounded-lg">⭐</span>
//                     </div>
//                     <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs flex items-center justify-between">
//                         <div>
//                             <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mean Price Target</p>
//                             <p className="text-2xl font-black text-gray-900 mt-1">
//                                 ${(recipes.reduce((acc, curr) => acc + (curr.price || 0), 0) / (recipes.length || 1)).toFixed(2)}
//                             </p>
//                         </div>
//                         <span className="text-2xl bg-emerald-50 p-2.5 rounded-lg">💵</span>
//                     </div>
//                 </div>

//                 {/* --- RESPONSIVE DESKTOP LAYOUT TABLE DISPLAY VIEW --- */}
//                 <div className="hidden lg:block bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden">
//                     <table className="w-full text-left border-collapse">
//                         <thead>
//                             <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
//                                 <th className="py-4 px-6">Culinary Item Details</th>
//                                 <th className="py-4 px-6">Category</th>
//                                 <th className="py-4 px-6">Creator Chef</th>
//                                 <th className="py-4 px-6">Complexity</th>
//                                 <th className="py-4 px-6">Market Price</th>
//                                 <th className="py-4 px-6 text-right">Operational Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-50 text-sm text-gray-600">
//                             {recipes.map((recipe) => (
//                                 <tr key={recipe._id} className="hover:bg-gray-50/50 transition-colors">
//                                     <td className="py-4 px-6 flex items-center gap-4">
//                                         <img src={recipe.imageUrl} alt={recipe.name} className="w-12 h-12 object-cover rounded-lg bg-gray-100 shadow-inner flex-shrink-0" />
//                                         <div>
//                                             <p className="font-bold text-gray-900 line-clamp-1">{recipe.name}</p>
//                                             <p className="text-xs text-amber-500 font-semibold mt-0.5">★ {(recipe.rating || 0).toFixed(1)}</p>
//                                         </div>
//                                     </td>
//                                     <td className="py-4 px-6">
//                                         <span className="px-2.5 py-1 bg-gray-100 text-gray-600 font-medium text-xs rounded-md uppercase tracking-wider">
//                                             {recipe.category}
//                                         </span>
//                                     </td>
//                                     <td className="py-4 px-6 font-medium text-gray-700">{recipe.chefName || 'You'}</td>
//                                     <td className="py-4 px-6">
//                                         <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${recipe.difficulty === 'Easy' ? 'text-emerald-600' :
//                                                 recipe.difficulty === 'Medium' ? 'text-amber-600' : 'text-rose-600'
//                                             }`}>
//                                             <span className={`w-1.5 h-1.5 rounded-full ${recipe.difficulty === 'Easy' ? 'bg-emerald-500' :
//                                                     recipe.difficulty === 'Medium' ? 'bg-amber-500' : 'bg-rose-500'
//                                                 }`} />
//                                             {recipe.difficulty || 'Easy'}
//                                         </span>
//                                     </td>
//                                     <td className="py-4 px-6 font-black text-gray-900">${(recipe.price || 0).toFixed(2)}</td>
//                                     <td className="py-4 px-6 text-right space-x-2">
//                                         <Link
//                                             href={`/recipes/${recipe._id}`}
//                                             className="inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-orange-500 text-gray-600 hover:text-white text-xs font-bold rounded-lg transition-all"
//                                         >
//                                             View
//                                         </Link>
//                                         <button
//                                             onClick={() => handleDelete(recipe._id, recipe.name)}
//                                             className="inline-flex items-center px-3 py-1.5 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white text-xs font-bold rounded-lg transition-all"
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                             {recipes.length === 0 && (
//                                 <tr>
//                                     <td colSpan={6} className="text-center py-12 text-gray-400 font-medium bg-gray-50/10">
//                                         No active recipes listed in the catalog.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* --- RESPONSIVE MOBILE CARDS LAYOUT DISPLAY (lg:HIDDEN) --- */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
//                     {recipes.map((recipe) => (
//                         <div key={recipe._id} className="bg-white rounded-xl border border-gray-100 shadow-xs p-5 flex flex-col justify-between space-y-4 hover:shadow-sm transition-shadow">
//                             <div className="flex gap-4 items-start">
//                                 <img src={recipe.imageUrl} alt={recipe.name} className="w-16 h-16 object-cover rounded-lg bg-gray-100 shadow-inner flex-shrink-0" />
//                                 <div className="space-y-1">
//                                     <span className="text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 bg-orange-50 text-orange-600 rounded-md">
//                                         {recipe.category}
//                                     </span>
//                                     <h3 className="font-bold text-gray-900 text-base line-clamp-2 leading-tight">{recipe.name}</h3>
//                                     <div className="flex items-center gap-2 text-xs text-gray-500">
//                                         <span>By {recipe.chefName || 'You'}</span>
//                                         <span>•</span>
//                                         <span className="text-amber-500 font-bold">★ {(recipe.rating || 0).toFixed(1)}</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="flex justify-between items-center border-t border-b border-gray-50 py-2.5">
//                                 <div>
//                                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Price Configuration</p>
//                                     <p className="text-base font-black text-gray-900">${(recipe.price || 0).toFixed(2)}</p>
//                                 </div>
//                                 <div className="text-right">
//                                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Complexity</p>
//                                     <span className={`text-xs font-bold ${recipe.difficulty === 'Easy' ? 'text-emerald-600' :
//                                             recipe.difficulty === 'Medium' ? 'text-amber-600' : 'text-rose-600'
//                                         }`}>{recipe.difficulty || 'Easy'}</span>
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-2 gap-3 pt-1">
//                                 <Link
//                                     href={`/recipes/${recipe._id}`}
//                                     className="w-full text-center py-2 bg-gray-100 hover:bg-orange-500 text-gray-600 hover:text-white font-bold text-xs rounded-lg transition-all"
//                                 >
//                                     View Blueprint
//                                 </Link>
//                                 <button
//                                     onClick={() => handleDelete(recipe._id, recipe.name)}
//                                     className="w-full text-center py-2 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white font-bold text-xs rounded-lg transition-all"
//                                 >
//                                     Delete Item
//                                 </button>
//                             </div>
//                         </div>
//                     ))}

//                     {recipes.length === 0 && (
//                         <div className="sm:col-span-2 text-center py-12 bg-white rounded-xl border border-gray-100 text-gray-400 font-medium">
//                             No active recipes listed in the catalog.
//                         </div>
//                     )}
//                 </div>

//             </div>
//         </div>
//     );
// }



"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from '../lib/auth-client';

interface RecipeListItem {
    _id: string;
    name: string;
    category: string;
    price: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    chefName: string;
    rating: number;
    imageUrl: string;
}

export default function ManageRecipesPage() {
    const { data: session, isPending: sessionLoading } = useSession();
    const user = session?.user;

    const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Synchronize data fetching via React lifecycle hooks safely
    useEffect(() => {
        if (sessionLoading) return;
        
        if (!user?.id) {
            setIsLoading(false);
            return;
        }

        const fetchRecipes = async () => {
            try {
                setIsLoading(true);
                // Target the strictly typed `id` string property from your auth library session context
                const res = await fetch(`${process.env.NEXT_PUBLIC_SURVER_URL}/recipeChef/${user.id}`);
                
                if (!res.ok) throw new Error("Failed to retrieve your catalogs.");
                
                const data = await res.json();
                setRecipes(data || []);
            } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecipes();
    }, [user?.id, sessionLoading]);

    // Handle catalog removal interactions 
    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}" from TasteBite?`)) {
            try {
                // Optimistic UI update
                setRecipes(prev => prev.filter(recipe => recipe._id !== id));
                
                await fetch(`${process.env.NEXT_PUBLIC_SURVER_URL}/removeRecipe/${id}`, { 
                    method: 'DELETE' 
                });
            } catch (err) {
                console.error("Failed to delete recipe:", err);
                alert("Could not remove item from database. Please try again.");
            }
        }
    };

    // Global loading guard states
    if (sessionLoading || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
                <div className="text-center space-y-2">
                    <div className="animate-spin text-3xl">⏳</div>
                    <p className="text-sm font-medium text-gray-500">Loading catalog matrix...</p>
                </div>
            </div>
        );
    }

    // Unauthenticated status fallback
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4">
                <div className="max-w-md w-full bg-white p-6 rounded-xl border border-gray-100 text-center shadow-xs">
                    <span className="text-3xl">🔒</span>
                    <h2 className="text-xl font-bold text-gray-900 mt-3">Access Restrictions</h2>
                    <p className="text-sm text-gray-500 mt-1">Please sign in to manage your private chef catalogs.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* --- HEADER BLOCK --- */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">TasteBite Catalog Control</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage, audit, monitor, and remove cataloged active culinary box setups.</p>
                    </div>
                    <Link
                        href="/addRecipes"
                        className="inline-flex items-center justify-center px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-xs hover:shadow-md transition-all h-fit"
                    >
                        ➕ Create New Recipe
                    </Link>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 text-sm font-medium">
                        ⚠️ Error: {error}
                    </div>
                )}

                {/* --- PERFORMANCE SNAPSHOT CARD SUMMARY GRID --- */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Listings</p>
                            <p className="text-2xl font-black text-gray-900 mt-1">{recipes.length} Items</p>
                        </div>
                        <span className="text-2xl bg-orange-50 p-2.5 rounded-lg">🍽️</span>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Average Evaluation</p>
                            <p className="text-2xl font-black text-gray-900 mt-1">
                                {(recipes.reduce((acc, curr) => acc + (curr.rating || 0), 0) / (recipes.length || 1)).toFixed(1)} ★
                            </p>
                        </div>
                        <span className="text-2xl bg-amber-50 p-2.5 rounded-lg">⭐</span>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mean Price Target</p>
                            <p className="text-2xl font-black text-gray-900 mt-1">
                                ${(recipes.reduce((acc, curr) => acc + (curr.price || 0), 0) / (recipes.length || 1)).toFixed(2)}
                            </p>
                        </div>
                        <span className="text-2xl bg-emerald-50 p-2.5 rounded-lg">💵</span>
                    </div>
                </div>

                {/* --- RESPONSIVE DESKTOP LAYOUT TABLE DISPLAY VIEW --- */}
                <div className="hidden lg:block bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                <th className="py-4 px-6">Culinary Item Details</th>
                                <th className="py-4 px-6">Category</th>
                                <th className="py-4 px-6">Creator Chef</th>
                                <th className="py-4 px-6">Complexity</th>
                                <th className="py-4 px-6">Market Price</th>
                                <th className="py-4 px-6 text-right">Operational Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm text-gray-600">
                            {recipes.map((recipe) => (
                                <tr key={recipe._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-6 flex items-center gap-4">
                                        <img src={recipe.imageUrl} alt={recipe.name} className="w-12 h-12 object-cover rounded-lg bg-gray-100 shadow-inner flex-shrink-0" />
                                        <div>
                                            <p className="font-bold text-gray-900 line-clamp-1">{recipe.name}</p>
                                            <p className="text-xs text-amber-500 font-semibold mt-0.5">★ {(recipe.rating || 0).toFixed(1)}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 font-medium text-xs rounded-md uppercase tracking-wider">
                                            {recipe.category}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 font-medium text-gray-700">{recipe.chefName || 'You'}</td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${recipe.difficulty === 'Easy' ? 'text-emerald-600' :
                                                recipe.difficulty === 'Medium' ? 'text-amber-600' : 'text-rose-600'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${recipe.difficulty === 'Easy' ? 'bg-emerald-500' :
                                                    recipe.difficulty === 'Medium' ? 'bg-amber-500' : 'bg-rose-500'
                                                }`} />
                                            {recipe.difficulty || 'Easy'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 font-black text-gray-900">${(recipe.price || 0).toFixed(2)}</td>
                                    <td className="py-4 px-6 text-right space-x-2">
                                        <Link
                                            href={`/recipes/${recipe._id}`}
                                            className="inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-orange-500 text-gray-600 hover:text-white text-xs font-bold rounded-lg transition-all"
                                        >
                                            View
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(recipe._id, recipe.name)}
                                            className="inline-flex items-center px-3 py-1.5 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white text-xs font-bold rounded-lg transition-all"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {recipes.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-gray-400 font-medium bg-gray-50/10">
                                        No active recipes listed in the catalog.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* --- RESPONSIVE MOBILE CARDS LAYOUT DISPLAY (lg:HIDDEN) --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
                    {recipes.map((recipe) => (
                        <div key={recipe._id} className="bg-white rounded-xl border border-gray-100 shadow-xs p-5 flex flex-col justify-between space-y-4 hover:shadow-sm transition-shadow">
                            <div className="flex gap-4 items-start">
                                <img src={recipe.imageUrl} alt={recipe.name} className="w-16 h-16 object-cover rounded-lg bg-gray-100 shadow-inner flex-shrink-0" />
                                <div className="space-y-1">
                                    <span className="text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 bg-orange-50 text-orange-600 rounded-md">
                                        {recipe.category}
                                    </span>
                                    <h3 className="font-bold text-gray-900 text-base line-clamp-2 leading-tight">{recipe.name}</h3>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span>By {recipe.chefName || 'You'}</span>
                                        <span>•</span>
                                        <span className="text-amber-500 font-bold">★ {(recipe.rating || 0).toFixed(1)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center border-t border-b border-gray-50 py-2.5">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Price Configuration</p>
                                    <p className="text-base font-black text-gray-900">${(recipe.price || 0).toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Complexity</p>
                                    <span className={`text-xs font-bold ${recipe.difficulty === 'Easy' ? 'text-emerald-600' :
                                            recipe.difficulty === 'Medium' ? 'text-amber-600' : 'text-rose-600'
                                        }`}>{recipe.difficulty || 'Easy'}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-1">
                                <Link
                                    href={`/recipes/${recipe._id}`}
                                    className="w-full text-center py-2 bg-gray-100 hover:bg-orange-500 text-gray-600 hover:text-white font-bold text-xs rounded-lg transition-all"
                                >
                                    View Blueprint
                                </Link>
                                <button
                                    onClick={() => handleDelete(recipe._id, recipe.name)}
                                    className="w-full text-center py-2 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white font-bold text-xs rounded-lg transition-all"
                                >
                                    Delete Item
                                </button>
                            </div>
                        </div>
                    ))}

                    {recipes.length === 0 && (
                        <div className="sm:col-span-2 text-center py-12 bg-white rounded-xl border border-gray-100 text-gray-400 font-medium">
                            No active recipes listed in the catalog.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
