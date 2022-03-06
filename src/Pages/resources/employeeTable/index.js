import React, { useMemo} from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import Pagination from "react-bootstrap/Pagination";

import sort from "../../../Assets/images/sort.svg";

const EmployeeTable = ({ columns, data }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		// canPreviousPage,
		// canNextPage,
		gotoPage,
		// nextPage,
		// previousPage,
		// setPageSize,
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

 useMemo(() => {
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
			
			<table className="border-collapse w-[100%] my-5" {...getTableProps()}>
				<thead className="bg-tableheadColor">
					{headerGroups.map((headerGroup, idx) => (
						<tr className="font-bold text-sm text-left h-12 shadow-tableshadowColor shadow-sm"
						 key={idx} {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column, columnIdx) => (
								<th className="px-5 font-bold text-sm "
								 key={columnIdx} {...column.getHeaderProps(column.getSortByToggleProps())}>
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
							<tr className="shadow-tableshadowColor shadow-sm h-[50px]"
							 {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()} className="px-5">{cell.render("Cell")}</td>
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