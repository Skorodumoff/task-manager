import {Task} from "./task";
import {BehaviorSubject, Observable} from "rxjs";

export class TaskManager {
  taskList: Task[] = [];
  tasks$: Observable<Task[]>;

  constructor(tasks?: Task[]) {
    this.taskList = tasks !== undefined ? [...tasks] : [];
    this.tasks$ = new BehaviorSubject([...this.taskList]);
  }

  addTask(task: Task): void {
    this.taskList = [...this.taskList, task];
  }

  removeTask(taskId: string): void {
    this.taskList = this.taskList.filter(task => task.id !== taskId);
  }
}
