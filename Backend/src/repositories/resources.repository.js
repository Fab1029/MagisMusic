import  { supabase }  from "../config/supabase.config.js";
import CustomError from "../utils/error.js";

export default class ResourcesRepository {

    constructor() {
        this.db = supabase;
    }

    async getResource({ id_user, type, id_resource }) {
        const { data, error } = await this.db
            .from("Resource")
            .select("*")
            .eq("id_user", id_user)
            .eq("type", type)
            .eq("id_resource", id_resource)
            .maybeSingle();

        if (error) {
            throw new CustomError("Internal server error", 500);
        }

        return data;
    }

    async postResource({ id_user, type, id_resource }) {
        const { data, error } = await this.db
            .from("Resource")
            .insert({
                id_user,
                id_resource,
                isLike: true,
                type
            })
            .select("*")
            .single();

        if (error) {
            throw new CustomError("Internal server error", 500);
        }

        return data;
    }

    async putResource({ id_user, type, id_resource, isLike }) {
        const { data, error } = await this.db
            .from("Resource")
            .update({ isLike })
            .eq("id_user", id_user)
            .eq("type", type)
            .eq("id_resource", id_resource)
            .select("*")
            .single();

        if (error) {
            throw new CustomError("Internal server error", 500);
        }

        return data;
    }

    async getLikedResourcesByType({ id_user, type }) {
        const { data, error } = await this.db
            .from("Resource")
            .select("id_resource")
            .eq("id_user", id_user)
            .eq("type", type)
            .eq("isLike", true);

        if (error) {
            throw new CustomError("Internal server error", 500);
        }

        const ids = data.map(item => item.id_resource);

        return {
            type,
            total: ids.length,
            data: ids
        };
    }
}