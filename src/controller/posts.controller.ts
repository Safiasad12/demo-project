// Import modules
import { createPost, getPosts, getPost, updatePost, deletePost  } from '../services/post.service';
import { Request, Response } from 'express';
import { PostschemaValidate } from '../models/posts.models';

export const create = async (req: Request, res: Response): Promise<void> => {
    // Data to be saved in database
    const data = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        published: req.body.published
    };

    // Validating the request
    const { error, value } = PostschemaValidate.validate(data);

    if (error) {
        res.status(400).send(error.message);
    } else {
        // Call the create post function in the service and pass the data from the request
        const post = await createPost(value);
        res.status(201).send(post);
    }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
    const posts = await getPosts();
    res.send(posts);
};

export const get = async (req: Request, res: Response): Promise<void> => {
    // Get ID from the parameter
    const id = req.params.id;
    const post = await getPost(id);
    res.send(post);
};

export const update = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const post = await updatePost(id, req.body);
    res.send(post);
};

export const deletee = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    await deletePost(id);
    res.send('Post deleted');
};
