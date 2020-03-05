import React from 'react';

import { todos } from './data';
import TodoList from './components/TodoComponents/TodoList';
import TodoForm from "./components/TodoComponents/TodoForm";
import "./components/TodoComponents/Todo.css";

class App extends React.Component {
  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state

  constructor() {
    super();
    this.state = {
      todos
    };
  }

  toggleTodo = todoId => {
    // console.log("id: ", todoId);
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todoId === todo.id) {
          // console.log({ ...todo });
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    })
  }

  addTodo = todoText => {
    const newTodo = {
      task: todoText,
      id: Date.now(),
      completed: false
    };

    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  };

  clearCompleted = () => {
    this.setState({
      todos: this.state.todos.filter(task => {
        return !task.completed;
      })
    });
  }


  render() {
    return (
      <div className="App">
        <div className="header">
          <h2>Todo List</h2>
          <TodoForm addTodo={this.addTodo} />
        </div>
        <TodoList todos={this.state.todos} toggleTodo={this.toggleTodo} clearCompleted={this.clearCompleted} />
      </div>
    );
  }
}

export default App;
