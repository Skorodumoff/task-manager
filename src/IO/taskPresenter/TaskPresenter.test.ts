import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {TaskPresenter} from "./TaskPresenter";
import {Task} from "../../model/tasks/task";
import {TaskData} from "./TaskPresenter";

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
    });

    it('should output all tasks in the tabular form to console', () => {
      const tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(tasks);
      const presenter = new TaskPresenter(tasks$);

      presenter.displayTasks();

      expect(consoleLogSpy).toBeCalledWith('Task List:');
      expect(consoleTableSpy).toBeCalledTimes(tasks.length);
      expect(consoleTableSpy).toBeCalledWith(tasks[0]);
      expect(consoleTableSpy).toBeCalledWith(tasks[1]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
  });

  describe('addTask method', () => {
    it('should push to the "taskAdded" observable', done => {
      const presenter = new TaskPresenter(of([]));

      const taskData: TaskData = {title: 'title', description: 'description', estimate: 1};

      // mocking function which handles console input
      presenter.getTaskDataFromConsole =  async () => taskData;

      presenter.taskAdded$.subscribe(task => {
        expect(task.title).toEqual(taskData.title);
        expect(task.description).toEqual(taskData.description);
        expect(task.estimate).toEqual(taskData.estimate);
        done();
      });

      presenter.addTask();
    });
  });
});
