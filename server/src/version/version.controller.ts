import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthAdminGuard } from 'src/auth/guard/admin-auth.guard';
import { ADMIN_FLAG } from 'src/constants';
import { VersionService } from './version.service';

@Controller('version')
export class VersionController {
  constructor(private versionService: VersionService) {}

  @Get()
  @UseGuards(AuthGuard(), AuthAdminGuard)
  @SetMetadata(ADMIN_FLAG, true)
  getVersion() {
    return this.versionService.getVersion();
  }
}
