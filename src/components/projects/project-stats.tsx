import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconCheck, IconClock, IconTrendingUp } from "@tabler/icons-react";
import { useFormatter, useTranslations } from "next-intl";
import type { ProjectWithClient } from "./project-dashboard";

interface ProjectStatsProps {
  projects: ProjectWithClient[];
}

export default function ProjectStats({ projects }: ProjectStatsProps) {
  const t = useTranslations();
  const formatter = useFormatter();
  const total = projects.length;
  const active = projects.filter((p) => p.status === "active").length;
  const completed = projects.filter((p) => p.status === "completed").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("Dashboard.total_projects")}
          </CardTitle>
          <IconTrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatter.number(total)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500 font-semibold">+2</span>{" "}
            {t("Dashboard.total_projects_desc")}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("Dashboard.active_projects")}
          </CardTitle>
          <IconClock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{active}</div>
          <p className="text-xs text-muted-foreground">
            {t("Dashboard.active_projects_desc")}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("Dashboard.completed_projects")}
          </CardTitle>
          <IconCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completed}</div>
          <p className="text-xs text-muted-foreground">
            {t("Dashboard.completed_projects_desc")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
