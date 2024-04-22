import { Database } from "./supabase.types";

export type EventType = Database["public"]["Tables"]["event"]["Row"]