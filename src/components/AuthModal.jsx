import React, { useState, useEffect } from 'react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onSubmit, error, isSubmitting }) => {
    const [password, setPassword] = useState('');

    // Effect to clear password when the modal is opened
    useEffect(() => {
        if (isOpen) {
            setPassword('');
        }
    }, [isOpen]);

    // Effect to handle the 'Escape' key press to close the modal
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);


    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(password);
    };

    // If the modal is not open, render nothing.
    if (!isOpen) {
        return null;
    }

    return (
        // The modal overlay, which closes the modal on click
        <div className="modal-overlay" onClick={onClose}>
            {/* The modal content, stops click propagation to prevent closing */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose} aria-label="Close">
                    &times;
                </button>
                
                <h2>Authentication Required</h2>
                <p>Please enter the password to proceed.</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="password">Access Code</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="password-input"
                            placeholder="Enter password..."
                            autoFocus
                        />
                    </div>
                    
                    {error && <p className="incorrect-password">{error}</p>}
                    
                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Verifying...' : 'Lock It In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;