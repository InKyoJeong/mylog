import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthAdminGuard } from 'src/auth/guard/admin-auth.guard';
import { ADMIN_FLAG } from 'src/@common/constants';
import { VersionService } from './version.service';
import { UpdateVersionDto } from './dto/update-version.dto';

@Controller('version')
@UseGuards(AuthGuard())
export class VersionController {
  constructor(private versionService: VersionService) {}

  @Get()
  getVersion() {
    return this.versionService.getVersion();
  }

  @Post()
  @UseGuards(AuthGuard(), AuthAdminGuard)
  @SetMetadata(ADMIN_FLAG, true)
  createVersion(@Body() createVersionDto: UpdateVersionDto) {
    return this.versionService.createVersion(createVersionDto);
  }

  @Patch()
  @UseGuards(AuthGuard(), AuthAdminGuard)
  @SetMetadata(ADMIN_FLAG, true)
  updateVersion(@Body() updateVersionDto: UpdateVersionDto) {
    return this.versionService.updateVersion(updateVersionDto);
  }
}
