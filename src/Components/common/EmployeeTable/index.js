import React, { useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import Pagination from "react-bootstrap/Pagination";
import TableAction from "../TableAction";
import sort from "../../../Assets/images/sort.svg";

const EmployeeTable = ({ columns, data }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		gotoPage,
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

	const paginationItems = useMemo(() => {
		const pages = [];

		for (let i = 0; i <= Math.ceil(data.length / pageSize) - 1; i++) {
			pages.push(
				<Pagination.Item
					key={i}
					active={i === pageIndex}
					onClick={() => {
						gotoPage(i);
					}}>
					{i + 1}
				</Pagination.Item>
			);
		}

		return pages;
	}, [pageIndex]);
	return (
		<>
			
			<table className="table table-striped" {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup, idx) => (
						<tr key={idx} {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column, columnIdx) => (
								<th key={columnIdx} {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render("Header")}
									{!column.disableSortBy && (
										<img
											src={sort}
											width="8"
											style={{
												verticalAlign: "bottom",
												marginLeft: "10px",
											}}
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
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			
		</>
	);
};

export default EmployeeTable;