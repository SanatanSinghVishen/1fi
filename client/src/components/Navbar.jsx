import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isShopActive = location.pathname.startsWith('/shop') || location.pathname.startsWith('/products');

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-6xl px-4">
      <div className="flex items-center justify-between px-6 py-3 transition-all duration-300 rounded-2xl border border-[#6C28D9]/20 bg-white/95 backdrop-blur-md shadow-lg shadow-[#6C28D9]/5">
        {/* Logo */}
        <Link to="/shop" className="flex items-center gap-2.5 group">
          <img
            src="/favicon.svg"
            alt="1Fi Logo"
            className="w-8 h-8 transition-transform duration-200 group-hover:scale-105"
          />
          <span className="text-xl font-bold text-[#121212] tracking-tight">
            1Fi
          </span>
          <span className="hidden sm:inline-block text-[11px] font-semibold text-[#6C28D9] bg-[#EFDAFF] px-2 py-0.5 rounded-full">
            Marketplace
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/shop"
            className={`text-sm font-semibold transition-colors duration-200 ${
              isShopActive ? 'text-[#6C28D9]' : 'text-gray-600 hover:text-[#6C28D9]'
            }`}
          >
            Shop
          </Link>
          <a
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('how-it-works');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-sm font-medium text-gray-500 hover:text-[#6C28D9] transition-colors"
          >
            How it Works
          </a>
          <span className="text-sm font-medium text-gray-400 cursor-default flex items-center gap-1">
            Calculator
            <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.2 rounded font-normal">Soon</span>
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/shop"
            className="hidden md:flex rounded-xl py-2 hover:bg-[#8852e1] bg-[#6C28D9] px-4 text-white font-semibold text-sm items-center gap-1.5 hover:border-b-[3px] hover:border-b-[#5300d9]/90 transition-all duration-100 ease-in-out shadow-sm shadow-[#6C28D9]/20"
          >
            Browse Products
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 rounded-2xl border border-[#6C28D9]/20 bg-white/98 backdrop-blur-md shadow-xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <Link
            to="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-[#6C28D9] px-3 py-2 rounded-xl bg-[#6C28D9]/10"
          >
            Shop Marketplace
          </Link>
          <a
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              const el = document.getElementById('how-it-works');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-sm font-medium text-gray-600 hover:text-[#6C28D9] px-3 py-2 rounded-xl hover:bg-gray-50"
          >
            How it Works
          </a>
          <div className="pt-2 border-t border-gray-100">
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 bg-[#6C28D9] text-white font-semibold text-sm"
            >
              Browse Products
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
