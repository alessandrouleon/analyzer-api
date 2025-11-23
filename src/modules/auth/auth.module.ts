import { jwtConstants } from '@/@shared/constants/auth-user.secret';
import { UserModule } from '@/modules/users/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { EncryptPassword } from './crypto/encrypt-password';
import { AuthGuard } from './guard/auth.guard';
import { AuthUserService } from './services/auth-user.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1D' },
    }),
  ],
  providers: [
    AuthUserService,
    AuthGuard,
    {
      provide: 'ICryptoPassword',
      useClass: EncryptPassword,
    },
  ],
  controllers: [AuthController],
  exports: [AuthUserService],
})
export class AuthModule { }
