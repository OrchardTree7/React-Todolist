import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './AddTodo.css';

export default function AddTodo({ onAdd, selDate }) {
  const [text, setText] = useState('');
  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      // text의 여백을 없애고, 만약 여백을 없앴을 때 text가 없으면 return
      return;
    }
    onAdd({ id: uuidv4(), text, status: 'active', date: selDate });
    setText(''); // 입력된 값 비우기
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Todo를 입력하세요"
      />
      <button className={styles.button}>Add</button>
    </form>
  );
}
