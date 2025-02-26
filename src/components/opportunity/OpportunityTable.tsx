import React, { useMemo, useState } from "react";
import { useTable, usePagination, Column, TableInstance } from "react-table";
import { OpportunityData } from "./OpportunityDatatype";
import { FormGroup, FormControl } from "react-bootstrap";

interface OpportunityTableProps {
  data: OpportunityData[];
  onSearchWordInputted: (value: string) => string; // Expecting the search word to be returned
}

const OpportunityTable: React.FC<OpportunityTableProps> = ({
  data,
  onSearchWordInputted,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  // Define the columns for the table
  const columns: Column<OpportunityData>[] = useMemo(
    () => [
      { Header: "Employer", accessor: "primary_employer_name" },
      { Header: "Division", accessor: "primary_division_name" },
      { Header: "Subdivision", accessor: "primary_subdivision_name" },
      { Header: "Group", accessor: "primary_group_name" },
      { Header: "Class", accessor: "primary_class_name" },
      { Header: "Manager Category", accessor: "manager_category" },
      { Header: "Opportunity Gap (%)", accessor: "opp_gap" },
    ],
    []
  );

  // Table instance with pagination
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Use page instead of rows
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex, pageSize },
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      manualPagination: false, // Set to true for server-side pagination
    },
    usePagination
  ) as TableInstance<OpportunityData> & {
    page: Array<any>;
    canPreviousPage: boolean;
    canNextPage: boolean;
    pageOptions: number[];
    gotoPage: (pageIndex: number) => void;
    nextPage: () => void;
    previousPage: () => void;
    setPageSize: (pageSize: number) => void;
    state: {
      pageIndex: number;
      pageSize: number;
    };
  };

  // Handle input changes for search
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value.toLowerCase();
    setInputValue(userInput);
    onSearchWordInputted(userInput); // Pass the search input to the parent
  };

  return (
    <div className="container-flux">
      <div className="row align-items-center justify-content-center min-vh-600">
        <div className="container m-4">
          <h2 className="text-center">Opportunity List</h2>
          <p className="text-center col-12 p-4 fs-4">
            Discover which company supports pay equity
          </p>
          <p className="text-center col-12 p-4">
            The <strong>average gender pay gap</strong> represents the <strong>difference in opportunities</strong> between men and women, expressed as a percentage based on <strong>workforce representation</strong>. In our analysis, we use the <strong>number of employees</strong> to estimate this gap, highlighting disparities in <strong>access</strong> and <strong>opportunity</strong>. A <strong>negative value</strong> indicates more <strong>female employees</strong>, while a <strong>positive value</strong> indicates more <strong>male employees</strong>. Additionally, <strong>ratios exceeding 100</strong> are capped at 100.</p>

          <div className="row justify-content-center mb-5">
            <FormGroup className="col-8 col-lg-6">
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

          <div className="row justify-content-center">
            <div
              className="col-10 col-lg-10 col-xl-8 col-xxl-7 border"
              style={{ overflowX: "auto" }}
            >
              <table {...getTableProps()} className="table table-striped">
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      key={headerGroup.id}
                    >
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()} key={column.id}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} key={row.id}>
                        {row.cells.map((cell) => {
                          const isOpportunityGapColumn = cell.column.id === "opp_gap"; // Check if it's the Opportunity Gap column
                          const cellValue = Number(cell.value); // Convert the cell value to a number

                          return (
                            <td
                              {...cell.getCellProps()}
                              key={cell.column.id}
                              style={{
                                color: isOpportunityGapColumn
                                  ? cellValue > 0
                                    ? "#058EFF"
                                    : "pink"
                                  : "inherit", // Apply color only to the Opportunity Gap column
                              }}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>

              </table>
              <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  {"<<"}
                </button>
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  {"<"}
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                  {">"}
                </button>
                <button
                  onClick={() => gotoPage(pageOptions.length - 1)}
                  disabled={!canNextPage}
                >
                  {">>"}
                </button>
                <span>
                  Page{" "}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>{" "}
                </span>
                <span>
                  | Go to page:{" "}
                  <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      gotoPage(page);
                    }}
                    style={{ width: "100px" }}
                  />
                </span>{" "}
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map((size) => (
                    <option key={size} value={size}>
                      Show {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityTable;
