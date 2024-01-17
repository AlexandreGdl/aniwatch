import { Expose, Type } from "class-transformer";

class EpisodeInfo {
  @Expose()
  "id": string;
  @Expose()
  "number": number;
  @Expose()
  "url": string;
}

export class AnimeCompleteInformation {
  @Expose()
  "id": string;
  @Expose()
  "title": string;
  @Expose()
  "url": string;
  @Expose()
  "image": string;
  @Expose()
  "releaseDate": string | null; // or null
  @Expose()
  "description": string | null; // or null
  @Expose()
  "genres": string[];
  @Expose()
  "subOrDub": "sub" | "dub";
  @Expose()
  "type": string | null; // or null
  @Expose()
  "status": "Ongoing";
  @Expose()
  "otherName": string | null; // or null
  @Expose()
  "totalEpisodes": number;
  @Expose()
  @Type(() => EpisodeInfo)
  "episodes": EpisodeInfo[]

  get latestEpisode(): EpisodeInfo {
    return this.episodes.reduce((prev, curr) => prev.number > curr.number ? prev : curr, this.episodes[this.episodes.length - 1] ?? undefined);
  }
}