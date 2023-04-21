import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import SingleResource from './SingleResource'
import './Resources.css'
import FilterCat from './FilterCat'
import {useAuth} from '../../contexts/AuthContext'
import ResourceCreate from './ResourceCreate'

//Steps to Read functionality
//1. add useState and useEffect to the react import
//2. install and import axios
//3. create the hook to store the data
//4. create the function that uses axios to get the categories
//5. create useEffect to automate retrieval of data in this component
//----- You should now have your data stored, and now on to the UI
//6. use .map to render each category to the screen (also add any supplemental UI (table and thead)...combo of Categories and SingleCategory)

export default function Resources() {
    const [resource, setResource] = useState([])

    const {currentUser} = useAuth()
    //hook to show/hide create form
    const [showCreate, setShowCreate] = useState(false);

    //Filtering steps - use .filter() to create a limited list of resources.
    //1. Create a hook that will store values for what the user wants to filter resources by...this hook will store the categoryId for the category they want to filter by.
    //2. place the conditional rendering for when filter === 0 in the initial map of resources
    //3. Create FilterCat to give the buttons to the user to filter by
    //4. Render in resources...see below
    //5. Create the conditional rendering for when filter != 0...see below

    //below we set useState to 0 because there is no categoryId of 0
    const [filter, setFilter] = useState(0)

    const getResource = () => {
        axios.get(`https://localhost:7005/api/Resources`).then((response) => {
            console.log(response)
            setResource(response.data)
        })
    }

    useEffect(() => {
        getResource()
    }, [])

    return (
        <section className='resources'>
            <article className='bg-info p-5'>
                <h1 className='text-center'>Resources Dashboard</h1>
            </article>
            {/* CREATE UI */}
            {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
                <div className='bg-dark p-2 mb-3 text-center'>
                    <button className='btn btn-primary' onClick={() => setShowCreate(!showCreate)}>
                        {!showCreate ? 'Create New Resource' : 'Close Form'}
                    </button>
                    <div className='createContainer'>
                        {showCreate &&
                            //Conditionally render ResourceCreate if showCreate is true
                            <ResourceCreate getResource={getResource} setShowCreate={setShowCreate} />
                        }
                    </div>
                </div>
            }
            {/* END CREATE UI */}
            <FilterCat setFilter={setFilter} />
            <Container>
                <article className='resourceGallery row justify-content-center'>
                    {/* Below we write conditional rendering to see if the user is trying to filter results or not */}
                    {filter === 0
                        ? resource.map((x) => (
                              //SingleResource will map each resource to a tile in our display. We add
                              //getResources so we can pass GET request functionality into SingleResource
                              //for edit/delete
                              <SingleResource key={x.resourceId} resource={x} getResource={getResource} />
                          ))
                        : resource.filter((x) => x.categoryId === filter).map((x) => <SingleResource key={x.resourceId} resource={x} getResource={getResource} />
                        )}
                    {filter !== 0 && resource.filter(x => x.categoryId === filter).length === 0 && 
                        <h2 className='alert alert-warning text-dark'>There are no results for this category.</h2>
                    }
                </article>
            </Container>
        </section>
    )
}
