import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Lead {
    id: bigint;
    city: string;
    fullName: string;
    email: string;
    message: string;
    fundCategory: FundCategory;
    timestamp: bigint;
    phone: string;
    investmentRange: InvestmentRange;
}
export enum FundCategory {
    healthcare = "healthcare",
    realEstate = "realEstate",
    renewableEnergy = "renewableEnergy",
    infrastructure = "infrastructure",
    technology = "technology"
}
export enum InvestmentRange {
    range1 = "range1",
    range2 = "range2",
    range3 = "range3",
    range4 = "range4",
    range5 = "range5"
}
export interface backendInterface {
    getAllLeads(): Promise<Array<Lead>>;
    getFundCategoryStatistics(): Promise<Array<[FundCategory, bigint]>>;
    getInvestmentRangeStatistics(): Promise<Array<[InvestmentRange, bigint]>>;
    getLatestLeads(limit: bigint): Promise<Array<Lead>>;
    getLeadById(id: bigint): Promise<Lead>;
    getLeadCount(): Promise<bigint>;
    getLeadsByCity(city: string): Promise<Array<Lead>>;
    getLeadsByFundCategory(fundCategory: FundCategory): Promise<Array<Lead>>;
    submitLead(fullName: string, email: string, phone: string, city: string, fundCategory: FundCategory, investmentRange: InvestmentRange, message: string): Promise<{
        id: bigint;
        timestamp: bigint;
    }>;
}
