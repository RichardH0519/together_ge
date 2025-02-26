import { useEffect, useState } from "react";
import PageContent from "../reusable/PageContent";
import OpportunityTable from "./OpportunityTable"; // Adjust the import path accordingly
import useApiRequest from "../reusable/ApiRequest";
import { OccupationDatatype } from "../salary_comparator/OccupationDatatype";

const OpportunityContent = () => {
  const { data, loading, error } = useApiRequest("OccupationList");
  const [filteredData, setFilteredData] = useState<OccupationDatatype[]>([]);
  const [searchWord, setSearchWord] = useState("");

  // Effect to filter data based on search word
  useEffect(() => {
    if (searchWord) {
      setFilteredData(
        data.filter((opportunity) =>
          [
            opportunity.primary_employer_name,
            opportunity.primary_division_name,
            opportunity.primary_subdivision_name,
            opportunity.primary_group_name,
            opportunity.primary_class_name,
          ].some((field) =>
            field?.toLowerCase().includes(searchWord.toLowerCase())
          )
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [searchWord, data]);

  // Handle search input
  const handleSearch = (search: string) => {
    setSearchWord(search);
  };

  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner if you want
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message
  }

  return (
    <div className="container-flux min-h-content">
      <div className="row align-items-center justify-content-center min-vh-600">
        <div className="container m-4">
          <OpportunityTable
            data={searchWord ? filteredData : data}
            onSearchWordInputted={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default function OpportunityPage() {
  return (
    <PageContent>
      <OpportunityContent />
    </PageContent>
  );
}
