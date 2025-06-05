"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import { toast } from "sonner";
import { z } from "zod";

const subscriptionSchema = z.object({
  id: z.number(),
  header: z.string(), // service name
  value: z.number(), // billing amount
  date: z.string(), // next billing date (YYYY-MM-DD)
});

type Subscription = z.infer<typeof subscriptionSchema>;

function getDueStatus(dateStr: string) {
  const today = new Date();
  const due = new Date(dateStr);
  const diff = Math.ceil(
    (due.getTime() - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24),
  );
  if (diff < 0) return "overdue";
  if (diff === 0) return "today";
  if (diff === 3) return "3days";
  if (diff === 7) return "7days";
  return null;
}

export const SubscriptionReminder = ({ data }: { data: Subscription[] }) => {
  // Validate and filter subscriptions
  const subscriptions: Subscription[] = (Array.isArray(data) ? data : [])
    .map((item) => {
      const parsed = subscriptionSchema.safeParse(item);
      return parsed.success ? parsed.data : null;
    })
    .filter(Boolean) as Subscription[];

  const reminders = subscriptions
    .map((sub) => ({ ...sub, dueStatus: getDueStatus(sub.date) }))
    .filter((sub) => sub.dueStatus);

  const handleAction = (action: "renew" | "cancel", sub: Subscription) => {
    toast(`${action === "renew" ? "續訂成功" : "已取消"}：${sub.header}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>訂閱到期提醒</CardTitle>
        <CardDescription>監控即將到期的訂閱</CardDescription>
        <CardAction>
          <Button variant="outline" asChild>
            <Link href="/subscriptions">
              查看更多
              <IconArrowUpRight className="w-4 h-4" />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="max-h-[240px] overflow-auto flex flex-col gap-4">
          {reminders.length === 0 ? (
            <div className="text-muted-foreground text-sm">近期無到期訂閱</div>
          ) : (
            reminders.map((sub) => (
              <div
                key={sub.id}
                className={[
                  "flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-3 gap-2 transition-colors",
                ].join(" ")}
              >
                <div className="flex-1 flex flex-col gap-1">
                  <div className="font-medium">{sub.header}</div>
                  <div className="text-xs flex items-center gap-2">
                    <span>下次扣款日：{sub.date}</span>
                    {sub.dueStatus === "overdue" && (
                      <Badge variant="destructive">已逾期</Badge>
                    )}
                    {sub.dueStatus === "today" && (
                      <Badge variant="default">今日到期</Badge>
                    )}
                    {sub.dueStatus === "3days" && (
                      <Badge variant="outline">3天內到期</Badge>
                    )}
                    {sub.dueStatus === "7days" && (
                      <Badge variant="secondary">7天內到期</Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    -{" "}
                    {sub.value.toLocaleString("zh-TW", {
                      style: "currency",
                      currency: "TWD",
                      minimumFractionDigits: 0,
                    })}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="default"
                    className="flex-1 sm:flex-auto"
                    onClick={() => handleAction("renew", sub)}
                  >
                    續訂
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 sm:flex-auto"
                    onClick={() => handleAction("cancel", sub)}
                  >
                    取消
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
