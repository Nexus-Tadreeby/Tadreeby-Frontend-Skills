// Header.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

export function Header({
  className = "fixed top-0 left-0 right-0 z-50 transition-all duration-300 top-3 sm:top-4",
  children,
  rightContent,
}) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const defaultRightContent = (
    <>
      <span className="text-sm text-gray-500 font-['Inter']">
        Have an account?
      </span>
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="text-sm font-bold text-blue-600 hover:underline font-['Inter'] cursor-pointer bg-transparent border-none"
      >
        Login
      </button>
    </>
  );

  const right = rightContent || defaultRightContent;

  return (
    <header className={className}>
      {/* Inner container – constrained, centered, and with the glass effect */}
      <div className="relative max-w-7xl mx-auto w-full bg-white/80 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-[35px] border border-white/30 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between w-full">
          {/* Logo – stays left */}
          <Link
            to="/"
            className="cursor-pointer transition-transform duration-300 hover:scale-105 flex-shrink-0"
          >
            <img src={logo} alt="Tadreeby Logo" className="h-7 sm:h-8 w-auto mb-1" />
          </Link>

          {/* Desktop Navigation – centered in the available space */}
          {children && (
            <nav
              aria-label="Primary"
              className="hidden min-[945px]:flex items-center gap-9 text-sm font-medium text-[#374151] flex-1 justify-center"
            >
              {children}
            </nav>
          )}

          {/* Right Content – stays right */}
          <div className="hidden min-[945px]:flex items-center gap-3 self-end flex-shrink-0">
            {right}
          </div>

          {/* Hamburger (mobile only) */}
          <div className="flex items-center gap-4">
            {children && (
              <button
                type="button"
                className="min-[945px]:hidden flex flex-col gap-1.5 p-2 ml-2 transition-transform duration-200 active:scale-95"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <span
                  aria-hidden="true"
                  className={`block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                    }`}
                />
                <span
                  aria-hidden="true"
                  className={`block w-6 h-0.5 bg-gray-600 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""
                    }`}
                />
                <span
                  aria-hidden="true"
                  className={`block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                    }`}
                />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown – now nicely attached to the glass box */}
        {children && isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-x border-b border-gray-200/50 shadow-xl min-[945px]:hidden animate-fade-in-up rounded-b-2xl overflow-hidden"
          >
            <div className="flex flex-col items-center gap-4 py-6 px-4 text-sm font-medium text-[#374151]">
              <nav aria-label="Mobile" className="flex flex-col items-center gap-4">
                {children}
              </nav>
              <div className="flex flex-col items-center gap-3 mt-2 border-t border-gray-200 pt-4 w-full">
                {right}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
