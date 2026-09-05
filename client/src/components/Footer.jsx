import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-100 bg-[#FAF8FC] text-gray-600">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/shop" className="flex items-center gap-2">
              <img src="/favicon.svg" alt="1Fi" className="w-8 h-8" />
              <span className="text-xl font-bold text-[#121212]">1Fi</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              India&apos;s pioneering platform for purchasing smartphones with 0% interest EMI backed by your mutual fund portfolio.
            </p>
            <div className="flex items-center gap-2 flex-wrap text-[#6C28D9]">
              <span className="text-xs font-semibold bg-[#EFDAFF] px-2.5 py-1 rounded-full">
                AMFI Registered
              </span>
              <span className="text-xs font-semibold bg-[#EFDAFF] px-2.5 py-1 rounded-full">
                Bank-Grade Security
              </span>
            </div>
          </div>

          {/* Col 2: Marketplace */}
          <div>
            <h4 className="text-sm font-semibold text-[#121212] uppercase tracking-wider mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/shop" className="hover:text-[#6C28D9] transition-colors">
                  All Smartphones
                </Link>
              </li>
              <li>
                <Link to="/products/apple-iphone-16-pro" className="hover:text-[#6C28D9] transition-colors">
                  Apple iPhone 16 Pro
                </Link>
              </li>
              <li>
                <Link to="/products/samsung-galaxy-s24-ultra" className="hover:text-[#6C28D9] transition-colors">
                  Samsung Galaxy S24 Ultra
                </Link>
              </li>
              <li>
                <Link to="/products/oneplus-13" className="hover:text-[#6C28D9] transition-colors">
                  OnePlus 13
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: How It Works */}
          <div>
            <h4 className="text-sm font-semibold text-[#121212] uppercase tracking-wider mb-4">
              Why 1Fi
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="text-gray-500">Zero Liquidating Mutual Funds</li>
              <li className="text-gray-500">Uninterrupted Portfolio Compounding</li>
              <li className="text-gray-500">0% Interest &amp; Cashback Plans</li>
              <li className="text-gray-500">Instant Online Verification</li>
              <li className="text-gray-500">Zero Preclosure Fees</li>
            </ul>
          </div>

          {/* Col 4: Trust & Compliance */}
          <div>
            <h4 className="text-sm font-semibold text-[#121212] uppercase tracking-wider mb-4">
              Safety &amp; Compliance
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              Your mutual funds remain safely held in your existing folio. 1Fi facilitates lien-marking in compliance with SEBI &amp; RBI guidelines.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#6C28D9] hover:border-[#6C28D9] transition-all"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4" viewBox="0 0 19 19" fill="currentColor">
                  <use href="/icons.svg#x-icon" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#6C28D9] hover:border-[#6C28D9] transition-all"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" viewBox="0 0 19 19" fill="currentColor">
                  <use href="/icons.svg#github-icon" />
                </svg>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#6C28D9] hover:border-[#6C28D9] transition-all"
                aria-label="Discord"
              >
                <svg className="w-4 h-4" viewBox="0 0 20 19" fill="currentColor">
                  <use href="/icons.svg#discord-icon" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} 1Fi Technology Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-gray-800 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-800 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-800 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
