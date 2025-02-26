import React, { useEffect, useState } from "react";
import { OccupationDatatype } from "./OccupationDatatype";
import Papa from "papaparse";
import { FormControl, FormGroup, Modal, Spinner } from "react-bootstrap";
import OccupationTable from "./OccupationTable";
import useApiRequest from "../reusable/ApiRequest";

interface SkillLevelModalProps {
  show: boolean;
  handleClose: () => void;
}

const SkillLevelModal: React.FC<SkillLevelModalProps> = ({
  show,
  handleClose,
}) => {
  //const [data, setData] = useState<OccupationDatatype[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<OccupationDatatype[]>([]);
  const [searchOccupationStatus, setSearchOccupationStatus] = useState(false);

  const { data, loading, error } = useApiRequest("SkillLevel");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("/skilldata.csv");
  //     const reader = response.body?.getReader();
  //     const result = await reader?.read();
  //     const decoder = new TextDecoder("utf-8");
  //     const csv = decoder.decode(result?.value);

  //     // Parse CSV data
  //     Papa.parse<OccupationDatatype>(csv, {
  //       header: true,
  //       skipEmptyLines: true,
  //       complete: (results: { data: OccupationDatatype[] }) => {
  //         setData(results.data);
  //       },
  //     });
  //   };

  //   fetchData();
  // }, []);

  //Handle functions
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value.toLowerCase();
    if (userInput != "") {
      setInputValue(userInput);
      setFilteredData(
        data.filter((occupation) =>
          occupation.Occupation?.toLowerCase().includes(userInput)
        )
      );
      setSearchOccupationStatus(true);
    } else {
      setInputValue("");
      setSearchOccupationStatus(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center"
        style={{ height: "400px", alignItems: "center" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    ); // Show the spinner while loading
  }

  if (error) {
    const errorMessage = error.message || 'An unknown error occurred.';
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <Modal centered show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Occupation List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <FormGroup>
            <FormControl
              className="py-2"
              value={inputValue}
              placeholder="Your occupation..."
              type="text"
              onChange={handleChange}
              autoComplete="off"
            />
          </FormGroup>
        </div>

        <div className="container-flux">
          <div className="row align-items-center justify-content-center min-vh-600">
            <div className="container m-4">
              {searchOccupationStatus ? (
                <OccupationTable data={filteredData} />
              ) : (
                <OccupationTable data={data} />
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SkillLevelModal;
