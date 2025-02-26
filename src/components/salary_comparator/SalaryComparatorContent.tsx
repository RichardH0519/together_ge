import React, { useState } from "react";
import Autocomplete from "../reusable/Autocomplete";
import DropdownCheckbox from "../reusable/DropdownCheckbox";
import { SalaryDatatype } from "./SalaryDatatype";
import { Form, FormCheck, FormGroup, Spinner } from "react-bootstrap";
import SalarayDiffChart from "./SalaryDiffChart";
import IndustryDiffLineChart from "./IndustryDiffChart";
import SkillLevelModal from "./SkillLevelModal";
import "./comparator.css";
import useApiRequest from "../reusable/ApiRequest";

const SalaryComparatorContent: React.FC = () => {
  //Set status
  const [showSalaryReport, setShowSalaryReport] = useState(false);
  const [searchBySkillLevel, setSearchBySKillLevel] = useState(false);
  const [searchByJobStatus, setSearchByJobStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //Set data
  //const [data, setData] = useState<SalaryDatatype[]>([]);
  //Set validation
  const [validated, setValidated] = useState(false);
  const [industry, setIndustry] = useState<string>("");
  const [skillLevel, setSkillLevel] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState("");
  const [salary, setSalary] = useState<SalaryDatatype>();

  //Fetch data
  const { data, loading, error } = useApiRequest("SalaryIndustryLocation");

  //Get distinct items from data
  const getDistinctItems = (array: unknown[]): unknown[] => {
    return Array.from(new Set(array));
  };

  //Location data
  const locationData = getDistinctItems(
    data.map((item) => item.Stateandterritory)
  );

  //SKill level data
  const skillCategory = getDistinctItems(data.map((item) => item.Category));
  const skillLevelData = skillCategory.filter(
    (item) => item != "Full-time" && item != "Part-time"
  );
  const jobStatusData = skillCategory.filter(
    (item) => item === "Full-time" || item === "Part-time"
  );

  //Industry data
  const industryData = getDistinctItems(data.map((item) => item.Industry));

  //Define fields
  const fields = [
    {
      id: "industry",
      dataList: industryData,
      placeholder: "Your industry...",
    },
    {
      id: "skill-level",
      dataList: skillLevelData,
      placeholder: "Your skill level...",
    },
    {
      id: "location",
      dataList: locationData,
      placeholder: "Your location...",
    },
    {
      id: "job-status",
      dataList: jobStatusData,
      placeholder: "Your status...",
    },
  ];

  //Define radio buttons
  const radioButtons = [
    { id: "fulltimeorparttimeRadioBtn", label: "Job status" },
    { id: "skillLevelRadioBtn", label: "Based on skill level" },
  ];

  //Handle event functions
  const handleFindOutClick = () => {
    setShowSalaryReport(true);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    //Validation
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    //Passed validation
    if (selectedOption === "Job status" && industry && location && skillLevel) {
      setSalary(findSalary(location, industry, skillLevel));
      handleFindOutClick();
    } else if (
      selectedOption === "Based on skill level" &&
      industry &&
      location &&
      skillLevel
    ) {
      setSalary(findSalary(location, industry, skillLevel));
      handleFindOutClick();
    }
  };

  const findSalary = (
    location: string,
    industry: string,
    category: string
  ): SalaryDatatype | undefined => {
    return data.find(
      (item) =>
        item.Stateandterritory === location &&
        item.Industry === industry &&
        item.Category === category
    );
  };

  const handleIndustrySelected = (industry: string) => {
    setIndustry(industry);
  };

  const handleSkillLevelSelected = (skillLevel: string) => {
    setSkillLevel(skillLevel);
  };

  const handleLocationSelected = (location: string) => {
    setLocation(location);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
    const errorMessage = error.message || "An unknown error occurred.";
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <>
      <div className="container-flux mt-5 min-h-content">
        <div className="row text-justify align-items-center justify-content-center mb-5">
          <div className="col-12">
            <h1 className="text-center">Are you being underpaid?</h1>
          </div>
        </div>

        <div className="row align-items-center justify-content-center">
          <Form
            className="col-12 col-lg-4 px-5 d-grid"
            noValidate
            validated={validated}
          >
            <div className="mb-4">
              <Autocomplete
                id={fields[0].id}
                suggestions={fields[0].dataList}
                placeholder={fields[0].placeholder}
                onValueSelected={handleIndustrySelected}
              />
            </div>

            <FormGroup>
              {radioButtons.map((button) => (
                <FormCheck
                  required
                  type="radio"
                  name="radioGroup"
                  id={button.id}
                  label={button.label}
                  onChange={() => {
                    button.id === "fulltimeorparttimeRadioBtn"
                      ? setSearchByJobStatus(true)
                      : setSearchByJobStatus(false);

                    button.id === "skillLevelRadioBtn"
                      ? setSearchBySKillLevel(true)
                      : setSearchBySKillLevel(false);

                    setSelectedOption(button.label);
                  }}
                />
              ))}
            </FormGroup>

            {searchByJobStatus && (
              <div className="mt-4">
                <Autocomplete
                  id={fields[3].id}
                  suggestions={fields[3].dataList}
                  placeholder={fields[3].placeholder}
                  onValueSelected={handleSkillLevelSelected}
                />
              </div>
            )}

            {searchBySkillLevel && (
              <div className="mt-4">
                <Autocomplete
                  id={fields[1].id}
                  suggestions={fields[1].dataList}
                  placeholder={fields[1].placeholder}
                  onValueSelected={handleSkillLevelSelected}
                />
                <div className="small mt-2">
                  Don't know your skill level?{" "}
                  <a href="#" onClick={handleShowModal}>
                    Find out here
                  </a>
                </div>
              </div>
            )}

            {showModal && (
              <SkillLevelModal
                show={true}
                handleClose={handleCloseModal}
              ></SkillLevelModal>
            )}

            <div className="mt-4">
              <Autocomplete
                id={fields[2].id}
                suggestions={fields[2].dataList}
                placeholder={fields[2].placeholder}
                onValueSelected={handleLocationSelected}
              />
            </div>

            <button
              className="ge-sc-round-button fw-bold my-5"
              type="button"
              onClick={handleSubmit}
            >
              Find out
            </button>
          </Form>
          {showSalaryReport && (
            <div
              className="col-12 col-lg-6 d-flex justify-content-center align-items-center"
              style={{ height: "50vh" }}
            >
              <SalarayDiffChart salary={salary} />
            </div>
          )}
        </div>

        <div className="row text-justify align-items-center justify-content-center my-5 d-none">
          <div className="col-12">
            <h1 className="text-center fst-italic">
              Pay Gap Between Industries
            </h1>
          </div>
        </div>

        <div className="container d-none">
          <div className="row align-items-center justify-content-center">
            <div className="col-12">
              <div>
                <DropdownCheckbox />
              </div>
              <div className="mt-5" style={{ height: "75vh" }}>
                <IndustryDiffLineChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalaryComparatorContent;
