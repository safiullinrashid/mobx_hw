import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import './TodoList.css';
import { TodoStore } from '../../stores/TodoStore.ts';
import deleteIcon from '../../assets/Delete.png';

const TodoList = observer(() => {
    const [newTodo, setNewTodo] = useState('');
    const todoStore = TodoStore.getInstance();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(event.target.value);
    };

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            todoStore.addTodo(newTodo.trim());
            setNewTodo('');
        }
    };

    const handleToggleTodo = (id: string) => {
        todoStore.toggleTodo(id);
    };

    const handleDeleteTodo = (id: string) => {
        todoStore.deleteTodo(id);
    };

    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <div className="todo-input">
                <input
                    type="text"
                    placeholder="Add a new todo"
                    value={newTodo}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddTodo}>Add</button>
            </div>
            <ul className="todo-items">
                {todoStore.todos.map((todo) => (
                    <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                        <div className="todo-item">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleTodo(todo.id)}
                            />
                            <span>{todo.text}</span>
                            <button className="delete-button" onClick={() => handleDeleteTodo(todo.id)}>
                                <img src={deleteIcon} alt="Delete" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default TodoList;
