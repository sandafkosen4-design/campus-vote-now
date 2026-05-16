export interface Candidate {
  id: string;
  name: string;
  positionId: string;
  manifesto: string;
  imageUrl: string;
  votes: number;
}

export interface Position {
  id: string;
  title: string;
}

export interface Election {
  id: string;
  title: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  startDate: string;
  endDate: string;
}

export interface Voter {
  id: string;
  studentId: string;
  name: string;
  role: 'voter' | 'admin';
  hasVoted: string[]; // Array of position IDs the voter has voted for
}

export interface AppData {
  election: Election;
  positions: Position[];
  candidates: Candidate[];
  voters: Voter[];
}