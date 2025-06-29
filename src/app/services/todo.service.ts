import { Injectable } from '@angular/core';
import { ToDo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: ToDo[] = [];

  constructor() {
    const savedTodos = localStorage.getItem('todos');
    this.todos = savedTodos ? JSON.parse(savedTodos) : []; //parsing from json string back to an array , give back an actual array of obcjects
  }

  getTodos(): ToDo[]{
    return this.todos;
  }

  addTodo(title: string, dueTime?: string){
    const newTodo: ToDo = {
      id: Date.now(),
      title: title,
      completed: false,
      dueTime
    };
    this.todos.push(newTodo);
    this.saveTodos();
  }

  private saveTodos(){
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  deleteTodo(id: number){
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }

  toggleCompleted(id: number){
    const todo = this.todos.find(x => x.id === id);
    if(todo){
      todo.completed = !todo.completed;
      this.saveTodos();
    }
  }

  increaseDueTime(todo: ToDo, minutesToBeAdded: number){
    if(!todo.dueTime) return;
    const[h, m] = todo.dueTime?.split(':').map(Number);
    const due = new Date();
    due.setHours(h,m,0,0);
    due.setMinutes(due.getMinutes() + minutesToBeAdded);

    const newHours = String(due.getHours()).padStart(2, '0');
    const newMinutes = String(due.getMinutes()).padStart(2, '0');

    todo.dueTime = `${newHours}:${newMinutes}`;

    this.saveTodos();
  }
}
