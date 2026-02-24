import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { FundCategory, InvestmentRange, type Lead } from '../backend';

export function useGetAllLeads() {
  const { actor, isFetching } = useActor();

  return useQuery<Lead[]>({
    queryKey: ['leads'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLeads();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetLeadCount() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['leadCount'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getLeadCount();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFundCategoryStatistics() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[FundCategory, bigint]>>({
    queryKey: ['fundCategoryStats'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFundCategoryStatistics();
    },
    enabled: !!actor && !isFetching,
  });
}

export interface LeadFormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  fundCategory: FundCategory;
  investmentRange: InvestmentRange;
  message: string;
}

export function useSubmitLead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LeadFormData) => {
      if (!actor) throw new Error('Backend not available');
      return actor.submitLead(
        data.fullName,
        data.email,
        data.phone,
        data.city,
        data.fundCategory,
        data.investmentRange,
        data.message
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['leadCount'] });
      queryClient.invalidateQueries({ queryKey: ['fundCategoryStats'] });
    },
  });
}

export { FundCategory, InvestmentRange };
