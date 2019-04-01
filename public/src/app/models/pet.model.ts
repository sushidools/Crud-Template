export class Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  reviews: [Review];
}

export class Review {
  _id: string;
  name: string;
  star: number;
  content: string;
}
