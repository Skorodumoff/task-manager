import {Task} from "./task";

export class TaskManager {
  taskList: Task[] = [];

  constructor(tasks?: Task[]) {
    this.taskList = tasks !== undefined ? [...tasks] : [];
  }

  addTask(task: Task): void {
    this.taskList = [...this.taskList, task];
  }

  removeTask(taskId: string): void {
    this.taskList = this.taskList.filter(task => task.id !== taskId);
  }
}
