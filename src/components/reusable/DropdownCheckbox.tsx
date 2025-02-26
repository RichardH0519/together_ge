import React, { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";

interface Option {
  label: string;
  value: string;
}

const options: Option[] = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

const DropdownCheckbox: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCheckboxChange = (value: string) => {
    setSelectedOptions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    // console.log(selectedOptions);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Dropdown show={isDropdownOpen} onToggle={toggleDropdown} autoClose={false}>
      <Dropdown.Toggle
        variant="dark"
        id="dropdown-basic"
        onClick={toggleDropdown}
      >
        Select industries
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ maxHeight: "150px", overflowY: "auto" }}>
        {options.map((option) => (
          <Dropdown.Item key={option.value} as="div">
            <Form.Check
              type="checkbox"
              label={option.label}
              checked={selectedOptions.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
            />
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownCheckbox;
