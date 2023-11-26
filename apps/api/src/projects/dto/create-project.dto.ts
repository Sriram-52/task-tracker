import { IsArray } from 'class-validator';
import { CreateProjectDto as Base } from 'src/libs/models';

export class CreateProjectDto extends Base {
  @IsArray()
  assignedUsers: string[];
}
