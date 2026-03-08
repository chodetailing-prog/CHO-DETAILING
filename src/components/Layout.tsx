import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Instagram, Youtube, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
  }, [location.pathname, location.hash]);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "PORTFOLIO", path: "/portfolio" },
    { 
      name: "SERVICES", 
      path: "/services",
      dropdown: [
        { name: "Interior Detail", path: "/services/interior" },
        { name: "Paint Correction", path: "/services/paint" },
        { name: "Ceramic Coating", path: "/services/ceramic" },
        { name: "Premium Hand Wash", path: "/services/signature" },
      ]
    },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl font-bold tracking-widest uppercase"
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            CHO DETAILING
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div 
                key={link.path} 
                className="relative group"
                onMouseEnter={() => link.dropdown && setIsServicesDropdownOpen(true)}
                onMouseLeave={() => link.dropdown && setIsServicesDropdownOpen(false)}
              >
                {link.dropdown ? (
                  <div className="flex items-center gap-1 cursor-pointer">
                    <span
                      className={cn(
                        "text-sm font-medium tracking-widest transition-colors hover:text-black/60",
                        location.pathname.startsWith(link.path) ? "text-black" : "text-black/40"
                      )}
                    >
                      {link.name}
                    </span>
                    <ChevronDown size={14} className={cn("transition-transform duration-200 text-black/40", isServicesDropdownOpen && "rotate-180")} />
                    
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isServicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white border border-black/5 shadow-xl py-4 z-50 rounded-lg overflow-hidden"
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className="block px-6 py-3 text-sm font-medium tracking-widest text-black/60 hover:text-black hover:bg-black/5 transition-colors"
                              onClick={() => setIsServicesDropdownOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    onClick={(e) => {
                      if (link.path === "/" && location.pathname === "/") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className={cn(
                      "text-sm font-medium tracking-widest transition-colors hover:text-black/60",
                      location.pathname === link.path ? "text-black" : "text-black/40"
                    )}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="flex items-center gap-4 ml-4 pl-8 border-l border-black/10">
              <a 
                href="https://www.instagram.com/cho.detailing/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-black/40 hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-black/40 hover:text-black transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-2xl font-light tracking-widest overflow-y-auto max-h-[70vh] pb-12">
              {navLinks.map((link) => (
                <div key={link.path} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    {link.dropdown ? (
                      <span
                        className={cn(
                          "transition-colors",
                          location.pathname.startsWith(link.path) ? "text-black font-medium" : "text-black/40"
                        )}
                        onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                      >
                        {link.name}
                      </span>
                    ) : (
                      <Link
                        to={link.path}
                        className={cn(
                          "transition-colors",
                          location.pathname === link.path ? "text-black font-medium" : "text-black/40"
                        )}
                      >
                        {link.name}
                      </Link>
                    )}
                    {link.dropdown && (
                      <button 
                        onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                        className="p-2 text-black/40"
                      >
                        <ChevronDown size={24} className={cn("transition-transform duration-200", isServicesDropdownOpen && "rotate-180")} />
                      </button>
                    )}
                  </div>
                  
                  {link.dropdown && (
                    <AnimatePresence>
                      {isServicesDropdownOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="flex flex-col gap-4 pl-6 overflow-hidden"
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className="text-lg text-black/40 hover:text-black transition-colors"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsServicesDropdownOpen(false);
                              }}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-8 mt-4 pt-8 border-t border-black/10">
                <a 
                  href="https://www.instagram.com/cho.detailing/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-black/40 hover:text-black transition-colors"
                >
                  <Instagram size={28} />
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-black/40 hover:text-black transition-colors"
                >
                  <Youtube size={32} />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/10 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold tracking-widest mb-2">CHO DETAILING</h2>
            <p className="text-sm text-black/50">프리미엄 하이엔드 자동차 디테일링</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/cho.detailing/" target="_blank" rel="noopener noreferrer" className="text-black/50 hover:text-black transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-black/50 hover:text-black transition-colors">
              <Youtube size={20} />
            </a>
          </div>

          <div className="text-sm text-black/50 text-center md:text-right">
            <p>© {new Date().getFullYear()} CHO DETAILING. All rights reserved.</p>
            <Link to="/admin" className="hover:text-black transition-colors mt-2 inline-block">Admin Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
