'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { IconLoader } from '@tabler/icons-react';
import Link from 'next/link';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email({
    message: '請輸入有效的電子郵件地址。',
  }),
});

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success('重設密碼信件已發送', {
        description: '請檢查您的電子郵件以重設密碼。',
      });

      router.push('/signin/email_signin');
    } catch (error) {
      console.error(error);
      toast.error('發生錯誤，請再試一次。');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='flex flex-col gap-6'>
      <Card>
        <CardHeader>
          <CardTitle className='text-xl'>忘記密碼</CardTitle>
          <CardDescription>輸入您的電子郵件以重設密碼</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>電子郵件</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='m@example.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='w-full'
                disabled={isLoading}>
                {isLoading ? (
                  <>
                    <IconLoader className='mr-2 h-4 w-4 animate-spin' />
                    發送中...
                  </>
                ) : (
                  '發送重設密碼信件'
                )}
              </Button>
              <div className='text-center text-sm'>
                記起密碼了？{' '}
                <Link
                  href='/signin/email_signin'
                  className='underline underline-offset-4'>
                  登入
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        點擊繼續，即表示您同意我們的 <a href='#'>服務條款</a> 和 <a href='#'>隱私政策</a>。
      </div>
    </div>
  );
}
