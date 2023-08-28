import { Injectable } from '@nestjs/common';
import { ITask, ITaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  // Get all tasks
  getAllTasks(): ITask[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTaskFilterDto): ITask[] {
    const { search, status } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  // Get task by id
  getTaskById(id: string): ITask {
    return this.tasks.find((task) => task.id === id);
  }

  //Create a new task
  createTask(CreateTaskDto: CreateTaskDto): ITask {
    const { title, description } = CreateTaskDto;

    const task: ITask = {
      id: uuid(),
      title,
      description,
      status: ITaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  // Delete a task
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  // Update task task
  updateTaskStatus(id: string, status: ITaskStatus): ITask {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
