import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Idea } from './entities/idea.entity';
import { Repository } from 'typeorm';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(Idea) private ideaRepository: Repository<Idea>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(Idea: CreateIdeaDto) {
    try {
      const idea = await this.ideaRepository.save(Idea);
      const user = await this.userRepository.findOneBy({ team: idea.team });
      user.idea = true;
      await this.ideaRepository.update(
        { team: idea.team },
        { email: user.email },
      );
      await this.userRepository.save(user);
      if (idea && user.idea) {
        return idea;
      }
      return null;
    } catch (err) {
      console.error(err);
      return err.message;
    }
  }

  async delete(team: string) {
    try {
      const idea = await this.ideaRepository.delete({ team: team });
      if (idea) {
        return idea;
      }
      return null;
    } catch (err) {
      console.error(err);
      return err.message;
    }
  }

  async updateToggle(team: string) {
    try {
      const idea = await this.ideaRepository.findOneBy({ team: team });
      if (!idea) {
        return null;
      }
      idea.markdown = !idea.markdown;
      const res = await this.ideaRepository.save(idea);
      if (res) {
        return res;
      }
      return null;
    } catch (err) {
      console.error(err);
      return err.message;
    }
  }

  async view(team: string) {
    try {
      const idea = await this.ideaRepository.findOneBy({ team: team });
      return idea;
    } catch (err) {
      console.error(err);
      return err.message;
    }
  }

  async listmarked() {
    try {
      const idea = await this.ideaRepository.find({
        select: ['team', 'email', 'title', 'category', 'markdown'],
      });
      return idea;
    } catch (err) {
      console.error(err);
      return err.message;
    }
  }

  async issubmitted(team: string) {
    try {
      const idea = await this.ideaRepository.findOneBy({ team: team });
      if (idea) {
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return err.message;
    }
  }
}
