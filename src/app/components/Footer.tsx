"use client";

import Link from "next/link";
import { Icon } from "@gravity-ui/uikit";

import {
  LogoFacebook,
  LogoTelegram,
  LogoMicrosoftOffice,
  LogoLinkedin,
} from "@gravity-ui/icons";

const quickLinks = [
  { title: "Recipes", href: "/recipes" },
  { title: "Categories", href: "/categories" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

const supportLinks = [
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Help Center", href: "/help" },
  { title: "Terms & Conditions", href: "/terms" },
];

const socialLinks = [
  {
    icon: LogoFacebook,
    href: "https://facebook.com",
  },
  {
    icon: LogoTelegram,
    href: "https://instagram.com",
  },
  {
    icon: LogoMicrosoftOffice,
    href: "https://youtube.com",
  },
  {
    icon: LogoLinkedin,
    href: "https://linkedin.com",
  },
];

export default function Footer() {
  return (
    <footer className="border-t bg-default-100">

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}

          <div>

            <Link
              href="/"
              className="text-3xl font-bold text-success"
            >
              🍽️ TasteBite
            </Link>

            <p className="mt-5 text-default-600 leading-7">
              Discover delicious recipes, learn cooking tips,
              and share your favorite dishes with food lovers
              around the world.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-5 text-xl font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3">

              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-default-600 transition hover:text-success"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

          {/* Support */}

          <div>

            <h3 className="mb-5 text-xl font-semibold">
              Support
            </h3>

            <ul className="space-y-3">

              {supportLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-default-600 transition hover:text-success"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}

            </ul>

            <div className="mt-8">

              <h4 className="font-semibold">
                Contact
              </h4>

              <p className="mt-2 text-default-600">
                support@tastebite.com
              </p>

              <p className="text-default-600">
                +880 1234-567890
              </p>

            </div>

          </div>

          {/* Newsletter */}

          <div>

            <h3 className="mb-5 text-xl font-semibold">
              Newsletter
            </h3>

            <p className="mb-5 text-default-600">
              Subscribe to receive the latest recipes,
              cooking tips, and food inspiration.
            </p>

            {/* Social */}

            <div className="mt-8">

              <h4 className="mb-4 font-semibold">
                Follow Us
              </h4>

              <div className="flex gap-3">

                {socialLinks.map((social, index) => (

                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    className="flex h-11 w-11 items-center justify-center rounded-full border transition hover:bg-success hover:text-white"
                  >
                    <Icon
                      data={social.icon}
                      size={20}
                    />
                  </Link>

                ))}

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-14 border-t pt-6">

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

            <p className="text-default-500 text-sm">
              © {new Date().getFullYear()} TasteBite.
              All Rights Reserved.
            </p>

            <div className="flex gap-6 text-sm">

              <Link
                href="/privacy"
                className="hover:text-success"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="hover:text-success"
              >
                Terms
              </Link>

              <Link
                href="/contact"
                className="hover:text-success"
              >
                Contact
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}