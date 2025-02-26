import React, { useMemo } from "react";
import { useTable, usePagination, Column, TableInstance } from "react-table";
import { OccupationDatatype } from "./OccupationDatatype";

interface OccupationTableProps {
  data: OccupationDatatype[];
}

const OccupationTable: React.FC<OccupationTableProps> = ({ data }) => {
  // Define the columns for the table
  const columns: Column<OccupationDatatype>[] = useMemo(
    () => [
      { Header: "Occupation", accessor: "Occupation" },
      { Header: "Skill level", accessor: "SkillLevel" },
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
  ) as TableInstance<OccupationDatatype> & {
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

  return (
    <div className="container-flux">
      <div className="row align-items-center justify-content-center min-vh-600">
        <div className="container m-4">
          <div className="row justify-content-center">
            <div className="col-10 col-lg-10 col-xl-8 col-xxl-7 border">
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
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()} key={cell.column.id}>
                            {cell.render("Cell")}
                          </td>
                        ))}
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
              </div>
              <div>
                <span>
                  Page&nbsp;
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>
                  &nbsp;
                </span>
                <span>
                  | Go to page:&nbsp;
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
                </span>
                &nbsp;
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

export default OccupationTable;
