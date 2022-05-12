import './App.css';
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Provider } from './ContextAPI.js';
import CreateRoom from './Components/CreateRoom';
import Room from './Components/Room';
import HomePage from './Components/HomePage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    /* rooms Is an array of objects,
    The object have properties of name, type, color and products.
    products - a nested array contains arrays of objects with the keys type and status of False/True.
    The index of the array is represents the ID of the rooms. */
    const [rooms, setRooms] = useState([]);

    const toast_bottom = (msg, success) => {
        const style = { position: 'bottom-right', autoClose: 4000 };
        success ? toast.success(msg, style) : toast.error(msg, style);
    };

    const createNewRoom = (name, type, color) => {
        if (!isRoomNameValid(name)) return false;

        setRooms([...rooms, { name: name, type: type, color: color, products: [] }]);
        toast_bottom('Room created successfully!', true);
        return true;
    };

    const addNewProduct = (roomId, type) => {
        rooms[roomId].products.push({ type: type, status: false });
        setRooms([...rooms]);
        toast_bottom('Product added successfully!', true);
    };

    const deleteRoom = (index) => {
        rooms.splice(index, 1);
        setRooms([...rooms]);
        toast_bottom('Room deleted successfully!', true);
    };

    const deleteProduct = (roomId, ProductId) => {
        rooms[roomId].products.splice(ProductId, 1);
        setRooms([...rooms]);
        toast_bottom('Product deleted successfully!', true);
    };

    const isRoomNameValid = (name) => {
        if (rooms.find((room) => room.name === name) !== undefined) {
            toast_bottom(`ERROR! The name ${name} is taken by another room!`, false);
            return false;
        }

        if (!name.match(/^[a-z0-9-]+$/i)) {
            /* ^      Start of string
            [a-z0-9/-]  a or b or c or ... z or 0 or 1 or ... 9 or '-'
            +         one or more times (change to * to allow empty string)
            $         end of string    
            /i        case-insensitive */
            toast_bottom(`ERROR! Invalid room name! Only letters numbers and dashes are allowed.`, false);
            return false;
        }

        if (name.length > 5 || name.length < 1) {
            toast_bottom('ERROR! The room length must to be up to 5 characters!', false);
            return false;
        }

        return true;
    };

    const editRoom = (roomId, key, value) => {
        if (key === 'name' && !isRoomNameValid(value)) return false;

        if (key === 'type' && !value.match(/^(Bathroom|Kitchen|Bedroom|Living Room)$/)) {
            alert('The room type must to be one of:\n\nBathroom\nKitchen\nBedroom\nLiving Room\n');
            return false;
        }

        rooms[roomId][key] = value;
        setRooms([...rooms]);
        if (key !== 'color') toast_bottom('Room successfully edited!', true);

        return true;
    };

    return (
        <div className='App'>
            <h1>Smart House</h1>
            <Provider value={createNewRoom}>
                <HashRouter>
                    <Link to='/'>
                        <button className='Exit custom-btn btn-7'>
                            <span>X</span>
                        </button>
                    </Link>
                    <Routes>
                        <Route path='/' element={<HomePage rooms={rooms} />} />
                        {rooms.map((v, i) => {
                            return (
                                <Route
                                    key={i}
                                    path={'/room-' + v.name}
                                    element={
                                        <Room
                                            room={rooms[i]}
                                            deleteRoom={deleteRoom}
                                            index={i}
                                            products={rooms[i].products}
                                            addProduct={addNewProduct}
                                            deleteProduct={deleteProduct}
                                            editRoom={editRoom}
                                        />
                                    }
                                />
                            );
                        })}
                        <Route path='/addroom' element={<CreateRoom />} />
                    </Routes>
                </HashRouter>
            </Provider>
            <ToastContainer />
            <footer>Created by Barel Shraga with React</footer>
        </div>
    );
}

export default App;
