import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { UserRegisterRequestDto } from './dto/user-register.req.dto';
import { UserRoles } from './enums/user.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  async doUserRegistration(
    userRegister: UserRegisterRequestDto,
    role,
  ): Promise<User> {
    const user = new User();
    user.username = userRegister.username;
    user.email = userRegister.email;
    user.password = userRegister.password;
    user.companyName = userRegister.companyName;
    user.contactNumber = userRegister.contactNumber;
    user.createdBy = userRegister.createdBy;
    if (role === 'admin') {
      user.role = UserRoles.RESELLER;
    }
    if (role === 'reseller') {
      user.role = UserRoles.ACCOUNT;
    }

    return await user.save();
  }
  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async getUserByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  async getUserById(id) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['projects'],
    });
  }

  async getNumberofAcc(id) {
    const acc = await this.userRepository.find({
      createdBy: id,
    });
    return acc;
  }

  async addTokenToAcc(data) {
    const userFrom = await this.getUserById(data.From);
    const userTo = await this.getUserById(data.To);
    if (userFrom.token < data.token) {
      throw new HttpException(
        'Your Tokens are Insufficient',
        HttpStatus.FORBIDDEN,
      );
    }
    await this.userRepository.update(data.To, {
      token: Number(userTo.token) + Number(data.token),
    });
    await this.userRepository.update(data.From, {
      token: Number(userFrom.token) - Number(data.token),
    });
    return 'Successfully add The Token';
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, {
      username: updateUserDto.username,
      companyName: updateUserDto.companyName,
      contactNumber: updateUserDto.contactNumber,
      email: updateUserDto.email,
    });
    return `Update User is successfully !!!`;
  }

  async remove(id) {
    try {
      await this.userRepository.delete(id);
      return 'Account is Deleted';
    } catch (error) {
      throw error;
    }
  }
}
