import { AppData } from "../types";

const STORAGE_KEY = "sug_voting_app_data";

export const DEFAULT_DATA: AppData = {
  election: {
    id: "1",
    title: "2024 Student Union Government Elections",
    description: "Cast your vote for the future of our university leadership.",
    status: "ongoing",
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 86400000 * 7).toISOString(),
  },
  positions: [
    { id: "p1", title: "President" },
    { id: "p2", title: "Secretary General" },
  ],
  candidates: [
    {
      id: "c1",
      name: "John Maxwell",
      positionId: "p1",
      manifesto: "Empowering students through innovation and transparency. My goal is to bridge the gap between management and the student body.",
      imageUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/a4bc0e00-8af0-4b19-b969-5ffe6d824c1f/candidate-1-90eb7f5a-1778931062040.webp",
      votes: 45,
    },
    {
      id: "c2",
      name: "Sarah Jenkins",
      positionId: "p1",
      manifesto: "Advocating for better campus facilities and mental health support. Together we can build a stronger community.",
      imageUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/a4bc0e00-8af0-4b19-b969-5ffe6d824c1f/candidate-2-65385e48-1778931061807.webp",
      votes: 52,
    },
    {
      id: "c3",
      name: "David Chen",
      positionId: "p2",
      manifesto: "Efficiency and accountability in every document. I promise to keep our records straight and our voices heard.",
      imageUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/a4bc0e00-8af0-4b19-b969-5ffe6d824c1f/candidate-3-f30f3ae9-1778931061875.webp",
      votes: 38,
    },
    {
      id: "c4",
      name: "Amina Yusuf",
      positionId: "p2",
      manifesto: "Bridging communication gaps and ensuring every department is represented in our union's decisions.",
      imageUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/a4bc0e00-8af0-4b19-b969-5ffe6d824c1f/candidate-4-af0eaf4a-1778931061244.webp",
      votes: 41,
    },
  ],
  voters: [
    { id: "v1", studentId: "ADMIN123", name: "System Admin", role: "admin", hasVoted: [] },
    { id: "v2", studentId: "STU001", name: "Alice Cooper", role: "voter", hasVoted: [] },
    { id: "v3", studentId: "STU002", name: "Bob Smith", role: "voter", hasVoted: [] },
  ],
};

export const loadData = (): AppData => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse stored data", e);
    }
  }
  return DEFAULT_DATA;
};

export const saveData = (data: AppData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};