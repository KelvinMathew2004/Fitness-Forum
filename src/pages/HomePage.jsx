import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { Link } from 'react-router-dom'
import Card from '../components/Card'

const HomePage = (props) => {

    const [crewmates, setCrewmates] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // READ all post from table
        const fetchCrewmates = async () => {
            const {data} = await supabase
                .from('Crewmates')
                .select()
                .order('created_at', { ascending: false })

            // set state of posts
            setCrewmates(data)
            setLoading(false)
        }
        fetchCrewmates()
    }, [props])

    const counts = crewmates.reduce((acc, crewmate) => {
        if (crewmate.type === 'imposter') {
            acc.imposters++;
        } else {
            acc.crewmates++;
        }
        return acc;
    }, { crewmates: 0, imposters: 0 });

    if (loading) return <p>Loading...</p>
    
    return (
        <div className="CrewmateGallery">
            <h1>Your Crewmate Gallery!</h1>
            <div className="gallery-summary">
                <h3>Crewmates: <span className="count-value">{counts.crewmates}</span></h3>
                <h3>Imposters: <span className="count-value">{counts.imposters}</span></h3>
            </div>
            <div className="gallery">
                {
                    crewmates && crewmates.length > 0 ?
                    [...crewmates]
                    .sort((a, b) => a.id - b.id)
                    .map((crewmate,index) => 
                        <Card 
                            key={crewmate.id}
                            id={crewmate.id} 
                            name={crewmate.name}
                            speed={crewmate.speed}
                            color={crewmate.color}
                            type={crewmate.type}
                        />
                    ) : <h2>You haven't made a crewmate yet!</h2>
                }
            </div>
            <Link to="/new"><button className="create-crewmate">Create one here!</button></Link>
        </div>  
    )
}

export default HomePage