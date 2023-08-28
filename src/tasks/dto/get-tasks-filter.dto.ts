import { ITaskStatus } from '../tasks.model';

export class GetTaskFilterDto {
  status: ITaskStatus;
  search: string;
}
