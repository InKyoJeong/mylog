import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { Marker } from './marker.entity';

@Injectable()
export class MarkerService {
  constructor(
    @InjectRepository(Marker)
    private markerRepository: Repository<Marker>,
  ) {}

  async getAllMarker(): Promise<Marker[]> {
    return this.markerRepository.find();
  }

  async getAllMyMarkers(
    user: User,
  ): Promise<Pick<Marker, 'id' | 'latitude' | 'longitude' | 'markerType'>[]> {
    const markers = await this.markerRepository
      .createQueryBuilder('marker')
      .select([
        'marker.id',
        'marker.latitude',
        'marker.longitude',
        'marker.markerType',
      ])
      .where('marker.userId = :userId', { userId: user.id })
      .getMany();

    return markers;
  }

  async getAllMyPosts(user: User): Promise<Marker[]> {
    const markers = await this.markerRepository
      .createQueryBuilder('marker')
      .where('marker.userId = :userId', { userId: user.id })
      .getMany();

    return markers;
  }

  async getMarkerById(id: number, user: User): Promise<Marker> {
    const foundMarker = await this.markerRepository
      .createQueryBuilder('marker')
      .where('marker.userId = :userId', { userId: user.id })
      .andWhere('id = :id', { id })
      .getOne();

    if (!foundMarker) {
      throw new NotFoundException('존재하지 않는 피드입니다.');
    }

    return foundMarker;
  }

  async createMarker(
    createMarkerDto: CreateMarkerDto,
    user: User,
  ): Promise<Marker> {
    const { latitude, longitude, title, description, markerType } =
      createMarkerDto;
    const marker = this.markerRepository.create({
      latitude,
      longitude,
      title,
      description,
      markerType,
      user,
    });

    await this.markerRepository.save(marker);
    return marker;
  }

  async deleteMarker(id: number, user: User): Promise<void> {
    const result = await this.markerRepository
      .createQueryBuilder('marker')
      .delete()
      .from(Marker)
      .where('userId = :userId', { userId: user.id })
      .andWhere('id = :id', { id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException('존재하지 않는 피드입니다.');
    }
  }

  async updateMarker(
    id: number,
    createMarkerDto: CreateMarkerDto,
    user: User,
  ): Promise<Marker> {
    const marker = await this.getMarkerById(id, user);
    const { latitude, longitude, title, description, markerType } =
      createMarkerDto;
    marker.latitude = latitude;
    marker.longitude = longitude;
    marker.title = title;
    marker.description = description;
    marker.markerType = markerType;
    await this.markerRepository.save(marker);

    return marker;
  }
}
