import supabase from "../lib/supabase";

const get_service = async () => {
    const { data, error } = await supabase
        .from("event")
        .select("*")
        .order("id", { ascending: false });
    if (error) {
        throw error;
    }
    return data;
};

export default get_service;