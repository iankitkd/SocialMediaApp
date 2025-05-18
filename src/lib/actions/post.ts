"use server"

import apiClientAction from "./apiClientAction";

const BACKEND_URL = process.env.BACKEND_API_URL;

export async function createPost (content:string) {
    try {
        const data = await apiClientAction(`${BACKEND_URL}/post/create`, "POST", {
            data: {content},
        })
        // return data; 
    } catch (error:any) {
        throw new Error(error.message || "Something went wrong")
    }
}

// type Post = {
//   id: string;
//   content: string;
//   author: string;
// };

interface Post {
  _id: string;
  content: string;
  media?: string[];
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  likes: number;
  comments: number;
  shares: number;
  createdAt: Date;
  isLiked: boolean;
  isBookmarked: boolean;
}

export async function getUserPosts(username:string): Promise<Post[]> {
    try {
        const response = await apiClientAction(`${BACKEND_URL}/user/${username}/posts`, "GET");
        const posts = response.data.posts;
        const pagination = response.data.pagination;
        console.log(posts, "P")
        return posts;
    } catch (error:any) {
        throw new Error(error.message || "Something went wrong");
    }
}