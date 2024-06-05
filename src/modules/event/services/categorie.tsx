import supabase from "../../../lib/supabase";

export async function get_categories() {
    const { data, error } = await supabase
        .from("category")
        .select("*")
        .order("description", { ascending: true });
    if (error) {
        throw error;
    }
    return data;
}
