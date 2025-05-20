export interface Post {
  _id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  createdAt: Date;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  isOwner: boolean;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
}