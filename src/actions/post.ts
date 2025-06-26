"use server"

import serverApiRequest from "@/lib/serverApiRequest";
import { appEnv } from "@/lib/env";
import { Post, Pagination } from "@/types/post";

const BACKEND_URL = appEnv.BACKEND_API_URL;

export async function createPost (content:string, parentPostId?:string) {
    try {
        const data = await serverApiRequest(`${BACKEND_URL}/posts`, "POST", {
            data: {content, parentPostId},
        })
        // return data; 
    } catch (error:any) {
        throw new Error(error.message || "Something went wrong")
    }
}

export async function deletePost(postId:string) {
    try {
        await serverApiRequest(`${BACKEND_URL}/posts/${postId}`, "DELETE");
    } catch (error:any) {
        throw new Error(error.message || "Something went wrong")
    }
}

export async function getLatestPosts(page=1, limit=10): Promise<{ posts: Post[], pagination: Pagination }> {
    try {
        const response = await serverApiRequest(`${BACKEND_URL}/posts?page=${page}&limit=${limit}`, "GET");
        const posts = response.data.posts;
        const pagination = response.data.pagination;
        return {posts, pagination};
    } catch (error:any) {
        throw new Error(error.message || "Something went wrong");
    }
}

export async function getUserPosts(username:string, page=1, limit=10): Promise<{ posts: Post[], pagination: Pagination }> {
    try {
        const response = await serverApiRequest(`${BACKEND_URL}/users/${username}/posts?page=${page}&limit=${limit}`, "GET");
        const posts = response.data.posts;
        const pagination = response.data.pagination;
        return {posts, pagination};
    } catch (error:any) {
        throw new Error(error.message || "Something went wrong");
    }
}

export async function getPostDetails(postId: string): Promise<Post> {
    try {
        const response = await serverApiRequest(`${BACKEND_URL}/posts/${postId}`, "GET");
        return response.data;
    } catch (error) {
        throw error;
    }
}