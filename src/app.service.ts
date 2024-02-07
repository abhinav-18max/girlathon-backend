import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { User } from './user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as process from 'process';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async onApplicationBootstrap() {
    try {
      // console.log(process.env.OWNER_PASSWORD);
      const isuser = await this.userRepository.findOneBy({ role: 'owner' });
      if (isuser) {
        const gensaalt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(
          process.env.OWNER_PASSWORD,
          gensaalt,
        );
        isuser.password = hashpass;
        isuser.email = 'abhinav@gmail.com';
        return await this.userRepository.save(isuser);
      }
      const user: User = new User(); // Remove the argument from the constructor
      user.name = 'Abhinav';
      user.email = 'abhinav@gmail.com';
      user.phone = '***********';
      user.role = 'owner';
      const gensaalt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(process.env.OWNER_PASSWORD, gensaalt);
      user.password = hashpass;
      console.log(user);
      return await this.userRepository.save(user);
    } catch (e) {
      console.log(e);
    }
  }
}
