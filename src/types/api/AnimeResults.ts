import { Expose, Type } from "class-transformer";
import {IsBoolean, IsNumber, IsString} from 'class-validator';

export class AnimeInfo {
  @Expose()
  @IsString()
  "id": string;
  @Expose()
  @IsString()
  "title": string;
  @Expose()
  @IsString()
  "image": string;
  @Expose()
  @IsString()
  "url": string;
  @Expose()
  "genres": string[];

  get shortTitle() {
    return this.title.substring(0, 20);
  }
}

export class AnimeResults {
  @Expose()
  @IsNumber()
  "currentPage": number;
  @Expose()
  @IsBoolean()
  "hasNextPage": boolean;
  @Expose()
  @Type(() =>  AnimeInfo)
  "results": AnimeInfo[];

  get toto(): number {
    return this.currentPage;
  }
}