import { IsArray } from 'class-validator';
import { CreateTaskDto as Base } from 'src/libs/models';

export class CreateTaskDto extends Base {
  @IsArray()
  assignedUsers: string[];
}
