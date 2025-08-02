import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import '../App.css';

const NewPost = () => {
    const [crewmate, setCrewmate] = useState({ name: "", speed: "", color: "", type: "crewmate" });

    useEffect(() => {
        if (crewmate.type === 'imposter') {
            setCrewmate(prev => ({ ...prev, speed: '3' }));
        }
    }, [crewmate.type]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCrewmate((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const createCrewmate = async (event) => {
        event.preventDefault();
        await supabase
            .from('Crewmates')
            .insert({ name: crewmate.name, speed: crewmate.speed, color: crewmate.color, type: crewmate.type })
            .select();
        window.location = "/gallery";
    };

    return (
        <div className="NewCrewmate">
            <h1>Create a Character</h1>

            <div className="type-selector">
                <label className={`type-option ${crewmate.type === 'crewmate' ? 'crewmate-selected' : ''}`}>
                    <input type="radio" name="type" value="crewmate" checked={crewmate.type === 'crewmate'} onChange={handleChange} />
                </label>
                <label className={`type-option ${crewmate.type === 'imposter' ? 'imposter-selected' : ''}`}>
                    <input type="radio" name="type" value="imposter" checked={crewmate.type === 'imposter'} onChange={handleChange} />
                </label>
            </div>

            <form className='edit-form-container'>
                <div className='form-card'>
                    <h3>Character Name</h3>
                    <div className='form-group'>
                        <label htmlFor="name">Name:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            className="form-input" 
                            value={crewmate.name} 
                            onChange={handleChange} 
                            placeholder="Enter character's name" 
                        />
                    </div>
                </div>

                <div className='form-card'>
                    <h3>Attributes</h3>
                    <div className='form-group'>
                        <label htmlFor="speed">Speed (mph):</label>
                        <input 
                            type="text" 
                            id="speed" 
                            name="speed" 
                            className="form-input" 
                            value={crewmate.speed} 
                            onChange={handleChange} 
                            placeholder={crewmate.type === 'imposter' ? 'Locked for Imposters' : "Enter speed in mph"}
                            disabled={crewmate.type === 'imposter'}
                        />
                        {crewmate.type === 'imposter' && (
                            <p className="help-text">Speed drops to 1 mph when lights are off.</p>
                        )}
                    </div>
                </div>

                <div className='form-card'>
                    <h3>Choose a Color</h3>
                    <div className='color-options-container'>
                        {['red', 'green', 'blue', 'purple', 'yellow', 'orange', 'pink', 'rainbow'].map(color => (
                            <label className="color-option" key={color}>
                                <input
                                    type="radio"
                                    name="color"
                                    value={color}
                                    checked={crewmate.color === color}
                                    onChange={handleChange}
                                />
                                <span className={`color-swatch swatch-${color}`}></span>
                            </label>
                        ))}
                    </div>
                </div>
            </form>

            <button type="submit" onClick={createCrewmate}>Create Character</button>
        </div>
    );
};

export default NewPost;