import Set "mo:core/Set";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

actor {
  type FundCategory = {
    #realEstate;
    #technology;
    #healthcare;
    #infrastructure;
    #renewableEnergy;
  };

  type InvestmentRange = {
    #range1;
    #range2;
    #range3;
    #range4;
    #range5;
  };

  type Lead = {
    id : Nat;
    fullName : Text;
    email : Text;
    phone : Text;
    city : Text;
    fundCategory : FundCategory;
    investmentRange : InvestmentRange;
    message : Text;
    timestamp : Int;
  };

  module Lead {
    public func compare(lead1 : Lead, lead2 : Lead) : Order.Order {
      Int.compare(lead1.timestamp, lead2.timestamp);
    };
  };

  var nextLeadId = 0;

  func createEmptyLeadsSet() : Set.Set<Lead> {
    Set.empty<Lead>();
  };

  let leadsSet = createEmptyLeadsSet();

  public shared ({ caller }) func submitLead(
    fullName : Text,
    email : Text,
    phone : Text,
    city : Text,
    fundCategory : FundCategory,
    investmentRange : InvestmentRange,
    message : Text,
  ) : async {
    id : Nat;
    timestamp : Int;
  } {
    let lead : Lead = {
      id = nextLeadId;
      fullName;
      email;
      phone;
      city;
      fundCategory;
      investmentRange;
      message;
      timestamp = Time.now();
    };

    leadsSet.add(lead);

    nextLeadId += 1;

    { id = lead.id; timestamp = lead.timestamp };
  };

  public query ({ caller }) func getAllLeads() : async [Lead] {
    leadsSet.values().toArray().sort();
  };

  public query ({ caller }) func getLeadsByCity(city : Text) : async [Lead] {
    leadsSet.values().toArray().sort().filter(
      func(lead) {
        Text.equal(lead.city, city);
      }
    );
  };

  public query ({ caller }) func getLeadsByFundCategory(fundCategory : FundCategory) : async [Lead] {
    leadsSet.values().toArray().sort().filter(
      func(lead) {
        lead.fundCategory == fundCategory;
      }
    );
  };

  public query ({ caller }) func getLeadById(id : Nat) : async Lead {
    switch (leadsSet.values().toArray().find(func(lead) { lead.id == id })) {
      case (null) { Runtime.trap("Lead not found") };
      case (?lead) { lead };
    };
  };

  public query ({ caller }) func getFundCategoryStatistics() : async [(FundCategory, Nat)] {
    let categories = Array.tabulate(
      5,
      func(i) {
        switch (i) {
          case (0) { #realEstate };
          case (1) { #technology };
          case (2) { #healthcare };
          case (3) { #infrastructure };
          case (_) { #renewableEnergy };
        };
      },
    );
    categories.map(
      func(category) {
        let count = leadsSet.values().toArray().filter(
          func(lead) {
            lead.fundCategory == category;
          }
        ).size();
        (category, count);
      }
    );
  };

  public query ({ caller }) func getInvestmentRangeStatistics() : async [(InvestmentRange, Nat)] {
    let ranges = Array.tabulate(
      5,
      func(i) {
        switch (i) {
          case (0) { #range1 };
          case (1) { #range2 };
          case (2) { #range3 };
          case (3) { #range4 };
          case (_) { #range5 };
        };
      },
    );
    ranges.map(
      func(range) {
        let count = leadsSet.values().toArray().filter(
          func(lead) {
            lead.investmentRange == range;
          }
        ).size();
        (range, count);
      }
    );
  };

  public query ({ caller }) func getLatestLeads(limit : Nat) : async [Lead] {
    let allLeads = leadsSet.values().toArray().sort();
    if (allLeads.size() <= limit) {
      return allLeads;
    };

    Array.tabulate(limit, func(i) { allLeads[i] });
  };

  public query ({ caller }) func getLeadCount() : async Nat {
    leadsSet.size();
  };
};
