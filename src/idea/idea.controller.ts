import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { IdeaService } from './idea.service';
import { Response } from 'express';
import { isAdminGuard } from '../auth/guards/isAdmin.guard';

@Controller('idea')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Post('submit')
  async submit(@Body() CreateIdea: CreateIdeaDto, @Res() res: Response) {
    if (await this.ideaService.issubmitted(CreateIdea.team)) {
      return res.status(230).json({ message: 'Already submitted' });
    }
    const response = await this.ideaService.create(CreateIdea);
    if (response !== null) {
      res.status(201).json({ message: 'success' });
    } else {
      res.status(250).json({ message: 'Error creating' });
    }
  }

  @Get('view/:team')
  async view(@Param('team') team: string, @Res() res: Response) {
    const response = await this.ideaService.view(team);
    if (response !== null) {
      res.status(201).send(response);
    } else {
      res.status(250).json({ message: 'Error view' });
    }
  }

  @UseGuards(isAdminGuard)
  @Get('mark/:team')
  async mark(@Param('team') team: string, @Res() res: Response) {
    const response = await this.ideaService.updateToggle(team);
    if (response !== null) {
      res.status(201).send(response);
    } else {
      res.status(250).json({ message: 'Error marking' });
    }
  }

  @UseGuards(isAdminGuard)
  @Get('list')
  async list() {
    const response = await this.ideaService.listmarked();
    if (response !== null) {
      return response;
    } else {
      return null;
    }
  }

  @Get('delete/:team')
  async delete(@Param('team') team: string, @Res() res: Response) {
    const response = await this.ideaService.delete(team);
    if (response !== null) {
      res.status(201).send(response);
    } else {
      res.status(250).json({ message: 'Error deleting' });
    }
  }
}
