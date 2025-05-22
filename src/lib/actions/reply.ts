"use server"

import apiClientAction from "./apiClientAction";
import { Post, Pagination } from "../types/post";

const BACKEND_URL = process.env.BACKEND_API_URL;

export async function getPostReplies(postId:string, page=1, limit=10): Promise<{ posts: Post[], pagination: Pagination }> {
    try {
        const response = await apiClientAction(`${BACKEND_URL}/posts/${postId}/replies?page=${page}&limit=${limit}`, "GET");
        const posts = response.data.posts;
        const pagination = response.data.pagination;
        return {posts, pagination};
    } catch (error:any) {
        throw new Error(error.message || "Something went wrong");
    }
}

export async function getUserReplies(username:string, page=1, limit=10): Promise<{ posts: Post[], pagination: Pagination }> {
    try {
        const response = await apiClientAction(`${BACKEND_URL}/users/${username}/replies?page=${page}&limit=${limit}`, "GET");
        const posts = response.data.posts;
        const pagination = response.data.pagination;
        return {posts, pagination};
    } catch (error:any) {
        throw new Error(error.message || "Something went wrong");
    }
}

