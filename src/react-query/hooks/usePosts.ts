import { useQuery } from "@tanstack/react-query";
import postService, { Post } from "../services/postService";



const usePosts = () => {
    return useQuery<Post[], Error>({
        queryKey: ['Posts'],
        queryFn: postService.getAll
    });
}

export default usePosts;