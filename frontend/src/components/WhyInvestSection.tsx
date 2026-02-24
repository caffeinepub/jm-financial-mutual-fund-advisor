import {
  TrendingUp,
  Shield,
  PiggyBank,
  BarChart3,
  Leaf,
  Clock,
  IndianRupee,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const benefits = [
  {
    icon: PiggyBank,
    title: 'SIP – Start Small, Grow Big',
    description:
      'Begin your investment journey with as little as ₹500/month through Systematic Investment Plans. Benefit from rupee cost averaging and the power of compounding over time.',
    tag: 'SIP',
    color: 'text-forest-600',
    bg: 'bg-forest-50',
  },
  {
    icon: IndianRupee,
    title: 'ELSS – Save Tax, Build Wealth',
    description:
      'Equity Linked Savings Schemes (ELSS) offer tax deductions up to ₹1.5 lakh under Section 80C of the Income Tax Act, while delivering superior long-term returns.',
    tag: 'Tax Saving',
    color: 'text-gold-700',
    bg: 'bg-gold-50',
  },
  {
    icon: Shield,
    title: 'SEBI Regulated & Transparent',
    description:
      'All mutual funds in India are regulated by SEBI (Securities and Exchange Board of India), ensuring investor protection, transparency, and fair practices.',
    tag: 'SEBI Regulated',
    color: 'text-forest-700',
    bg: 'bg-forest-50',
  },
  {
    icon: BarChart3,
    title: 'Diversification Across Sectors',
    description:
      'Spread your investments across equity, debt, and hybrid instruments. Reduce risk while maximizing returns through professionally managed diversified portfolios.',
    tag: 'Diversification',
    color: 'text-gold-700',
    bg: 'bg-gold-50',
  },
  {
    icon: TrendingUp,
    title: 'Long-Term Wealth Creation',
    description:
      'Equity mutual funds have historically delivered 12–15% CAGR over 10+ year horizons in India, significantly outperforming traditional savings instruments like FDs.',
    tag: 'High Returns',
    color: 'text-forest-600',
    bg: 'bg-forest-50',
  },
  {
    icon: Leaf,
    title: 'Sustainable & ESG Investing',
    description:
      'Invest in India\'s future through ESG (Environmental, Social, Governance) funds that align your portfolio with sustainable development goals and responsible businesses.',
    tag: 'ESG',
    color: 'text-gold-700',
    bg: 'bg-gold-50',
  },
  {
    icon: Clock,
    title: 'High Liquidity',
    description:
      'Unlike FDs or real estate, most mutual funds offer high liquidity. Redeem your investments within 1–3 business days, giving you financial flexibility when needed.',
    tag: 'Liquid',
    color: 'text-forest-600',
    bg: 'bg-forest-50',
  },
];

export default function WhyInvestSection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <img
          src="/assets/generated/growth-illustration.dim_800x500.png"
          alt=""
          className="w-full h-full object-cover object-left"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-gold-600 mb-3">
            Why Mutual Funds?
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Smart Investing for the{' '}
            <span className="text-primary">Indian Investor</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Mutual funds offer a powerful combination of professional management, diversification, and
            regulatory protection — making them the ideal investment vehicle for every Indian.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {benefits.map(({ icon: Icon, title, description, tag, color, bg }) => (
            <Card
              key={title}
              className="group border border-border hover:border-forest-300 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-card"
            >
              <CardContent className="p-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bg} mb-4`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <div className="mb-2">
                  <span className={`text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${bg} ${color}`}>
                    {tag}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-base text-foreground mb-2 leading-snug">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground">
            * Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.
          </p>
        </div>
      </div>
    </section>
  );
}
