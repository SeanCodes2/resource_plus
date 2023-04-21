//This file will house the schemas for both resources and categories for our create/edit form. To bring in a simple validation
//implementation, we are going to use Yup by installing it (npm install yup) - see implementation below

//Yup will work in tandem with Formik, which is an npm package that creates and stores form inputs for each item
//(categoryName, categoryDescription) that we need to capture in our forms. (npm install formik)

/* This is what we need for category POST. we will ahve inputs for each in teh form.
    {
        'categoryName': 'Test',
        'categoryDescription': 'Test Description'
    }
*/

import * as Yup from 'yup'

const catSchema = Yup.object().shape({
    //Below we call to each property that will need to be validated and use Yup to define the requirements for each prop (required, max length, etc...)
    categoryName: Yup.string().max(25, 'Max 25 Characters').required('Required'),
    categoryDescription: Yup.string().max(50, 'Max 50 Characters')
})

const resourceSchema = Yup.object().shape({
    name: Yup.string().max(25, 'Max 25 Characters').required('Required'),
    description: Yup.string().max(50, 'Max 50 Characters'),
    url: Yup.string().max(75, 'Max 75 Characters').required('Required'),
    linkText: Yup.string().max(25, 'Max 25 Characters').required('Required'),
    categoryId: Yup.number().required('Required')
})

//below we export our schemas. we could do both together { } or can set one to be the default
export { resourceSchema }
export default catSchema