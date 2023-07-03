import { User } from 'src/auth/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './post.entity';
import { PostService } from './post.service';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    getAllMyMarkers(user: User): Promise<Pick<PostEntity, 'id' | 'latitude' | 'longitude' | 'color' | 'score'>[]>;
    getMyPosts(page: number, user: User): Promise<{
        images: import("../image/image.entity").Image[];
        id: number;
        latitude: number;
        longitude: number;
        color: import("./marker-color.enum").MarkerColor;
        address: string;
        title: string;
        description: string;
        date: Date;
        score: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        user: User;
        favorites: import("../favorite/favorite.entity").Favorite[];
    }[]>;
    searchMyPostsByTitleAndAddress(query: string, page: number, user: User): Promise<{
        images: import("../image/image.entity").Image[];
        id: number;
        latitude: number;
        longitude: number;
        color: import("./marker-color.enum").MarkerColor;
        address: string;
        title: string;
        description: string;
        date: Date;
        score: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        user: User;
        favorites: import("../favorite/favorite.entity").Favorite[];
    }[]>;
    getPostById(id: number, user: User): Promise<{
        isFavorite: boolean;
        id: number;
        latitude: number;
        longitude: number;
        color: import("./marker-color.enum").MarkerColor;
        address: string;
        title: string;
        description: string;
        date: Date;
        score: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        user: User;
        images: import("../image/image.entity").Image[];
    }>;
    createPost(createPostDto: CreatePostDto, user: User): Promise<{
        id: number;
        latitude: number;
        longitude: number;
        color: import("./marker-color.enum").MarkerColor;
        address: string;
        title: string;
        description: string;
        date: Date;
        score: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        images: import("../image/image.entity").Image[];
        favorites: import("../favorite/favorite.entity").Favorite[];
    }>;
    deletePost(id: number, user: User): Promise<number>;
    updatePost(id: number, updatePostDto: Omit<CreatePostDto, 'latitude' | 'longitude' | 'address'>, user: User): Promise<{
        isFavorite: boolean;
        id: number;
        latitude: number;
        longitude: number;
        color: import("./marker-color.enum").MarkerColor;
        address: string;
        title: string;
        description: string;
        date: Date;
        score: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        user: User;
        images: import("../image/image.entity").Image[];
    }>;
    getPostsByMonth(year: number, month: number, user: User): Promise<any>;
    getCountByScore(user: User): Promise<{
        field: any;
        count: number;
    }[]>;
    getCountByColor(user: User): Promise<{
        field: any;
        count: number;
    }[]>;
    getFriendMarkers(user: User): Promise<any[]>;
    getFriendPosts(page: number, friendId: number, user: User): Promise<{
        images: import("../image/image.entity").Image[];
        id: number;
        latitude: number;
        longitude: number;
        color: import("./marker-color.enum").MarkerColor;
        address: string;
        title: string;
        description: string;
        date: Date;
        score: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        user: User;
        favorites: import("../favorite/favorite.entity").Favorite[];
    }[]>;
    getFriendPostById(postId: number, friendId: number, user: User): Promise<PostEntity>;
    getUserPosts(page: number, userId: number): Promise<PostEntity[]>;
    getAllPosts(page: number): Promise<PostEntity[]>;
}
