import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './passport/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './passport/session.serializer';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    UserModule,
    PassportModule.register({ session: true }),
  ],
  providers: [SessionSerializer, AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
