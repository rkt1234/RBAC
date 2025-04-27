import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBlogs, updateBlog } from '../api/blog';
import { toast } from 'react-toastify';

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const res = await fetchBlogs();
        const blog = res.data.blogs.find((b) => b.id === parseInt(id));
        if (blog) {
          setFormData({ title: blog.title, content: blog.content });
        } else {
          toast.error('Blog not found');
          navigate('/');
        }
      } catch (err) {
        toast.error('Failed to load blog');
      }
    };

    loadBlog();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBlog(id, formData);
      toast.success('Blog updated successfully!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update blog');
      toast.error(err.response?.data?.message || 'Failed to update blog');
    }
  };

  return (
    <div className="auth-form">
      <h2>Edit Blog</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Blog Content"
          value={formData.content}
          onChange={handleChange}
          rows="6"
          required
        />
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
}

export default EditBlog;
