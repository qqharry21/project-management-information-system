import SignInForm from '@/components/auth-form/signin-form';

export default async function LoginPage(props: { params: Promise<{ type: string }> }) {
  const params = await props.params;
  const renderForm = () => {
    switch (params.type) {
      case 'email':
        return <SignInForm />;
    }
  };
  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <a
          href='#'
          className='flex items-center gap-2 self-center font-medium'>
          Acme Inc.
        </a>
        {renderForm()}
      </div>
    </div>
  );
}
