import { Database } from "./supabase.types";

export type EventType = Database["public"]["Tables"]["event"]["Row"]
export type EventTypeInsert = Database["public"]["Tables"]["event"]["Insert"]
export type EventTypeUpdate = Database["public"]["Tables"]["event"]["Update"]

export type BikeCategore = Database["public"]["Tables"]["bike_categories"]["Row"]

export type CategoryEvent = Database["public"]["Tables"]["event_categories"]["Row"]
export type CategoryEventInsert = Database["public"]["Tables"]["event_categories"]["Insert"]

export type Lots = Database["public"]["Tables"]["lots"]["Row"]
export type LotsInsert = Database["public"]["Tables"]["lots"]["Insert"]
export type LotsUpdate = Database["public"]["Tables"]["lots"]["Update"]