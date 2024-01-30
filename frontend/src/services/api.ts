import axios from "axios";
import { IBlogsData, IBlogData, ICommentsData } from "../types/blog";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const getBlogs = async () => {
  return (await axiosInstance.get<IBlogsData>("blog")).data;
};
export const getBlog = async (id: string) => {
  return (await axiosInstance.get<IBlogData>(`blog/${id}`)).data;
};

export const getBlogComment = async (blogId: string) => {
  return (await axiosInstance.get<ICommentsData>(`comment/${blogId}`)).data;
};
