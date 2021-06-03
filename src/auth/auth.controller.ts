import { Body, Controller, Logger, Post, Req } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "../shared/entities";
import { AuthService } from "./auth.service";
import { SignInRequestDto, SignUpRequestDto } from "./dto/request";
import { SignInResponseDto } from "./dto/response";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    constructor(private readonly authService: AuthService) { }

    @Post('sign-up')
    @ApiOperation({ summary: 'Sign up' })
    @ApiResponse({ status: 200, description: 'Sign up success', type: User })
    public async signUp(@Body() data: SignUpRequestDto): Promise<any> {
        this.logger.verbose('Sign up');
        const responseMessage = await this.authService.signUp(data);
        return { responseMessage };
    }

    @Post('sign-in')
    @ApiOperation({ summary: 'Sign in' })
    @ApiResponse({ status: 200, description: 'Sign in success', type: SignInResponseDto })
    public async signIn(@Body() data: SignInRequestDto): Promise<any> {
        this.logger.verbose('Sign in');
        const responseMessage = await this.authService.signIn(data);
        return { responseMessage };
    }

    @Post('sign-out')
    @ApiOperation({ summary: 'Sign out' })
    @ApiResponse({ status: 200, description: 'Sign out success', type: Boolean })
    public async signOut(@Req() req): Promise<any> {
        this.logger.verbose('Sign out');
        const responseMessage = await this.authService.signOut(req.payload);
        return { responseMessage };
    }
}