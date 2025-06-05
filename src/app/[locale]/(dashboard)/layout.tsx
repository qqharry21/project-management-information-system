import { GlobalActionDialog } from "@/components/action-dialog";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirectToPath } from "@/lib/auth-helpers/server";
import { createClient } from "@/lib/supabase/server";
import { UserWithProfile } from "@/types/supabase";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirectToPath("/signin");
  }

  // Fetch user data and user profile
  const { data: userData } = await supabase
    .from("users")
    .select("*, user_profiles(*)")
    .eq("id", user.id)
    .single();

  if (!userData) {
    return redirectToPath("/signin");
  }

  const userWithProfile = userData as UserWithProfile;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" user={userWithProfile} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col md:max-h-[calc(100dvh-3rem-1rem)] md:overflow-auto">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
      <GlobalActionDialog />
    </SidebarProvider>
  );
}
