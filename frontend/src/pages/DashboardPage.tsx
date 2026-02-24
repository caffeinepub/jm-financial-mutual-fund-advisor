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
  [InvestmentRange.range1]: '₹500–₹5K/mo',
  [InvestmentRange.range2]: '₹5K–₹25K/mo',
  [InvestmentRange.range3]: '₹25K–₹1L/mo',
  [InvestmentRange.range4]: '₹1L–₹5L Lump',
  [InvestmentRange.range5]: '₹5L+ HNW',
};

const fundCategoryColors: Record<FundCategory, string> = {
  [FundCategory.technology]: 'bg-navy-100 text-navy-800',
  [FundCategory.healthcare]: 'bg-green-100 text-green-800',
  [FundCategory.infrastructure]: 'bg-orange-100 text-orange-800',
  [FundCategory.realEstate]: 'bg-purple-100 text-purple-800',
  [FundCategory.renewableEnergy]: 'bg-teal-100 text-teal-800',
};

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function DashboardPage() {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  const { data: leads = [], isLoading: leadsLoading } = useGetAllLeads();
  const { data: leadCount = BigInt(0), isLoading: countLoading } = useGetLeadCount();
  const { data: categoryStats = [], isLoading: statsLoading } = useGetFundCategoryStatistics();

  const filteredLeads = leads.filter((lead: Lead) => {
    const q = search.toLowerCase();
    return (
      lead.fullName.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.city.toLowerCase().includes(q) ||
      fundCategoryLabels[lead.fundCategory].toLowerCase().includes(q)
    );
  });

  const topCategory = categoryStats.reduce(
    (best, [cat, count]) => (count > best.count ? { cat, count } : best),
    { cat: FundCategory.technology, count: BigInt(0) }
  );

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['leads'] });
    queryClient.invalidateQueries({ queryKey: ['leadCount'] });
    queryClient.invalidateQueries({ queryKey: ['fundCategoryStatistics'] });
  };

  return (
    <div className="min-h-screen bg-navy-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Advisor Dashboard
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage and review all consultation requests
            </p>
          </div>
          <Button
            onClick={handleRefresh}
            variant="outline"
            className="flex items-center gap-2 border-navy-300 text-navy-700 hover:bg-navy-100"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <Card className="border-navy-200 shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-navy-600" />
                Total Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              {countLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="font-display text-3xl font-bold text-foreground">
                  {leadCount.toString()}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-navy-200 shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gold-600" />
                Top Fund Interest
              </CardTitle>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <div className="font-display text-xl font-bold text-foreground">
                  {fundCategoryLabels[topCategory.cat]}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-navy-200 shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-navy-600" />
                Category Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Skeleton className="h-8 w-full" />
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {categoryStats.map(([cat, count]) => (
                    <span
                      key={cat}
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${fundCategoryColors[cat]}`}
                    >
                      {fundCategoryLabels[cat]}: {count.toString()}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Leads Table */}
        <Card className="border-navy-200 shadow-card">
          <CardHeader className="border-b border-navy-100 pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <CardTitle className="font-display text-lg text-foreground">
                Consultation Requests
              </CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 border-navy-200 focus:border-navy-400"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {leadsLoading ? (
              <div className="p-6 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No leads found</p>
                <p className="text-sm mt-1">
                  {search ? 'Try a different search term.' : 'Consultation requests will appear here.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-navy-50 hover:bg-navy-50">
                      <TableHead className="font-semibold text-navy-700">Name</TableHead>
                      <TableHead className="font-semibold text-navy-700">Contact</TableHead>
                      <TableHead className="font-semibold text-navy-700">City</TableHead>
                      <TableHead className="font-semibold text-navy-700">Fund Category</TableHead>
                      <TableHead className="font-semibold text-navy-700">Investment Range</TableHead>
                      <TableHead className="font-semibold text-navy-700">Submitted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead: Lead) => (
                      <TableRow key={lead.id.toString()} className="hover:bg-navy-50/50">
                        <TableCell className="font-medium text-foreground">
                          {lead.fullName}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-foreground">{lead.email}</div>
                          <div className="text-xs text-muted-foreground">{lead.phone}</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{lead.city}</TableCell>
                        <TableCell>
                          <Badge className={`text-xs font-medium ${fundCategoryColors[lead.fundCategory]}`}>
                            {fundCategoryLabels[lead.fundCategory]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {investmentRangeLabels[lead.investmentRange]}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatTimestamp(lead.timestamp)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
