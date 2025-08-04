import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './PostDetails.css';

const timeAgo = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const weeks = Math.round(days / 7);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 7) return `${days} days ago`;
    return `${weeks} weeks ago`;
};

const PostDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchPostAndComments = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('Posts')
                .select(`
                    *,
                    Comments ( * )
                `)
                .eq('id', id)
                .order('created_at', { foreignTable: 'Comments', ascending: false })
                .single();

            if (error) {
                console.error('Error fetching post:', error);
                setPost(null);
            } else if (data) {
                setPost(data);
                setComments(data.Comments || []);
            }
            setLoading(false);
        };

        fetchPostAndComments();
    }, [id]);

    const handleLike = async () => {
        const newLikeCount = (post.likes || 0) + 1;

        setPost({ ...post, likes: newLikeCount });

        await supabase
            .from('Posts')
            .update({ likes: newLikeCount })
            .eq('id', id);
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        if (newComment.trim() === '') return;

        const { data: createdComment, error } = await supabase
            .from('Comments')
            .insert({ post_id: id, comment_text: newComment })
            .select()
            .single();

        if (error) {
            console.error('Error creating comment:', error);
        } else if (createdComment) {
            setComments([createdComment, ...comments]);
            setNewComment("");
        }
    };

    if (loading) return <p className="loading-message">Loading post...</p>;
    if (!post) return <p className="error-message">Post not found.</p>;

    return (
        <div className="PostDetailsPage">
            <div className="post-container">
                <p className="post-meta">Posted {timeAgo(post.created_at)}</p>
                
                <h1 className="post-title">{post.title}</h1>
                
                <p className="post-content">{post.description}</p>
                
                {post.image && (
                    <div className="post-image-container">
                        <img src={post.image} alt={post.title} />
                    </div>
                )}
                
                <div className="post-actions">
                    <button onClick={handleLike} className="like-button">
                        👍
                    </button>
                    <span>{post.likes || 0} Likes</span>
                </div>

                <div className="comments-section">
                    <h3>Comments ({comments.length})</h3>
                    
                    <form onSubmit={handleCommentSubmit} className="comment-form">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            rows="3"
                        />
                        <button type="submit">Post Comment</button>
                    </form>

                    <div className="comment-list">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment.id} className="comment-item">
                                    <p>{comment.comment_text}</p>
                                    <span className="comment-meta">{timeAgo(comment.created_at)}</span>
                                </div>
                            ))
                        ) : (
                            <p>No comments yet. Be the first!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;