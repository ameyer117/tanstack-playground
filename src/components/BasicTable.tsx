import React from 'react'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    SortDirection, getFilteredRowModel
} from '@tanstack/react-table'
import mData from '../MOCK_DATA.json'
import { DateTime } from "luxon";

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
            {
                header: "ID",
                accessorKey: "id",
            },
            {
                header: "Name",
                accessorFn: (row) => `${row.first_name} ${row.last_name}`,
                // accessorKey: "first_name",
                // cell: info => `${info.getValue()} ${info.row.original.last_name}`
            },
            {
                header: "Email",
                accessorKey: "email",
            },
            {
                header: "Gender",
                accessorKey: "dob"
            },
            {
                header: "DOB",
                accessorFn: (row) => DateTime.fromISO(row.dob).toLocaleString(DateTime.DATE_MED),
                // accessorKey: "dob",
                // cell: info => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED)
            }
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
                                    {
                                        {asc: '🔼', desc: '🔽'}[header.column.getIsSorted() as SortDirection] || '↕️'
                                    }
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


