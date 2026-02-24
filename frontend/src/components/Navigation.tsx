import { useState } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { Menu, X, TrendingUp, LayoutDashboard, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Advisor Dashboard', icon: LayoutDashboard },
  ];

  const scrollToForm = () => {
    setMobileOpen(false);
    const el = document.getElementById('lead-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else if (currentPath !== '/') {
      router.navigate({ to: '/' });
      setTimeout(() => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-forest-800/30 bg-forest-900/95 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gold-500 shadow-gold">
              <TrendingUp className="w-5 h-5 text-forest-900" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-base text-white tracking-wide">JM Financial</span>
              <span className="text-xs text-gold-400 font-medium tracking-wider uppercase">Mutual Fund Advisor</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  currentPath === href
                    ? 'bg-forest-700 text-gold-400'
                    : 'text-forest-200 hover:text-white hover:bg-forest-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={scrollToForm}
              className="bg-gold-500 hover:bg-gold-400 text-forest-900 font-semibold px-5 py-2 rounded-md shadow-gold transition-all duration-200 hover:shadow-lg"
            >
              Book Free Consultation
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2 rounded-md hover:bg-forest-800 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-forest-800 bg-forest-900 px-4 py-3 space-y-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              to={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                currentPath === href
                  ? 'bg-forest-700 text-gold-400'
                  : 'text-forest-200 hover:text-white hover:bg-forest-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
          <div className="pt-2 pb-1">
            <Button
              onClick={scrollToForm}
              className="w-full bg-gold-500 hover:bg-gold-400 text-forest-900 font-semibold rounded-md shadow-gold"
            >
              Book Free Consultation
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
