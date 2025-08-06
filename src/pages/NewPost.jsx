import React, { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';
import './NewPost.css';

const categories = [
    { name: 'Workouts', emoji: '🏋️', colorClass: 'workouts-color' },
    { name: 'Nutrition', emoji: '🍎', colorClass: 'nutrition-color' },
    { name: 'Progress', emoji: '📊', colorClass: 'progress-color' },
    { name: 'Science', emoji: '🧪', colorClass: 'science-color' },
    { name: 'General', emoji: '💬', colorClass: 'general-color' }
];

const cleanSearchTerm = (term) => {
    const uselessTerms = ['exercise', 'workout', 'stretch', 'routine', 'training', 'male', 'female', 'on', 'in', 'with', 'and', 'arm'];
    return term
        .toLowerCase()
        .split(' ')
        .filter(word => !uselessTerms.includes(word))
        .join(' ')
        .trim();
};

const NewPost = () => {
    const [post, setPost] = useState({ title: "", content: "", image_url: "", password: "" });
    const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
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

        let imageUrl = post.image_url;

        // If the category is "Workouts", fetch the image from the API
        if (selectedCategory === 'Workouts') {
            const apiKey = import.meta.env.VITE_X_RAPIDAPI_KEY;

            if (!apiKey) {
                alert("API Key is missing. Please check your .env.local file.");
                setLoading(false);
                return;
            }

            const searchTerm = cleanSearchTerm(post.workout_name);
            const url = `https://exercisedb-api1.p.rapidapi.com/api/v1/exercises/search?search=${encodeURIComponent(searchTerm)}`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': apiKey,
                    'x-rapidapi-host': 'exercisedb-api1.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                
                if (result.success && result.data.length > 0) {
                    // Use the image from the first result
                    imageUrl = result.data[0].imageUrl;
                } else {
                    // Use a default link if no exercise is found
                    imageUrl = 'https://i.imgur.com/g0s4s6s.png'; // CHANGE THIS TO YOUR PREFERRED DEFAULT
                }
            } catch (error) {
                console.error("API fetch error:", error);
                imageUrl = 'https://i.imgur.com/g0s4s6s.png'; // Use default on error
            }
        }

        // Now, insert the post data into Supabase with the correct image URL
        const { error: supabaseError } = await supabase
            .from('Posts')
            .insert({ 
                title: post.title, 
                description: post.content,
                image: imageUrl,
                category: selectedCategory
            });

        if (supabaseError) {
            console.error("Error creating post:", supabaseError);
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
                            placeholder="Enter a catchy title..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Breakdown</label>
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

                    {selectedCategory === 'Workouts' ? (
                        <div className="form-group">
                            <label htmlFor="workout_name">Main Exercise Name</label>
                            <input
                                type="text"
                                id="workout_name"
                                name="workout_name"
                                value={post.workout_name}
                                onChange={handleChange}
                                placeholder="e.g., Bench Press"
                                required 
                            />
                        </div>
                    ) : (
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
                    )}

                    <div className="form-group">
                        <label htmlFor="password">Access Code</label>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            value={post.password}
                            onChange={handleChange}
                            placeholder="Enter a password..."
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Adding...' : 'Add to Log'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewPost;