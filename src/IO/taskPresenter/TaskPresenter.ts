import {Observable, Subject} from "rxjs";
import {Task} from "../../model/tasks/task";
import * as _prompt from "prompt";

export interface TaskData {
  title: string;
  description: string;
  estimate: number;
}

export class TaskPresenter {
  tasks$: Observable<Task[]>;
  tasks: Task[] = [];
  taskAdded$: Subject<Task> = new Subject<Task>();

  constructor(tasks$: Observable<Task[]>) {
    this.tasks$ = tasks$;
    this.tasks$.subscribe(tasks => this.tasks = [...tasks]);
  }

  displayTasks(): void {
    console.log();

    console.log('Task List:');
    this.tasks.forEach(task => console.table(task));
  }

  async addTask() {
    const {title, description, estimate}: TaskData = await this.getTaskDataFromConsole();
    const task = new Task(title, description, estimate);
    this.taskAdded$.next(task);
  }

  async getTaskDataFromConsole(): Promise<TaskData> {
    const prompt = _prompt as any;
    prompt.start();

    const {title, description, estimate} = await prompt.get(['title', 'description', 'estimate']);
    return {title, description, estimate: parseInt((estimate))}
  }

  // removeTask(): Observable<string> {
  //
  // }
}

