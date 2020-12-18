import type WebTorrent from "webtorrent";

// from nyaa search results
export interface NyaaTorrent {
  id: number;
  name: string;
  status: number;
  hash: string;
  date: string;
  filesize: any;
  description: string;
  comments: any[];
  sub_category: string;
  category: string;
  anidbid: number;
  vndbid: number;
  vgmdbid: number;
  dlsite: string;
  videoquality: string;
  tags?: any;
  uploader_id: number;
  uploader_name: string;
  uploader_old: string;
  website_link: string;
  languages: string[];
  magnet: string;
  torrent: string;
  seeders: number;
  leechers: number;
  completed: number;
  last_scrape: string;
  file_list: any[];
}
export interface TorrentInstance {
  webTorrent?: WebTorrent.Torrent;
  searchResult: NyaaTorrent;
  loading: boolean;
}
export interface Torrent {
  [id: number]: TorrentInstance;
}
