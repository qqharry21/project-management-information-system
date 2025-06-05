"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { flexRender, Table as ReactTable } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { statusVariants } from "./project-columns";
import type { ProjectWithClient } from "./project-dashboard";

interface ProjectListProps {
  viewMode: "table" | "grid";
  table: ReactTable<ProjectWithClient>;
}

export default function ProjectList({ viewMode, table }: ProjectListProps) {
  const t = useTranslations();
  const projects = table.getRowModel().rows;

  if (viewMode === "table") {
    return (
      <Card className="p-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={table.getHeaderGroups()[0].headers.length}
                    className="text-center text-muted-foreground"
                  >
                    {table.getColumn("status")?.getFilterValue() === "all"
                      ? "找不到專案"
                      : `找不到狀態為 ${table.getColumn("status")?.getFilterValue()} 的專案`}
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  // Grid view (unchanged)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">
                  {project.original.name}
                </CardTitle>
                <CardDescription>
                  {project.original.clients?.name}
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{t("Common.actions")}</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <IconEdit className="h-4 w-4" />
                    {t("Common.edit")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <IconTrash className="h-4 w-4" />
                    {t("Common.delete")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">
              {project.original.description}
            </p>
            <div className="flex items-center gap-2">
              <Badge
                className={statusVariants({ status: project.original.status })}
              >
                {t(`Status.${project.original.status}`)}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {t("Common.start_date")}
              </span>
              <span className="font-medium">
                {project.original.start_date
                  ? new Date(project.original.start_date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )
                  : "-"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {t("Common.end_date")}
              </span>
              <span>
                {project.original.end_date
                  ? new Date(project.original.end_date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )
                  : "-"}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
      {projects.length === 0 && (
        <div className="col-span-full text-center text-muted-foreground">
          {t("Message.no_data")}
        </div>
      )}
    </div>
  );
}
