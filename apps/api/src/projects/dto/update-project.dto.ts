import { ArrayNotEmpty, IsArray } from 'class-validator';
import { UpdateProjectDto as Base } from 'src/libs/models';

export class UpdateProjectDto extends Base {
  @IsArray()
  @ArrayNotEmpty()
  assignedUsers?: string[];
}
