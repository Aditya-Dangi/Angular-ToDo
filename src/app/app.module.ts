import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DueTimeStatusPipe } from './pipe/due-time-status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    DueTimeStatusPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
