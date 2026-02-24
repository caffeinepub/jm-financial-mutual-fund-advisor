import { Building2, Cpu, HeartPulse, Zap, Landmark, ArrowRight } from 'lucide-react';
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
}

const fundCards: FundCard[] = [
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
  Low: 'bg-forest-100 text-forest-700',
  Moderate: 'bg-gold-100 text-gold-800',
  High: 'bg-red-50 text-red-700',
};

interface FundCategoriesSectionProps {
  onInvestClick: () => void;
}

export default function FundCategoriesSection({ onInvestClick }: FundCategoriesSectionProps) {
  return (
    <section className="py-20 bg-forest-50">
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
            Carefully selected fund categories aligned with India's growth story. Each category is
            handpicked by Darshit Sheth based on 14 years of market expertise.
          </p>
        </div>

        {/* Fund Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fundCards.map(({ icon: Icon, title, subtitle, description, tags, riskLevel, returnRange }) => (
            <Card
              key={title}
              className="group flex flex-col border border-border hover:border-forest-400 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-card overflow-hidden"
            >
              {/* Card Top Accent */}
              <div className="h-1 w-full gold-shimmer" />

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-forest-100 group-hover:bg-forest-200 transition-colors">
                    <Icon className="w-6 h-6 text-forest-700" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${riskColors[riskLevel]}`}>
                      {riskLevel} Risk
                    </span>
                    <span className="text-xs text-gold-700 font-bold">{returnRange}</span>
                  </div>
                </div>
                <CardTitle className="font-display text-lg text-foreground">{title}</CardTitle>
                <CardDescription className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {subtitle}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col flex-1 pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs border-forest-200 text-forest-700 bg-forest-50"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  onClick={onInvestClick}
                  className="w-full bg-forest-700 hover:bg-forest-600 text-white font-semibold rounded-md group/btn transition-all duration-200"
                >
                  Invest Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground mt-10">
          * Past performance is not indicative of future results. Returns shown are indicative estimates only.
        </p>
      </div>
    </section>
  );
}
