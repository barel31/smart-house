import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Room.css';

export default function Room(props) {
    const [showProduct, setShowProducts] = useState(false);
    const [productType, setProductType] = useState('Air-Conditioner');
    const [refresh, setRefresh] = useState(false);
    const nav = useNavigate();

    const productsList = () => {
        if (showProduct) {
            return (
                <div className='AddProduct'>
                    <label htmlFor='products'>Choose product: </label>
                    <select
                        name='products'
                        onChange={(e) => {
                            setProductType(e.target.value);
                        }}
                    >
                        <option value='Air-Conditioner'>Air-Conditioner</option>
                        <option value='Boiler'>Boiler</option>
                        <option value='Streo-System'>Streo-System</option>
                        <option value='Lamp'>Lamp</option>
                    </select>
                    <button
                        className='AddBtn'
                        onClick={() => {
                            if (props.room.products.length >= 5) alert('You have reached the maximum products in this room');
                            else if (productType === 'Boiler' && props.room.type !== 'Bathroom')
                                alert('Boilder can be addded to Bathrooms only');
                            else if (
                                productType === 'Streo-System' &&
                                props.room.products.find((v) => v.type === productType)
                            )
                                alert('You can add up to one Streo-System in a room');
                            else {
                                setShowProducts(false);
                                setProductType('Air-Conditioner');
                                props.addProduct(props.index, productType);
                            }
                        }}
                    >
                        Add
                    </button>
                </div>
            );
        }
    };

    return (
        <div className='Room' style={{ backgroundColor: props.room.color }}>
            <h2>
                {props.room.name}'s Room{' '}
                <input
                    type='color'
                    name='color'
                    value={props.room.color}
                    placeholder='Change room color'
                    onChange={(e) => props.editRoom(props.index, 'color', e.target.value)}
                />
            </h2>
            <h3>
                Room name: {props.room.name}{' '}
                <button
                    onClick={() => {
                        const name = prompt('Please choose a new name to the room:');
                        if (name && props.editRoom(props.index, 'name', name)) {
                            nav('/room-' + name);
                        }
                    }}
                >
                    {'\u270E'}
                </button>
            </h3>
            <h3>
                Room type: {props.room.type}{' '}
                <button
                    onClick={() => {
                        const type = prompt(
                            'Please choose type for the room:\n( Bedroom | Bathroom | Kitchen | Living Room )'
                        );
                        if (type) props.editRoom(props.index, 'type', type);
                    }}
                >
                    {'\u270E'}
                </button>
            </h3>
            <div className='Products'>
                {props.room.products.map((v, i) => {
                    return (
                        <div key={i} className='Product'>
                            <button
                                onClick={() => {
                                    props.products[i].toggle = !props.products[i].toggle;
                                    setRefresh(!refresh);
                                }}
                                style={{ backgroundColor: v.toggle ? '#2EB086' : '#B8405E' }}
                            >
                                {i + 1}. {v.type}
                            </button>
                            <button
                                className='DeleteProductBtn'
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this product?'))
                                        props.deleteProduct(props.index, i);
                                }}
                            >
                                ✖
                            </button>
                        </div>
                    );
                })}
            </div>
            {!showProduct ? (
                <button className='AddProductBtn' onClick={() => setShowProducts(!showProduct)}>
                    Add Product
                </button>
            ) : null}
            {productsList()}
            <button
                className='DeleteRoomBtn'
                onClick={() => {
                    if (window.confirm('Are you sure you want to delete this room?')) {
                        props.deleteRoom(props.index);
                        nav('/');
                    }
                }}
            >
                Delete Room
            </button>
        </div>
    );
}
