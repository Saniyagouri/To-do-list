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
