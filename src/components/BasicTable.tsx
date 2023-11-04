import React from 'react'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    SortDirection, getFilteredRowModel, createColumnHelper
} from '@tanstack/react-table'
import mData from '../MOCK_DATA.json'
import { DateTime } from "luxon";

type IPerson = {
    id: number
    first_name: string
    last_name: string
    email: string
    gender: string
    dob: string
}

const columnHelper = createColumnHelper<IPerson>();

interface BasicTableProps {

}

const BasicTable: React.FC<BasicTableProps> = () => {
    const data = React.useMemo(() => mData, []);

    const [sorting, setSorting] = React.useState<any[]>([])
    const [filtering, setFiltering] = React.useState('')

    const table = useReactTable({
        data: data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        columns: [
            columnHelper.accessor("id", {
                header: "ID",
            }),
            columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
                header: "Name",
            }),
            columnHelper.accessor("email", {
                header: "Email",
            }),
            columnHelper.accessor("gender", {
                header: "Gender",
            }),
            columnHelper.accessor("dob", {
                header: "",
                enableSorting: false,
                cell: info => (
                    <div style={{padding: 16, backgroundColor: "steelblue", color: "white"}}>
                        {DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED)}
                    </div>
                )
            })
        ],
    });

    return (
        <div className="w3-padding-top-24">
            <h1 className="">Basic Table</h1>
            <div className="w3-bar w3-center">
                <input className="w3-input" value={filtering} onChange={e => setFiltering(e.target.value)} placeholder="Search..." />
            </div>
            <table className="w3-table-all">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} onClick={header.column.getToggleSortingHandler()} style={{cursor: 'pointer'}}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    {header.column.getCanSort() ? ({asc: '🔼', desc: '🔽'}[header.column.getIsSorted() as SortDirection] || '↕️') : null}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="w3-bar w3-center">
                <button className="w3-button" onClick={() => table.setPageIndex(0)}>First</button>
                {table.getCanPreviousPage() && <button className="w3-button" onClick={() => table.previousPage()}>Previous</button>}
                {table.getCanNextPage() && <button className="w3-button" onClick={() => table.nextPage()}>Next</button>}
                <button className="w3-button" onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Last</button>
            </div>
        </div>
    )
}

export default BasicTable


