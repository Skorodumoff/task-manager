import {TaskManager} from './taskManager';
import {Task} from './task';

describe('taskManager', () => {
  it('should be initialized correctly without arguments', () => {
    const manager = new TaskManager();
    expect(manager.taskList).toEqual([]);
  });

  it("should be initialized correctly with arguments", () => {
    const tasks: Task[] = [
      new Task('task1', 'description1', 1),
      new Task('task2', 'description2', 2),
      new Task('task3', 'description3', 3)
    ];

    const manager = new TaskManager(tasks);

    expect(manager.taskList).not.toBe(tasks);
    expect(manager.taskList).toEqual(tasks);
  });

  describe('addTask method', () => {
    it("should add new task to the list of tasks", () => {
      const taskManager = new TaskManager();
      const task = new Task('testTask', 'testTaskDescription', 1);
      taskManager.addTask(task);

      expect(taskManager.taskList[0]).toEqual(task);
    });

    it('should add several tasks correctly', () => {
      const taskManager = new TaskManager();
      const task1 = new Task('task1', 'description1', 1);
      const task2 = new Task('task2', 'description2', 2);

      taskManager.addTask(task1);
      taskManager.addTask(task2);

      expect(taskManager.taskList[0]).toEqual(task1);
      expect(taskManager.taskList[1]).toEqual(task2);
    });
  });

  describe('removeTask method', () => {
    const tasks: Task[] = [
      new Task('task1', 'description1', 1),
      new Task('task2', 'description2', 2),
      new Task('task3', 'description3', 3)
    ];

    let manager: TaskManager;

    beforeEach(() => {
        manager = new TaskManager(tasks);
    });

    it('should remove correctly from the head of the list', () => {
        const taskForDeletion = tasks[0];
        manager.removeTask(taskForDeletion.id);
        expect(manager.taskList.length).toBe(2);
        expect(manager.taskList).not.toContain(taskForDeletion);
    });

    it('should remove correctly from the tail of the list', () => {
      const taskForDeletion = tasks[2];
      manager.removeTask(taskForDeletion.id);
      expect(manager.taskList.length).toBe(2);
      expect(manager.taskList).not.toContain(taskForDeletion);
    });

    it('should remove correctly from the middle of the list', () => {
      const taskForDeletion = tasks[1];
      manager.removeTask(taskForDeletion.id);
      expect(manager.taskList.length).toBe(2);
      expect(manager.taskList).not.toContain(taskForDeletion);
    });
  })
});





