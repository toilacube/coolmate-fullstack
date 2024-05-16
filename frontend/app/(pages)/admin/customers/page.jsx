'use client'
import * as React from 'react'
import { CiFilter } from 'react-icons/ci'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { isEmpty } from 'lodash'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { useEffect } from 'react'
import { getApi } from '@/lib/fetch'
import { cn } from '@/lib/utils'

const CustomersPage = () => {
  const [sorting, setSorting] = React.useState()
  const [filters, setFilters] = React.useState('phoneNumber')
  const [columnFilters, setColumnFilters] = React.useState()
  const [columnVisibility, setColumnVisibility] = React.useState()
  const [rowSelection, setRowSelection] = React.useState({})
  const [data, setData] = React.useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await getApi({ endPoint: '/api/user/getAllUser' })
      setData(res.data)
    }
    fetchData()
  }, [])
  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'name',
      header: 'Customer Name',
      cell: ({ row }) => (
        <div
          className={cn(
            row.getValue('name') && 'capitalize',
            !row.getValue('name') && 'text-muted-foreground'
          )}
        >
          {row.getValue('name') ? row.getValue('name') : 'Chưa cập nhật'}
        </div>
      )
    },
    {
      accessorKey: 'username',
      header: 'Username',
      cell: ({ row }) => (
        <div className="capitalize truncate w-[200px]">
          {row.getValue('username')
            ? row.getValue('username')
            : row.getValue('email')}
        </div>
      )
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <div className="capitalize truncate w-[200px]">
          {row.getValue('email')}
        </div>
      )
    },
    {
      accessorKey: 'phoneNumber',
      header: 'Phone Number',
      cell: ({ row }) => (
        <div
          className={cn(
            row.getValue('phoneNumber') && 'capitalize',
            !row.getValue('phoneNumber') && 'text-muted-foreground'
          )}
        >
          {row.getValue('phoneNumber')
            ? row.getValue('phoneNumber')
            : 'Chưa cập nhật'}
        </div>
      )
    },
    {
      accessorKey: 'gender',
      header: ({ column }) => (
        <div
          className="flex cursor-pointer hover:bg-accent hover:text-accent-foreground py-2 rounded-md"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Gender
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => (
        <div
          className={cn(
            row.getValue('gender') && 'capitalize',
            !row.getValue('gender') && 'text-muted-foreground'
          )}
        >
          {row.getValue('gender') ? row.getValue('gender') : 'Chưa cập nhật'}
        </div>
      )
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(product.id)}
              >
                Copy customer ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })
  return (
    <div className="w-full p-4 pt-6 h-fit">
      <div className="justify-between flex">
        <h2 className="font-bold mb-1 text-xl">Customers</h2>
      </div>
      <div className="flex items-center py-4">
        <div className="w-full">
          <div className="flex">
            <div className="flex relative">
              <Input
                placeholder={
                  filters === 'hehe'
                    ? 'Search by phone number...'
                    : filters === 'name'
                    ? 'Search by customer name...'
                    : 'Search by email...'
                }
                value={table.getColumn(filters)?.getFilterValue() ?? ''}
                onChange={(event) =>
                  table.getColumn(filters)?.setFilterValue(event.target.value)
                }
                className="max-w-[300px] min-w-[300px] pr-[30px]"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="none"
                    className="absolute right-0 cursor-pointer hover:bg-none"
                  >
                    <CiFilter />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={filters}
                    onValueChange={setFilters}
                  >
                    <DropdownMenuRadioItem value="id">ID</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="customer_name">
                      Customer name
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="email">
                      Email
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id === 'customer_name'
                          ? 'Customer name'
                          : column.id === 'created_at'
                          ? 'Created At'
                          : column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {!isEmpty(rowSelection) && (
            <div className="border mt-2 flex rounded-md overflow-hidden w-fit">
              <div className="border p-2 px-4 text-sm">
                {Object.keys(rowSelection).length} selected
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border p-2 px-4 text-sm cursor-pointer rounded-none"
                  >
                    Enable
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-base">
                      Enable {Object.keys(rowSelection).length}{' '}
                      {Object.keys(rowSelection).length > 1
                        ? 'customers'
                        : 'customer'}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure enable {Object.keys(rowSelection).length}{' '}
                      {Object.keys(rowSelection).length > 1
                        ? 'customers?'
                        : 'customer?'}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border p-2 px-4 text-sm cursor-pointer rounded-none"
                  >
                    Disable
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-base">
                      Disable {Object.keys(rowSelection).length}{' '}
                      {Object.keys(rowSelection).length > 1
                        ? 'customers'
                        : 'customer'}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure disable {Object.keys(rowSelection).length}{' '}
                      {Object.keys(rowSelection).length > 1
                        ? 'customers?'
                        : 'customer?'}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
export default CustomersPage
