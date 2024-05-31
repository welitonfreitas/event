import { Database } from "./supabase.types";

export type EventType = Database["public"]["Tables"]["event"]["Row"]
export type EventTypeInsert = Database["public"]["Tables"]["event"]["Insert"]
export type EventTypeUpdate = Database["public"]["Tables"]["event"]["Update"]