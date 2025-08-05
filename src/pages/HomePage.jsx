import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../client';
import Card from '../components/Card';
import './HomePage.css';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('created_at');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const inputRef = useRef(null);
    const searchWidgetRef = useRef(null);

    // Debounced search logic inside useEffect
    useEffect(() => {
        const timerId = setTimeout(() => {
            const fetchPosts = async () => {
                setLoading(true);
                let query = supabase.from('Posts').select().order(sortBy, { ascending: false });

                if (searchQuery) {
                    query = query.ilike('title', `%${searchQuery}%`);
                }

                const { data, error } = await query;

                if (error) {
                    setError("Could not fetch posts.");
                } else {
                    setPosts(data);
                }
                setLoading(false);
            };
            fetchPosts();
        }, 500);

        return () => clearTimeout(timerId);
    }, [searchQuery, sortBy]);

    // Focus input when it appears
    useEffect(() => {
        if (isSearchVisible) {
            inputRef.current?.focus();
        }
    }, [isSearchVisible]);

    const handleMouseLeave = () => {
        if (document.activeElement !== inputRef.current) {
            setIsSearchVisible(false);
        }
    };

    const toggleSearch = (e) => {
        e.preventDefault(); 
        const nextVisibility = !isSearchVisible;
        setIsSearchVisible(nextVisibility);
        
        if (!nextVisibility) {
            setSearchQuery("");
        }
    };

    const handleBlur = () => {
        setTimeout(() => {
            if (searchWidgetRef.current && !searchWidgetRef.current.contains(document.activeElement)) {
                setIsSearchVisible(false);
            }
        }, 100);
    };

    if (loading && posts.length === 0) {
        return (
            <div className="loading-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#757575" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="loading-icon">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
            </div>
        );
    }

    if (error) {
        return <p style={{ textAlign: 'center', marginTop: '5rem', color: "gray" }}>{error}</p>;
    }

    return (
        <div className="HomePage">
            <main className="post-gallery">
                <div className="filter-controls">
                    <span>Sort by:</span>
                    <button onClick={() => setSortBy('created_at')} className={`filter-button ${sortBy === 'created_at' ? 'active' : ''}`}>
                        Newest
                    </button>
                    <button onClick={() => setSortBy('likes')} className={`filter-button ${sortBy === 'likes' ? 'active' : ''}`}>
                        Most Popular
                    </button>

                    <div 
                        className={`search-widget ${isSearchVisible ? 'expanded' : ''}`} 
                        ref={searchWidgetRef}
                        onMouseLeave={handleMouseLeave}
                        onBlur={handleBlur}
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            id="search-input"
                            name="search"
                            placeholder="Search by title..."
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="button" onClick={toggleSearch} className="search-toggle-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#757575" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
                                
                {!loading && posts.length === 0 ? (
                    <h2>No posts found.</h2>
                ) : (
                    posts.map((post) => (
                        <Card key={post.id} id={post.id} createdAt={post.created_at} title={post.title} likes={post.likes} image={post.image}/>
                    ))
                )}
            </main>
        </div>
    );
};

export default HomePage;