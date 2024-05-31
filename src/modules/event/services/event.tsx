import supabase from "../../../lib/supabase";
import { EventType } from "../../../types/collection";

export async function get_service() {
    const { data, error } = await supabase
        .from("event")
        .select("*")
        .order("id", { ascending: false });
    if (error) {
        throw error;
    }
    return data;
}

export async function get_event(id: string) {
    const { data, error} = await supabase
        .from("event")
        .select("*")
        .eq("id", id);

    if (error) {
        throw error;
    }
    return data[0];
}

export async function create_event(event: EventType) {
    const { data, error } = await supabase
        .from("event")
        .insert(event)
        .select();
    if (error) {
        throw error;
    }
    return data;
}
