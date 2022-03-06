import React, { useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";

//import TableAction from "../TableAction";
import Pagination from "../Pagination"
import sort from "../../../Assets/images/sort.svg";

const Table = ({ columns, data }) => {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    gotoPage,
    pageCount,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <p className="align-left font-primary font-normal text-sm mb-3">
        View
        <select
          className="w-16 h-7  mx-2 border p-1 rounded-[3px]"
          name="view-per-page"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 15, 20].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        Items per Page
      </p>
      <table className="border-collapse w-[100%] my-5" {...getTableProps()}>
        <thead className="bg-tableheadColor">
          {headerGroups.map((headerGroup, idx) => (
            <tr
              className="font-bold text-sm text-left h-12 shadow-tableshadowColor shadow-sm"
              key={idx}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column, columnIdx) => (
                <th
                  className="px-5 font-bold text-sm "
                  key={columnIdx}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {!column.disableSortBy && (
                    <img
                      src={sort}
                      width="8"
                      className="align-middle ml-3 inline-block"
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                className="shadow-tableshadowColor shadow-sm  text-sm font-primary leading-10"
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="px-5">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between align-baseline">
        <p>
          Total number of record <b>{data.length} </b>
        </p>
        <div className="col">
          <Pagination pageCount={pageCount} gotoPage={gotoPage} pageIndex={pageIndex} />

        </div>
      </div>
    </>
  );
};

// Temp Pagination

export default Table;
