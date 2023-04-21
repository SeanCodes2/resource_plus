import React from 'react'
import { Col } from 'react-bootstrap'

export default function ShallowRender(props) {
  return (
    <Col md={6} >
        <article className='border-dark border rounded m-1 p-4'>
            <h2 className='text-center p-2'>
                Shallow Rendering
            </h2>
            <p>
                Shallow Rendering allows us to test in a simplier environment than a browser to ensure our React Component code is functioning without errors. 
            </p>
            <p>We will create a button component in the testing components/testing folder.</p>
            <ol>
                Follow the steps below to create a simple test:
                <li>Create a Button folder in the testing folder</li>
                <li>Create a Button.js file that houses a Button component</li>
                <li>Create a Button.test.js file to write the unit tests</li>
                <li>Create the tests to render or to ensure props are displaying correctly. See Button.test.js for examples</li>
            </ol>
        </article>
    </Col>
  )
}
