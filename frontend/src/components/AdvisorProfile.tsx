import { Award, CheckCircle2, Globe, Mail, MapPin, Star, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const credentials = [
  'MF Certified by AMFI (Association of Mutual Funds in India)',
  'JM Financial Registered Mutual Fund Advisor',
  '4+ Years in Mutual Fund Investments',
  'Global Funds & International Markets Specialist',
];

const specializations = [
  'Equity Mutual Funds',
  'SIP Planning',
  'ELSS Tax Saving',
  'Global Funds',
  'Retirement Planning',
  'Goal-Based Investing',
  'Portfolio Rebalancing',
  'International Diversification',
];

export default function AdvisorProfile() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image & Stats */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-navy-200">
              <img
                src="/assets/generated/advisor-portrait.dim_600x600.png"
                alt="Darshit Sheth - Financial Advisor"
                className="w-full object-cover"
                onError={(e) => {
                  // Fallback to logo if portrait not available
                  (e.target as HTMLImageElement).src = '/assets/generated/jm-advisor-logo.dim_300x100.png';
                  (e.target as HTMLImageElement).className = 'w-full object-contain bg-navy-900 p-8';
                }}
              />
              {/* Blue overlay gradient at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-navy-900/60 to-transparent" />
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -bottom-6 -right-4 bg-card border border-border rounded-xl shadow-card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-gold-700" />
              </div>
              <div>
                <div className="font-display font-bold text-lg text-foreground">25+</div>
                <div className="text-xs text-muted-foreground">Clients</div>
              </div>
            </div>

            <div className="absolute -top-4 -left-4 bg-card border border-border rounded-xl shadow-card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center">
                <Star className="w-5 h-5 text-navy-700" />
              </div>
              <div>
                <div className="font-display font-bold text-lg text-foreground">12+</div>
                <div className="text-xs text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Right: Profile Details */}
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-gold-600 mb-3">
              Your Advisor
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Darshit Sheth
            </h2>
            <p className="text-primary font-semibold text-lg mb-1">MF Certified by AMFI</p>
            <p className="text-muted-foreground text-sm mb-4">
              JM Financial Advisor · Global Funds Specialist
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 mb-5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-navy-600 flex-shrink-0" />
                <a href="mailto:shethdarshit@live.com" className="hover:text-primary transition-colors">
                  shethdarshit@live.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-navy-600 flex-shrink-0" />
                <span>Vadodara, Gujarat, India</span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">
              With over 12 years of dedicated experience and 4+ years in mutual fund investments, Darshit Sheth
              has helped 25+ investors achieve their financial goals. His expertise spans equity, debt, hybrid,
              and exclusive global fund strategies — offering diversification beyond India for investors seeking
              international market exposure.
            </p>

            {/* AUM Highlight */}
            <div className="flex items-center gap-3 mb-6 p-3 rounded-lg bg-navy-50 border border-navy-200">
              <Globe className="w-5 h-5 text-navy-600 flex-shrink-0" />
              <div>
                <span className="font-display font-bold text-navy-800">₹2 Crore AUM</span>
                <span className="text-muted-foreground text-sm ml-2">Assets Under Management</span>
              </div>
            </div>

            {/* Credentials */}
            <div className="mb-6">
              <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-gold-600" /> Credentials
              </h3>
              <div className="space-y-2">
                {credentials.map((cred) => (
                  <div key={cred} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-navy-600 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{cred}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specializations */}
            <div>
              <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide mb-3">
                Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {specializations.map((spec) => (
                  <Badge
                    key={spec}
                    variant="secondary"
                    className="bg-navy-100 text-navy-800 border-navy-200 font-medium"
                  >
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
