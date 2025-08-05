import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../client';
import './NewPost.css';

const categories = [
    { name: 'Workouts', emoji: '🏋️', colorClass: 'workouts-color' },
    { name: 'Nutrition', emoji: '🍎', colorClass: 'nutrition-color' },
    { name: 'Progress', emoji: '📊', colorClass: 'progress-color' },
    { name: 'Science', emoji: '🧪', colorClass: 'science-color' },
    { name: 'General', emoji: '💬', colorClass: 'general-color' }
];

const EditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [post, setPost] = useState({ title: '', description: '', image: '', password: '', category: '' });
    const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!location.state?.authenticated) {
            navigate(`/post/${id}`);
            return;
        }

        const fetchPost = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                setError('Could not fetch the post data.');
                console.error(error);
            } else if (data) {
                setPost({
                    title: data.title,
                    description: data.description || '',
                    image: data.image || '',
                    password: data.password,
                    category: data.category
                });
                setSelectedCategory(data.category)
            }
            setLoading(false);
        };

        fetchPost();
    }, [id, location.state, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost(prevPost => ({
            ...prevPost,
            [name]: value
        }));
    };

    const updatePost = async (event) => {
        event.preventDefault();
        setLoading(true);
        const { error } = await supabase
            .from('Posts')
            .update({
                title: post.title,
                description: post.description,
                image: post.image,
                password: post.password,
                category: selectedCategory
            })
            .eq('id', id);

        if (error) {
            setError('Failed to update the post.');
            console.error(error);
        } else {
            navigate(`/post/${id}`);
        }
        setLoading(false);
    };

    if (loading) {
        return <div className="loading-container">Loading editor...</div>;
    }

    return (
        <div className="EditPost">
            <div className="form-container">
                <form onSubmit={updatePost}>
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label>Focus</label>
                        <div className="category-selector">
                            {categories.map((category) => (
                                <button
                                    key={category.name}
                                    type="button"
                                    className={`category-button ${category.colorClass} ${selectedCategory === category.name ? 'active' : 'inactive'}`}
                                    onClick={() => setSelectedCategory(category.name)}
                                    title={category.name}
                                >
                                    <span className="emoji" role="img" aria-label={category.name}>{category.emoji}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="title">Session Name</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={post.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Breakdown</label>
                        <textarea
                            id="description"
                            name="description"
                            value={post.description}
                            onChange={handleChange}
                            rows="6"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Access Code</label>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            value={post.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Image URL (Optional)</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={post.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.png"
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Log'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditPage;