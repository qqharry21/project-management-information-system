import { create } from 'zustand';

type ViewMode = 'table' | 'grid';

export interface ProjectDashboardState {
  searchTerm: string;
  statusFilter: string;
  viewMode: ViewMode;
  currentPage: number;
  setSearchTerm: (v: string) => void;
  setStatusFilter: (v: string) => void;
  setViewMode: (v: ViewMode) => void;
  setCurrentPage: (v: number) => void;
}

export const useProjectDashboardStore = create<ProjectDashboardState>((set) => ({
  searchTerm: '',
  statusFilter: 'all',
  viewMode: 'table',
  currentPage: 1,
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setViewMode: (viewMode) => set({ viewMode }),
  setCurrentPage: (currentPage) => set({ currentPage }),
}));
