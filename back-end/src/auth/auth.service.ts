import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: { username: string; sub: number }, expiresIn?: string): string {
    return this.jwtService.sign(payload, { expiresIn });
  }

  login(): { access_token: string } {
    const payload = { username: 'Hamid', sub: 1 };
    return {
      access_token: this.generateToken(payload),
    };
  }

  generateAccessToken(): string {
    const payload = { username: 'Hamid', sub: 1 };
    return this.generateToken(payload);
  }

  generateRefreshToken(): string {
    const payload = { username: 'Hamid', sub: 1 };
    return this.generateToken(payload, '1d');
  }
}
