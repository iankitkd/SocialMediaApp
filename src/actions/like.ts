"use server"

import serverApiRequest from "@/lib/serverApiRequest";
import { Pagination, Post } from "@/types/post";
import { appEnv } from "@/lib/env";

const BACKEND_URL = appEnv.BACKEND_API_URL;

export async function likePost(postId:string) {
    try {
        await serverApiRequest(`${BACKEND_URL}/posts/${postId}/like`, "POST");
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Something went wrong")
    }
}

export async function unlikePost(postId:string) {
    try {
        await serverApiRequest(`${BACKEND_URL}/posts/${postId}/like`, "DELETE");
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Something went wrong")
    }
}


export async function getLikedPosts(page=1, limit=10): Promise<{ posts: Post[], pagination: Pagination }> {
    try {
        const response = await serverApiRequest(`${BACKEND_URL}/profile/liked-posts?page=${page}&limit=${limit}`, "GET");
        const posts = response.data.likedPosts;
        const pagination = response.data.pagination;
        return {posts, pagination};
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Something went wrong");
    }
}