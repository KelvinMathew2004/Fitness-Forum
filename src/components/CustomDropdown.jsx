import React, { useState, useEffect, useRef } from 'react';
import './CustomDropdown.css'; // We'll create this file next

const CustomDropdown = ({ options, selectedValue, onValueChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null); // Ref to the main dropdown container

    // This effect handles clicks outside of the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            // If the dropdown ref exists and the click was outside of it
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false); // Close the dropdown
            }
        };

        // Add the event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup: Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []); // The empty dependency array ensures this effect runs only once

    const handleOptionClick = (value) => {
        onValueChange(value); // Notify the parent component of the change
        setIsOpen(false); // Close the dropdown after selection
    };

    return (
        <div className={`custom-dropdown ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
            <button
                type="button"
                className={`dropbtn ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)} // Toggle the dropdown's visibility
            >
                {selectedValue || placeholder || 'Select...'}
            </button>
            
            <div className="dropdown-content">
                {options.map((option) => (
                    <a
                        key={option.value}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleOptionClick(option.value);
                        }}
                    >
                        {option.label}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default CustomDropdown;