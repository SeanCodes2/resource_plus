import React from 'react'
import { Formik, Form, Field } from 'formik'
import catSchema from '../../utilities/validationSchema'
import axios from 'axios'

export default function CatForm(props) {
    const handleSubmit = (values) => {
        console.log(values)
        //Below is the Create logic of handleSubmit()
        if(!props.category){
            //Below is the logic for creating a new category
            const catToCreate = values//assemble a temp object to send in our request

            //send the object in a POST request to the API
            axios.post(`https://localhost:7005/api/Categories`, catToCreate).then(() => {
                props.setShowCreate(false)//This will close the form, we passed this callback funciton from Categories.js
                props.getCategories()//This makes a GET request to API, also passed from Categories.js

            })
        }
        //Below is the Edit logic of handlesubmit()
        else {
            //Because our form only captures the categoryName and description, we need to pass an entire object into the PUT request, including the categoryId
            const catToEdit = {
                categoryId: props.category.categoryId,
                categoryName: values.categoryName,
                categoryDescription: values.categoryDescription
            }
            axios.put(`https://localhost:7005/api/Categories/${props.category.categoryId}`, catToEdit).then(() => {
                props.setShowEdit(false)
                props.getCategories()
            })
        }
    }

  return (
    <div className='createCategory m-2 text-white text-center'>
        <Formik
            initialValues={{
                //Below is a ternary operator that makes our form behave differently based on whether we have a prop called category (If we have one we are editing, otherwise, creating)
                categoryName: props.category ? props.category.categoryName : '',
                categoryDescription: props.category ? props.category.categoryDescription : ''
            }}
            validationSchema={catSchema}
            onSubmit={values => handleSubmit(values)}
        >
                {({errors, touched}) => (
                    //Inside these parens we will build our form
                    <Form id='catForm' className='row text-center m-auto'>
                        <div className='form-group m-1 p-1'>
                            <Field name='categoryName' className='form-control' placeholder='Name' />
                            {errors.categoryName && touched.categoryName ?
                                <div className='text-danger'>{errors.categoryName}</div>
                            : null}
                        </div>
                        <div className='form-group m-1 p-1'>
                            <Field name='categoryDescription' className='form-control' placeholder='Description' />
                            {errors.categoryDescription && touched.categoryDescription ?
                                <div className='text-danger'>{errors.categoryDescription}</div>
                            : null}
                        </div>
                        <div className='form-group m-1'>
                            <button type='submit' className='btn btn-success'>Submit Category to API</button>
                        </div>
                    </Form>

                )}            
        </Formik>
            
    </div>
  )
}
