import React from 'react'
import PropTypes from 'prop-types'
import {partial} from '../../lib/utils'



 const TodoItem = (props) => {
  const handleRemove = partial(props.handleRemove,props.id)
  const handleToggle = partial(props.handleToggle,props.id);
   return (
     
     
        <li>
          
          <input type="checkbox" onChange={handleToggle} checked={props.isComplete}/> {props.name} <a href="#" onClick={handleRemove}>X</a>
        </li>
    
   )
 }

 TodoItem.propTypes={
   isComplete:PropTypes.bool,
   name:PropTypes.string
 }
export default TodoItem;