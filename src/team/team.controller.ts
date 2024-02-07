import { Body, Controller, Get, Param, Post, Res, Session, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateMemberDto } from './dto/createmember.dto';
import { Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthenticatedGuard } from '../auth/guards/Authenticated.guard';
import { TeamNameDto } from './dto/teamname.dto';
import { isAdminGuard } from '../auth/guards/isAdmin.guard';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {
  }

  @Post('member-register')
  async create(@Body() createTeamDto: CreateMemberDto, @Res() res: Response) {
    if (await this.teamService.findOneByEmail(createTeamDto.email)) {
      return res.status(230).json({ message: 'Email already exists' });
    } else if (await this.teamService.findteamcount(createTeamDto.team)) {
      return res
        .status(250)
        .json({ message: 'Team is full Find another team dude' });
    } else {
      const response = await this.teamService.createMember(createTeamDto);
      console.log(response);
      if (response) {
        return res.status(200).json({ message: 'member added successfully' });
      } else {
        return res.status(200).json({ message: 'error' });
      }
    }
  }

  @UseGuards(AuthenticatedGuard) @Post('team-assign') @UsePipes(new ValidationPipe({ transform: true }))
  async assignName(@Session() session: Record<string, any>, @Res() res: Response, @Body() body: TeamNameDto) {
    console.log(session);
    if (await this.teamService.findTeam(body.team)) {
      return res.status(230).json({ message: 'Team Name already exist' });
    } else {
      const response = await this.teamService.createTeam({
        email: session.passport.user.email, name: body.team,
      });
      // console.log(response);
      if (response) {
        return res.status(200).json({ message: 'Team created' });
      } else {
        return res.status(250).json({ message: 'Error' });
      }
    }
  }

  @UseGuards(isAdminGuard) @Get('delete/:email')
  async delete(@Param('email') email: string, @Res() res: Response) {
    const response = await this.teamService.delete(email);
    if (response !== null) {
      res.status(201).send(response);
    } else {
      res.status(250).json({ message: 'Error deleting' });
    }
  }
}
