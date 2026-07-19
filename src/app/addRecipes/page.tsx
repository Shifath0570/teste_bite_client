
'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSession } from '../lib/auth-client';

interface FormErrors {
    name?: string;
    category?: string;
    price?: string;
    description?: string;
    imageUrl?: string;
}

const CATEGORIES = [
    'Appetizers',
    'Main Course',
    'Desserts',
    'Beverages',
    'Breakfast',
    'Snacks',
];

export default function TasteBiteAddRecipe() {
    const router = useRouter();

    const { data: session, isPending } = useSession();
    const user = session?.user;

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        imageUrl: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form Validation
    const validateForm = (): boolean => {
        const tempErrors: FormErrors = {};

        if (!formData.name.trim()) {
            tempErrors.name = 'Recipe name is required';
        }
        if (!formData.category) {
            tempErrors.category = 'Please select a category';
        }
        if (!formData.price) {
            tempErrors.price = 'Price is required';
        } else if (isNaN(Number(formData.price)) || Number(formData.price) < 0) {
            tempErrors.price = 'Please enter a valid price amount';
        }
        if (!formData.description.trim()) {
            tempErrors.description = 'Description is required';
        } else if (formData.description.length < 10) {
            tempErrors.description = 'Description must be at least 10 characters';
        }
        if (!formData.imageUrl.trim()) {
            tempErrors.imageUrl = 'Image URL is required';
        } else if (!/^https?:\/\/.+/i.test(formData.imageUrl)) {
            tempErrors.imageUrl = 'Please enter a valid web image link (http/https)';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear field-specific error as user interacts
        const fieldName = name as keyof FormErrors;
        if (errors[fieldName]) {
            setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Client-side validation guard runs first
        if (!validateForm()) return;

        setIsLoading(true);

        // 2. Safely capture cleanly validated fields from React State along with authenticated session markers
        const payload = {
            name: formData.name.trim(),
            category: formData.category,
            price: Number(formData.price),
            description: formData.description.trim(),
            imageUrl: formData.imageUrl.trim(),
            userId: user?.id, // Removed the non-existent _id access to satisfy TypeScript types
            chefName: user?.name || 'Anonymous Chef',
            date: new Date()
        };

        console.log('Submitting payload:', payload);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SURVER_URL}/recipe`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            console.log(data);

            await new Promise((resolve) => setTimeout(resolve, 1500));

            setIsSuccess(true);

            // Reset form fields
            setFormData({
                name: '',
                category: '',
                price: '',
                description: '',
                imageUrl: '',
            });

            // Optional redirect after success
            setTimeout(() => {
                router.push('/manageRecipes'); // Redirect directly back to your listing configuration layout
            }, 2000);

        } catch (err) {
            console.error(err);
            alert('Failed to save recipe.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-orange-50/40 px-4 py-12 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-orange-100">

                {/* Header */}
                <div className="mb-8 border-b border-orange-100 pb-5">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">📝</span>
                        <div>
                            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                                Add New Recipe
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Fill out the details below to share your new culinary masterpiece on Taste<span className="text-orange-500 font-semibold">Bite</span>.
                            </p>
                        </div>
                    </div>
                </div>

                {isSuccess ? (
                    /* Success Alert View */
                    <div className="p-6 bg-emerald-50 rounded-xl text-center border border-emerald-100">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-3 text-2xl">
                            🍳
                        </div>
                        <h3 className="text-lg font-semibold text-emerald-900">Recipe Added Successfully!</h3>
                        <p className="mt-2 text-sm text-emerald-700">
                            Your recipe has been published. Redirecting to your library...
                        </p>
                    </div>
                ) : (
                    /* Form Content */
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Recipe Name */}
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Recipe Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Spaghetti Carbonara"
                                    className={
                                        errors.name
                                            ? 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 border-red-300 focus:ring-red-100 focus:border-red-500 transition-all'
                                            : 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 border-gray-200 focus:ring-orange-100 focus:border-orange-500 transition-all'
                                    }
                                />
                                {errors.name && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.name}</p>}
                            </div>

                            {/* Categories */}
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className={
                                        errors.category
                                            ? 'w-full px-4 py-2.5 rounded-lg border text-gray-900 focus:outline-none focus:ring-2 border-red-300 focus:ring-red-100 focus:border-red-500 bg-white transition-all'
                                            : 'w-full px-4 py-2.5 rounded-lg border text-gray-900 focus:outline-none focus:ring-2 border-gray-200 focus:ring-orange-100 focus:border-orange-500 bg-white transition-all'
                                    }
                                >
                                    <option value="" disabled hidden>Select a category</option>
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                                    ))}
                                </select>
                                {errors.category && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.category}</p>}
                            </div>

                            {/* Price */}
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Price ($)
                                </label>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="12.99"
                                    className={
                                        errors.price
                                            ? 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 border-red-300 focus:ring-red-100 focus:border-red-500 transition-all'
                                            : 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 border-gray-200 focus:ring-orange-100 focus:border-orange-500 transition-all'
                                    }
                                />
                                {errors.price && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.price}</p>}
                            </div>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1.5">
                                Recipe Image URL
                            </label>
                            <input
                                id="imageUrl"
                                name="imageUrl"
                                type="url"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                placeholder="https://images.unsplash.com/photo-example..."
                                className={
                                    errors.imageUrl
                                        ? 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 border-red-300 focus:ring-red-100 focus:border-red-500 transition-all'
                                        : 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 border-gray-200 focus:ring-orange-100 focus:border-orange-500 transition-all'
                                }
                            />
                            {errors.imageUrl && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.imageUrl}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
                                Description / Cooking Steps
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe how to prepare this amazing dish..."
                                className={
                                    errors.description
                                        ? 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 border-red-300 focus:ring-red-100 focus:border-red-500 transition-all resize-none'
                                        : 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 border-gray-200 focus:ring-orange-100 focus:border-orange-500 transition-all resize-none'
                                }
                            />
                            {errors.description && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.description}</p>}
                        </div>

                        {/* Form Action Controls */}
                        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-orange-100">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="w-full sm:w-auto px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors focus:outline-none text-center"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full sm:w-auto sm:ml-auto px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isLoading ? 'Publishing recipe...' : 'Publish Recipe'}
                            </button>
                        </div>

                    </form>
                )}
            </div>
        </div>
    );
}