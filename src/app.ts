import {TaskPresenter} from "./IO/taskPresenter/TaskPresenter";
import {of} from "rxjs";
import {TaskManager} from "./model/tasks/taskManager";

console.log("hello I'm the task tracker");

(async () => {
  const taskManager = new TaskManager();

  const presenter = new TaskPresenter(of([]));
  await presenter.addTask();
  presenter.displayTasks();
})();




