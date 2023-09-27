import React, { useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { BsCheck2 } from 'react-icons/bs';
import { TbEdit } from 'react-icons/tb';
import './App.css';

function Todo({ todo, index, completeTodo, removeTodo, updateTodo }) {
  return (
    <div className="todo" style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}>
      {todo.text}
      <div className='btn-todo'>
        <button className="btn-complete" onClick={() => completeTodo(index)}>
          <BsCheck2 />
        </button>
        <button className="btn-update" onClick={() => updateTodo(index)}>
          <TbEdit />
        </button>
        <button className="btn-remove" onClick={() => removeTodo(index)}>
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label for="exampleFormControlInput1" class="form-label">
        Form Todo
      </label>
      <input type="text" className="form-control" class="juhdi" value={value} onChange={(e) => setValue(e.target.value)} />
    </form>
  );
}

// Get localstorage
const getLocalStorage = () => {
  let todo = localStorage.getItem('todos');
  if (todo) {
    return (todo = JSON.parse(localStorage.getItem('todos')));
  } else {
    return [];
  }
};

function App() {
  const [todos, setTodos] = React.useState(getLocalStorage);

  // set localstorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // addTodo
  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  // complateTodo
  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  // removeTodo
  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // updateTodo
  const updateTodoItem = (index) => {
    const newTodoItems = [...todos];
    let item = newTodoItems[index];
    let newItem = prompt(`Update ke?`, item.text);
    newTodoItems.splice(index, 1, { text: newItem });
    setTodos(newTodoItems);
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  return (
    <div className="app">
      <div className="todo-list">
        <div className="todo-title">
          <h1>Todo List</h1>
          <TodoForm addTodo={addTodo} />
          {todos.map((todo, index) => (
            <Todo key={index} index={index} todo={todo} completeTodo={completeTodo} removeTodo={removeTodo}  updateTodo={updateTodoItem} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;