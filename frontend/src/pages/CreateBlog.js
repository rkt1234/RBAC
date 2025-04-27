import React, { useState } from 'react';
import { createBlog } from '../api/blog';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreateBlog() {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBlog(formData);
      toast.success('Blog created successfully!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog');
      toast.error(err.response?.data?.message || 'Failed to create blog');
    }
  };

  return (
    <div className="auth-form">
      <h2>Create Blog</h2>
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
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}

export default CreateBlog;
