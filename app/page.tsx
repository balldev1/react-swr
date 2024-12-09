"use client";
import useSWR, { mutate } from 'swr';
import { createPost, updatePost, deletePost } from '@/hook/api';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
    const { data: posts, error } = useSWR('/api/posts', fetcher);

    const handleCreate = async () => {
        const newPost = { title: 'New Post', body: 'This is a new post.' };
        await createPost(newPost); // ใช้ฟังก์ชัน createPost
        mutate('/api/posts');
    };

    const handleUpdate = async (id) => {
        const updatedPost = { title: 'Updated Title', body: 'Updated body' };
        await updatePost(id, updatedPost); // ใช้ฟังก์ชัน updatePost
        mutate('/api/posts');
    };

    const handleDelete = async (id) => {
        await deletePost(id); // ใช้ฟังก์ชัน deletePost
        mutate('/api/posts');
    };

    if (error) return <div>Error: {error.message}</div>;
    if (!posts) return <div>Loading...</div>;

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        {post.title}
                        <button onClick={() => handleUpdate(post.id)}>Edit</button>
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleCreate}>Create Post</button>
        </div>
    );
}
