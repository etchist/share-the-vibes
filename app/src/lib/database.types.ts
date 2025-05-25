export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      stories: {
        Row: {
          id: string
          created_at: string
          title: string
          content: string
          email: string
          verified: boolean
          views: number
          featured: boolean
          tags: string[]
          outcome: 'positive' | 'negative' | 'neutral'
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          content: string
          email: string
          verified?: boolean
          views?: number
          featured?: boolean
          tags?: string[]
          outcome?: 'positive' | 'negative' | 'neutral'
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          content?: string
          email?: string
          verified?: boolean
          views?: number
          featured?: boolean
          tags?: string[]
          outcome?: 'positive' | 'negative' | 'neutral'
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          count: number
        }
        Insert: {
          id?: string
          name: string
          count?: number
        }
        Update: {
          id?: string
          name?: string
          count?: number
        }
      }
    }
  }
}