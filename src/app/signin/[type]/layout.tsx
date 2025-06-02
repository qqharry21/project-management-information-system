export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <span className='flex items-center gap-2 self-center font-medium'>HaoMo Tech</span>
        <div className='flex flex-col gap-6'>
          {children}
          <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
            點擊繼續，即表示您同意我們的 <a href='#'>服務條款</a> 和 <a href='#'>隱私政策</a>。
          </div>
        </div>
      </div>
    </div>
  );
}
