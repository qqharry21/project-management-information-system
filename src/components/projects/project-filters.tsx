import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { IconFilter } from "@tabler/icons-react";
import { Check, Grid3X3, List, Search } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProjectFilters({
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
  /**
   * 狀態欄位的 column filter 狀態
   */
  statusFilter,
  /**
   * 設定狀態欄位的 column filter
   */
  setStatusFilter,
}: {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  viewMode: "table" | "grid";
  setViewMode: (value: "table" | "grid") => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}) {
  const t = useTranslations();
  return (
    <div className="flex gap-4 md:flex-wrap items-center justify-between mb-6">
      {/* Search */}
      <div className="relative flex-1 w-full md:min-w-xs">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={t("Common.search") + "..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex items-center gap-2 md:w-full lg:max-w-xs">
        {/* View Toggle */}
        <div className="hidden md:flex w-full items-center gap-1 border shadow-xs rounded-md p-1">
          <Button
            variant={viewMode === "table" ? "default" : "ghost"}
            onClick={() => setViewMode("table")}
            className="shrink-0 flex-1 h-[26px] px-6! py-1"
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:block">{t("Common.list")}</span>
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            onClick={() => setViewMode("grid")}
            className="shrink-0 flex-1 h-[26px] px-6! py-1"
          >
            <Grid3X3 className="h-4 w-4" />
            <span className="hidden sm:block">{t("Common.grid")}</span>
          </Button>
        </div>
        {/* Status Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 md:flex-1">
              <IconFilter className="md:mr-2 h-4 w-4" />
              <span className="hidden md:block">{t("Common.status")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>
              {t("Common.all")}
              {statusFilter === "all" && (
                <Check className="ml-auto h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("active")}>
              {t("Status.active")}
              {statusFilter === "active" && (
                <Check className="ml-auto h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
              {t("Status.completed")}
              {statusFilter === "completed" && (
                <Check className="ml-auto h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("on_hold")}>
              {t("Status.on_hold")}
              {statusFilter === "on_hold" && (
                <Check className="ml-auto h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("planning")}>
              {t("Status.planning")}
              {statusFilter === "planning" && (
                <Check className="ml-auto h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>
              {t("Status.cancelled")}
              {statusFilter === "cancelled" && (
                <Check className="ml-auto h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
