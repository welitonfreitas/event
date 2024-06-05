import supabase from "../../../lib/supabase";
import { Lots, LotsInsert  } from "../../../types/collection";



export async function create_lots(lots: LotsInsert[]) {
    const { data, error } = await supabase
        .from("lots")
        .insert(lots)
        .select();
    if (error) {
        throw error;
    }
    return data;
}

