import { makeAutoObservable, runInAction } from 'mobx';
import { nanoid } from '../utils/nanoid';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

class TodoStore {
    private static instance: TodoStore;
    todos: Todo[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    static getInstance(): TodoStore {
        if (!TodoStore.instance) {
            TodoStore.instance = new TodoStore();
        }
        return TodoStore.instance;
    }

    addTodo(text: string) {
        const newTodo: Todo = {
            id: nanoid(),
            text,
            completed: false,
        };
        runInAction(() => {
            this.todos.push(newTodo);
        });
    }

    toggleTodo(id: string) {
        runInAction(() => {
            const todo = this.todos.find((t) => t.id === id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        });
    }

    deleteTodo(id: string) {
        runInAction(() => {
            this.todos = this.todos.filter((t) => t.id !== id);
        });
    }
}

export { TodoStore };
