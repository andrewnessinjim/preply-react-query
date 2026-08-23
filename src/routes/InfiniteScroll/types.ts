export interface Review {
  id: number;
  author_name: string;
  rating: number;
  title: string;
  body: string;
  created_at: string;
}

export interface ReviewsPage {
  items: Review[];
  totalCount: number;
  nextPageParam: number | undefined;
}
