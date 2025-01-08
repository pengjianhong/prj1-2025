import React from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default async function Tasks() {
    const tasks = await fetch("/api/comfy/history",{
        method: "GET",
    })
    const tasks_data = await tasks.json()
    return (
        <>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">TaskID</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.entries(tasks_data).map(([id, status]) => (
                        <TableRow key={id}>
                            <TableCell>{id}</TableCell>
                            <TableCell>{status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
