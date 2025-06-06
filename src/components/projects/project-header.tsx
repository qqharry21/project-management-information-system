'use client';

import { useDialogStore } from '@/store/dialog-store';
import { IconPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';

export const ProjectHeader = () => {
  const t = useTranslations();
  const { openDialog } = useDialogStore();

  return (
    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>{t('Dashboard.project_management')}</h1>
        <p className='text-muted-foreground'>{t('Dashboard.project_management_desc')}</p>
      </div>
      <Button
        type='button'
        onClick={() => openDialog('newProject')}
        className='flex items-center gap-2'>
        <IconPlus className='w-4 h-4' />
        {t('Common.add_project')}
      </Button>
    </div>
  );
};
