"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars, Xmark, Person, Heart } from "@gravity-ui/icons";
import { signOut, useSession } from "../lib/auth-client";

export default function Navbar() {
    // Change this value after integrating authentication
    const isLoggedIn = false;

    const [isOpen, setIsOpen] = useState(false);

    const { data: session, isPending } = useSession()
    const user = session?.user;

    // console.log(user)

     const handleSignOut =async () =>{
            await signOut()
        }

    const guestLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Recipes", href: "/recipes" },
        { name: "Contact", href: "/contact" },
    ];


    const userLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Recipes", href: "/recipes" },
        { name: "Add Recipe", href: "/addRecipes" },
        { name: "My Recipes", href: "/manageRecipes" },
        { name: "Contact", href: "/contact" },
    ];

    const navLinks = user ? userLinks : guestLinks;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-lg shadow-sm">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">🍽️ TasteBite</h1>
                        <p className="text-xs text-gray-500">
                            Discover • Cook • Share
                        </p>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-gray-700 transition hover:text-green-600"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Side */}
                <div className="hidden items-center gap-3 lg:flex">

                    {user ? (
                        <>
                            <button onClick={handleSignOut} className="rounded-full border border-green-600 px-5 py-2 text-sm font-medium text-green-600 transition hover:bg-green-50">
                                Log Out
                            </button>

                            <button className="flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-white transition hover:bg-green-700">
                                <Person className="h-4 w-4" />
                                {user.name}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/auth/login"
                                className="rounded-full border border-green-600 px-5 py-2 text-sm font-medium text-green-600 transition hover:bg-green-50"
                            >
                                Login
                            </Link>

                            <Link
                                href="/auth/signup"
                                className="rounded-full bg-green-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Button */}
                <button
                    className="lg:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <Xmark className="h-7 w-7" />
                    ) : (
                        <Bars className="h-7 w-7" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="border-t bg-white lg:hidden">
                    <nav className="flex flex-col px-5 py-4">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg px-3 py-3 text-gray-700 transition hover:bg-green-50 hover:text-green-600"
                            >
                                {item.name}
                            </Link>
                        ))}

                        {isLoggedIn ? (
                            <div className="mt-4 space-y-3">
                                <Link
                                    href="/favorites"
                                    className="block rounded-lg bg-gray-100 px-4 py-3"
                                >
                                    ❤️ Favorites
                                </Link>

                                <Link
                                    href="/profile"
                                    className="block rounded-lg bg-green-600 px-4 py-3 text-center text-white"
                                >
                                    Profile
                                </Link>
                            </div>
                        ) : (
                            <div className="mt-4 space-y-3">
                                <Link
                                    href="/auth/login"
                                    className="block rounded-lg border border-green-600 px-4 py-3 text-center text-green-600"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/auth/signup"
                                    className="block rounded-lg bg-green-600 px-4 py-3 text-center text-white"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}