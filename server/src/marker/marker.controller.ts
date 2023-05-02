import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { Marker } from './marker.entity';
import { MarkerService } from './marker.service';

@Controller('markers')
@UseGuards(AuthGuard())
export class MarkerController {
  constructor(private markerService: MarkerService) {}

  // @Get('')
  // getAllMarker(): Promise<Marker[]> {
  //   return this.markerService.getAllMarker();
  // }

  @Get('/my')
  getAllMyMarkers(@GetUser() user: User): Promise<Marker[]> {
    return this.markerService.getAllMyMarkers(user);
  }

  @Get('/:id')
  getMarkerById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Marker> {
    return this.markerService.getMarkerById(id, user);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createMarker(
    @Body() createMarkerDto: CreateMarkerDto,
    @GetUser() user: User,
  ): Promise<Marker> {
    return this.markerService.createMarker(createMarkerDto, user);
  }

  @Delete('/:id')
  deleteMarker(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.markerService.deleteMarker(id, user);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updateMarker(
    @Param('id', ParseIntPipe) id: number,
    @Body() createMarkerDto: CreateMarkerDto,
    @GetUser() user: User,
  ) {
    return this.markerService.updateMarker(id, createMarkerDto, user);
  }
}
