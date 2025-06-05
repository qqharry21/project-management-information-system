'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import {
  AlertCircle,
  ArrowLeft,
  CalendarIcon,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  Edit,
  Eye,
  FileText,
  Globe,
  MoreHorizontal,
  Plus,
  Save,
  Share,
  Trash2,
  TrendingUp,
  Upload,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Zod schemas for form validation
const memberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Please select a role'),
});

const quoteSchema = z.object({
  version: z.string().min(1, 'Version is required'),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  notes: z.string().optional(),
  dueDate: z.date({
    required_error: 'Due date is required',
  }),
});

const milestoneSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.date({
    required_error: 'Date is required',
  }),
  status: z.string().min(1, 'Please select a status'),
});

const fileUploadSchema = z.object({
  files: z.any().refine((files) => files?.length > 0, 'Please select at least one file'),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().optional(),
});

// Sample project data (same as before)
const projectData = {
  id: '1',
  name: 'E-commerce Platform',
  description: 'Modern online shopping platform with advanced features',
  status: 'active',
  priority: 'high',
  progress: 75,
  startDate: '2024-01-15',
  endDate: '2024-06-30',
  budget: 50000,
  spent: 37500,
  category: 'web',
  client: 'TechCorp Inc.',
  websiteUrl: 'https://demo.techcorp.com',
  websiteStatus: 'online',
};

const teamMembers = [
  { id: '1', name: 'John Doe', role: 'Project Manager', email: 'john@company.com', avatar: 'JD' },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Frontend Developer',
    email: 'jane@company.com',
    avatar: 'JS',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    role: 'Backend Developer',
    email: 'mike@company.com',
    avatar: 'MJ',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    role: 'UI/UX Designer',
    email: 'sarah@company.com',
    avatar: 'SW',
  },
];

const projectTimeline = [
  {
    id: '1',
    title: 'Project Kickoff',
    date: '2024-01-15',
    status: 'completed',
    description: 'Initial project meeting and requirements gathering',
  },
  {
    id: '2',
    title: 'First Quote',
    date: '2024-01-20',
    status: 'completed',
    description: 'Initial project quote submitted',
  },
  {
    id: '3',
    title: 'Quote Confirmed',
    date: '2024-01-25',
    status: 'completed',
    description: 'Client approved the project quote',
  },
  {
    id: '4',
    title: 'Design Phase',
    date: '2024-02-01',
    status: 'completed',
    description: 'UI/UX design and wireframes',
  },
  {
    id: '5',
    title: 'Development Start',
    date: '2024-02-15',
    status: 'completed',
    description: 'Backend and frontend development begins',
  },
  {
    id: '6',
    title: 'Beta Testing',
    date: '2024-05-01',
    status: 'in-progress',
    description: 'Internal testing and bug fixes',
  },
  {
    id: '7',
    title: 'Client Review',
    date: '2024-05-15',
    status: 'pending',
    description: 'Client testing and feedback',
  },
  {
    id: '8',
    title: 'Final Delivery',
    date: '2024-06-30',
    status: 'pending',
    description: 'Project completion and handover',
  },
];

const quotes = [
  {
    id: '1',
    version: 'v1.0',
    date: '2024-01-20',
    amount: 45000,
    status: 'rejected',
    notes: 'Initial quote',
  },
  {
    id: '2',
    version: 'v1.1',
    date: '2024-01-22',
    amount: 50000,
    status: 'approved',
    notes: 'Revised with additional features',
  },
  {
    id: '3',
    version: 'v2.0',
    date: '2024-03-15',
    amount: 55000,
    status: 'pending',
    notes: 'Additional scope changes',
  },
];

const projectFiles = [
  {
    id: '1',
    name: 'Project Requirements.pdf',
    size: '2.4 MB',
    uploadDate: '2024-01-15',
    type: 'pdf',
  },
  { id: '2', name: 'Design Mockups.fig', size: '15.2 MB', uploadDate: '2024-02-01', type: 'figma' },
  { id: '3', name: 'Database Schema.sql', size: '0.8 MB', uploadDate: '2024-02-15', type: 'sql' },
  {
    id: '4',
    name: 'API Documentation.md',
    size: '1.2 MB',
    uploadDate: '2024-03-01',
    type: 'markdown',
  },
];

const tabOptions = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'team', label: 'Team' },
  { value: 'specs', label: 'Specifications' },
  { value: 'quotes', label: 'Quotes' },
  { value: 'timeline', label: 'Timeline' },
  { value: 'files', label: 'Files' },
  { value: 'report', label: 'Final Report' },
];

export default function ProjectDetail() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newMemberDialog, setNewMemberDialog] = useState(false);
  const [newQuoteDialog, setNewQuoteDialog] = useState(false);
  const [newMilestoneDialog, setNewMilestoneDialog] = useState(false);
  const [uploadFileDialog, setUploadFileDialog] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [specsPreviewMode, setSpecsPreviewMode] = useState(true);
  const [reportPreviewMode, setReportPreviewMode] = useState(true);

  const [specifications, setSpecifications] = useState(`# Project Specifications

## Overview
This e-commerce platform will provide a modern, responsive shopping experience with advanced features.

## Key Features
- User authentication and profiles
- Product catalog with search and filtering
- Shopping cart and checkout process
- Payment integration (Stripe, PayPal)
- Order management system
- Admin dashboard
- Inventory management
- Customer support chat

## Technical Requirements
- React.js frontend
- Node.js backend
- PostgreSQL database
- AWS hosting
- Mobile responsive design
- SEO optimization`);

  const [finalReport, setFinalReport] = useState(`# Project Final Report

## Executive Summary
The E-commerce Platform project has been successfully completed, delivering a modern and feature-rich online shopping experience.

## Project Achievements
- ✅ All core features implemented
- ✅ Mobile responsive design
- ✅ Performance optimization
- ✅ Security implementation
- ✅ SEO optimization

## Technical Deliverables
- Frontend application (React.js)
- Backend API (Node.js)
- Database schema (PostgreSQL)
- Deployment configuration
- Documentation

## Performance Metrics
- Page load time: < 2 seconds
- Mobile responsiveness: 100%
- Security score: A+
- SEO score: 95/100

## Recommendations
- Regular security updates
- Performance monitoring
- User feedback collection
- Feature enhancement roadmap`);

  // Form instances
  const memberForm = useForm<z.infer<typeof memberSchema>>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: '',
      email: '',
      role: '',
    },
  });

  const quoteForm = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      version: '',
      amount: 0,
      notes: '',
    },
  });

  const milestoneForm = useForm<z.infer<typeof milestoneSchema>>({
    resolver: zodResolver(milestoneSchema),
    defaultValues: {
      title: '',
      description: '',
      status: '',
    },
  });

  const fileForm = useForm<z.infer<typeof fileUploadSchema>>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      category: '',
      description: '',
    },
  });

  // Form submit handlers
  const onMemberSubmit = (values: z.infer<typeof memberSchema>) => {
    console.log('New member:', values);
    memberForm.reset();
    setNewMemberDialog(false);
  };

  const onQuoteSubmit = (values: z.infer<typeof quoteSchema>) => {
    console.log('New quote:', values);
    quoteForm.reset();
    setNewQuoteDialog(false);
  };

  const onMilestoneSubmit = (values: z.infer<typeof milestoneSchema>) => {
    console.log('New milestone:', values);
    milestoneForm.reset();
    setNewMilestoneDialog(false);
  };

  const onFileSubmit = (values: z.infer<typeof fileUploadSchema>) => {
    console.log('File upload:', values);
    fileForm.reset();
    setUploadFileDialog(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className='h-4 w-4 text-green-600' />;
      case 'in-progress':
        return <Clock className='h-4 w-4 text-blue-600' />;
      case 'pending':
        return <AlertCircle className='h-4 w-4 text-yellow-600' />;
      default:
        return <Clock className='h-4 w-4 text-gray-600' />;
    }
  };

  const renderMarkdown = (content: string) => {
    // Simple markdown rendering (in a real app, use a proper markdown library)
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return (
          <h1
            key={index}
            className='text-2xl font-bold mt-6 mb-4'>
            {line.slice(2)}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2
            key={index}
            className='text-xl font-semibold mt-5 mb-3'>
            {line.slice(3)}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3
            key={index}
            className='text-lg font-medium mt-4 mb-2'>
            {line.slice(4)}
          </h3>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li
            key={index}
            className='ml-4 list-disc'>
            {line.slice(2)}
          </li>
        );
      }
      if (line.startsWith('✅ ')) {
        return (
          <div
            key={index}
            className='flex items-center gap-2 text-green-600'>
            <CheckCircle className='h-4 w-4' />
            {line.slice(2)}
          </div>
        );
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return (
        <p
          key={index}
          className='mb-2'>
          {line}
        </p>
      );
    });
  };

  return (
    <div className='container mx-auto p-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='sm'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Projects
          </Button>
          <div>
            <h1 className='text-3xl font-bold'>{projectData.name}</h1>
            <p className='text-muted-foreground'>{projectData.client}</p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <Save className='h-4 w-4 mr-2' /> : <Edit className='h-4 w-4 mr-2' />}
            {isEditing ? 'Save' : 'Edit'}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive'>
                <Trash2 className='h-4 w-4 mr-2' />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Project</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this project? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className='bg-destructive text-destructive-foreground'>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Responsive Tabs */}
      <div className='space-y-6'>
        {/* Mobile Tab Selector */}
        <div className='md:hidden'>
          <Select
            value={activeTab}
            onValueChange={setActiveTab}>
            <SelectTrigger className='w-full'>
              <SelectValue>{tabOptions.find((tab) => tab.value === activeTab)?.label}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {tabOptions.map((tab) => (
                <SelectItem
                  key={tab.value}
                  value={tab.value}>
                  {tab.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className='space-y-6'>
          <TabsList className='hidden md:grid w-full grid-cols-7'>
            {tabOptions.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent
            value='dashboard'
            className='space-y-6'>
            {/* Status Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Total Budget</CardTitle>
                  <DollarSign className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{formatCurrency(projectData.budget)}</div>
                  <p className='text-xs text-muted-foreground'>
                    {formatCurrency(projectData.spent)} spent (
                    {Math.round((projectData.spent / projectData.budget) * 100)}%)
                  </p>
                  <Progress
                    value={(projectData.spent / projectData.budget) * 100}
                    className='mt-2'
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Team Members</CardTitle>
                  <Users className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{teamMembers.length}</div>
                  <p className='text-xs text-muted-foreground'>Active members</p>
                  <div className='flex -space-x-2 mt-2'>
                    {teamMembers.slice(0, 3).map((member) => (
                      <Avatar
                        key={member.id}
                        className='h-6 w-6 border-2 border-background'>
                        <AvatarFallback className='text-xs'>{member.avatar}</AvatarFallback>
                      </Avatar>
                    ))}
                    {teamMembers.length > 3 && (
                      <div className='h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs'>
                        +{teamMembers.length - 3}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Project Progress</CardTitle>
                  <TrendingUp className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{projectData.progress}%</div>
                  <p className='text-xs text-muted-foreground'>Completion rate</p>
                  <Progress
                    value={projectData.progress}
                    className='mt-2'
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Website Status</CardTitle>
                  <Globe className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='flex items-center gap-2'>
                    <Badge className='bg-green-100 text-green-800'>Online</Badge>
                  </div>
                  <p className='text-xs text-muted-foreground mt-1'>{projectData.websiteUrl}</p>
                  <Button
                    variant='outline'
                    size='sm'
                    className='mt-2 h-7'>
                    <Eye className='h-3 w-3 mr-1' />
                    View Site
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Project Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
                <CardDescription>Key milestones and progress tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {projectTimeline.map((item, index) => (
                    <div
                      key={item.id}
                      className='flex items-start gap-4'>
                      <div className='flex flex-col items-center'>
                        {getStatusIcon(item.status)}
                        {index < projectTimeline.length - 1 && (
                          <div className='w-px h-8 bg-border mt-2' />
                        )}
                      </div>
                      <div className='flex-1 space-y-1'>
                        <div className='flex items-center justify-between'>
                          <h4 className='font-medium'>{item.title}</h4>
                          <div className='flex items-center gap-2'>
                            <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                            <span className='text-sm text-muted-foreground'>
                              {formatDate(item.date)}
                            </span>
                          </div>
                        </div>
                        <p className='text-sm text-muted-foreground'>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent
            value='team'
            className='space-y-6'>
            <div className='flex justify-between items-center'>
              <div>
                <h2 className='text-2xl font-bold'>Team Members</h2>
                <p className='text-muted-foreground'>Manage project team members and their roles</p>
              </div>
              <Dialog
                open={newMemberDialog}
                onOpenChange={setNewMemberDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className='h-4 w-4 mr-2' />
                    Add Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Team Member</DialogTitle>
                    <DialogDescription>Add a new member to the project team</DialogDescription>
                  </DialogHeader>
                  <Form {...memberForm}>
                    <form
                      onSubmit={memberForm.handleSubmit(onMemberSubmit)}
                      className='space-y-4'>
                      <FormField
                        control={memberForm.control}
                        name='name'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Enter member name'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={memberForm.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type='email'
                                placeholder='Enter email address'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={memberForm.control}
                        name='role'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select role' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value='Project Manager'>Project Manager</SelectItem>
                                <SelectItem value='Frontend Developer'>
                                  Frontend Developer
                                </SelectItem>
                                <SelectItem value='Backend Developer'>Backend Developer</SelectItem>
                                <SelectItem value='UI/UX Designer'>UI/UX Designer</SelectItem>
                                <SelectItem value='QA Tester'>QA Tester</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button
                          type='button'
                          variant='outline'
                          onClick={() => setNewMemberDialog(false)}>
                          Cancel
                        </Button>
                        <Button type='submit'>Add Member</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className='p-0'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className='w-[100px]'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className='flex items-center gap-3'>
                            <Avatar>
                              <AvatarFallback>{member.avatar}</AvatarFallback>
                            </Avatar>
                            <span className='font-medium'>{member.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant='ghost'
                                size='sm'>
                                <MoreHorizontal className='h-4 w-4' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuItem>
                                <Edit className='h-4 w-4 mr-2' />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className='text-destructive'>
                                <Trash2 className='h-4 w-4 mr-2' />
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Specifications Tab */}
          <TabsContent
            value='specs'
            className='space-y-6'>
            <div className='flex justify-between items-center'>
              <div>
                <h2 className='text-2xl font-bold'>Project Specifications</h2>
                <p className='text-muted-foreground'>
                  Detailed project requirements and specifications
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <div className='flex items-center space-x-2'>
                  <Switch
                    id='specs-preview'
                    checked={specsPreviewMode}
                    onCheckedChange={setSpecsPreviewMode}
                  />
                  <Label htmlFor='specs-preview'>Preview</Label>
                </div>
                <Button variant='outline'>
                  <Download className='h-4 w-4 mr-2' />
                  Export PDF
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className='p-6'>
                {specsPreviewMode ? (
                  <div className='prose max-w-none'>{renderMarkdown(specifications)}</div>
                ) : (
                  <Textarea
                    value={specifications}
                    onChange={(e) => setSpecifications(e.target.value)}
                    className='min-h-[500px] font-mono text-sm'
                    placeholder='Enter project specifications...'
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quotes Tab */}
          <TabsContent
            value='quotes'
            className='space-y-6'>
            <div className='flex justify-between items-center'>
              <div>
                <h2 className='text-2xl font-bold'>Project Quotes</h2>
                <p className='text-muted-foreground'>Manage project quotes and pricing history</p>
              </div>
              <Dialog
                open={newQuoteDialog}
                onOpenChange={setNewQuoteDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className='h-4 w-4 mr-2' />
                    New Quote
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Quote</DialogTitle>
                    <DialogDescription>Generate a new quote for the project</DialogDescription>
                  </DialogHeader>
                  <Form {...quoteForm}>
                    <form
                      onSubmit={quoteForm.handleSubmit(onQuoteSubmit)}
                      className='space-y-4'>
                      <FormField
                        control={quoteForm.control}
                        name='version'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Version</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='e.g., v2.1'
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>Version identifier for this quote</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={quoteForm.control}
                        name='amount'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount ($)</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                placeholder='50000'
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={quoteForm.control}
                        name='dueDate'
                        render={({ field }) => (
                          <FormItem className='flex flex-col'>
                            <FormLabel>Due Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={'outline'}
                                    className={cn(
                                      'w-full pl-3 text-left font-normal',
                                      !field.value && 'text-muted-foreground'
                                    )}>
                                    {field.value ? (
                                      format(field.value, 'PPP')
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className='w-auto p-0'
                                align='start'>
                                <Calendar
                                  mode='single'
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={quoteForm.control}
                        name='notes'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder='Additional notes or changes...'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button
                          type='button'
                          variant='outline'
                          onClick={() => setNewQuoteDialog(false)}>
                          Cancel
                        </Button>
                        <Button type='submit'>Create Quote</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className='p-0'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Version</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className='w-[100px]'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quotes.map((quote) => (
                      <TableRow key={quote.id}>
                        <TableCell className='font-medium'>{quote.version}</TableCell>
                        <TableCell>{formatDate(quote.date)}</TableCell>
                        <TableCell>{formatCurrency(quote.amount)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(quote.status)}>{quote.status}</Badge>
                        </TableCell>
                        <TableCell>{quote.notes}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant='ghost'
                                size='sm'>
                                <MoreHorizontal className='h-4 w-4' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuItem>
                                <Eye className='h-4 w-4 mr-2' />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className='h-4 w-4 mr-2' />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className='h-4 w-4 mr-2' />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className='text-destructive'>
                                <Trash2 className='h-4 w-4 mr-2' />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent
            value='timeline'
            className='space-y-6'>
            <div className='flex justify-between items-center'>
              <div>
                <h2 className='text-2xl font-bold'>Project Timeline</h2>
                <p className='text-muted-foreground'>
                  Manage project milestones and progress tracking
                </p>
              </div>
              <Dialog
                open={newMilestoneDialog}
                onOpenChange={setNewMilestoneDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className='h-4 w-4 mr-2' />
                    Add Milestone
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Milestone</DialogTitle>
                    <DialogDescription>Create a new project milestone</DialogDescription>
                  </DialogHeader>
                  <Form {...milestoneForm}>
                    <form
                      onSubmit={milestoneForm.handleSubmit(onMilestoneSubmit)}
                      className='space-y-4'>
                      <FormField
                        control={milestoneForm.control}
                        name='title'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Milestone title'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={milestoneForm.control}
                        name='description'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder='Describe the milestone...'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={milestoneForm.control}
                        name='date'
                        render={({ field }) => (
                          <FormItem className='flex flex-col'>
                            <FormLabel>Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={'outline'}
                                    className={cn(
                                      'w-full pl-3 text-left font-normal',
                                      !field.value && 'text-muted-foreground'
                                    )}>
                                    {field.value ? (
                                      format(field.value, 'PPP')
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className='w-auto p-0'
                                align='start'>
                                <Calendar
                                  mode='single'
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={milestoneForm.control}
                        name='status'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select status' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value='pending'>Pending</SelectItem>
                                <SelectItem value='in-progress'>In Progress</SelectItem>
                                <SelectItem value='completed'>Completed</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button
                          type='button'
                          variant='outline'
                          onClick={() => setNewMilestoneDialog(false)}>
                          Cancel
                        </Button>
                        <Button type='submit'>Add Milestone</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className='p-6'>
                <div className='space-y-6'>
                  {projectTimeline.map((item, index) => (
                    <div
                      key={item.id}
                      className='flex items-start gap-4 group'>
                      <div className='flex flex-col items-center'>
                        {getStatusIcon(item.status)}
                        {index < projectTimeline.length - 1 && (
                          <div className='w-px h-16 bg-border mt-2' />
                        )}
                      </div>
                      <div className='flex-1 space-y-2'>
                        <div className='flex items-center justify-between'>
                          <h4 className='font-medium'>{item.title}</h4>
                          <div className='flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                            <Button
                              variant='ghost'
                              size='sm'>
                              <Edit className='h-3 w-3' />
                            </Button>
                            <Button
                              variant='ghost'
                              size='sm'>
                              <Trash2 className='h-3 w-3' />
                            </Button>
                          </div>
                        </div>
                        <div className='flex items-center gap-4'>
                          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                          <span className='text-sm text-muted-foreground'>
                            {formatDate(item.date)}
                          </span>
                        </div>
                        <p className='text-sm text-muted-foreground'>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Files Tab */}
          <TabsContent
            value='files'
            className='space-y-6'>
            <div className='flex justify-between items-center'>
              <div>
                <h2 className='text-2xl font-bold'>Project Files</h2>
                <p className='text-muted-foreground'>Manage project documents and assets</p>
              </div>
              <Dialog
                open={uploadFileDialog}
                onOpenChange={setUploadFileDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Upload className='h-4 w-4 mr-2' />
                    Upload File
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Files</DialogTitle>
                    <DialogDescription>Upload project files and documents</DialogDescription>
                  </DialogHeader>
                  <Form {...fileForm}>
                    <form
                      onSubmit={fileForm.handleSubmit(onFileSubmit)}
                      className='space-y-4'>
                      <FormField
                        control={fileForm.control}
                        name='files'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Files</FormLabel>
                            <FormControl>
                              <div className='border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center'>
                                <Upload className='h-8 w-8 mx-auto mb-2 text-muted-foreground' />
                                <p className='text-sm text-muted-foreground mb-2'>
                                  Drag and drop files here, or click to browse
                                </p>
                                <Input
                                  type='file'
                                  multiple
                                  className='hidden'
                                  onChange={(e) => field.onChange(e.target.files)}
                                />
                                <Button
                                  type='button'
                                  variant='outline'
                                  size='sm'>
                                  Browse Files
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={fileForm.control}
                        name='category'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select category' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value='requirements'>Requirements</SelectItem>
                                <SelectItem value='design'>Design</SelectItem>
                                <SelectItem value='development'>Development</SelectItem>
                                <SelectItem value='testing'>Testing</SelectItem>
                                <SelectItem value='documentation'>Documentation</SelectItem>
                                <SelectItem value='other'>Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={fileForm.control}
                        name='description'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder='File description...'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button
                          type='button'
                          variant='outline'
                          onClick={() => setUploadFileDialog(false)}>
                          Cancel
                        </Button>
                        <Button type='submit'>Upload Files</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className='p-0'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>File Name</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className='w-[100px]'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projectFiles.map((file) => (
                      <TableRow key={file.id}>
                        <TableCell>
                          <div className='flex items-center gap-2'>
                            <FileText className='h-4 w-4 text-muted-foreground' />
                            <span className='font-medium'>{file.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell>{formatDate(file.uploadDate)}</TableCell>
                        <TableCell>
                          <Badge variant='outline'>{file.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant='ghost'
                                size='sm'>
                                <MoreHorizontal className='h-4 w-4' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuItem>
                                <Download className='h-4 w-4 mr-2' />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share className='h-4 w-4 mr-2' />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className='text-destructive'>
                                <Trash2 className='h-4 w-4 mr-2' />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Final Report Tab */}
          <TabsContent
            value='report'
            className='space-y-6'>
            <div className='flex justify-between items-center'>
              <div>
                <h2 className='text-2xl font-bold'>Final Report</h2>
                <p className='text-muted-foreground'>Project completion report and deliverables</p>
              </div>
              <div className='flex items-center gap-2'>
                <div className='flex items-center space-x-2'>
                  <Switch
                    id='report-preview'
                    checked={reportPreviewMode}
                    onCheckedChange={setReportPreviewMode}
                  />
                  <Label htmlFor='report-preview'>Preview</Label>
                </div>
                <Button variant='outline'>
                  <Download className='h-4 w-4 mr-2' />
                  Export PDF
                </Button>
                <Button variant='outline'>
                  <Share className='h-4 w-4 mr-2' />
                  Share Report
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className='p-6'>
                {reportPreviewMode ? (
                  <div className='prose max-w-none'>{renderMarkdown(finalReport)}</div>
                ) : (
                  <Textarea
                    value={finalReport}
                    onChange={(e) => setFinalReport(e.target.value)}
                    className='min-h-[600px] font-mono text-sm'
                    placeholder='Enter final project report...'
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
