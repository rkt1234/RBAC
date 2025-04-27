import React, { useState, useEffect } from 'react';
import { fetchBlogs } from '../api/blog';
import { useNavigate } from 'react-router-dom';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Temporary protection before Phase 4
          return;
        }

        const res = await fetchBlogs();
        setBlogs(res.data.blogs);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load blogs');
      }
    };

    loadBlogs();
  }, [navigate]);

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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blogs;
