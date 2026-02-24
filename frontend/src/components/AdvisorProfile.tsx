import { Award, CheckCircle2, Star, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const credentials = [
  'Certified Financial Planner (CFP)',
  'AMFI Registered Mutual Fund Distributor',
  'SEBI Registered Investment Advisor',
  'Chartered Wealth Manager (CWM)',
];

const specializations = [
  'Equity Mutual Funds',
  'SIP Planning',
  'ELSS Tax Saving',
  'Retirement Planning',
  'Goal-Based Investing',
  'Portfolio Rebalancing',
];

export default function AdvisorProfile() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image & Stats */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/assets/generated/jm-advisor-logo.dim_300x100.png"
                alt="JM Financial - Darshit Sheth"
                className="w-full object-contain bg-forest-900 p-8"
              />
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -bottom-6 -right-4 bg-card border border-border rounded-xl shadow-card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-gold-700" />
              </div>
              <div>
                <div className="font-display font-bold text-lg text-foreground">150+</div>
                <div className="text-xs text-muted-foreground">Managing Clients</div>
              </div>
            </div>

            <div className="absolute -top-4 -left-4 bg-card border border-border rounded-xl shadow-card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center">
                <Star className="w-5 h-5 text-forest-700" />
              </div>
              <div>
                <div className="font-display font-bold text-lg text-foreground">14+</div>
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
            <p className="text-primary font-semibold text-lg mb-1">Certified Financial Advisor</p>
            <p className="text-muted-foreground text-sm mb-6">
              Indian Market Specialist · JM Financial Partner
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              With over 14 years of dedicated experience in the Indian mutual fund industry, Darshit Sheth
              has helped hundreds of investors across India achieve their financial goals. His expertise
              spans equity, debt, and hybrid fund strategies tailored to individual risk profiles and
              investment horizons.
            </p>

            {/* Credentials */}
            <div className="mb-6">
              <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-gold-600" /> Credentials
              </h3>
              <div className="space-y-2">
                {credentials.map((cred) => (
                  <div key={cred} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0" />
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
                    className="bg-forest-100 text-forest-800 border-forest-200 font-medium"
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
