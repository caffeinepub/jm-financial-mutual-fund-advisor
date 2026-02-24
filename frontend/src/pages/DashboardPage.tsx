import { useState } from 'react';
import { RefreshCw, Users, TrendingUp, BarChart3, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllLeads, useGetLeadCount, useGetFundCategoryStatistics } from '../hooks/useQueries';
import { FundCategory, InvestmentRange, type Lead } from '../backend';
import { useQueryClient } from '@tanstack/react-query';

const fundCategoryLabels: Record<FundCategory, string> = {
  [FundCategory.technology]: 'Technology',
  [FundCategory.healthcare]: 'Healthcare',
  [FundCategory.infrastructure]: 'Infrastructure',
  [FundCategory.realEstate]: 'Real Estate',
  [FundCategory.renewableEnergy]: 'Renewable Energy',
};

const investmentRangeLabels: Record<InvestmentRange, string> = {
  [InvestmentRange.range1]: '₹500 – ₹5K/mo',
  [InvestmentRange.range2]: '₹5K – ₹25K/mo',
  [InvestmentRange.range3]: '₹25K – ₹1L/mo',
  [InvestmentRange.range4]: '₹1L – ₹5L',
  [InvestmentRange.range5]: '₹5L+',
};

const fundCategoryColors: Record<FundCategory, string> = {
  [FundCategory.technology]: 'bg-forest-100 text-forest-800',
  [FundCategory.healthcare]: 'bg-gold-100 text-gold-800',
  [FundCategory.infrastructure]: 'bg-forest-200 text-forest-900',
  [FundCategory.realEstate]: 'bg-gold-200 text-gold-900',
  [FundCategory.renewableEnergy]: 'bg-forest-50 text-forest-700',
};

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  return new Date(ms).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  return new Date(ms).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();

  const { data: leads = [], isLoading, isError } = useGetAllLeads();
  const { data: leadCount } = useGetLeadCount();
  const { data: categoryStats = [] } = useGetFundCategoryStatistics();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['leads'] });
    queryClient.invalidateQueries({ queryKey: ['leadCount'] });
    queryClient.invalidateQueries({ queryKey: ['fundCategoryStats'] });
  };

  const filteredLeads = leads.filter((lead: Lead) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      lead.fullName.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.city.toLowerCase().includes(q) ||
      lead.phone.includes(q)
    );
  });

  // Top category by count
  const topCategory = categoryStats.reduce(
    (max, curr) => (curr[1] > max[1] ? curr : max),
    [FundCategory.technology, BigInt(0)] as [FundCategory, bigint]
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="bg-forest-900 border-b border-forest-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <img
                  src="/assets/generated/jm-advisor-logo.dim_300x100.png"
                  alt="JM Financial"
                  className="h-8 object-contain"
                />
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-2">
                Investor Leads Dashboard
              </h1>
              <p className="text-white/60 text-sm mt-1">
                Darshit Sheth · Certified Financial Advisor
              </p>
            </div>
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 self-start sm:self-auto"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <Card className="border-border shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-forest-600" />
                Total Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-display text-3xl font-bold text-foreground">
                {leadCount !== undefined ? Number(leadCount) : '—'}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Investor inquiries received</p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gold-600" />
                Top Fund Interest
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-display text-xl font-bold text-foreground">
                {topCategory[1] > BigInt(0)
                  ? fundCategoryLabels[topCategory[0]]
                  : '—'}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {topCategory[1] > BigInt(0) ? `${Number(topCategory[1])} inquiries` : 'No data yet'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-forest-600" />
                Fund Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5 mt-1">
                {categoryStats.map(([cat, count]) => (
                  <div key={cat} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{fundCategoryLabels[cat]}</span>
                    <span className="text-xs font-semibold text-foreground">{Number(count)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Table */}
        <Card className="border-border shadow-card">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="font-display text-xl text-foreground">All Investor Leads</CardTitle>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-md" />
                ))}
              </div>
            ) : isError ? (
              <div className="p-12 text-center">
                <p className="text-destructive font-medium">Failed to load leads.</p>
                <Button onClick={handleRefresh} variant="outline" className="mt-4">
                  Try Again
                </Button>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">
                  {searchQuery ? 'No leads match your search.' : 'No leads submitted yet.'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {!searchQuery && 'Leads will appear here once investors submit the consultation form.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      <TableHead className="font-semibold text-foreground whitespace-nowrap">Name</TableHead>
                      <TableHead className="font-semibold text-foreground whitespace-nowrap">Email</TableHead>
                      <TableHead className="font-semibold text-foreground whitespace-nowrap">Phone</TableHead>
                      <TableHead className="font-semibold text-foreground whitespace-nowrap">City</TableHead>
                      <TableHead className="font-semibold text-foreground whitespace-nowrap">Fund Interest</TableHead>
                      <TableHead className="font-semibold text-foreground whitespace-nowrap">Amount Range</TableHead>
                      <TableHead className="font-semibold text-foreground whitespace-nowrap">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead: Lead) => (
                      <TableRow key={Number(lead.id)} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium text-foreground whitespace-nowrap">
                          {lead.fullName}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                          {lead.email}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                          {lead.phone}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                          {lead.city}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`text-xs font-medium whitespace-nowrap ${fundCategoryColors[lead.fundCategory]}`}
                          >
                            {fundCategoryLabels[lead.fundCategory]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                          {investmentRangeLabels[lead.investmentRange]}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                          <div>{formatDate(lead.timestamp)}</div>
                          <div className="text-xs text-muted-foreground/60">{formatTime(lead.timestamp)}</div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {filteredLeads.length > 0 && (
          <p className="text-xs text-muted-foreground text-center mt-4">
            Showing {filteredLeads.length} of {leads.length} leads
          </p>
        )}
      </div>
    </div>
  );
}
