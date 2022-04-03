import './CreateRoom.css';
import React, { useState } from 'react';
import { Consumer } from '../ContextAPI.js';
import { useNavigate } from 'react-router-dom';

export default function CreateRoom() {
    const [roomType, setRoomType] = useState('Bedroom');
    const [roomName, setRoomName] = useState('');
    const [roomColor, setRoomColor] = useState('#00ADB5');

    const nav = useNavigate();

    return (
        <div className='CreateRoom'>
            <h2>Create a room</h2>

            <label htmlFor='rooms'>Room type: </label>
            <select name='rooms' onChange={(e) => setRoomType(e.target.value)}>
                <option value='Bedroom'>Bedroom</option>
                <option value='Bathroom'>Bathroom</option>
                <option value='Kitchen'>Kitchen</option>
                <option value='Living Room'>Living Room</option>
            </select>

            <input
                type='text'
                name='name'
                placeholder='Room name'
                maxLength='5'
                onChange={(e) => setRoomName(e.target.value)}
            />
            <label htmlFor='name'>Room color: </label>
            <input type='color' name='color' placeholder='Room color' onChange={(e) => setRoomColor(e.target.value)} />

            <Consumer>
                {(createNewRoom) => {
                    return (
                        <button
                            className='BtnCreate'
                            onClick={() => {
                                createNewRoom(roomName, roomType, roomColor);
                                nav('/');
                            }}
                        >
                            Create
                        </button>
                    );
                }}
            </Consumer>
        </div>
    );
}
