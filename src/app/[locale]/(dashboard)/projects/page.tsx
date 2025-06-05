import ProjectDashboard from "@/components/projects/project-dashboard";
import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async () => {
  const t = await getTranslations();
  return {
    title: t("Dashboard.project_management"),
    description: t("Dashboard.project_management_desc"),
  };
};

export default async function Page() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*, clients(name)")
    .order("created_at", { ascending: false });
  console.log("🚨 - projects", projects);

  if (error) {
    console.error("🚨 - error", error);
    return <div className="text-destructive">Failed to load projects.</div>;
  }

  return <ProjectDashboard projects={projects || []} />;
}
