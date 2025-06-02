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
import { IconLoader, IconLock, IconLockUp, IconMail, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { toast } from 'sonner';

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: '名稱必須至少2個字元。',
    }),
    email: z.string().email({
      message: '請輸入有效的電子郵件地址。',
    }),
    password: z.string().refine(
      (password) => {
        if (password.length < 8) {
          return false;
        }
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*+=\-_/]/.test(password);
        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
      },
      {
        message: '密碼必須至少8個字元，包含大小寫字母、數字和特殊字元。',
      }
    ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '密碼不匹配',
    path: ['confirmPassword'],
  });

export default function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = form.watch('password');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
          },
        },
      });

      let authError = null;
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        authError = {
          name: 'AuthApiError',
          message: '帳號已存在',
        };
      } else if (error)
        authError = {
          name: error.name,
          message: error.message,
        };

      if (authError) {
        router.replace('/signin/email_signin');
        toast.error(authError.message);
        return;
      }

      toast.success('帳號建立成功', {
        description: '請檢查您的電子郵件以驗證您的帳號。',
      });

      router.push('/signin/email_signin?otp_sent=true');
    } catch (error) {
      console.error(error);
      toast.error('發生錯誤，請再試一次。');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>建立帳號</CardTitle>
        <CardDescription>輸入您的電子郵件以建立帳號</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名稱</FormLabel>
                  <div className='relative'>
                    <IconUser className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='張三'
                        className='pl-9'
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
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>電子郵件</FormLabel>
                  <div className='relative'>
                    <IconMail className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='m@example.com'
                        className='pl-9'
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
                  <FormLabel>密碼</FormLabel>
                  <div className='relative'>
                    <IconLock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                    <FormControl>
                      <Input
                        type='password'
                        className='pl-9'
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {password && (
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>確認密碼</FormLabel>
                    <div className='relative'>
                      <IconLockUp className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                      <FormControl>
                        <Input
                          type='password'
                          {...field}
                          className='pl-9'
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button
              type='submit'
              className='w-full'
              disabled={isLoading}>
              {isLoading ? (
                <>
                  <IconLoader className='mr-2 h-4 w-4 animate-spin' />
                  建立帳號中...
                </>
              ) : (
                '建立帳號'
              )}
            </Button>
            <div className='text-center text-sm'>
              已經有帳號嗎？{' '}
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
  );
}
