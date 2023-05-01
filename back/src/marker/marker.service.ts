import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { Marker } from './marker.entity';
import { Image } from 'src/image/image.entity';

@Injectable()
export class MarkerService {
  constructor(
    @InjectRepository(Marker)
    private markerRepository: Repository<Marker>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  // async getAllMarker(): Promise<Marker[]> {
  //   return this.markerRepository.find();
  // }

  async getAllMyMarkers(user: User): Promise<Marker[]> {
    const markers = await this.markerRepository
      .createQueryBuilder('marker')
      .leftJoinAndSelect('marker.images', 'image')
      .where('marker.userId = :userId', { userId: user.id })
      .getMany();

    return markers;
  }

  async getMarkerById(id: number, user: User): Promise<Marker> {
    const foundMarker = await this.markerRepository
      .createQueryBuilder('marker')
      .leftJoinAndSelect('marker.images', 'image')
      .where('marker.userId = :userId', { userId: user.id })
      .andWhere('marker.id = :id', { id })
      .getOne();

    if (!foundMarker) {
      throw new NotFoundException('존재하지 않는 데이터입니다.');
    }

    return foundMarker;
  }

  async createMarker(
    createMarkerDto: CreateMarkerDto,
    user: User,
  ): Promise<Marker> {
    const {
      latitude,
      longitude,
      color,
      address,
      title,
      description,
      date,
      imageUris,
    } = createMarkerDto;

    const marker = this.markerRepository.create({
      latitude,
      longitude,
      color,
      address,
      title,
      description,
      date,
      user,
    });
    const images = imageUris.map((uri) => this.imageRepository.create(uri));
    marker.images = images;

    await this.imageRepository.save(images);
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
      throw new NotFoundException('존재하지 않는 데이터입니다.');
    }
  }

  async updateMarker(
    id: number,
    createMarkerDto: CreateMarkerDto,
    user: User,
  ): Promise<Marker> {
    const marker = await this.getMarkerById(id, user);
    const { latitude, longitude, title, description, color, date } =
      createMarkerDto;
    marker.latitude = latitude;
    marker.longitude = longitude;
    marker.title = title;
    marker.description = description;
    marker.color = color;
    marker.date = date;
    await this.markerRepository.save(marker);

    return marker;
  }
}
