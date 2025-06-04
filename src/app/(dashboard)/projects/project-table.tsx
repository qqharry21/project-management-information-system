'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { createClient } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Constants, Tables } from '@supabase/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Project status enum
const PROJECT_STATUS = Constants.public.Enums.project_status;

// Add Project form schema
const addProjectSchema = z.object({
  name: z.string().min(1, '專案名稱不能為空'),
  client_id: z.string().min(1, '客戶不能為空'),
  status: z.enum(PROJECT_STATUS),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  description: z.string().optional(),
});

type AddProjectForm = z.infer<typeof addProjectSchema>;

type ProjectWithClient = Tables<'projects'> & { clients?: { name: string } };

type ProjectTableProps = {
  projects: ProjectWithClient[];
};

export default function ProjectTable({ projects }: ProjectTableProps) {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className='text-center text-muted-foreground'>
              No projects found.
            </TableCell>
          </TableRow>
        ) : (
          projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.clients?.name || project.client_id}</TableCell>
              <TableCell className='capitalize'>{project.status}</TableCell>
              <TableCell>
                {project.start_date ? new Date(project.start_date).toLocaleDateString() : '-'}
              </TableCell>
              <TableCell>
                {project.end_date ? new Date(project.end_date).toLocaleDateString() : '-'}
              </TableCell>
              <TableCell className='flex gap-2 justify-end'>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => router.push(`/projects/${project.id}`)}>
                  Edit
                </Button>
                <Button
                  size='sm'
                  variant='destructive'
                  onClick={() => alert('Delete not implemented yet')}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

// Add Project Dialog as a subcomponent
ProjectTable.AddProjectDialog = function AddProjectDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const router = useRouter();

  // Fetch clients for select
  useState(() => {
    (async () => {
      const supabase = createClient();
      const { data } = await supabase.from('clients').select('id, name').order('name');
      setClients(data || []);
    })();
  });

  const form = useForm<AddProjectForm>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      name: '',
      client_id: '',
      status: 'active',
      start_date: '',
      end_date: '',
      description: '',
    },
  });

  async function onSubmit(values: AddProjectForm) {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.from('projects').insert([values]);
    setLoading(false);
    if (!error) {
      setOpen(false);
      router.refresh();
    } else {
      form.setError('name', { message: error.message });
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Project</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Project name'
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
                  <FormLabel>Client</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={clients.length === 0}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select client' />
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
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PROJECT_STATUS.map((status) => (
                          <SelectItem
                            key={status}
                            value={status}
                            className='capitalize'>
                            {status.replace('_', ' ')}
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
              name='start_date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input
                      type='date'
                      {...field}
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
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input
                      type='date'
                      {...field}
                    />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Description (optional)'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type='submit'
                disabled={loading}>
                {loading ? 'Adding...' : 'Add Project'}
              </Button>
              <DialogClose asChild>
                <Button
                  type='button'
                  variant='outline'>
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
