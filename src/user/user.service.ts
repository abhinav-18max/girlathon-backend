import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, ObjectId, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Member } from '../team/entities/member.entity';
import * as process from 'process';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Member) private teamRepository: Repository<Member>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      if (
        !createUserDto.name ||
        !createUserDto.email ||
        !createUserDto.password
      ) {
        return 'Please fill all fields';
      }
      if (createUserDto.password.length < 6) {
        return 'Password must be at least 6 characters';
      }
      const gensaalt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(createUserDto.password, gensaalt);

      const user: User = new User(); // Remove the argument from the constructor
      user.name = createUserDto.name;
      user.email = createUserDto.email;
      user.phone = createUserDto.phone;
      user.password = hashpass;
      console.log(user);
      return await this.userRepository.save(user);
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async admincreate(createUserDto: CreateUserDto) {
    try {
      if (
        !createUserDto.name ||
        !createUserDto.email ||
        !createUserDto.password
      ) {
        return 'Please fill all fields';
      }
      if (createUserDto.password.length < 6) {
        return 'Password must be at least 6 characters';
      }
      const gensaalt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(createUserDto.password, gensaalt);

      const user: User = new User(); // Remove the argument from the constructor
      user.name = createUserDto.name;
      user.email = createUserDto.email;
      user.phone = createUserDto.phone;
      user.role = 'admin';
      user.password = hashpass;
      console.log(user);
      return await this.userRepository.save(user);
    } catch (e) {
      console.log(e);
      return e;
    }
  }
  findAll() {
    return this.userRepository.find({
      select: ['email', 'team', 'memberCount', 'idea', 'name', 'phone'],
      where: { role: 'user' },
    });
  }

  findOne(id: ObjectId) {
    return this.userRepository.findOne({
      select: ['email', 'password', 'name'],
      where: { id: id },
    });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      select: ['email', 'password', 'name', 'team', 'id', 'role', 'phone'],
      where: { email: email },
    });
  }

  async isEmailExists(email: string) {
    const res1 = await this.userRepository.findOne({
      select: ['email'],
      where: { email: email },
    });
    const res2 = await this.teamRepository.findOne({
      select: ['email'],
      where: { email: email },
    });
    if (res1 || res2) {
      return true;
    } else {
      return false;
    }
  }
  async passwordReset(email: string, password: string) {
    try {
      console.log(email);
      console.log(password);
      const gensaalt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(password, gensaalt);
      const res = await this.userRepository.update(
        { email: email },
        { password: hashpass },
      );
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async profile(email: string) {
    try {
      const res1 = await this.userRepository.findOneBy({ email: email });
      const { password, ...rest } = res1;
      // console.log(rest);
      const res2 = await this.teamRepository.find({
        select: ['email', 'name', 'phone'],
        where: { team: rest.team },
      });
      const response = { lead: rest, members: res2 };
      return response;
    } catch (e) {}
  }

  async userPasswordReset(
    email: string,
    password: string,
    prevpassword: string,
  ) {
    try {
      const user = await this.userRepository.findOneBy({ email: email });
      console.log(user);
      if (user && (await bcrypt.compare(prevpassword, user.password))) {
        console.log(email);
        const gensaalt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(password, gensaalt);
        const res = await this.userRepository.update(
          { email: email },
          { password: hashpass },
        );
        return res;
      } else {
        console.log('error');
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  update(id: number, _updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
