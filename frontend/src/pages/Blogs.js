import React, { useState, useEffect } from 'react';
import { createBlog, fetchBlogs } from '../api/blog';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { deleteBlog } from '../api/blog';
import { toast } from 'react-toastify';
import socket from '../socket'; 

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { role } = useAuth();

    const loadBlogs = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            const res = await fetchBlogs();
            setBlogs(res.data.blogs);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load blogs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        loadBlogs();

    }, [navigate]);

    useEffect(()=>{
        socket.on('connect', () => {
            console.log('Connected to WebSocket Server:', socket.id);
          });
        socket.on('blog_created', () => {
            loadBlogs();
          });
        
          socket.on('blog_updated', () => {
            loadBlogs();
          });
        
          socket.on('blog_deleted', (res) => {
            loadBlogs();
          });

        return () => {
            socket.off('blog_created');
            socket.off('blog_updated');
            socket.off('blog_deleted');
        }
    }, [])

    if (loading) {
        return <div>Loading blogs...</div>;
    }


    const handleDelete = async (blogId) => {
        const confirmed = window.confirm('Are you sure you want to delete this blog?');
        if (!confirmed) return;

        try {
            await deleteBlog(blogId);
            toast.success('Blog deleted successfully!');
            setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete blog');
        }
    };


    return (
        <div className="blogs-page">
            <h2>Blogs</h2>
            {error && <p className="error">{error}</p>}

            {blogs.length === 0 ? (
                <p>No blogs found.</p>
            ) : (
                <div className="blog-list">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="blog-card">
                            <h3>{blog.title}</h3>
                            <p>{blog.content}</p>
                            <p><small>By: {blog.author.name} ({blog.author.email})</small></p>
                            {role === 'ADMIN' && (
                                <>
                                    <Link to={`/edit-blog/${blog.id}`}>
                                        <button className="edit-btn">Edit</button>
                                    </Link>
                                    <button className="delete-btn" onClick={() => handleDelete(blog.id)}>Delete</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Blogs;
