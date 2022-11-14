import { useState, useRef } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import './Todo.css';

export default function Todo({ todo, onUpdate, onDelete, date }) {
  const { id, text, status } = todo;
  const [isEdit, setEdit] = useState(false);
  const editInput = useRef();

  const handleChange = (e) => {
    const status = e.target.checked ? 'completed' : 'active';
    onUpdate({ ...todo, status });
  };
  const handleDelete = () => onDelete(todo);
  const handleEdit = () => {
    setEdit(() => !isEdit);
    if (isEdit === true) {
      const text = editInput.current.value;
      onUpdate({ ...todo, text });
    }
  };

  return (
    <li className="todo">
      <input
        className="checkbox"
        type="checkbox"
        id={id}
        date={date.getDate()}
        checked={status === 'completed'}
        onChange={handleChange}
      />
      {isEdit ? (
        <input ref={editInput} type="text" id={id} defaultValue={text} />
      ) : (
        <label className="text" htmlFor={id}>
          {text}
        </label>
      )}
      <span className="icon">
        <button className="button" onClick={handleEdit}>
          <FaEdit />
        </button>
        <button className="button" onClick={handleDelete}>
          <FaTrashAlt />
        </button>
      </span>
    </li>
  );
}
