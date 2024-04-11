# To-do-list
UI Code
// TodoList.tsx
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
Item

// TodoItem.tsx
import React, { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title: string, description?: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    editTodo(todo.id, title, description);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <div>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <button onClick={handleToggleEdit}>Edit</button>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
Filter

// Filter.tsx
import React from 'react';

interface FilterProps {
  filterTodos: (filter: 'all' | 'active' | 'completed') => void;
}

const Filter: React.FC<FilterProps> = ({ filterTodos }) => {
  return (
    <div>
      <button onClick={() => filterTodos('all')}>All</button>
      <button onClick={() => filterTodos('active')}>Active</button>
      <button onClick={() => filterTodos('completed')}>Completed</button>
    </div>
  );
};

export default Filter;
Add

// AddTodoForm.tsx
import React, { useState } from 'react';

interface AddTodoFormProps {
  addTodo: (title: string, description?: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodoForm;
