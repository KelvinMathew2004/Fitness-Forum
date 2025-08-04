import { useState, useEffect } from 'react';
import { supabase } from '../client';
import Card from '../components/Card';
import './HomePage.css';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('created_at');

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);

            const { data, error } = await supabase
                .from('Posts')
                .select()
                .order(sortBy, { ascending: false });

            if (error) {
                console.error("Error fetching posts: ", error);
                setError("Could not fetch posts. Please try again later.");
                setPosts([]);
            } else {
                setPosts(data);
            }
            
            setLoading(false);
        };

        fetchPosts();
    }, [sortBy]); 

    if (loading) {
        return <p style={{ textAlign: 'center', marginTop: '5rem', color: "gray" }}>Loading posts...</p>;    
    }

    if (error) {
        return <p style={{ textAlign: 'center', marginTop: '5rem', color: "gray" }} className="error-message">{error}</p>;
    }

    return (
        <div className="HomePage">
            <main className="post-gallery">
                <div className="filter-controls">
                    <span>Sort by:</span>
                    <button
                        onClick={() => setSortBy('created_at')}
                        className={sortBy === 'created_at' ? 'active' : ''}
                    >
                        Newest
                    </button>
                    <button
                        onClick={() => setSortBy('likes')}
                        className={sortBy === 'likes' ? 'active' : ''}
                    >
                        Most Popular
                    </button>
                </div>

                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <Card
                            key={post.id}
                            id={post.id}
                            createdAt={post.created_at}
                            title={post.title}
                            likes={post.likes}
                        />
                    ))
                ) : (
                    <h2>No posts found. Try creating one!</h2>
                )}
            </main>
        </div>
    );
};

export default HomePage;