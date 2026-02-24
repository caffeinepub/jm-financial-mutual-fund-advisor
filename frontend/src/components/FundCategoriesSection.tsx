import { Building2, Cpu, Globe, HeartPulse, Zap, Landmark, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FundCategory } from '../backend';

interface FundCard {
  category: FundCategory;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  riskLevel: 'Low' | 'Moderate' | 'High';
  returnRange: string;
  isHighlighted?: boolean;
}

const fundCards: FundCard[] = [
  {
    category: FundCategory.technology,
    icon: Globe,
    title: 'Global Funds',
    subtitle: 'International · Unique Offering',
    description:
      'Diversify beyond India with access to international mutual funds covering US, European, and Asian markets. Darshit Sheth\'s exclusive expertise in global funds gives you exposure to world-class companies like Apple, Microsoft, and more.',
    tags: ['International', 'US Markets', 'Global Diversification'],
    riskLevel: 'High',
    returnRange: '12–18% CAGR',
    isHighlighted: true,
  },
  {
    category: FundCategory.technology,
    icon: Cpu,
    title: 'Technology Funds',
    subtitle: 'Equity – Sectoral',
    description:
      'Invest in India\'s booming IT and tech sector. Benefit from the digital transformation wave with exposure to top IT companies like TCS, Infosys, and emerging tech startups.',
    tags: ['IT Sector', 'Digital India', 'High Growth'],
    riskLevel: 'High',
    returnRange: '15–20% CAGR',
  },
  {
    category: FundCategory.healthcare,
    icon: HeartPulse,
    title: 'Healthcare Funds',
    subtitle: 'Equity – Sectoral',
    description:
      'Capitalize on India\'s growing healthcare industry. From pharmaceuticals to hospitals, this fund provides exposure to a sector with strong long-term fundamentals.',
    tags: ['Pharma', 'Hospitals', 'Defensive'],
    riskLevel: 'Moderate',
    returnRange: '12–16% CAGR',
  },
  {
    category: FundCategory.infrastructure,
    icon: Landmark,
    title: 'Infrastructure Funds',
    subtitle: 'Equity – Thematic',
    description:
      'Ride India\'s infrastructure boom with investments in roads, railways, ports, and urban development. Aligned with the government\'s ₹111 lakh crore NIP initiative.',
    tags: ['NIP', 'Roads & Rail', 'Govt Backed'],
    riskLevel: 'Moderate',
    returnRange: '11–15% CAGR',
  },
  {
    category: FundCategory.realEstate,
    icon: Building2,
    title: 'Real Estate Funds',
    subtitle: 'REITs & Real Estate',
    description:
      'Gain exposure to India\'s real estate market through REITs and real estate-focused funds without the hassle of direct property ownership. Earn regular dividends.',
    tags: ['REITs', 'Dividend Income', 'Stable'],
    riskLevel: 'Moderate',
    returnRange: '9–13% CAGR',
  },
  {
    category: FundCategory.renewableEnergy,
    icon: Zap,
    title: 'Renewable Energy Funds',
    subtitle: 'Equity – ESG/Thematic',
    description:
      'Invest in India\'s clean energy future. Solar, wind, and green hydrogen companies are set to benefit from India\'s ambitious 500 GW renewable energy target by 2030.',
    tags: ['Solar', 'Wind Energy', 'ESG'],
    riskLevel: 'High',
    returnRange: '14–18% CAGR',
  },
];

const riskColors: Record<string, string> = {
  Low: 'bg-navy-100 text-navy-700',
  Moderate: 'bg-gold-100 text-gold-800',
  High: 'bg-red-50 text-red-700',
};

interface FundCategoriesSectionProps {
  onInvestClick: () => void;
}

export default function FundCategoriesSection({ onInvestClick }: FundCategoriesSectionProps) {
  return (
    <section className="py-20 bg-navy-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-gold-600 mb-3">
            Investment Options
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Explore Fund Categories
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Carefully selected fund categories aligned with India's growth story — and beyond. Each category is
            handpicked by Darshit Sheth based on 12 years of market expertise, including exclusive global funds.
          </p>
        </div>

        {/* Fund Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fundCards.map(({ icon: Icon, title, subtitle, description, tags, riskLevel, returnRange, isHighlighted }) => (
            <Card
              key={title}
              className={`group flex flex-col shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-card overflow-hidden ${
                isHighlighted
                  ? 'border-2 border-gold-500 ring-2 ring-gold-300/30'
                  : 'border border-border hover:border-navy-400'
              }`}
            >
              {/* Card Top Accent */}
              <div className={`h-1.5 w-full ${isHighlighted ? 'bg-gold-500' : 'bg-navy-600'}`} />

              {/* Unique Offering Badge for Global Funds */}
              {isHighlighted && (
                <div className="px-4 pt-3 pb-0">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase bg-gold-500/15 text-gold-700 border border-gold-400/40 px-2.5 py-1 rounded-full">
                    <Globe className="w-3 h-3" />
                    Unique Offering
                  </span>
                </div>
              )}

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-3">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl transition-colors ${
                    isHighlighted
                      ? 'bg-gold-100 group-hover:bg-gold-200'
                      : 'bg-navy-100 group-hover:bg-navy-200'
                  }`}>
                    <Icon className={`w-6 h-6 ${isHighlighted ? 'text-gold-700' : 'text-navy-700'}`} />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${riskColors[riskLevel]}`}>
                      {riskLevel} Risk
                    </span>
                    <span className="text-xs text-gold-700 font-bold">{returnRange}</span>
                  </div>
                </div>
                <CardTitle className={`font-display text-lg ${isHighlighted ? 'text-gold-800' : 'text-foreground'}`}>
                  {title}
                </CardTitle>
                <CardDescription className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                  {subtitle}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col flex-1 pt-0">
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        isHighlighted
                          ? 'bg-gold-50 text-gold-700 border border-gold-200'
                          : 'bg-navy-50 text-navy-700 border border-navy-200'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  onClick={onInvestClick}
                  size="sm"
                  className={`w-full font-semibold rounded-md transition-all duration-200 ${
                    isHighlighted
                      ? 'bg-gold-500 hover:bg-gold-400 text-navy-900 shadow-gold'
                      : 'bg-navy-700 hover:bg-navy-600 text-white'
                  }`}
                >
                  Invest Now
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-10 text-center">
          <p className="text-xs text-muted-foreground">
            * Returns are indicative based on historical performance. Mutual fund investments are subject to market risks.
          </p>
        </div>
      </div>
    </section>
  );
}
