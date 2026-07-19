"use client";

import { Button, Card, Input } from "@heroui/react";

export default function ContactPage() {
    return (
        <main>
            {/* Hero */}
            <section className="bg-gradient-to-r from-orange-500 to-red-500 py-20 text-white">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <h1 className="text-5xl font-bold md:text-6xl">
                        Contact TasteBite
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-orange-100">
                        We love to hear from you. Whether you have a question,
                        suggestion, or feedback, our team is here to help.
                    </p>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-20">
                <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2">

                    {/* Contact Form */}

                    <Card className="rounded-3xl p-8">

                        <h2 className="mb-6 text-3xl font-bold">
                            Send Us a Message
                        </h2>

                        <div className="space-y-5">

                            <Input
                                // label="Full Name"
                                placeholder="Enter your name"
                                // radius="lg"
                            />

                            <Input
                                type="email"
                                // label="Email Address"
                                placeholder="Enter your email"
                                // radius="lg"
                            />

                            <Input
                                // label="Subject"
                                placeholder="Message subject"
                                // radius="lg"
                            />

                            <textarea
                                rows={6}
                                placeholder="Write your message..."
                                className="w-full rounded-xl border border-default-300 bg-transparent px-4 py-3 outline-none transition focus:border-warning focus:ring-2 focus:ring-warning/20"
                            />

                            <button
                                color="warning"
                                // size="lg"
                                className="w-full"
                            >
                                Send Message
                            </button>

                        </div>

                    </Card>

                    {/* Contact Info */}

                    <div className="space-y-6">

                        <Card className="rounded-3xl p-6">
                            <h3 className="text-2xl font-bold">
                                📍 Address
                            </h3>

                            <p className="mt-3 text-default-600">
                                TasteBite Headquarters
                                <br />
                                Chattogram, Bangladesh
                            </p>
                        </Card>

                        <Card className="rounded-3xl p-6">
                            <h3 className="text-2xl font-bold">
                                📧 Email
                            </h3>

                            <p className="mt-3 text-default-600">
                                support@tastebite.com
                            </p>
                        </Card>

                        <Card className="rounded-3xl p-6">
                            <h3 className="text-2xl font-bold">
                                📞 Phone
                            </h3>

                            <p className="mt-3 text-default-600">
                                +880 1234-567890
                            </p>
                        </Card>

                        <Card className="rounded-3xl p-6">
                            <h3 className="text-2xl font-bold">
                                🕒 Working Hours
                            </h3>

                            <p className="mt-3 text-default-600">
                                Monday - Friday
                                <br />
                                9:00 AM – 6:00 PM
                            </p>
                        </Card>

                    </div>

                </div>
            </section>

            {/* FAQ */}

            <section className="bg-default-50 py-20">
                <div className="mx-auto max-w-4xl px-6">

                    <h2 className="mb-12 text-center text-4xl font-bold">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-5">

                        <Card className="rounded-2xl p-6">
                            <h3 className="font-semibold text-xl">
                                How can I submit a recipe?
                            </h3>

                            <p className="mt-3 text-default-600">
                                Sign in to your account and click Add Recipe from your dashboard.
                            </p>
                        </Card>

                        <Card className="rounded-2xl p-6">
                            <h3 className="font-semibold text-xl">
                                Is TasteBite free?
                            </h3>

                            <p className="mt-3 text-default-600">
                                Yes. Anyone can explore recipes and create an account for free.
                            </p>
                        </Card>

                        <Card className="rounded-2xl p-6">
                            <h3 className="font-semibold text-xl">
                                How do I contact support?
                            </h3>

                            <p className="mt-3 text-default-600">
                                Send us a message using the contact form or email us at
                                support@tastebite.com.
                            </p>
                        </Card>

                    </div>

                </div>
            </section>

            {/* Map */}

            <section className="py-20">
                <div className="mx-auto max-w-7xl px-6">

                    <h2 className="mb-10 text-center text-4xl font-bold">
                        Find Us
                    </h2>

                    <div className="flex h-[450px] items-center justify-center rounded-3xl border bg-default-100">

                        <div className="text-center">

                            <div className="text-6xl">
                                🗺️
                            </div>

                            <h3 className="mt-4 text-2xl font-bold">
                                Google Map
                            </h3>

                            <p className="mt-2 text-default-500">
                                Replace this section with your Google Maps iframe.
                            </p>

                        </div>

                    </div>

                </div>
            </section>
        </main>
    );
}