'use client';

import { authClient } from '@/app/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface FormErrors {
    email?: string;
    password?: string;
    global?: string;
}

export default function TasteBiteSignIn() {
    const router = useRouter();

    // Form State
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form Validation
    const validateForm = (): boolean => {
        const tempErrors: FormErrors = {};
        if (!formData.email) {
            tempErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Please enter a valid email address';
        }
        if (!formData.password) {
            tempErrors.password = 'Password is required';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = e.target.checked;
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

        // Clear field-specific and global errors as user changes text
        const fieldName = name as keyof FormErrors;
        if (errors[fieldName] || errors.global) {
            setErrors((prev) => ({ ...prev, [fieldName]: undefined, global: undefined }));
        }
    };

    // Auto-fills credentials for evaluation loops
    const handleDemoLogin = () => {
        setFormData({
            email: 'sharifulamin5555@gmail.com',
            password: 'shifath5555',
            rememberMe: true,
        });
        setErrors({});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;
        setIsLoading(true);

        const { email, password } = formData;

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/"
            });

            if (error) {
                setErrors({ global: error.message || "Invalid email or password combination." });
            } else {
                setIsSuccess(true);
                setTimeout(() => {
                    router.push("/");
                    router.refresh();
                }, 1200);
            }
        } catch (err) {
            console.error(err);
            setErrors({ global: "Something went wrong with the authentication server." });
        } finally {
            setIsLoading(false);
        }
    };

    // Social Provider Handler System 
    const handleSocialSignIn = async (provider: 'google' | 'facebook') => {
        setIsLoading(true);
        try {
            await authClient.signIn.social({
                provider,
                callbackURL: '/'
            });
        } catch (err) {
            console.error(err);
            setErrors({ global: `Failed to authenticate via ${provider}. Please try again.` });
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50/40 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-orange-100">

                {/* Brand Header */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 text-white text-2xl font-bold mb-3 shadow-md shadow-orange-500/20">
                        🍳
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Taste<span className="text-orange-500">Bite</span>
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Welcome back! Let s get cooking.
                    </p>
                </div>

                {/* Quick Demo Access Trigger Card */}
                {!isSuccess && (
                    <div className="p-4 bg-orange-50/60 rounded-xl border border-orange-100/70 text-center">
                        <p className="text-xs font-medium text-orange-800 mb-2">Want to explore the catalog instantly?</p>
                        <button
                            type="button"
                            onClick={handleDemoLogin}
                            className="w-full inline-flex justify-center items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-all shadow-xs cursor-pointer"
                        >
                            ⚡ Instant Demo Access
                        </button>
                    </div>
                )}

                {/* Global Error Banner */}
                {errors.global && (
                    <div className="p-3.5 bg-red-50 text-red-700 text-xs font-semibold rounded-lg border border-red-100 flex items-start gap-2 animate-fadeIn">
                        <span>⚠️</span>
                        <span>{errors.global}</span>
                    </div>
                )}

                {isSuccess ? (
                    /* Success Screen State */
                    <div className="p-6 bg-emerald-50 rounded-xl text-center border border-emerald-100">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-3 text-2xl">
                            ✓
                        </div>
                        <h3 className="text-lg font-semibold text-emerald-900">Successfully Signed In!</h3>
                        <p className="mt-2 text-sm text-emerald-700">
                            Redirecting you to your recipe feed...
                        </p>
                    </div>
                ) : (
                    /* SignIn Form */
                    <>
                        <form className="space-y-4" onSubmit={handleSubmit} noValidate>

                            {/* Email Address */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className={
                                        errors.email
                                            ? 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all border-red-300 focus:ring-red-100 focus:border-red-500 bg-red-50/10'
                                            : 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all border-gray-200 focus:ring-orange-100 focus:border-orange-500'
                                    }
                                />
                                {errors.email && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <a href="#" className="text-xs font-semibold text-orange-600 hover:text-orange-500">
                                        Forgot password?
                                    </a>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className={
                                        errors.password
                                            ? 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all border-red-300 focus:ring-red-100 focus:border-red-500 bg-red-50/10'
                                            : 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all border-gray-200 focus:ring-orange-100 focus:border-orange-500'
                                    }
                                />
                                {errors.password && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.password}</p>}
                            </div>

                            {/* Remember Me Toggle */}
                            <div className="flex items-center">
                                <input
                                    id="rememberMe"
                                    name="rememberMe"
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 accent-orange-500"
                                />
                                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-600 select-none cursor-pointer">
                                    Remember me on this device
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-lg transition-all font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                            >
                                {isLoading ? 'Verifying credentials...' : 'Sign In'}
                            </button>
                        </form>

                        {/* Social Login Separator */}
                        <div className="relative my-6 flex items-center justify-center">
                            <div className="absolute w-full border-t border-gray-100"></div>
                            <span className="relative bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Or Continue With
                            </span>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                disabled={isLoading}
                                onClick={() => handleSocialSignIn('google')}
                                className="inline-flex w-full justify-center items-center gap-2 py-2 px-4 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 shadow-2xs transition-all cursor-pointer disabled:opacity-50"
                            >
                                <span className="text-base">🌐</span> Google
                            </button>
                            <button
                                type="button"
                                disabled={isLoading}
                                onClick={() => handleSocialSignIn('facebook')}
                                className="inline-flex w-full justify-center items-center gap-2 py-2 px-4 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 shadow-2xs transition-all cursor-pointer disabled:opacity-50"
                            >
                                <span className="text-base text-blue-600">👤</span> Facebook
                            </button>
                        </div>

                        {/* Footer Sign Up Redirect */}
                        <p className="text-center text-sm text-gray-500 mt-6">
                            New to TasteBite?{' '}
                            <a href="/auth/signup" className="font-semibold text-orange-600 hover:text-orange-500 transition-colors">
                                Create an account
                            </a>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}