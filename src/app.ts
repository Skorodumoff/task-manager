import {TaskPresenter} from "./IO/taskPresenter/TaskPresenter";
import {of} from "rxjs";

console.log("hello I'm the task tracker");

const presenter = new TaskPresenter(of([]));

presenter.addTask();



