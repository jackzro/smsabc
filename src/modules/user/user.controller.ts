import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRegisterRequestDto } from './dto/user-register.req.dto';
import { SETTINGS } from 'src/app.utils';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/token/add')
  async addToken(@Body() addtoken) {
    return this.userService.addTokenToAcc(addtoken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/register')
  async doUserRegistration(
    // @Body() userRegister: UserRegisterRequestDto,
    @Body(SETTINGS.VALIDATION_PIPE) userRegister: UserRegisterRequestDto,
    @Req() req,
  ) {
    try {
      await this.userService.doUserRegistration(userRegister, req.user.role);
      return 'The account successfully created !!!';
    } catch (error) {
      return error;
    }
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOne(@Res({ passthrough: true }) response: Response, @Req() req) {
    const user = await this.userService.getUserById(req.user.id);
    const acc = await this.userService.getNumberofAcc(req.user.id);
    return {
      user: {
        id: user.id,
        role: user.role,
        name: user.username,
        companyName: user.companyName,
        contactNumber: user.contactNumber,
        projects: user.projects,
        token: user.token,
      },
      acc,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/acc')
  async findNumberOfAcc(@Req() req) {
    return await this.userService.getNumberofAcc(req.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
