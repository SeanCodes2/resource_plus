//to retrieve the data on component render, we need useEffect and to store the data we need useState
import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
//npm install axios - the package that handles our API calls
import axios from 'axios'
import SingleCategory from './SingleCategory';
import {useAuth} from '../../contexts/AuthContext'
import CatCreate from './CatCreate';

//Steps to Read functionality
//1. add useState and useEffect to the react import
//2. install and import axios
//3. create the hook to store the data
//4. create the function that uses axios to get the categories
//5. create useEffect to automate retrieval of data in this component
//----- You should now have your data stored, and now on to the UI
//6. use .map to render each category to the screen (also add any supplemental UI (table and thead)...combo of Categories and SingleCategory)


export default function Categories() {
    const [categories, setCategories] = useState([]); //default [ ] for collection to .map
    const [showCreate, setShowCreate] = useState(false);

    const {currentUser} = useAuth()

    const getCategories = () => {
        axios.get(`https://localhost:7005/api/categories`).then(response => {
            console.log(response)
            setCategories(response.data)
        })
    }

    //1st param is function, 2nd param is array of objects we can listen for (default [] for only when component mounts in UI)
    useEffect(() => {
        getCategories()
    }, []);

    return <section className='categories'>
        <article className='bg-info p-5'>
            <h1 className='text-center'>Categories Dashboard</h1>
        </article>

        {/* Create UI */}
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
            <div className='bg-dark p-2 mb-3 text-center'>
                {showCreate ? 
                    <>
                        <button onClick={() => setShowCreate(false)} className='btn btn-warning'>Cancel</button>
                        <CatCreate
                            getCategories={getCategories}
                            setShowCreate={setShowCreate} />
                    </>
                :   <button className='btn btn-info' onClick={() => setShowCreate(true)}>Create Category</button>
                }
            </div>
        }
        {/* END CREATE UI */}

        <Container className='p-2'>
            <table className='table bg-info table-dark my-3'>
                <thead className='table-secondary text-uppercase'>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        {/* Edit/Delete column for icons to display */}
                        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
                            <th>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {/* READ UI */}
                    {categories.map(x => 
                        //For EDIT/DELETE we need getCategories as a prop so we can call itfrom the single category component
                        <SingleCategory key={x.categoryId} category={x} getCategories={getCategories}/>
                    )}
                    {/* END READ UI */}
                </tbody>
            </table>
        </Container>
    </section>
}
