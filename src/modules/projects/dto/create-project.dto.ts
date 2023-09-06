import { IsEmail, IsNotEmpty, Length, Matches, Max } from 'class-validator';
import { MESSAGES, REGEX } from 'src/app.utils';

export class CreateProjectDto {
  @IsNotEmpty()
  @Length(1, 11)
  senderId: string;

  @IsNotEmpty()
  @Length(1, 160)
  isiBerita: string;

  @IsNotEmpty()
  tglKirim: Date;
}
