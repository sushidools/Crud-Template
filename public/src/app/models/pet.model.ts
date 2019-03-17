export class Pet {
  _id: string;
  petName: string;
  petType: string;
  description: string;
  skills: [Skill];
  likes: number;
}

export class Skill {
  _id: string;
  content: string;
}
