import React, { useState } from "react";
import { FormControl, FormGroup, ListGroup } from "react-bootstrap";

interface AutocompleteProps {
  id?: string;
  suggestions: string[];
  placeholder: string;
  onValueSelected: (value: string) => string;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  id,
  suggestions,
  placeholder,
  onValueSelected,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value.toLowerCase();
    if (userInput != "") {
      setInputValue(userInput);
      setFilteredSuggestions(
        suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(userInput)
        )
      );
      setShowSuggestions(false);
    } else {
      setInputValue("");
      setShowSuggestions(true);
    }
  };

  const handleSelect = (suggestion: string) => {
    setInputValue(suggestion);
    onValueSelected(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const handleClick = () => {
    setShowSuggestions(true);
  };

  return (
    <>
      <FormGroup>
        <FormControl
          id={id}
          className="py-2"
          value={inputValue}
          placeholder={placeholder}
          type="text"
          onChange={handleChange}
          onClick={handleClick}
          autoComplete="off"
          required
        />
      </FormGroup>

      {showSuggestions ? (
        <ListGroup style={{ maxHeight: "150px", overflowY: "auto" }}>
          {suggestions.map((suggestion, index) => (
            <ListGroup.Item
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="ge-hover"
            >
              {suggestion}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <ListGroup style={{ maxHeight: "150px", overflowY: "auto" }}>
          {filteredSuggestions.map((suggestion, index) => (
            <ListGroup.Item
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="ge-hover"
            >
              {suggestion}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default Autocomplete;
