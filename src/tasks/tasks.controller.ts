import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask, ITaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // Get all tasks
  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): ITask[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilter(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  // Get task by id
  @Get(':id')
  getTaskById(@Param('id') id: string): ITask {
    return this.tasksService.getTaskById(id);
  }

  // Create a new task
  @Post()
  createTask(
    @Body()
    CreateTaskDto: CreateTaskDto,
  ): ITask {
    return this.tasksService.createTask(CreateTaskDto);
  }

  // Deleting a task
  @Delete(':id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }

  // Update task status
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: ITaskStatus,
  ): ITask {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
