import ApiClient from "./apiClient";

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export default new ApiClient<Post>('/posts');