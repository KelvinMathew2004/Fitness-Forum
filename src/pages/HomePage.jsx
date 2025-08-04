import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../client';
import Card from '../components/Card';
import './HomePage.css';

const HomePage = () => {
    // No changes to existing state
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('created_at');
    const [searchQuery, setSearchQuery] = useState("");
    const [submittedQuery, setSubmittedQuery] = useState("");
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const inputRef = useRef(null);
    // --- NEW: A ref for the entire search form widget ---
    const formRef = useRef(null);

    useEffect(() => {
        const fetchPosts = async () => { /* ... existing fetch logic, no changes needed ... */ };
        fetchPosts();
    }, [sortBy, submittedQuery]);

    useEffect(() => {
        if (isSearchVisible) {
            inputRef.current?.focus();
        }
    }, [isSearchVisible]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSubmittedQuery(searchQuery);
    };

    const toggleSearch = (e) => {
        e.preventDefault(); 
        setIsSearchVisible(!isSearchVisible);
        if (isSearchVisible) {
            setSearchQuery("");
            setSubmittedQuery("");
        }
    };
    
    // --- NEW: Handler for the onBlur event ---
    const handleBlur = (e) => {
        // Check if the element that is receiving focus is a child of our search form.
        // If it is, do nothing. If it's not, the user has clicked outside.
        if (formRef.current && !formRef.current.contains(e.relatedTarget)) {
            setIsSearchVisible(false);
        }
    };

    return (
        <div className="HomePage">
            <main className="post-gallery">
                <div className="filter-controls">
                    <div className="sort-buttons">{/* ... your sort buttons ... */}</div>

                    <form 
                        className={`search-widget ${isSearchVisible ? 'expanded' : ''}`} 
                        onSubmit={handleSearchSubmit}
                        ref={formRef} // Attach the form ref
                        onBlur={handleBlur} // Attach the blur handler to the whole form
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search..."
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="button" onClick={toggleSearch} className="search-toggle-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </form>
                </div>
                {/* ... The rest of your JSX to display posts ... */}
            </main>
        </div>
    );
};

export default HomePage;