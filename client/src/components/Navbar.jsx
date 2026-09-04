import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-6xl px-4">
      <div className="flex items-center justify-between px-6 py-3 transition-all duration-300 rounded-2xl border border-[#6C28D9]/20 bg-white/95 backdrop-blur-md shadow-lg">
        {/* Logo */}
        <Link to="/shop" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#712CDC] via-[#8c27fc] to-[#5c22a5] flex items-center justify-center">
            <span className="text-white font-bold text-sm">1F</span>
          </div>
          <span className="text-xl font-semibold text-[#121212]">
            1Fi
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/shop"
            className="text-sm font-medium text-[#6C28D9] transition-colors duration-300"
          >
            Shop
          </Link>
          <span className="text-sm font-medium text-gray-500 cursor-default">
            How it Works
          </span>
          <span className="text-sm font-medium text-gray-500 cursor-default">
            Calculator
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/shop"
            className="hidden md:flex rounded-xl py-1.5 hover:bg-[#8852e1] bg-[#6C28D9] px-4 text-white font-semibold text-sm items-center gap-1 hover:border-b-[3px] hover:border-b-[#5300d9]/90 transition-all duration-100 ease-in-out"
          >
            Shop Now
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </Link>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100" aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
