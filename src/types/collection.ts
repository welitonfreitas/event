import { Database } from "./supabase.types";

export type EventType = Database["public"]["Tables"]["event"]["Row"]
export type EventTypeInsert = Database["public"]["Tables"]["event"]["Insert"]
export type EventTypeUpdate = Database["public"]["Tables"]["event"]["Update"]

export type Category = Database["public"]["Tables"]["category"]["Row"]

export type CategoryEvent = Database["public"]["Tables"]["event_category"]["Row"]
export type CategoryEventInsert = Database["public"]["Tables"]["event_category"]["Insert"]

export type Lots = Database["public"]["Tables"]["lots"]["Row"]
export type LotsInsert = Database["public"]["Tables"]["lots"]["Insert"]
export type LotsUpdate = Database["public"]["Tables"]["lots"]["Update"]

export type Profile = Database["public"]["Tables"]["profile"]["Row"]
export type ProfileInsert = Database["public"]["Tables"]["profile"]["Insert"]
export type ProfileUpdate = Database["public"]["Tables"]["profile"]["Update"]

export type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"]
export type SubscriptionInsert = Database["public"]["Tables"]["subscriptions"]["Insert"]
export type SubscriptionUpdate = Database["public"]["Tables"]["subscriptions"]["Update"]

export type SelectedType = {
    label: string,
    value: number
}