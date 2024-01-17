import { Expose, Type } from "class-transformer";

enum QualityVideo {
  DEFAULT = 'default',
  BACKUP = 'backup',
  LOW = '360p',
  MEDIUM = '480p',
  GOOD = '720p',
  HIGH = '1080p',
}

class AnimeEpisodeHeader {
  "Referer": string
  "watchsb": string | null;// or null, since only provided with server being equal to "streamsb".
  "User-Agent": string | null; // or null
}

class AnimeEpisodeSource {
  "url": string;
  "quality": QualityVideo;
  "isM3U8": boolean;
}

export class AnimeEpisodeInfo {
  @Expose()
  "headers": AnimeEpisodeHeader;
  @Expose()
  @Type(() => AnimeEpisodeSource)
  "sources": AnimeEpisodeSource[];

  get highestQuality() {
    return this.sources.find((source) => source.quality === QualityVideo.HIGH)
  }

  getByQuality(quality: QualityVideo) {
    return this.sources.find((source) => source.quality === quality)
  }
}