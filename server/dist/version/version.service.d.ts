import { Repository } from 'typeorm';
import { UpdateVersionDto } from './dto/update-version.dto';
import { Version } from './version.entity';
export declare class VersionService {
    private versionRepository;
    constructor(versionRepository: Repository<Version>);
    getVersion(): Promise<{
        versionIOS: string;
        versionAndroid: string;
    }>;
    updateVersion(updateVersionDto: UpdateVersionDto): Promise<void>;
}
