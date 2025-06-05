import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "登入",
  description: "登入以繼續",
  keywords: ["登入", "電子郵件", "帳號"],
};

export default async function Page() {
  // const preferredSignInView = cookies().get('preferredSignInView')?.value;
  // const defaultView = getDefaultSignInView(preferredSignInView);

  return redirect("/signin/email_signin");
}
