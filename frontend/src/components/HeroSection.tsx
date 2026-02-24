import { ArrowDown, Award, Globe, Shield, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeroSectionProps {
  onCtaClick: () => void;
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-professional.dim_1920x1080.png"
          alt="Professional financial advisors and investors"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 gradient-hero opacity-92" />
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          {/* Tagline */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-2 text-gold-400 font-bold text-sm tracking-widest uppercase">
              <span className="w-8 h-0.5 bg-gold-500 rounded-full" />
              Plan · Invest · Grow
              <span className="w-8 h-0.5 bg-gold-500 rounded-full" />
            </span>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Badge className="bg-gold-500/20 text-gold-300 border border-gold-500/40 px-3 py-1 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
              <Shield className="w-3 h-3 mr-1.5" />
              MF Certified by AMFI
            </Badge>
            <Badge className="bg-white/10 text-white/80 border border-white/20 px-3 py-1 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
              <Award className="w-3 h-3 mr-1.5" />
              JM Financial Partner
            </Badge>
            <Badge className="bg-white/10 text-white/80 border border-white/20 px-3 py-1 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
              <Globe className="w-3 h-3 mr-1.5" />
              Global Funds Specialist
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Grow Your Wealth with{' '}
            <span className="text-gold-400 relative">
              Expert Guidance
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-500/60 rounded-full" />
            </span>
          </h1>

          {/* Advisor Name & Title */}
          <div className="mt-6 mb-6 pl-4 border-l-4 border-gold-500">
            <p className="text-gold-300 font-semibold text-lg tracking-wide">Darshit Sheth</p>
            <p className="text-white/80 text-base">MF Certified by AMFI · JM Financial Advisor</p>
            <p className="text-white/60 text-sm mt-1">
              <Star className="w-3.5 h-3.5 inline mr-1 text-gold-400" />
              12+ Years of Experience · 4+ Years in MF Investments
            </p>
          </div>

          {/* Description */}
          <p className="text-white/75 text-lg leading-relaxed mb-10 max-w-2xl">
            Helping investors build long-term wealth through carefully curated mutual fund portfolios —
            including exclusive global funds beyond India. From SIP planning to international diversification,
            your financial goals are my priority.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-6 mb-10">
            {[
              { value: '12+', label: 'Years Experience' },
              { value: '25+', label: 'Clients' },
              { value: '₹2 Crore', label: 'Assets Managed' },
              { value: 'AMFI', label: 'Certified Advisor' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-display font-bold text-gold-400">{value}</div>
                <div className="text-xs text-white/60 font-medium tracking-wide uppercase mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={onCtaClick}
              size="lg"
              className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold px-8 py-3 rounded-md shadow-gold hover:shadow-lg transition-all duration-200 text-base"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Start Investing Today
            </Button>
            <Button
              onClick={onCtaClick}
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 hover:border-white/60 font-semibold px-8 py-3 rounded-md transition-all duration-200 text-base backdrop-blur-sm"
            >
              <Globe className="w-5 h-5 mr-2" />
              Explore Global Funds
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ArrowDown className="w-5 h-5 text-white/40" />
      </div>
    </section>
  );
}
