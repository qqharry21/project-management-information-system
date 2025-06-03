export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      closure_reports: {
        Row: {
          id: string
          project_id: string | null
          report_url: string
          submitted_at: string | null
          submitted_by: string | null
        }
        Insert: {
          id?: string
          project_id?: string | null
          report_url: string
          submitted_at?: string | null
          submitted_by?: string | null
        }
        Update: {
          id?: string
          project_id?: string | null
          report_url?: string
          submitted_at?: string | null
          submitted_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "closure_reports_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "closure_reports_submitted_by_fkey"
            columns: ["submitted_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          client_id: string | null
          contract_number: string | null
          created_at: string | null
          id: string
          project_id: string | null
          signed_at: string | null
          status: Database["public"]["Enums"]["contract_status"]
          title: string | null
        }
        Insert: {
          client_id?: string | null
          contract_number?: string | null
          created_at?: string | null
          id?: string
          project_id?: string | null
          signed_at?: string | null
          status?: Database["public"]["Enums"]["contract_status"]
          title?: string | null
        }
        Update: {
          client_id?: string | null
          contract_number?: string | null
          created_at?: string | null
          id?: string
          project_id?: string | null
          signed_at?: string | null
          status?: Database["public"]["Enums"]["contract_status"]
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contracts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          category: string | null
          created_at: string | null
          id: string
          paid_at: string | null
          project_id: string | null
        }
        Insert: {
          amount: number
          category?: string | null
          created_at?: string | null
          id?: string
          paid_at?: string | null
          project_id?: string | null
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string | null
          id?: string
          paid_at?: string | null
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      income: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          project_id: string | null
          received_at: string | null
          source: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          project_id?: string | null
          received_at?: string | null
          source?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          project_id?: string | null
          received_at?: string | null
          source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "income_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          client_id: string | null
          created_at: string | null
          due_date: string | null
          id: string
          invoice_number: string | null
          issued_at: string | null
          project_id: string | null
          status: Database["public"]["Enums"]["invoice_status"]
        }
        Insert: {
          amount: number
          client_id?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          invoice_number?: string | null
          issued_at?: string | null
          project_id?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
        }
        Update: {
          amount?: number
          client_id?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          invoice_number?: string | null
          issued_at?: string | null
          project_id?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_files: {
        Row: {
          file_type: string | null
          file_url: string
          id: string
          project_id: string | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          file_type?: string | null
          file_url: string
          id?: string
          project_id?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          file_type?: string | null
          file_url?: string
          id?: string
          project_id?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_files_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      project_team_members: {
        Row: {
          id: string
          joined_at: string | null
          project_id: string | null
          role: Database["public"]["Enums"]["role_type"]
          user_id: string | null
        }
        Insert: {
          id?: string
          joined_at?: string | null
          project_id?: string | null
          role?: Database["public"]["Enums"]["role_type"]
          user_id?: string | null
        }
        Update: {
          id?: string
          joined_at?: string | null
          project_id?: string | null
          role?: Database["public"]["Enums"]["role_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_team_members_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_team_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      project_timeline_events: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          project_id: string | null
          start_date: string | null
          title: string
          type: Database["public"]["Enums"]["timeline_event_type"]
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          project_id?: string | null
          start_date?: string | null
          title: string
          type?: Database["public"]["Enums"]["timeline_event_type"]
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          project_id?: string | null
          start_date?: string | null
          title?: string
          type?: Database["public"]["Enums"]["timeline_event_type"]
        }
        Relationships: [
          {
            foreignKeyName: "project_timeline_events_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          client_id: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          name: string
          start_date: string | null
          status: Database["public"]["Enums"]["project_status"]
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"]
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"]
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      quotations: {
        Row: {
          amount: number
          client_id: string | null
          created_at: string | null
          id: string
          issued_at: string | null
          project_id: string | null
          quotation_number: string | null
          status: Database["public"]["Enums"]["quotation_status"]
        }
        Insert: {
          amount: number
          client_id?: string | null
          created_at?: string | null
          id?: string
          issued_at?: string | null
          project_id?: string | null
          quotation_number?: string | null
          status?: Database["public"]["Enums"]["quotation_status"]
        }
        Update: {
          amount?: number
          client_id?: string | null
          created_at?: string | null
          id?: string
          issued_at?: string | null
          project_id?: string | null
          quotation_number?: string | null
          status?: Database["public"]["Enums"]["quotation_status"]
        }
        Relationships: [
          {
            foreignKeyName: "quotations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          client_id: string | null
          created_at: string | null
          end_date: string | null
          id: string
          plan_name: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["subscription_status"]
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          plan_name?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          plan_name?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          is_active: boolean | null
          organization: string | null
          phone: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          is_active?: boolean | null
          organization?: string | null
          phone?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          is_active?: boolean | null
          organization?: string | null
          phone?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["role_type"]
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["role_type"]
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["role_type"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_user_email_exists: {
        Args: { target_email: string }
        Returns: boolean
      }
      get_user_verification_status: {
        Args: { target_email: string }
        Returns: string
      }
    }
    Enums: {
      contract_status: "draft" | "signed" | "active" | "expired" | "cancelled"
      invoice_status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
      project_status: "active" | "completed" | "on_hold" | "cancelled"
      quotation_status: "draft" | "sent" | "accepted" | "rejected"
      role_type: "admin" | "project_manager" | "team_member" | "client"
      subscription_status: "active" | "expired" | "cancelled"
      timeline_event_type: "milestone" | "task" | "meeting"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      contract_status: ["draft", "signed", "active", "expired", "cancelled"],
      invoice_status: ["draft", "sent", "paid", "overdue", "cancelled"],
      project_status: ["active", "completed", "on_hold", "cancelled"],
      quotation_status: ["draft", "sent", "accepted", "rejected"],
      role_type: ["admin", "project_manager", "team_member", "client"],
      subscription_status: ["active", "expired", "cancelled"],
      timeline_event_type: ["milestone", "task", "meeting"],
    },
  },
} as const
