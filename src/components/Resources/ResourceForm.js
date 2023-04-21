import React, {useState, useEffect} from 'react'
import { Formik, Field, Form } from 'formik'
import { resourceSchema } from '../../utilities/validationSchema'
import axios from 'axios'//we need axios here to getCategories() for a dropdown list

export default function ResourceForm(props) {

    //We need to get categories from the API to populate a dropdown list
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        axios.get(`https://localhost:7005/api/Categories`).then(response => setCategories(response.data))
    }

    const handleSubmit = (values) => {
        console.log(values)
        //Create portion functionality
        if(!props.resource){
            const resourceToCreate = values

            axios.post(`https://localhost:7005/api/Resources`, resourceToCreate).then(() => {
                props.getResource()
                props.setShowCreate(false)//close the create form
            })
        }
        //Edit portion functionality
        else
        {
            const resourceToEdit = {
            resourceId: props.resource.resourceId,
            name: values.name,
            url: values.url,
            linkText: values.linkText,
            description: values.description,
            categoryId: values.categoryId
        }
            axios.put(`https://localhost:7005/api/Resources/${props.resource.resourceId}`, resourceToEdit).then(()=>{
                props.getResource()
                props.setShowEdit(false)
            })

        }
    }

    useEffect(() => {
        getCategories()
    }, []);

  return (
    <Formik
        initialValues={{
            name: props.resource ? props.resource.name : '',
            url: props.resource ? props.resource.url : '',
            linkText: props.resource ? props.resource.linkText : '',
            description: props.resource ? props.resource.description : '',
            categoryId: props.resource ? props.resource.categoryId : ''
        }}
        validationSchema={resourceSchema}
        onSubmit={(values) => handleSubmit(values)}
    >
        {/* Start with the structure below and place your form in the empty parens
            {({errors, touched}) => ()}
        */}
        {({errors, touched}) => (
            <Form id='resourceForm'>
                <div className='form-group m-3'>
                    <Field name='name' className='form-control' placeholder='Name' />
                    {errors.name && touched.name ? (
                        <div className='text-danger'>{errors.name}</div>
                    ) : null}
                </div>
                <div className='form-group m-3'>
                    <Field name='url' className='form-control' placeholder='Url' />
                    {errors.url && touched.url ? (
                        <div className='text-danger'>{errors.url}</div>
                    ) : null}
                </div>
                <div className='form-group m-3'>
                    <Field name='linkText' className='form-control' placeholder='Link Text' />
                    {errors.linkText && touched.linkText ? (
                        <div className='text-danger'>{errors.linkText}</div>
                    ) : null}
                </div>
                <div className='form-group m-3'>
                    <Field name='description' className='form-control' placeholder='Description' />
                    {errors.description && touched.description ? (
                        <div className='text-danger'>{errors.description}</div>
                    ) : null}
                </div>
                <div className='form-group m-3'>
                    <Field as='select' name='categoryId' className='form-control'>
                        <option value='' disabled>[--Please Choose--]</option>
                        {/* below we will map an option for every category in the API */}
                        {categories.map(cat => 
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.categoryName}
                            </option>
                        )}
                    </Field>
                </div>
                <div className='form-group m-3'>
                    <button type='submit' className='btn btn-info m-3'>Submit Resource to API</button>
                </div>
            </Form>
        )}
    </Formik>
  )
}
