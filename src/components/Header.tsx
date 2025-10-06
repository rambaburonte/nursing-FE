import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, LogIn } from "lucide-react";

const Style: React.FC = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=block');

      * {
        font-family: 'Inter', sans-serif;
        box-sizing: border-box;
      }

      /* Header */
      .header {
        position: sticky;
        top: 0;
        z-index: 50;
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        backdrop-filter: blur(8px);
        border-bottom: 1px solid rgba(209, 213, 219, 0.5);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }

      /* Logo */
      .logo {
        font-size: 1.75rem;
        font-weight: 800;
        color: #1e40af;
        letter-spacing: -0.02em;
        transition: color 0.3s ease;
      }
      .logo:hover {
        color: #2563eb;
      }

      /* Navigation Links */
      .nav-link {
        position: relative;
        font-size: 1rem;
        font-weight: 500;
        color: #1f2937;
        transition: color 0.3s ease;
      }
      .nav-link:hover {
        color: #2563eb;
      }
      .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #2563eb;
        border-radius: 1px;
        animation: slideIn 0.2s ease;
      }

      /* Register Button */
      .register-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        border-radius: 0.5rem;
        background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        color: #ffffff;
        transition: all 0.3s ease;
      }
      .register-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
      }

      /* Dropdown */
      .dropdown-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        border-radius: 0.5rem;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: #ffffff;
        transition: all 0.3s ease;
      }
      .dropdown-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
      }
      .dropdown-menu {
        animation: slideDown 0.2s ease-out;
        border-radius: 0.5rem;
        background: #ffffff;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        border: 1px solid #e5e7eb;
      }
      .dropdown-item {
        display: block;
        padding: 0.75rem 1.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #1f2937;
        transition: all 0.2s ease;
      }
      .dropdown-item:hover {
        background: #f1f5f9;
        color: #2563eb;
      }

      /* Mobile Menu */
      .mobile-menu {
        animation: slideIn 0.3s ease-out;
        background: #ffffff;
        border-top: 1px solid #e5e7eb;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      .mobile-nav-link {
        display: block;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        font-weight: 500;
        color: #1f2937;
        transition: all 0.2s ease;
      }
      .mobile-nav-link:hover {
        background: #f1f5f9;
        color: #2563eb;
      }
      .mobile-nav-link.active {
        color: #2563eb;
        font-weight: 600;
        position: relative;
      }
      .mobile-nav-link.active::after {
        content: '';
        position: absolute;
        bottom: 0.25rem;
        left: 1.5rem;
        width: calc(100% - 3rem);
        height: 2px;
        background: #2563eb;
      }
      .mobile-action-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        border-radius: 0.5rem;
        transition: all 0.3s ease;
      }

      /* Animations */
      @keyframes slideIn {
        from { transform: translateY(-10px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes slideDown {
        from { transform: translateY(-10px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `}
  </style>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Home", isRoute: true },
    { href: "/speakers", label: "Speakers", isRoute: true },
    { href: "/agenda", label: "Agenda", isRoute: true },
    { href: "/contact", label: "Contact", isRoute: true },
  ];

  return (
    <header className="header">
      <Style />
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="logo">
            Nursing Summit 2026
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`nav-link ${location.pathname === item.href ? 'active' : ''}`}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="nav-link"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/register"
              className="register-button"
              aria-label="Register for the Nursing Summit"
            >
              <LogIn size={16} /> Register
            </Link>

            {/* Abstract Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="dropdown-button"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                Abstract Submission <ChevronDown size={16} className={isDropdownOpen ? 'rotate-180' : ''} />
              </button>

              {isDropdownOpen && (
                <div className="dropdown-menu absolute right-0 mt-2 w-48 py-2 z-50">
                  <Link
                    to="/abstract-submission"
                    onClick={() => setIsDropdownOpen(false)}
                    className="dropdown-item"
                  >
                    Abstract Submission
                  </Link>
                  <Link
                    to="/sessions"
                    onClick={() => setIsDropdownOpen(false)}
                    className="dropdown-item"
                  >
                    Sessions
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-menu md:hidden">
          <nav className="py-4 space-y-2 px-4">
            {navItems.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`mobile-nav-link ${location.pathname === item.href ? 'active' : ''}`}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="mobile-nav-link"
                >
                  {item.label}
                </a>
              )
            )}

            <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="mobile-action-button bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                aria-label="Register for the Nursing Summit"
              >
                <LogIn size={16} /> Register
              </Link>
              <Link
                to="/abstract-submission"
                onClick={() => setIsMenuOpen(false)}
                className="mobile-action-button bg-gradient-to-r from-green-500 to-green-700 text-white"
              >
                Abstract Submission
              </Link>
              <Link
                to="/sessions"
                onClick={() => setIsMenuOpen(false)}
                className="mobile-action-button bg-gradient-to-r from-green-500 to-green-700 text-white"
              >
                Sessions
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;