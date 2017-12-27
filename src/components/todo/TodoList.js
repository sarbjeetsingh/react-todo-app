import React from 'react'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'


 export const TodoList = (props) => {
   return (
    <div className="todo-list">
    <ul>
      {props.todos.map(todo => <TodoItem handleToggle={props.handleToggle} key={todo.id} {...todo} handleRemove = {props.handleRemove}/>)}
      
    </ul>
  </div>
   )
 }

TodoList.propTypes = {
  todos: PropTypes.array.isRequired
}
// export default TodoList;