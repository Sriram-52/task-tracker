import { IsArray } from 'class-validator';
import { UpdateTaskDto as Base } from 'src/libs/models';

export class UpdateTaskDto extends Base {
  @IsArray()
  assignedUsers?: string[];
}
