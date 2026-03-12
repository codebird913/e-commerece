import axios from 'axios'
import React from 'react'
import { useFetcher } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const Home = () => {
    const [hello, setHello] = useState();
    const fetchHello = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/hello");
            console.log(data)

            setHello(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        //Runs only on the first render
        fetchHello()
    }, []);

    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-6">
                    <h1>{hello}</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, lu
                        ctus nec ullamcorper mattis, pul
                        vinar dapibus leo. Vestibulum ante ipsum primis in faucibus.</p>

                    <div className='d-flex gap-3'>
                        <button className='btn btn-success'>Show Now</button>
                        <button lassName='btn btn-outline-success'>View Collection</button>
                    </div>
                </div>

                <div className="col-6">
                    <img className='img-fluid' src='https://builder.bootstrapmade.com/static/img/product/product-f-9.webp' />
                </div>
            </div>
        </div>
    )
}

export default Home