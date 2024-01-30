import { useQuery } from "@tanstack/react-query";
import { getBlog, getBlogComment, getBlogs } from "./api";

export function useBlogsQuery() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });
}

export function useBlogQuery(id: string) {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlog(id),
  });
}

export function useCommentsQuery(blogId: string) {
  return useQuery({
    queryKey: ["comments", blogId],
    queryFn: () => getBlogComment(blogId),
  });
}
