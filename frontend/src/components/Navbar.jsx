import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeProvider.jsx";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border py-4 shadow-sm">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary/90 to-secondary/80 flex items-center justify-center shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
            <span className="text-white font-bold text-lg">UA</span>
          </div>
          <span className="font-bold text-xl tracking-tight group-hover:text-primary transition-colors">UserAuth</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="relative text-sm font-medium hover:text-primary transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all">
                Dashboard
              </Link>
              <Link to="/profile" className="relative text-sm font-medium hover:text-primary transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all">
                Profile
              </Link>
              {isAdmin && (
                <Link to="/admin" className="relative text-sm font-medium hover:text-primary transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all">
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="relative text-sm font-medium hover:text-primary transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="relative text-sm font-medium hover:text-primary transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium shadow-sm hover:shadow-md">
                Register
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-muted border border-border hover:border-primary/30 hover:shadow-sm"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </button>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-muted border border-border hover:border-primary/30 hover:shadow-sm"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 6h18M3 18h18"></path></svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm animate-in slide-in-from-top">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="font-medium py-2 hover:text-primary transition-colors flex items-center space-x-2" onClick={closeMobileMenu}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                  <span>Dashboard</span>
                </Link>
                <Link to="/profile" className="font-medium py-2 hover:text-primary transition-colors flex items-center space-x-2" onClick={closeMobileMenu}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
                  <span>Profile</span>
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="font-medium py-2 hover:text-primary transition-colors flex items-center space-x-2" onClick={closeMobileMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0 1.32 4.24 2.5 2.5 0 0 0 1.98 3A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 3.96.44 2.5 2.5 0 0 0 2.08-2.93 2.5 2.5 0 0 0 1.38-4.24 2.5 2.5 0 0 0-1.38-4.22 2.5 2.5 0 0 0-2.08-2.93A2.5 2.5 0 0 0 12 4.5"/><circle cx="12" cy="12" r="2"/></svg>
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="font-medium py-2 hover:text-primary transition-colors text-left flex items-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="font-medium py-2 hover:text-primary transition-colors flex items-center space-x-2" onClick={closeMobileMenu}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
                  <span>Login</span>
                </Link>
                <Link to="/register" className="font-medium py-2 hover:text-primary transition-colors flex items-center space-x-2" onClick={closeMobileMenu}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
