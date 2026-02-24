import { Globe, TrendingUp, BarChart3, Shield, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GlobalFundsSectionProps {
  onCtaClick?: () => void;
}

const differentiators = [
  {
    icon: Globe,
    title: 'International Market Access',
    description:
      'Invest in world-class companies like Apple, Microsoft, Amazon, and more through carefully selected international mutual funds — all from India.',
  },
  {
    icon: BarChart3,
    title: 'True Portfolio Diversification',
    description:
      'Reduce concentration risk by spreading investments across US, European, and Asian markets. When Indian markets dip, global holdings can provide stability.',
  },
  {
    icon: TrendingUp,
    title: 'USD-Denominated Growth',
    description:
      'Benefit from currency appreciation alongside market returns. USD-denominated assets offer a natural hedge against INR depreciation over the long term.',
  },
  {
    icon: Shield,
    title: 'Expert-Guided Selection',
    description:
      'Darshit Sheth\'s specialized expertise in global funds ensures you access only the best-performing international schemes suited to your risk profile.',
  },
];

export default function GlobalFundsSection({ onCtaClick }: GlobalFundsSectionProps) {
  return (
    <section className="py-20 gradient-blue-section relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-navy-400/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          {/* Tagline */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-0.5 bg-gold-500 rounded-full" />
            <span className="text-gold-400 font-bold text-sm tracking-widest uppercase">
              Plan · Invest · Grow
            </span>
            <span className="w-10 h-0.5 bg-gold-500 rounded-full" />
          </div>

          {/* Unique Badge */}
          <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-400/40 text-gold-300 text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-5">
            <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
            Unique Investment Strategy
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            Global Funds{' '}
            <span className="text-gold-400 relative">
              Beyond India
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-500/50 rounded-full" />
            </span>
          </h2>

          <p className="text-white/70 text-lg leading-relaxed">
            Most advisors limit you to domestic markets. Darshit Sheth's exclusive expertise unlocks
            international mutual funds — giving your portfolio global reach, currency diversification,
            and access to the world's fastest-growing companies.
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {differentiators.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:bg-white/12 hover:border-gold-400/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-500/20 border border-gold-400/30 flex items-center justify-center mb-4 group-hover:bg-gold-500/30 transition-colors">
                <Icon className="w-6 h-6 text-gold-400" />
              </div>
              <h3 className="font-display font-semibold text-white text-base mb-2 leading-snug">
                {title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <Globe className="w-5 h-5 text-gold-400" />
              <span className="text-gold-400 font-bold text-sm tracking-wider uppercase">
                Exclusive Offering
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
              Ready to Invest Globally?
            </h3>
            <p className="text-white/60 text-sm">
              Book a free consultation and discover how global funds can transform your portfolio.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Button
              onClick={onCtaClick}
              size="lg"
              className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold px-8 rounded-md shadow-gold hover:shadow-lg transition-all duration-200"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Start with Global Funds
            </Button>
            <Button
              onClick={onCtaClick}
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold px-6 rounded-md transition-all duration-200"
            >
              Learn More
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
