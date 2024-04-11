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
