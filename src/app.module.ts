import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appdatasource } from './utils/appdatasource';
import { TeamModule } from './team/team.module';
import { IdeaModule } from './idea/idea.module';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(Appdatasource.options),
    PassportModule.register({ session: true }),
    AuthModule,
    UserModule,
    TeamModule,
    IdeaModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
  constructor(private Appdatasource: DataSource) {}

}
