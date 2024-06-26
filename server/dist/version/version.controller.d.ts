import { VersionService } from './version.service';
import { UpdateVersionDto } from './dto/update-version.dto';
export declare class VersionController {
    private versionService;
    constructor(versionService: VersionService);
    getVersion(): Promise<{
        ios: string;
        android: string;
    }>;
    createVersion(createVersionDto: UpdateVersionDto): Promise<void>;
    updateVersion(updateVersionDto: UpdateVersionDto): Promise<void>;
}
