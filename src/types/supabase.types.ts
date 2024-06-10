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
      category: {
        Row: {
          description: string | null
          difficulty_level:
          | Database["public"]["Enums"]["difficulty_level"]
          | null
          gender: Database["public"]["Enums"]["gender"] | null
          id: number
          is_oficial: boolean | null
          maximum_age: number | null
          minimum_age: number | null
        }
        Insert: {
          description?: string | null
          difficulty_level?:
          | Database["public"]["Enums"]["difficulty_level"]
          | null
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: never
          is_oficial?: boolean | null
          maximum_age?: number | null
          minimum_age?: number | null
        }
        Update: {
          description?: string | null
          difficulty_level?:
          | Database["public"]["Enums"]["difficulty_level"]
          | null
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: never
          is_oficial?: boolean | null
          maximum_age?: number | null
          minimum_age?: number | null
        }
        Relationships: []
      }
      event: {
        Row: {
          address_full: string | null
          address_short: string | null
          banner_url: string | null
          created_at: string
          description: string | null
          event_date: string | null
          extras: Json | null
          id: number
          sponsors: Json | null
          status: Database["public"]["Enums"]["event_status"]
          title: string | null
          user_id: string
        }
        Insert: {
          address_full?: string | null
          address_short?: string | null
          banner_url?: string | null
          created_at?: string
          description?: string | null
          event_date?: string | null
          extras?: Json | null
          id?: number
          sponsors?: Json | null
          status?: Database["public"]["Enums"]["event_status"]
          title?: string | null
          user_id: string
        }
        Update: {
          address_full?: string | null
          address_short?: string | null
          banner_url?: string | null
          created_at?: string
          description?: string | null
          event_date?: string | null
          extras?: Json | null
          id?: number
          sponsors?: Json | null
          status?: Database["public"]["Enums"]["event_status"]
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_event_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      event_category: {
        Row: {
          category_id: number
          event_id: number
        }
        Insert: {
          category_id: number
          event_id: number
        }
        Update: {
          category_id?: number
          event_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "event_category_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_category_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "event"
            referencedColumns: ["id"]
          },
        ]
      }
      lots: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          event_id: number
          id: number
          price: number | null
          quantity: number | null
          start_date: string | null
          status: Database["public"]["Enums"]["lots_status"] | null
          title: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          event_id: number
          id?: number
          price?: number | null
          quantity?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["lots_status"] | null
          title?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          event_id?: number
          id?: number
          price?: number | null
          quantity?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["lots_status"] | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lots_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "event"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          address: string | null
          birth_date: string | null
          blod_type: Database["public"]["Enums"]["bloder_type"] | null
          city: string | null
          complement: string | null
          cpf: string | null
          created_at: string
          gender: Database["public"]["Enums"]["gender_type"] | null
          id: string
          level: Database["public"]["Enums"]["difficulty_level"] | null
          name: string | null
          neighborhood: string | null
          number: string | null
          phone: string | null
          phone_emergency: string | null
          state: string | null
          team: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          birth_date?: string | null
          blod_type?: Database["public"]["Enums"]["bloder_type"] | null
          city?: string | null
          complement?: string | null
          cpf?: string | null
          created_at?: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id: string
          level?: Database["public"]["Enums"]["difficulty_level"] | null
          name?: string | null
          neighborhood?: string | null
          number?: string | null
          phone?: string | null
          phone_emergency?: string | null
          state?: string | null
          team?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          birth_date?: string | null
          blod_type?: Database["public"]["Enums"]["bloder_type"] | null
          city?: string | null
          complement?: string | null
          cpf?: string | null
          created_at?: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: string
          level?: Database["public"]["Enums"]["difficulty_level"] | null
          name?: string | null
          neighborhood?: string | null
          number?: string | null
          phone?: string | null
          phone_emergency?: string | null
          state?: string | null
          team?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          category_id: number
          created_at: string
          event_id: number
          filename: string | null
          id: number
          lot_id: number
          profile_id: string
          status: Database["public"]["Enums"]["subscriptions_status"]
        }
        Insert: {
          category_id: number
          created_at?: string
          event_id: number
          filename?: string | null
          id?: number
          lot_id: number
          profile_id: string
          status?: Database["public"]["Enums"]["subscriptions_status"]
        }
        Update: {
          category_id?: number
          created_at?: string
          event_id?: number
          filename?: string | null
          id?: number
          lot_id?: number
          profile_id?: string
          status?: Database["public"]["Enums"]["subscriptions_status"]
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_lot_id_fkey"
            columns: ["lot_id"]
            isOneToOne: false
            referencedRelation: "lots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      bloder_type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
      difficulty_level: "beginner" | "intermediate" | "advanced"
      event_status: "draft" | "published" | "canceled" | "finished"
      gender: "male" | "female" | "mixed"
      gender_type: "male" | "female" | "other"
      lots_status: "Aberto" | "Fechado" | "Cancelado" | "Esgotado"
      subscriptions_status: "pending" | "approved" | "rejected" | "canceled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
    PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
    PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof PublicSchema["Enums"]
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never
