import { TrendingUp, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(window.location.hostname || 'futureedge-investment');

  return (
    <footer className="bg-navy-950 text-white/70">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gold-500 shadow-gold">
                <TrendingUp className="w-5 h-5 text-navy-900" />
              </div>
              <div>
                <div className="font-display font-bold text-white text-base">FutureEdge Investment</div>
                <div className="text-xs text-gold-400 font-medium tracking-wider uppercase">Mutual Fund Advisor</div>
              </div>
            </div>
            {/* Tagline */}
            <div className="mb-4 pl-12">
              <span className="text-gold-400 font-semibold text-sm tracking-widest uppercase">
                Plan · Invest · Grow
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-sm">
              Darshit Sheth — MF Certified by AMFI with 12+ years of experience helping investors build wealth
              through strategic mutual fund investments, including exclusive global funds beyond India.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span>+91 97255 01285</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <a href="mailto:shethdarshit@live.com" className="hover:text-gold-400 transition-colors">
                  shethdarshit@live.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span>Vadodara, Gujarat, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'Why Invest', href: '/#why-invest' },
                { label: 'Fund Categories', href: '/#funds' },
                { label: 'Book Consultation', href: '/#lead-form' },
                { label: 'Advisor Dashboard', href: '/dashboard' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href.startsWith('/#') ? '/' : href}
                    className="text-sm hover:text-gold-400 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fund Types */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Fund Categories
            </h4>
            <ul className="space-y-2.5">
              {[
                'Global Funds',
                'Technology Funds',
                'Healthcare Funds',
                'Infrastructure Funds',
                'Real Estate Funds',
                'Renewable Energy Funds',
              ].map((fund) => (
                <li key={fund} className="text-sm">
                  {fund === 'Global Funds' ? (
                    <span className="text-gold-400 font-semibold">{fund} ✦ Unique</span>
                  ) : (
                    fund
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-white/40 text-center leading-relaxed">
            Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.
            Past performance is not indicative of future results. AMFI Registration No.: ARN-XXXXXX.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {year} Darshit Sheth · FutureEdge Investment. All rights reserved.
          </p>
          <p className="text-xs text-white/40 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-gold-500 fill-gold-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
