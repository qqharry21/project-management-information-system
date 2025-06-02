import ForgotPasswordForm from '@/components/auth-form/forgot-password-form';
import ResetPasswordForm from '@/components/auth-form/reset-password-form';
import SignInForm from '@/components/auth-form/signin-form';
import SignUpForm from '@/components/auth-form/signup-form';
import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

type PageProps = {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ verified: string; otp_sent: string }>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const viewProps = params.type;
  const getTitle = () => {
    switch (viewProps) {
      case 'forgot_password':
        return '重設密碼';
      case 'reset_password':
        return '重設密碼';
      case 'signup':
        return '註冊';
      case 'email_signin':
      default:
        return '登入';
    }
  };
  const getDescription = () => {
    switch (viewProps) {
      case 'email_signin':
        return '使用電子郵件登入以繼續';
      case 'forgot_password':
        return '重設密碼以繼續';
      case 'reset_password':
        return '重設密碼以繼續';
      case 'signup':
        return '註冊新帳號以繼續';
      default:
        return '登入以繼續';
    }
  };
  const getKeywords = () => {
    switch (viewProps) {
      case 'email_signin':
        return ['登入', '電子郵件', '帳號'];
      case 'forgot_password':
        return ['重設密碼', '忘記密碼', '帳號'];
      case 'reset_password':
        return ['重設密碼', '忘記密碼', '帳號'];
      case 'signup':
        return ['註冊', '新帳號', '帳號'];
      default:
        return ['登入', '帳號'];
    }
  };
  return {
    title: getTitle(),
    description: getDescription(),
    keywords: getKeywords(),
  };
}
export default async function SignInPage(props: PageProps) {
  const params = await props.params;
  const viewProp = params.type;
  const searchParams = await props.searchParams;
  const { verified, otp_sent } = searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && viewProp !== 'reset_password') {
    return redirect('/');
  } else if (!user && viewProp === 'reset_password') {
    return redirect('/signin');
  }

  const renderForm = () => {
    switch (params.type) {
      case 'signup':
        return <SignUpForm />;
      case 'forgot_password':
        return <ForgotPasswordForm />;
      case 'reset_password':
        return <ResetPasswordForm />;
      case 'email_signin':
        return (
          <SignInForm
            otpSent={otp_sent === 'true'}
            verified={verified === 'true'}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <span className='flex items-center gap-2 self-center font-medium'>HaoMo Tech</span>
        {renderForm()}
      </div>
    </div>
  );
}
