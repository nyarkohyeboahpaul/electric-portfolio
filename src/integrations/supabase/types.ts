export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          body: string | null
          category: string | null
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          og_image_url: string | null
          read_time: number | null
          scheduled_at: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          body?: string | null
          category?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          read_time?: number | null
          scheduled_at?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          body?: string | null
          category?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          read_time?: number | null
          scheduled_at?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      certifications: {
        Row: {
          display_order: number
          icon_name: string | null
          id: string
          issuer: string | null
          name: string
          year: string | null
        }
        Insert: {
          display_order?: number
          icon_name?: string | null
          id?: string
          issuer?: string | null
          name: string
          year?: string | null
        }
        Update: {
          display_order?: number
          icon_name?: string | null
          id?: string
          issuer?: string | null
          name?: string
          year?: string | null
        }
        Relationships: []
      }
      experience: {
        Row: {
          bullets: string[] | null
          company_or_institution: string
          date_range: string | null
          display_order: number
          id: string
          role_or_degree: string
          type: string
        }
        Insert: {
          bullets?: string[] | null
          company_or_institution: string
          date_range?: string | null
          display_order?: number
          id?: string
          role_or_degree: string
          type?: string
        }
        Update: {
          bullets?: string[] | null
          company_or_institution?: string
          date_range?: string | null
          display_order?: number
          id?: string
          role_or_degree?: string
          type?: string
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          alt_text: string | null
          category: string | null
          created_at: string
          description: string | null
          display_order: number
          id: string
          image_url: string
          title: string | null
        }
        Insert: {
          alt_text?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url: string
          title?: string | null
        }
        Update: {
          alt_text?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string
          title?: string | null
        }
        Relationships: []
      }
      media_files: {
        Row: {
          created_at: string
          filename: string
          id: string
          size_bytes: number | null
          type: string | null
          url: string
          used_in: string | null
        }
        Insert: {
          created_at?: string
          filename: string
          id?: string
          size_bytes?: number | null
          type?: string | null
          url: string
          used_in?: string | null
        }
        Update: {
          created_at?: string
          filename?: string
          id?: string
          size_bytes?: number | null
          type?: string | null
          url?: string
          used_in?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          archived: boolean
          body: string
          created_at: string
          id: string
          read: boolean
          sender_email: string
          sender_name: string
          subject: string | null
        }
        Insert: {
          archived?: boolean
          body: string
          created_at?: string
          id?: string
          read?: boolean
          sender_email: string
          sender_name: string
          subject?: string | null
        }
        Update: {
          archived?: boolean
          body?: string
          created_at?: string
          id?: string
          read?: boolean
          sender_email?: string
          sender_name?: string
          subject?: string | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          avatar_url: string | null
          bio: string | null
          cv_url: string | null
          email: string | null
          eyebrow: string | null
          hero_cta1_link: string | null
          hero_cta1_text: string | null
          hero_cta2_link: string | null
          hero_cta2_text: string | null
          id: string
          name: string
          roles: string[]
          short_bio: string | null
          stat1_label: string | null
          stat1_value: number | null
          stat2_label: string | null
          stat2_value: number | null
          stat3_label: string | null
          stat3_value: number | null
          tagline: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          cv_url?: string | null
          email?: string | null
          eyebrow?: string | null
          hero_cta1_link?: string | null
          hero_cta1_text?: string | null
          hero_cta2_link?: string | null
          hero_cta2_text?: string | null
          id?: string
          name?: string
          roles?: string[]
          short_bio?: string | null
          stat1_label?: string | null
          stat1_value?: number | null
          stat2_label?: string | null
          stat2_value?: number | null
          stat3_label?: string | null
          stat3_value?: number | null
          tagline?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          cv_url?: string | null
          email?: string | null
          eyebrow?: string | null
          hero_cta1_link?: string | null
          hero_cta1_text?: string | null
          hero_cta2_link?: string | null
          hero_cta2_text?: string | null
          id?: string
          name?: string
          roles?: string[]
          short_bio?: string | null
          stat1_label?: string | null
          stat1_value?: number | null
          stat2_label?: string | null
          stat2_value?: number | null
          stat3_label?: string | null
          stat3_value?: number | null
          tagline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          display_order: number
          github_url: string | null
          id: string
          images: string[] | null
          live_url: string | null
          role: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          tools: string[] | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          github_url?: string | null
          id?: string
          images?: string[] | null
          live_url?: string | null
          role?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          tools?: string[] | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          github_url?: string | null
          id?: string
          images?: string[] | null
          live_url?: string | null
          role?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          tools?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          description: string | null
          display_order: number
          featured: boolean
          icon_name: string
          id: string
          project_count_label: string | null
          title: string
        }
        Insert: {
          description?: string | null
          display_order?: number
          featured?: boolean
          icon_name?: string
          id?: string
          project_count_label?: string | null
          title: string
        }
        Update: {
          description?: string | null
          display_order?: number
          featured?: boolean
          icon_name?: string
          id?: string
          project_count_label?: string | null
          title?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          display_order: number
          group_name: string
          id: string
          percentage: number
          skill_name: string
        }
        Insert: {
          display_order?: number
          group_name: string
          id?: string
          percentage?: number
          skill_name: string
        }
        Update: {
          display_order?: number
          group_name?: string
          id?: string
          percentage?: number
          skill_name?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          client_name: string
          client_role: string | null
          company: string | null
          display_order: number
          id: string
          published: boolean
          quote: string
          rating: number
        }
        Insert: {
          avatar_url?: string | null
          client_name: string
          client_role?: string | null
          company?: string | null
          display_order?: number
          id?: string
          published?: boolean
          quote: string
          rating?: number
        }
        Update: {
          avatar_url?: string | null
          client_name?: string
          client_role?: string | null
          company?: string | null
          display_order?: number
          id?: string
          published?: boolean
          quote?: string
          rating?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
