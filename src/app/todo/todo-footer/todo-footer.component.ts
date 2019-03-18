import { Component, OnInit } from '@angular/core';
import * as fromFiltro from '../../filter/filter.actions';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { Todo } from '../model/todo.model';
import { BorrarAllTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  tareasPendientes: number;
  filtrosValidos: fromFiltro.filtrosValidos [] = ['todos', 'completados', 'pendientes'];
  filtroActual: fromFiltro.filtrosValidos;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe( state => {
      this.contarTareasPendientes(state.todos);
      this.filtroActual = state.filtro;
    });
  }

  cambiarFiltro( nuevoFiltro: fromFiltro.filtrosValidos) {
    const accion = new fromFiltro.SetFiltroAction(nuevoFiltro);
    this.store.dispatch(accion);
  }

  contarTareasPendientes(todos: Todo[]) {
    this.tareasPendientes = todos.filter( todo => todo.completado === false).length;
  }

  borrarTodoCompletados() {
    const accion = new BorrarAllTodoAction();
    this.store.dispatch(accion);
  }

}
