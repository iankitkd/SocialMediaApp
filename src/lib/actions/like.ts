"use server"

import { Pagination, Post } from "../types/post";
import apiClientAction from "./apiClientAction";

const BACKEND_URL = process.env.BACKEND_API_URL;

export async function likePost(postId:string) {
    try {
        await apiClientAction(`${BACKEND_URL}/posts/${postId}/like`, "POST");
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Something went wrong")
    }
}

export async function unlikePost(postId:string) {
    try {
        await apiClientAction(`${BACKEND_URL}/posts/${postId}/like`, "DELETE");
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Something went wrong")
    }
}


export async function getLikedPosts(page=1, limit=10): Promise<{ posts: Post[], pagination: Pagination }> {
    try {
        const response = await apiClientAction(`${BACKEND_URL}/profile/liked-posts?page=${page}&limit=${limit}`, "GET");
        const posts = response.data.likedPosts;
        const pagination = response.data.pagination;
        return {posts, pagination};
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Something went wrong");
    }
}