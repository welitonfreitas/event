import { QueryData, QueryResult } from "@supabase/supabase-js";
import supabase from "../../../lib/supabase";
import { CategoryEventInsert, EventType, EventTypeInsert } from "../../../types/collection";

export async function get_service() {
    const { data, error } = await supabase
        .from("event")
        .select("*")
        .limit(10)
        .order("id", { ascending: false });
    if (error) {
        throw error;
    }
    return data;
}

export async function getOpenEvents(limite: number = 4) {
    const { data, error } = await supabase
        .from("event")
        .select("*")
        .eq("status", "published")
        .order("id", { ascending: false })
        .limit(limite);
    if (error) {
        throw error;
    }
    return data;
}

export async function get_event(id: string): Promise<EventType>{

    const { data, error } = await supabase
        .from("event")
        .select(`
        *
        ,lots (
            *
        ),
        category(
            id,
            description,
            minimum_age,
            maximum_age,
            gender,
            is_oficial,
            difficulty_level
        )
        `)
        .eq("id", id).limit(1).single();

    if (error) {
        throw error;
    }

    return data;
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

export async function url_image(bucket: string, filename: string) {
    const { data } = await supabase
        .storage
        .from(bucket)
        .getPublicUrl(filename);
    return data;
}

export async function create_event_categories(categoriesWithEventId: CategoryEventInsert[]) {
    const { data, error } = await supabase
        .from("event_category")
        .insert(categoriesWithEventId)
        .select();
    if (error) {
        throw error;
    }
    return data;
}