import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import TodoForm from './components/todo/TodoForm';
// import TodoList from './components/todo/TodoList';
import {TodoForm, TodoList,Footer} from './components/todo';
import {addTodo,generateId,findById,toggleTodo,updateTodo,removeTodo,filterTodos} from './lib/todoHelpers';
import {pipe,partial} from './lib/utils'
import {loadTodos,createTodo,saveTodo,destroyTodo} from './lib/todoService'

import PropTypes from 'prop-types'


class App extends Component {
  state = {
      todos:[],
      currentTodo:''
    
  }

  static contextTypes = {
    route: PropTypes.string,
    linkHandler:PropTypes.func
  }
  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos}))
  }

  handleRemove = (id,evt) => {
    evt.preventDefault();
    const updatedTodos = removeTodo(this.state.todos,id);
    this.setState({
      todos:updatedTodos
    })
    destroyTodo(id)
      .then(()=>this.showTempMessage('todo removed'))
  }
  handleInputChange = (evt)=>{
    this.setState({
      currentTodo:evt.target.value
    })
  }
  handleSubmit = (evt) => {
    evt.preventDefault();
    const newTodo = {id:generateId(), name:this.state.currentTodo,isComplete:false}
    const updatedTodos = addTodo(this.state.todos,newTodo);
    this.setState({
      todos:updatedTodos,
      currentTodo:'',
      errorMesage:''
    })
    createTodo(newTodo)
    .then(() => this.showTempMessage('Todo added'))
  }
  
  showTempMessage = (msg) => {
    this.setState({message: msg})
    setTimeout(() => this.setState({message: ''}), 2500)
  }

  handleEmptySubmit = (evt) =>{
    evt.preventDefault();
    this.setState({
      errorMesage:'Please supply a todo name'
    })
  }
  handleToggle = (id) =>{
    // const todo = findById(id,this.state.todos);
    // const toggled  = toggleTodo(todo);
    // const updatedTodos = updateTodo(this.state.todos,toggled);
    const getToggledTodo = pipe(findById, toggleTodo)
    const updated = getToggledTodo(id, this.state.todos)
    const getUpdatedTodos = partial(updateTodo, this.state.todos)
    const updatedTodos = getUpdatedTodos(updated)
    this.setState({todos: updatedTodos})
    saveTodo(updated)
      .then(() => this.showTempMessage('Todo Updated'))
  }
  render() {
    const displayTodos = filterTodos(this.state.todos,this.context.route)
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    return (
      <div className="App">
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React TODOS</h1>
        </header>
        <div className="todos-app">
        {this.state.errorMesage && <span className="error">{this.state.errorMesage}</span>}
        {this.state.message && <span className="success">{this.state.message}</span>}
        
          <TodoForm handleInputChange = {this.handleInputChange} currentTodo={this.state.currentTodo} handleSubmit={submitHandler}/>
          <TodoList todos={displayTodos} handleToggle={this.handleToggle} handleRemove={this.handleRemove}/>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
