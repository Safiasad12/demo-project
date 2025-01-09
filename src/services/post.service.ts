import { Post } from '../models/posts.models';

export const createPost = async (data: any): Promise<any> => {
    try {
        const newPost = await Post.create(data);
        return newPost;
    } catch (error) {
        console.log(error);
    }
};

export const getPosts = async (): Promise<any[] | undefined> => {
    try {
        const posts = await Post.find({});
        return posts;
    } catch (error) {
        console.log(error);
    }
};

export const getPost = async (id: string): Promise<any | string> => {
    try {
        const post = await Post.findById(id);
        if (!post) {
            return 'post not available';
        }
        return post;
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = async (id: string, data: any): Promise<any | string> => {
    try {
        const post = await Post.findByIdAndUpdate(id, data, { new: true });
        if (!post) {
            return 'post not available';
        }
        return post;
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = async (id: string): Promise<string | void> => {
    try {
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return 'post not available';
        }
    } catch (error) {
        console.log(error);
    }
};
