import React, {useState} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import {FaTrashAlt, FaEdit } from 'react-icons/fa'
import ResourceEdit from './ResourceEdit';
import axios from 'axios';


export default function SingleResource(props) {
  const {currentUser} = useAuth()
  //hook to open/close our edit Modal
  const [showEdit, setShowEdit] = useState(false);

  const deleteResource = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.resource.name}?`)) {
      axios.delete(`https://localhost:7005/api/Resources/${id}`).then(() => {props.getResource()})
    }

  }

  return (
    <div className='singleResource col-md-5 m-4'>
      {/* EDIT UI */}
      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <div>
          <button id='editLink' onClick={() => setShowEdit(true)}>
            <FaEdit />
          </button>
          {/* DELETE UI  */}
          <button className='m-1 rounded' id='deleteLink' onClick={() => deleteResource(props.resource.resourceId)}>
              <FaTrashAlt />
          </button>

          {showEdit &&
            <ResourceEdit
              resource={props.resource}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              getResource={props.getResource} />
          }
        </div>

      }
        <h3>{props.resource.name}</h3>
        {props.resource.description !== null ?
            <p>{props.resource.description}</p> :
            <p>No Description Provided</p>
        }
        <a href={props.resource.url} target='_blank' rel='noreferrer' className='btn btn-info'>
            Visit {props.resource.linkText} 
        </a>
    </div>
  )
}
