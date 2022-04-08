import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {TaskPresenter} from "./TaskPresenter";
import {Task} from "../../model/tasks/task";
import * as _prompt from "prompt";

describe('TaskPresenter', () => {
  const tasks = [
    new Task('task1', 'desc1', 1),
    new Task('task2', 'desc2', 2)
  ];

  it('should be initialized correctly', () => {
    const tasks$: Observable<Task[]> = of(tasks);
    const presenter = new TaskPresenter(tasks$);

    expect(presenter.tasks$).toBe(tasks$);
  });

  it('should reassign the "tasks" field every time the tasks observable emits', () => {
    const tasks$: Subject<Task[]> = new Subject<Task[]>();
    const presenter = new TaskPresenter(tasks$);

    expect(presenter.tasks).toEqual([]);

    tasks$.next(tasks);

    expect(presenter.tasks).toEqual(tasks);
  });

  describe('display tasks method', () => {
     let consoleTableSpy: jest.SpyInstance;
     let consoleLogSpy: jest.SpyInstance;

     beforeEach(() => {
       consoleTableSpy = jest.spyOn(console, 'table').mockImplementation();
       consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    it('should print empty table to the console, if the list of tasks is empty', () => {
      const tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
      const presenter = new TaskPresenter(tasks$);

      presenter.displayTasks();

      expect(consoleLogSpy).toBeCalledWith('Task List:');
      expect(consoleTableSpy).toBeCalledWith([]);
    });

    it('should output all tasks in the tabular form to console', () => {
      const tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(tasks);
      const presenter = new TaskPresenter(tasks$);

      presenter.displayTasks();

      expect(consoleLogSpy).toBeCalledWith('Task List:');
      expect(consoleTableSpy).toBeCalledWith(tasks);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
  });

  describe('addTask method', () => {
    it('should push to the "taskAdded" observable', done => {
      const presenter = new TaskPresenter(of([]));
      const newTask = new Task('title', 'description', 2);

      presenter.taskAdded$.subscribe(task => {
        expect(task.title).toEqual(newTask.title);
        expect(task.description).toEqual(newTask.description);
        expect(task.estimate).toEqual(newTask.estimate);
        done();
      });

      const prompt = _prompt as any;

      const promptFunctionMock = (_: any, callback: (err: Error | null, result: any) => void) => {
        callback(null, {...newTask})
      }

      prompt.get = jest.fn(promptFunctionMock);

      presenter.addTask();
    });
  });
});
