import {
  Body,
  Controller,
  Get,
  Patch,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthAdminGuard } from 'src/auth/guard/admin-auth.guard';
import { ADMIN_FLAG } from 'src/constants';
import { VersionService } from './version.service';
import { UpdateVersionDto } from './dto/update-version.dto';

@Controller('version')
export class VersionController {
  constructor(private versionService: VersionService) {}

  @Get()
  @UseGuards(AuthGuard(), AuthAdminGuard)
  @SetMetadata(ADMIN_FLAG, true)
  getVersion() {
    return this.versionService.getVersion();
  }

  @Patch()
  @UseGuards(AuthGuard(), AuthAdminGuard)
  @SetMetadata(ADMIN_FLAG, true)
  updateVersion(@Body() updateVersionDto: UpdateVersionDto) {
    return this.versionService.updateVersion(updateVersionDto);
  }
}
