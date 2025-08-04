import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const timeAgo = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
};


const Card = ({ id, createdAt, title, likes }) => {
    return (
        <Link to={`/post/${id}`} className="Card">
            <div className="card-content">
                <p className="card-time">{timeAgo(createdAt)}</p>
                <h2 className="card-title">{title}</h2>
                <p className="card-likes">{likes || 0} Likes 👍</p>
            </div>
        </Link>
    );
};

export default Card;