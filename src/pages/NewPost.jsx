import React, { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';
import './NewPost.css';

const NewPost = () => {
    const [post, setPost] = useState({ title: "", content: "", image_url: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const createPost = async (event) => {
        event.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('Posts')
            .insert({ 
                title: post.title, 
                description: post.content,
                image: post.image_url
            });

        if (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post. Please try again.");
        } else {
            navigate('/');
        }
        setLoading(false);
    };

    return (
        <div className="NewPost">
            <div className="form-container">
                <form onSubmit={createPost}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={post.title}
                            onChange={handleChange}
                            placeholder="Enter a catchy title..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            value={post.content}
                            onChange={handleChange}
                            placeholder="Share your thoughts, workout, or story..."
                            rows="6"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image_url">Image URL (Optional)</label>
                        <input
                            type="text"
                            id="image_url"
                            name="image_url"
                            value={post.image_url}
                            onChange={handleChange}
                            placeholder="https://example.com/image.png"
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Post'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewPost;