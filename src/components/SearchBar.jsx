import React, { useState, useEffect, useRef } from 'react';

// A simple debounce hook directly inside this file
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}


const SearchBar = ({ onSearch }) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    
    const debouncedInputValue = useDebounce(inputValue, 500);

    const inputRef = useRef(null);
    const searchWidgetRef = useRef(null);

    // This effect tells the parent (HomePage) about the debounced search term
    useEffect(() => {
        onSearch(debouncedInputValue);
    }, [debouncedInputValue, onSearch]);

    // This effect focuses the input when it appears
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
            setInputValue("");
        }
    };
    
    return (
        <div 
            className={`search-widget ${isSearchVisible ? 'expanded' : ''}`} 
            ref={searchWidgetRef}
            onMouseLeave={handleMouseLeave}
        >
            <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                className="search-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={() => setIsSearchVisible(false)}
            />
            <button type="button" onClick={toggleSearch} className="search-toggle-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </button>
        </div>
    );
};

export default SearchBar;