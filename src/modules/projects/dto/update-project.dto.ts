import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsNotEmpty, Length } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsNotEmpty()
  @Length(1, 11)
  senderId: string;

  @IsNotEmpty()
  @Length(1, 160)
  isiBerita: string;

  @IsNotEmpty()
  tglKirim: Date;
}
