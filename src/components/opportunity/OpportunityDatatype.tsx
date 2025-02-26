export interface OpportunityData {
  primary_employer_name?: string;
  primary_division_name?: string;
  primary_subdivision_name?: string;
  primary_group_name?: string;
  primary_class_name?: string;
  manager_category?: string;
  opp_gap?: number;
  [key: string]: string | number | undefined; // Allow dynamic key access with this line
}
