import {Task} from "./task";

test(('task should be initialized correctly'), () => {
  const task = new Task('title', 'description', 7);
  expect(task.id).not.toBe(undefined);
  expect(task.title).toBe('title');
  expect(task.description).toBe('description');
  expect(task.estimate).toBe(7);
})
