'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { IconLoader, IconLock, IconMail } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { checkEmailExists } from '@/lib/auth-helpers/client';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const ResendOtpButton = ({ email }: { email: string }) => {
  const [resendTime, setResendTime] = useState(0);

  useEffect(() => {
    if (resendTime > 0) {
      setTimeout(() => setResendTime(resendTime - 1), 1000);
    }
  }, [resendTime]);

  async function handleResendOtp() {
    if (resendTime > 0) return;

    setResendTime(60);
    const supabase = createClient();
    await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: 'http://localhost:3000/signin/email_signin?verified=true',
      },
    });
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='text-sm font-medium'>還沒收到驗證信嗎？</div>
      <Button
        type='button'
        variant='outline'
        className='w-full disabled:cursor-not-allowed'
        disabled={resendTime > 0}
        onClick={handleResendOtp}>
        {resendTime > 0 ? `可於 ${formatTime(resendTime)} 後重新發送驗證信` : '重新發送驗證信'}
      </Button>
    </div>
  );
};

const formSchema = z.object({
  email: z.string().email({
    message: '請輸入有效的電子郵件地址。',
  }),
  password: z.string().min(8, {
    message: '密碼必須至少8個字元，包含大小寫字母、數字和特殊字元。',
  }),
});

export default function SignInForm({
  otpSent,
  verified,
}: {
  otpSent?: boolean;
  verified?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('🚨 - values', values);
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      console.log('🚨 - data', data);

      if (error) {
        console.error(error);
        if (error.code === 'invalid_credentials') {
          const emailExists = await checkEmailExists(values.email);
          if (emailExists) {
            toast.error('密碼錯誤');
          } else {
            toast.error('帳號不存在');
          }
        } else if (error.code === 'email_not_confirmed') {
          toast.error('帳號未驗證，請先驗證帳號');
        } else toast.error(error.message);

        return;
      }

      toast.success('登入成功');
      router.push('/');
    } catch (error) {
      console.error(error);
      toast.error('登入失敗，請再試一次');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (verified) {
      toast.success('帳號驗證成功，請登入');
      router.replace('/signin/email_signin');
    }
  }, [verified]);

  return (
    <div className='flex flex-col gap-6'>
      <Card>
        <CardHeader>
          <CardTitle className='text-xl'>登入</CardTitle>
          <CardDescription>輸入您的電子郵件以登入</CardDescription>
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
                    <FormLabel>Email</FormLabel>
                    <div className='relative'>
                      <IconMail className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                      <FormControl>
                        <Input
                          id='email'
                          type='email'
                          placeholder='m@example.com'
                          className='pl-9'
                          required
                          {...field}
                        />
                      </FormControl>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center'>
                      <FormLabel>密碼</FormLabel>
                      <Link
                        href='/signin/forgot_password'
                        className='ml-auto inline-block text-sm underline-offset-4 hover:underline'>
                        忘記密碼？
                      </Link>
                    </div>

                    <div className='relative'>
                      <IconLock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                      <FormControl>
                        <Input
                          id='password'
                          type='password'
                          placeholder='輸入密碼'
                          required
                          className='pl-9'
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormDescription className='text-xs text-muted-foreground'>
                      密碼至少8位數，包含大小寫字母、數字和特殊字元
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='w-full'>
                {isLoading ? (
                  <>
                    <IconLoader className='mr-2 h-4 w-4 animate-spin' />
                    登入中...
                  </>
                ) : (
                  '登入'
                )}
              </Button>

              <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                <span className='bg-background text-muted-foreground relative z-10 px-2'>或</span>
              </div>

              {otpSent ? (
                <ResendOtpButton email={form.getValues('email')} />
              ) : (
                <div className='text-center text-sm'>
                  還沒有帳號嗎？{' '}
                  <Link
                    href='/signin/signup'
                    className='underline underline-offset-4'>
                    註冊
                  </Link>
                </div>
              )}
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
