"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader, IconMail } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "請輸入有效的電子郵件地址。",
  }),
});

export default function ResendEmailForm({
  errorDescription,
}: {
  errorDescription: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: values.email,
        options: {
          emailRedirectTo: `${window.location.origin}/signin/email_signin?verified=true`,
        },
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("驗證信已重新發送，請檢查您的信箱。");
    } catch (error) {
      console.error(error);
      toast.error("發生錯誤，請再試一次。");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (errorDescription) {
      router.replace("/signin/resend_email");
      toast.error(errorDescription);
    }
  }, [errorDescription]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">重新發送驗證信</CardTitle>
        <CardDescription>請輸入您的電子郵件地址</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <div className="relative">
                    <IconMail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        className="pl-9"
                        required
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <IconLoader className="mr-2 h-4 w-4 animate-spin" />
                  發送中...
                </>
              ) : (
                "重新發送"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
