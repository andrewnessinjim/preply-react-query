export interface Album {
  id: number;
  title: string;
  release_year: number;
}

export interface TourDate {
  id: number;
  city: string;
  venue: string;
  show_date: string;
}

export interface ArtistCatalog {
  albums: Album[];
  tourDates: TourDate[];
}

export interface CombinedArtistResult {
  albums: Album[] | undefined;
  tourDates: TourDate[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
