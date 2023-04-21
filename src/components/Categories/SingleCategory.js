import React, {useState} from 'react'
import { useAuth } from '../../contexts/AuthContext'
//below we import ReactIcons after `npm install react-icons
import {FaTrashAlt, FaEdit } from 'react-icons/fa'
import CatEdit from './CatEdit'
import axios from 'axios'

export default function SingleCategory(props) {
  const {currentUser} = useAuth()

  //hook to display the edit modal
  const [showEdit, setShowEdit] = useState(false);

  //logic for delete
  const deleteCat = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.category.categoryName}?`)) {
      axios.delete(`https://localhost:7005/api/categories/${id}`).then(() => {props.getCategories()})
    }
  }

  return (
    <tr>
        <td>{props.category.categoryName}</td>
        <td>{props.category.categoryDescription}</td>
        {/* EDIT UI */}
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
          <td>
            <button className='m-1 rounded' id='editLink' onClick={() => setShowEdit(true)}><FaEdit /></button>
            {/* DELETE UI */}
            <button className='m-1 rounded' id='deleteLink' onClick={() => deleteCat(props.category.categoryId)}>
              <FaTrashAlt />
            </button>
            {showEdit &&
              <CatEdit
                showEdit={showEdit}//tied to the opening/closing of the Modal
                setShowEdit={setShowEdit}//tied to closing the Modal in catEdit.js
                getCategories={props.getCategories}//needed for running a GET request after editing
                category={props.category}//needed for CatForm editing
              />
            }
          </td>
        }
        {/* END EDIT UI */}
    </tr>
  )
}
