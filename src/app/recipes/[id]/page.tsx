
import Link from 'next/link';

interface Review {
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
}

interface RecipeDetails {
    _id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    images: string[];
    prepTime: string;
    cookTime: string;
    servings: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    calories: number;
    ingredients: string[];
    instructions: string[];
    rating: number;
    reviewCount: number;
    reviews: Review[];
    chefName?: string;       // Added field mapping
    publishDate?: string;    // Added field mapping
}

interface RelatedRecipe {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
}

interface RecipeDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function RecipeDetailsPage({ params }: RecipeDetailsPageProps) {
 
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SURVER_URL;

    let recipe: RecipeDetails | null = null;
    let relatedItems: RelatedRecipe[] = [];

    try {
        const [detailsRes, relatedRes] = await Promise.all([
            fetch(`${baseUrl}/recipe/${id}`, { cache: 'no-store' }),
            fetch(`${baseUrl}/recipe?limit=5`, { cache: 'no-store' })
        ]);

        if (detailsRes.ok) {
            recipe = await detailsRes.json();
        }
        if (relatedRes.ok) {
            const relatedData: RelatedRecipe[] = await relatedRes.json();
            relatedItems = relatedData.filter(item => item._id !== id).slice(0, 4);
        }
    } catch (error) {
        console.error("Direct server fetch exception caught:", error);
    }

    if (!recipe) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <h3 className="text-xl font-bold text-gray-900">Recipe Not Found</h3>
                <p className="text-gray-500 mb-4">The item you are looking for doesn t exist or has been removed.</p>
                <Link href="/" className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium">
                    Back to Catalog
                </Link>
            </div>
        );
    }

    // 👈 FIX: Safeguarded resolution reading from the recipe.images primitive array grid
    const initialDisplayImage = (recipe.images && recipe.images.length > 0)
        ? recipe.images[0]
        : "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&auto=format&fit=crop&q=60";
    
    return (
        <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Breadcrumbs Navigation */}
                <nav className="text-sm font-medium text-gray-500 flex gap-2 items-center">
                    <Link href="/" className="hover:text-orange-500 transition-colors">Recipes</Link>
                    <span>/</span>
                    <span className="text-orange-600 capitalize">{recipe.category}</span>
                    <span>/</span>
                    <span className="text-gray-900 line-clamp-1">{recipe.name}</span>
                </nav>

                {/* --- SECTION 1: MEDIA GALLERY & KEY INFORMATION BLOCK --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-xs">

                    {/* Media Container Layout Viewport */}
                    <div className="space-y-4">
                        <div className="relative h-96 w-full rounded-xl bg-gray-100 overflow-hidden shadow-inner">
                            <img
                                src={initialDisplayImage}
                                alt={recipe.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Gallery Assets Grid Array */}
                        {recipe.images && recipe.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-3">
                                {recipe.images.map((imgUrl, idx) => (
                                    <div
                                        key={idx}
                                        className="h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-100 opacity-80 hover:opacity-100 transition-all"
                                    >
                                        <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Core Product Info Element Panel */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold tracking-wide rounded-full uppercase">
                                    {recipe.category}
                                </span>
                                {recipe.publishDate && (
                                    <span className="text-xs font-medium text-gray-400">
                                        Published: {new Date(recipe.publishDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl font-extrabold text-gray-900 mt-3 tracking-tight">
                                {recipe.name}
                            </h1>

                            {/* Chef Attribution Meta Header */}
                            {recipe.chefName && (
                                <p className="text-sm font-medium text-gray-500 mt-1">
                                    By <span className="text-gray-800 font-semibold">{recipe.chefName}</span>
                                </p>
                            )}

                            {/* Aggregated Consumer Ratings Matrix */}
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex text-amber-400 text-sm">
                                    {'★'.repeat(Math.round(recipe.rating || 5))}{('☆'.repeat(5 - Math.round(recipe.rating || 5)))}
                                </div>
                                <span className="text-sm font-semibold text-gray-600">
                                    {recipe.rating?.toFixed(1) || '5.0'} ({recipe.reviewCount || 0} reviews)
                                </span>
                            </div>

                            <div className="mt-4 text-2xl font-black text-gray-900">
                                ${recipe.price?.toFixed(2)}
                            </div>

                            <hr className="my-6 border-gray-100" />

                            {/* Data Specifications Breakdown Grid */}
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                                Recipe Specifications
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                                    <span className="text-xl">⏱️</span>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Prep / Cook Time</p>
                                        <p className="text-sm font-bold text-gray-800">{recipe.prepTime || '15m'} / {recipe.cookTime || '20m'}</p>
                                    </div>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                                    <span className="text-xl">👥</span>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Servings</p>
                                        <p className="text-sm font-bold text-gray-800">{recipe.servings || 4} slots</p>
                                    </div>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                                    <span className="text-xl">🔥</span>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Calories</p>
                                        <p className="text-sm font-bold text-gray-800">{recipe.calories || 350} kcal</p>
                                    </div>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                                    <span className="text-xl">⚡</span>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Difficulty</p>
                                        <p className="text-sm font-bold text-gray-800">{recipe.difficulty || 'Easy'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="mt-8 w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-base rounded-xl transition-all shadow-xs hover:shadow-md focus:outline-none"
                        >
                            Order Recipe Box Setup
                        </button>
                    </div>
                </div>

                {/* --- SECTION 2: DESCRIPTION & COMPREHENSIVE OVERVIEW --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Description & Context Execution Loop */}
                    <div className="lg:col-span-2 space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-xs">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Description & Culinary Overview</h2>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                {recipe.description}
                            </p>
                        </div>

                        {recipe.instructions && recipe.instructions.length > 0 && (
                            <div className="pt-4 border-t border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Preparation Steps</h2>
                                <ol className="space-y-4 list-none counter-reset-step">
                                    {recipe.instructions.map((step, idx) => (
                                        <li key={idx} className="flex gap-4 items-start text-sm sm:text-base text-gray-600">
                                            <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 font-bold rounded-full flex items-center justify-center text-xs mt-0.5">
                                                {idx + 1}
                                            </span>
                                            <p className="leading-relaxed">{step}</p>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Sourced Ingredients List */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-xs h-fit">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Required Ingredients</h2>
                        <ul className="space-y-3">
                            {(recipe.ingredients || ['Fresh components sourced locally']).map((ingredient, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-sm text-gray-600 pb-2.5 border-b border-gray-50 last:border-0">
                                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0" />
                                    <span>{ingredient}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* --- SECTION 3: REVIEWS & RATINGS BLOCK --- */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-xs space-y-6">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                        <h2 className="text-xl font-bold text-gray-900">Community Reviews & Ratings</h2>
                        <button type="button" className="text-sm font-bold text-orange-600 hover:text-orange-700">
                            Write a Review
                        </button>
                    </div>

                    {!recipe.reviews || recipe.reviews.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-6">No reviews have been written for this dish yet.</p>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {recipe.reviews.map((rev) => (
                                <div key={rev.id} className="py-4 first:pt-0 last:pb-0 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900">{rev.user}</h4>
                                            <div className="text-amber-400 text-xs mt-0.5">{'★'.repeat(rev.rating)}</div>
                                        </div>
                                        <span className="text-xs text-gray-400 font-medium">{rev.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">{rev.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* --- SECTION 4: RELATED RECOMMENDATIONS MATRIX --- */}
                {relatedItems.length > 0 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">You Might Also Enjoy</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedItems.map((item) => (
                                <Link
                                    key={item._id}
                                    href={`/recipes/${item._id}`}
                                    className="group flex flex-col bg-white rounded-xl border border-gray-100 shadow-xs hover:shadow-sm overflow-hidden h-[340px] transition-all"
                                >
                                    <div className="h-40 bg-gray-100 overflow-hidden relative">
                                        <img 
                                            src={item.imageUrl || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&auto=format&fit=crop&q=60"} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                        />
                                    </div>
                                    <div className="p-4 flex flex-col justify-between flex-1">
                                        <div>
                                            <span className="text-xs text-orange-600 font-bold capitalize">{item.category}</span>
                                            <h4 className="text-sm font-bold text-gray-900 mt-1 line-clamp-2 group-hover:text-orange-500 transition-colors">
                                                {item.name}
                                            </h4>
                                        </div>
                                        <div className="flex justify-between items-center mt-4">
                                            <span className="text-sm font-black text-gray-900">${item.price.toFixed(2)}</span>
                                            <span className="text-xs font-bold text-orange-600 bg-orange-50 group-hover:bg-orange-500 group-hover:text-white px-2.5 py-1.5 rounded-md transition-all">
                                                View Details →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
