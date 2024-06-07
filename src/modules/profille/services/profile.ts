import supabase from "../../../lib/supabase";
import { Profile } from "../../../types/collection";


export async function get_profile(id: string): Promise<Profile>{

    const { data, error } = await supabase
        .from("profile")
        .select(`
        *
        `)
        .eq("id", id).limit(1).single();

    if (error) {
        throw error;
    }

    return data;
}

export async function update_profile(profile: Profile) {
    const { data, error } = await supabase
        .from("profile")
        .update(profile)
        .eq("id", profile.id);

    if (error) {
        throw error;
    }

    return data;
}