'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Twitter, Github, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  const currentYear = 2025;

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <Image
                src="/logos/desktop.png"
                alt="AeroLynks"
                width={140}
                height={40}
              />
            </Link>
            <p className="text-sm text-foreground/70">
              Transforming ideas into innovative digital solutions for businesses worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-foreground/70 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-foreground/70 hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/works" className="text-foreground/70 hover:text-accent transition-colors">
                  Works
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/70 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Industries</h4>
            <ul className="space-y-2 text-sm">
              {['Startup', 'E-commerce', 'Healthcare', 'FinTech', 'Education', 'Construction'].map(
                (industry) => (
                  <li key={industry}>
                    <span className="text-foreground/70">{industry}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a target='_blank'
                href="https://www.linkedin.com/company/aerolynks-venture"
                className="text-foreground/70 hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a target='_blank'
                href="https://www.instagram.com/aerolynks_venture"
                className="text-foreground/70 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a target='_blank'
                href="https://www.facebook.com/profile.php?id=61589828883725"
                className="text-foreground/70 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
            <p>&copy; {currentYear} AeroLynks Venture. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
