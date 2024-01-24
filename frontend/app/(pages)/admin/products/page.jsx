"use client";
import { CiFilter } from "react-icons/ci";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CSVLink } from "react-csv";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { isEmpty } from "lodash";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import ImportExcel from "../../../../components/excel/import-excel";
const ProductsPage = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [exportData, setExportData] = useState([]);
  // useEffect(() => {
  //   setHandleData(
  //     handleData.length > 0
  //       ? [
  //           ...handleData,
  //           ...data
  //             .map((item) =>
  //               item.productItems.map((productItems) => {
  //                 return {
  //                   id: productItems.id.toString(),
  //                   categoryId: item.categoryId,
  //                   name: item.name,
  //                   color: productItems.color,
  //                   size: productItems.size,
  //                   quantity: productItems.qtyInStock,
  //                   priceStr: item.priceStr,
  //                   description: item.description
  //                 }
  //               })
  //             )
  //             .flat()
  //         ]
  //       : [
  //           ...data
  //             .map((item) =>
  //               item.productItems.map((productItems) => {
  //                 return {
  //                   id: productItems.id.toString(),
  //                   categoryId: item.categoryId,
  //                   name: item.name,
  //                   color: productItems.color,
  //                   size: productItems.size,
  //                   quantity: productItems.qtyInStock,
  //                   priceStr: item.priceStr,
  //                   description: item.description
  //                 }
  //               })
  //             )
  //             .flat()
  //         ]
  //   )
  // }, [data])
  const router = useRouter();
  const handleGetAoCacLoai = (
    url = `${process.env.NEXT_PUBLIC_API_ROOT}/api/productItem`
  ) => {
    try {
      const options = {
        method: "GET",
        url: url,
      };
      axios
        .request(options)
        .then(function (response) {
          //console.log(response.data)
          setData(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  useEffect(() => {
    handleGetAoCacLoai();
  }, []);
  const handleOnClick = (id) => {
    router.push(`/admin/edit-product/${id}`);
  };
  const columns = [
    {
      id: "select",
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
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      label: "ID",
      cell: ({ row }) => (
        <div
          className="capitalize hover:underline cursor-pointer"
          onClick={() => handleOnClick(row.original.productId)}
        >
          {row.getValue("id")}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Product Name",
      label: "Product Name",
      cell: ({ row }) => (
        <div
          className="w-full cursor-pointer h-full"
          onClick={() => row.toggleSelected(!row.getIsSelected())}
        >
          <div
            className="capitalize truncate w-[230px] hover:underline cursor-pointer"
            onClick={() => handleOnClick(row.original.productId)}
          >
            {row.getValue("name")}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "color",
      label: "Color",
      header: ({ column }) => (
        <div
          className="flex cursor-pointer hover:bg-accent hover:text-accent-foreground py-2 rounded-md"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Color
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => {
        return <div className="font-medium flex">{row.getValue("color")}</div>;
      },
    },
    {
      accessorKey: "size",
      label: "Size",
      header: ({ column }) => (
        <div
          className="flex cursor-pointer hover:bg-accent hover:text-accent-foreground py-2 rounded-md"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Size
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => {
        return <div className="font-medium flex">{row.getValue("size")}</div>;
      },
    },
    {
      accessorKey: "qtyInStock",
      label: "Quantity",
      header: ({ column }) => (
        <div
          className="flex cursor-pointer hover:bg-accent hover:text-accent-foreground py-2 rounded-md"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="font-medium flex">{row.getValue("qtyInStock")}</div>
        );
      },
    },
    {
      accessorKey: "priceStr",
      label: "Price",
      header: ({ column }) => (
        <div
          className="flex cursor-pointer hover:bg-accent hover:text-accent-foreground py-2 rounded-md"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="font-medium flex">{row.getValue("priceStr")}</div>
        );
      },
    },
    {
      id: "deleted",
      accessorKey: "deleted",
      header: "Deleted",
      cell: ({ row }) => (
        <div className="uppercase">
          {row.getValue("deleted") ? row.getValue("deleted") : "false"}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;
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
                onClick={() => navigator.clipboard.writeText(product.productId)}
                className="cursor-pointer"
              >
                Copy product ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleOnClick(product.productId)}
                className="cursor-pointer"
              >
                Edit product
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleOnClick(product.id)}
                className="cursor-pointer"
              >
                View product details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const [sorting, setSorting] = useState();
  const [filters, setFilters] = useState("id");
  const [columnFilters, setColumnFilters] = useState();
  const [columnVisibility, setColumnVisibility] = useState();
  const [rowSelection, setRowSelection] = useState({});
  useEffect(() => {
    setExportData(data.filter((item, index) => rowSelection[index] === true));
  }, [data, rowSelection]);
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
        pageSize: 10,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  useEffect(() => {
    setHeaders(
      table
        .getAllColumns()
        .filter(
          (column) =>
            column.getIsVisible() &&
            column.id !== "select" &&
            column.id !== "actions" &&
            column.id !== "deleted"
        )
        .map((item) => ({
          label: item.columnDef.label,
          key: item.id,
        }))
    );
  }, [table, rowSelection]);

  return (
    <div className="w-full p-4 pt-6 h-fit">
      <div className="justify-between flex">
        <h2 className="font-bold mb-1 text-xl">Products</h2>
        <Button
          variant="outline"
          size="sm"
          className="bg-black text-white hover:bg-white hover:text-black"
          onCLick={() => router.push("/admin/create-product")}
        >
          New Product
        </Button>
      </div>
      <div className="flex items-center py-4">
        <div className="w-full">
          <div className="flex items-center">
            <div className="flex relative">
              <Input
                placeholder={
                  filters === "id"
                    ? "Search by #id..."
                    : "Search by product name..."
                }
                value={table.getColumn(filters)?.getFilterValue() ?? ""}
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
                    <DropdownMenuRadioItem value="name">
                      Product name
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <ImportExcel getData={handleGetAoCacLoai} />

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
                        {column.id === "name" ? "Product name" : column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {!isEmpty(rowSelection) && (
            <div className="border mt-2 flex rounded-md overflow-hidden w-fit">
              <div className="border p-2 px-4 text-sm">
                {Object.keys(rowSelection).length} selected
              </div>
              <Button
                variant="outline"
                className="border p-2 px-4 text-sm cursor-pointer rounded-none"
              >
                <CSVLink
                  data={exportData}
                  filename={"Products.csv"}
                  headers={headers}
                >
                  Export Excel
                </CSVLink>
              </Button>

              {/* <AlertDialog>
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
                        ? 'products'
                        : 'product'}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure enable {Object.keys(rowSelection).length}{' '}
                      {Object.keys(rowSelection).length > 1
                        ? 'products?'
                        : 'product?'}
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
                        ? 'products'
                        : 'product'}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure disable {Object.keys(rowSelection).length}{' '}
                      {Object.keys(rowSelection).length > 1
                        ? 'products?'
                        : 'product?'}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog> */}
            </div>
          )}
        </div>
      </div>
      {data.length > 0 && (
        <>
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
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
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
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
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
        </>
      )}
    </div>
  );
};
export default ProductsPage;
