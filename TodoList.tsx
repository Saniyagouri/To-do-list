import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import Filter from './Filter';
import AddTodoForm from './AddTodoForm';

interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string, description?: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filterTodos = (filter: 'all' | 'active' | 'completed') => {
    setFilter(filter);
  };

  const editTodo = (id: number, title: string, description?: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, title, description } : todo
      )
    );
  };

  const sortedTodos = (todos: Todo[]) => {
    return todos.slice().sort((a, b) => a.title.localeCompare(b.title));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div>
      <header>
        <h1>Todo List</h1>
        <p>Student name - Saniya Gouri</p>
      </header>
      <main>
        <Filter filterTodos={filterTodos} />
        <ul>
          {sortedTodos(filteredTodos).map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))}
        </ul>
        <AddTodoForm addTodo={addTodo} />
      </main>
    </div>
  );
};

export default TodoList;
