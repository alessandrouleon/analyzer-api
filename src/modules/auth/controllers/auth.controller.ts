import { Public } from '@/modules/auth/public';
import { AuthUserService } from '@/modules/auth/services/auth-user.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authUserService: AuthUserService,

  ) { }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signInUser(@Body() signInDto: Record<string, any>) {
    return this.authUserService.signIn(signInDto.username, signInDto.password);
  }
}
