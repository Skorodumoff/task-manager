import {Observable, Subject} from "rxjs";
import {Task} from "../../model/tasks/task";
import * as _prompt from "prompt";

export class TaskPresenter {
  tasks$: Observable<Task[]>;
  tasks: Task[] = [];
  taskAdded$: Subject<Task> = new Subject<Task>();

  constructor(tasks$: Observable<Task[]>) {
    this.tasks$ = tasks$;
    this.tasks$.subscribe(tasks => this.tasks = [...tasks]);
  }

  displayTasks(): void {
    console.log('Task List:');
    console.table(this.tasks);
  }

  addTask(): void {
    const prompt = _prompt as any;

    prompt.start();
    prompt.get(['title', 'description', 'estimate'],  (err: Error, result: any) => {
      if (err) {
        return console.log(err);
      }

      console.log('Data received');

      const {title, description, estimate}: {title: string; description: string; estimate: number} = result;
      const task = new Task(title, description, estimate);
      this.taskAdded$.next(task);
    });
  }

  // removeTask(): Observable<string> {
  //
  // }
}
