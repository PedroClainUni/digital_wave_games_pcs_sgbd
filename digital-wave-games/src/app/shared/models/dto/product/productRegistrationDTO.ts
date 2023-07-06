export interface ProductRegistrationDTO{
    name?: string;
    price?: number;
    amount?: number;
    description?: string;
    releaseDate?: string;
    imgUrl?: string;
    youtubeIds?: string[];
    genderId?: number;
    platformId?: number;
    publisherId?: number;
    ratingSystemId?: number;
}