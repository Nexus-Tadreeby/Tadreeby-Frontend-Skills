import { Link, useLocation } from "react-router-dom";

export function Footer() {
  const location = useLocation();

  // Smooth scroll with header offset
  const scrollToSection = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 80; // increased to match the anchor's scrollMarginTop
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <footer>
        {location.pathname !== "/" && (
          <div className="text-center py-5 text-xs text-gray-400 flex items-center justify-center gap-4 font-['Inter']">
            <span>© 2026 Tadreeby. All rights reserved.</span>
            <Link
              to="/terms-privacy"
              className="hover:underline hover:text-[#1677FF]"
            >
              Terms of Service
            </Link>
            <span aria-hidden="true">|</span>
            <Link
              to="/terms-privacy"
              className="hover:underline hover:text-[#1677FF]"
            >
              Privacy Policy
            </Link>
            <span aria-hidden="true">|</span>
            <Link to="#" className="hover:underline hover:text-[#1677FF]">
              Contact
            </Link>
          </div>
        )}

        {/* Landing Page Footer */}
        {location.pathname === "/" && (
          <div className="max-w-[1200px] mx-auto my-10">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="col-span-1">
                <div>
                  <picture>
                    <img
                      src="/assets/logo.svg"
                      alt="Tadreeby Logo"
                      width="47"
                      height="30"
                    />
                  </picture>
                </div>
                <p className="mt-4 text-[14px] leading-[1.55] text-[#6B7280] max-w-[280px]">
                  Smart Field Training & Internship Management Platform for
                  students, universities, and companies.
                </p>
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-[#111827]">
                  Platform
                </h2>
                <ul className="mt-4 space-y-3 text-[14px] text-[#6B7280]">
                  <li>
                    <a
                      href="#features"
                      onClick={scrollToSection("features")}
                      className="hover:underline hover:text-[#1677FF] cursor-pointer transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#how-it-works"
                      onClick={scrollToSection("how-it-works")}
                      className="hover:underline hover:text-[#1677FF] cursor-pointer transition-colors"
                    >
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline transition-colors">
                      About Us
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-[#111827]">
                  Quick Links
                </h2>
                <ul className="mt-4 space-y-3 text-[14px] text-[#6B7280]">
                  <li>
                    <a href="#" className="hover:underline">
                      Students
                    </a>
                  </li>
                  <li>
                    <a
                      href="#universities"
                      onClick={scrollToSection("universities")}
                      className="hover:underline hover:text-[#1677FF] cursor-pointer"
                    >
                      Universities
                    </a>
                  </li>
                  <li>
                    <a
                      href="#companies"
                      onClick={scrollToSection("companies")}
                      className="hover:underline hover:text-[#1677FF] cursor-pointer"
                    >
                      Companies
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-[#111827]">Legal</h2>
                <ul className="mt-4 space-y-3 text-[14px] text-[#6B7280]">
                  <li>
                    <Link
                      to="/terms-privacy#part-1"
                      className="hover:underline hover:text-[#1677FF]"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms-privacy#part-2"
                      className="hover:underline hover:text-[#1677FF]"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-[#111827]">
                  Contact
                </h2>
                <div className="mt-4 space-y-3 text-[14px] text-[#6B7280]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#FFEDD4] rounded-full flex items-center justify-center">
                      <img
                        src="/assets/contact/email.svg"
                        className="h-4 w-auto"
                        alt="email-icon"
                      />
                    </div>
                    <span>info@tadreeby.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#DBEAFE] rounded-full flex items-center justify-center">
                      <img
                        src="/assets/contact/linkedin.svg"
                        className="h-3 w-auto"
                        alt="linkedin-icon"
                      />
                    </div>
                    <span>Tadreeby | تدريبي</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                      <img
                        src="/assets/contact/wa.svg"
                        className="h-3 w-auto"
                        alt="wa-icon"
                      />
                    </div>
                    <span>+970 567 294 381</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-6 border-t border-gray-200 text-center text-[13px] text-[#6B7280]">
              © 2026 Tadreeby. All rights reserved.
            </div>
          </div>
        )}
      </footer>

      {/* Footer */}
      {/* <footer className="bg-[#FAFBFC] py-[72px] px-4">
       
      </footer> */}
    </>
  );
}
