import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoForm !: FormGroup;
  todos: ToDo[] = [];

  constructor(private fb: FormBuilder, private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      todoTitle: ['', Validators.required],
      dueTime: ['']
    });

    this.todos = this.todoService.getTodos();

    setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const sec = String(now.getSeconds()).padStart(2, '0');
      this.currentTime = `${hours}:${mins}:${sec}`;
    })
  }

  currentTime: string = '';


  addTodo(){
    if(this.todoForm.valid){
      const title = this.todoForm.value.todoTitle;
      const dueTime = this.todoForm.value.dueTime;
      this.todoService.addTodo(title, dueTime);
      this.todos = this.todoService.getTodos();
      this.todoForm.reset();
    }
  }

  toggle(id: number){
    this.todoService.toggleCompleted(id);
    this.todos = this.todoService.getTodos();
  }

  delete(id: number){
    this.todoService.deleteTodo(id);
    this.todos = this.todoService.getTodos();
  }

  isOverDue(todo: ToDo) : boolean{
    if(!todo.dueTime) return false;
    const now = new Date();
    const[h, m] = todo.dueTime.split(':').map(Number);
    const due = new Date();
    due.setHours(h,m,0,0);
    return now>due;
  }

}
