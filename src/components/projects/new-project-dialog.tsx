'use client';
import { ActionDialog } from '@/components/action-dialog';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createClient } from '@/lib/supabase/client';
import { useDialogStore } from '@/store/dialog-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconLoader2 } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

// Supabase Enum
const PROJECT_STATUS = ['active', 'completed', 'on_hold', 'cancelled'] as const;

// Zod schema
const schema = z.object({
  name: z.string().min(1, { message: 'Project name is required' }),
  client_id: z.string().min(1, { message: 'Client is required' }),
  status: z.enum(PROJECT_STATUS, { required_error: 'Status is required' }),
  description: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function NewProjectDialog() {
  const t = useTranslations();
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const closeDialog = useDialogStore((s) => s.closeDialog);

  // Fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from('clients').select('id, name').order('name');
      if (!error && data) setClients(data);
    };
    fetchClients();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      client_id: '',
      status: 'active',
      description: '',
      start_date: '',
      end_date: '',
    },
  });

  // 禁用 modal 關閉

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from('projects').insert([values]);
      if (error) {
        toast.error(t('Message.error') + ': ' + (error.message || t('Message.error')));
        return;
      }
      // revalidatePath (server action)
      // revalidateTag('projects');
      toast.success(t('Message.success'));
      closeDialog();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : t('Message.error');
      toast.error(t('Message.error') + ': ' + msg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ActionDialog
      title={t('Common.project_name')}
      description={t('Dashboard.project_management_desc')}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Common.project_name')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('Common.project_name')}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='client_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Common.client')}</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isLoading}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder={t('Common.client')} />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem
                          key={client.id}
                          value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Common.status')}</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isLoading}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder={t('Common.status')} />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECT_STATUS.map((status) => (
                        <SelectItem
                          key={status}
                          value={status}>
                          {t(`Status.${status}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Common.description')}</FormLabel>
                <FormControl>
                  <textarea
                    className='min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
                    placeholder={t('Common.description')}
                    disabled={isLoading}
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex gap-4'>
            <FormField
              control={form.control}
              name='start_date'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>{t('Common.start_date')}</FormLabel>
                  <FormControl>
                    <Input
                      type='date'
                      disabled={isLoading}
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='end_date'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>{t('Common.end_date')}</FormLabel>
                  <FormControl>
                    <Input
                      type='date'
                      disabled={isLoading}
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter className='mt-6'>
            <Button
              variant='outline'
              type='button'
              onClick={closeDialog}
              disabled={isLoading}>
              {t('Common.cancel')}
            </Button>
            <Button
              type='submit'
              disabled={isLoading}>
              {isLoading ? (
                <>
                  <IconLoader2 className='mr-2 h-4 w-4 animate-spin' />
                  {t('Message.loading')}
                </>
              ) : (
                t('Common.save')
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </ActionDialog>
  );
}
