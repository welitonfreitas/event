import supabase from "../../../lib/supabase";
import { CategoryEventInsert, EventType, EventTypeInsert } from "../../../types/collection";

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
        .select(`
        *
        ,lots (
            id,
            title,
            price,
            start_date,
            end_date,
            quantity
        ),
        category(
            id,
            description
        )
        `)
        .eq("id", id);

    if (error) {
        throw error;
    }
    return data[0];
}

export async function create_event(event: EventTypeInsert) {
    const { data, error } = await supabase
        .from("event")
        .insert(event)
        .select();
    if (error) {
        throw error;
    }
    return data;
}

export async function upload_image(bucket: string, filename: string, file: File) {
    const { data, error } = await supabase
        .storage
        .from(bucket)
        .upload(filename, file);
    if (error) {
        throw error;
    }
    return data;
}

export async function create_event_categories(categoriesWithEventId: CategoryEventInsert[]) {
    const { data, error } = await supabase
        .from("event_categories")
        .insert(categoriesWithEventId)
        .select();
    if (error) {
        throw error;
    }
    return data;
}