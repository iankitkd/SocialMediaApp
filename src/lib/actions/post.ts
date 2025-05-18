"use server"

import apiClientAction from "./apiClientAction";
import { Post, Pagination } from "../types/post";

const BACKEND_URL = process.env.BACKEND_API_URL;

export async function createPost (content:string) {
    try {
        const data = await apiClientAction(`${BACKEND_URL}/posts`, "POST", {
            data: {content},
        })
        // return data; 
    } catch (error:any) {
        throw new Error(error.message || "Something went wrong")
    }
}

export async function deletePost(postId:string) {
    try {
        await apiClientAction(`${BACKEND_URL}/posts/${postId}`, "DELETE");
    } catch (error:any) {
        throw new Error(error.message || "Something went wrong")
    }
}


export async function getUserPosts(username:string, page=1, limit=10): Promise<{ posts: Post[], pagination: Pagination }> {
    try {
        const response = await apiClientAction(`${BACKEND_URL}/users/${username}/posts?page=${page}&limit=${limit}`, "GET");
        const posts = response.data.posts;
        const pagination = response.data.pagination;
        console.log(posts, pagination, "post")
        return {posts, pagination};
    } catch (error:any) {
        throw new Error(error.message || "Something went wrong");
    }
}