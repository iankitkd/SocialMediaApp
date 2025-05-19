"use client"

import { useEffect, useRef, useState } from 'react'
import PostCard from './PostCard'

import { LoaderCircle } from 'lucide-react';
import { Pagination, Post } from '@/lib/types/post';

import { useUserStore } from '@/lib/store/userStore';
import { getUserPosts } from '@/lib/actions/post';

interface PostDisplayProps {
    initialPosts: Post[];
    initialPagination: Pagination, 
    username: string;
}

export default function PostDisplay({initialPosts, initialPagination, username}: PostDisplayProps) {
  const loaderRef = useRef<HTMLDivElement>(null);

  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {username: currentUsername } = useUserStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && pagination.hasNext && !loading) {
          loadMorePosts();
        }
      },
      { threshold: 1.0 }
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

      const { posts: newPosts, pagination: newPagination } = await getUserPosts(username, nextPage, pagination.limit);

      setPosts((prev) => [...prev, ...newPosts]);
      setPagination(newPagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} isOwner={post.author.username === currentUsername} />
        ))}
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
