import React from 'react'
import { Col } from 'react-bootstrap'

export default function EndToEnd(props) {
  return (
    <Col md={6} className='text-left'>
        <article className='border-dark border rounded p-4 m-1'>
            <h2 className='text-center p-2'>End-To-End Testing</h2>
            {/* The data-testid below is connected to the Button.test.js currently running the unit test for this component
                we use this attribute so we can test to make sure the prop is rendering correctly without having to look in
                the browser */}
            <p data-testid='paragraph1'>{props.test}</p>
            <p>
                Up until today, we have been utilizing end-to-end testing. In end-to-end testing, we run the application in
                the actual browser environment and test the experience from the users perspective.
            </p>
            <h3>Key points in end-to-end testing</h3>
            <ul>
                <li>Use 'npm start' to launch in the browser</li>
                <li>Hit F12 or right click to use the inspector</li>
                <li>Use the components tab in the inspector to find values of state data and props</li>
            </ul>
            <p>
                In this enviroment, it is vital to keep in mind all the edge cases in order to effectively test the app. Think about all the items that could fail and test them.
            </p>
        </article>
    </Col>
  )
}
