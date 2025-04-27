import React, { useState, useEffect } from 'react';
import { fetchBlogs } from '../api/blog';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { role } = useAuth();

    useEffect(() => {
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

        loadBlogs();
    }, [navigate]);

    if (loading) {
        return <div>Loading blogs...</div>;
    }


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
                                <Link to={`/edit-blog/${blog.id}`}>
                                    <button className="edit-btn">Edit</button>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Blogs;
