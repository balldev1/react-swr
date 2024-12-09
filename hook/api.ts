const BASE_URL = '/api/posts';

// ดึงข้อมูลทั้งหมด
export const getPosts = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
};

// เพิ่มโพสต์ใหม่
export const createPost = async (data) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
};

// แก้ไขโพสต์
export const updatePost = async (id, data) => {
    const response = await fetch(BASE_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...data }),
    });
    if (!response.ok) throw new Error('Failed to update post');
    return response.json();
};

// ลบโพสต์
export const deletePost = async (id) => {
    const response = await fetch(`${BASE_URL}?id=${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete post');
    return id;
};
