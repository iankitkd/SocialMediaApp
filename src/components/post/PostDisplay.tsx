"use client"

import { useEffect, useRef, useState } from 'react'
import PostCard from './PostCard'

import { LoaderCircle } from 'lucide-react';
import { Pagination, Post } from '@/lib/types/post';

import { deletePost, getLatestPosts, getUserPosts } from '@/lib/actions/post';
import { getLikedPosts } from '@/lib/actions/like';
import { getPostReplies, getUserReplies } from '@/lib/actions/reply';

interface PostDisplayProps {
    initialPosts: Post[];
    initialPagination: Pagination;
    mode: "latest" | "user" | "like" | "post-reply" | "user-reply";
    username?: string;
    postId?: string;
}

export default function PostDisplay({initialPosts, initialPagination, mode, username, postId}: PostDisplayProps) {
  const loaderRef = useRef<HTMLDivElement>(null);

  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && pagination.hasNext && !loading) {
          loadMorePosts();
        }
      },
      { 
        threshold: 0.1,
        root: null,
        rootMargin: '0px 0px 100px 0px'
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [pagination.hasNext, loading]);

  const loadMorePosts = async () => {
    if (loading || !pagination.hasNext) return;

    setLoading(true);
    setError(null);

    try {
      const nextPage = pagination.page + 1;

      let fetchPosts;

      if (mode === "latest") {
        fetchPosts = () => getLatestPosts(nextPage, pagination.limit);
      } else if (mode === "user" && username) {
        fetchPosts = () => getUserPosts(username, nextPage, pagination.limit);
      } else if (mode === "like") {
        fetchPosts = () => getLikedPosts(nextPage, pagination.limit);
      } else if (mode === "post-reply" && postId) {
        fetchPosts = () => getPostReplies(postId, nextPage, pagination.limit);
      } else if (mode === "user-reply" && username) {
        fetchPosts = () => getUserReplies(username, nextPage, pagination.limit);
      }

      if (fetchPosts) {
        const { posts: newPosts, pagination: newPagination } = await fetchPosts();
        setPosts((prev) => [...prev, ...newPosts]);
        setPagination(newPagination);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };


  const onDelete = async (postId:string) => {
    try {
      await deletePost(postId);
      const newPosts = posts.filter((post) => post._id !== postId);
      setPosts(newPosts);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Error while deleting post")
    }
  }

  return (
    <>
      <div>
        {posts.map((post) => {
          if(mode === "user-reply") {
            return (
              <div key={post._id}>
                <PostCard key={post.parent._id} post={post.parent} onDelete={onDelete} haveBottomLine={true} />
                <PostCard key={post._id} post={post} onDelete={onDelete} haveTopLine={true} />
              </div>
            )
          }
          return <PostCard key={post._id} post={post} onDelete={onDelete} />
        })}
      </div>

      <div ref={loaderRef} className="p-4">
        {loading && <div className='text-center text-primary'><LoaderCircle className='w-full animate-spin' /></div>}
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      </div>

      {posts.length === 0 && !loading && (
        <div className='w-full text-center text-sm text-muted-foreground'>No posts to display</div>
      )}
    </>
  )
}
