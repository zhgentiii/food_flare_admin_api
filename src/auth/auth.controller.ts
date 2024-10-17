import { Controller, Get, Req, UseGuards, Res, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

class User extends Request {
  user: any;
}

@Controller('auth')
export class AuthController {
  @Get('/callback')
  @UseGuards(AuthGuard('yandex'))
  async yandexLoginCallback(@Req() req: User, @Res() res: Response) {
    const jwt = req.user;

    res.redirect(`https://6f8a-95-25-172-2.ngrok-free.app/auth/${jwt}`);
  }

  @Post('/approve-jwt')
  async approveJwt() {}
}
