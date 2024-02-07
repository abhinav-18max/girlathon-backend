import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { CreateMemberDto } from './dto/createmember.dto';
import { User } from '../user/entities/user.entity';
import { CreateTeamDto } from './dto/createteam.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Member) private teamRepository: Repository<Member>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createMember(member: CreateMemberDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { team: member.team },
      });
      console.log(user);
      user.memberCount++;
      await this.userRepository.save(user);
      return await this.teamRepository.save(member);
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async findOneByEmail(email: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res1 = await this.teamRepository.findOne({
      select: ['name'],
      where: { email: email },
    });
    const res2 = await this.userRepository.findOne({
      select: ['name'],
      where: { email: email },
    });
    if (res1 || res2) {
      return true;
    } else {
      return false;
    }
  }

  async findteamcount(team: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [members, count] = await this.teamRepository.findAndCount({
      where: { team: ILike(`${team.trim()}`) },
    });
    return count >= 3;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @UsePipes(new ValidationPipe({ transform: true }))
  async createTeam(team: CreateTeamDto) {
    console.log(team);
    return await this.userRepository.update(
      { email: team.email },
      { team: team.name },
    );
  }
  async findTeam(team: string) {
    const teamname = team.trim();
    console.log(teamname);
    const tteam = await this.userRepository.find({
      select: ['name', 'email'],
      where: { team: ILike(teamname) },
    });
    console.log(tteam);
    if (tteam.length > 0) {
      return true;
    }
    return false;
  }
  async delete(email: string) {
    try {
      const team = await this.teamRepository.findOneBy({ email: email });
      const user: User = await this.userRepository.findOneBy({
        team: team.team,
      });
      user.memberCount = user.memberCount - 1;
      await this.userRepository.save(user);
      const member: any = await this.teamRepository.delete({ email: email });

      if (member) {
        return member;
      }
      return null;
    } catch (err) {
      console.error(err);
      return err.message;
    }
  }
}
