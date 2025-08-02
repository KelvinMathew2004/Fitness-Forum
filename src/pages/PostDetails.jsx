import React from "react"
import {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../client'

const PostDetails = ({data}) => {

    const {id} = useParams()
    const [crewmate, setCrewmate] = useState({id: null, name: "", speed: "", color: "", type: ""})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCrewmate = async () => {
            const { data, error } = await supabase
                .from('Crewmates')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                console.error('Error fetching post:', error)
            } else if (data) {
                setCrewmate({
                    id: data.id,
                    name: data.name || '',
                    speed: data.speed || '',
                    color: data.color || '',
                    type: data.type || ''
                })
            }
            setLoading(false)
        }
        fetchCrewmate()
    }, [id])

    if (loading) return <p>Loading...</p>

    return (
        <div className="CrewmateDetails">
            <h1>Crewmate Details</h1>
            <div className="details-card">
                <h1>{crewmate.name}</h1>
                
                <div className="stats-container">
                    <h2>Color: <span className="stat-value">{crewmate.color}</span></h2>
                    <h2>Speed: <span className="stat-value">{crewmate.speed} mph</span></h2>
                </div>

                { crewmate.speed < 3 && crewmate.type === "crewmate" ? 
                    <h2 className="warning">Warning: Low speed detected. This crewmate is kind of slow 😬</h2> 
                    : null 
                }
                
                <Link to={'/edit/'+ crewmate.id}>
                    <button>Edit Crewmate</button>
                </Link>
            </div>
        </div>
    )
}   

export default PostDetails;