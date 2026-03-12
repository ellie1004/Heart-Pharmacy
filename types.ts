
export interface Prescription {
  empathy: string;
  nvcScript: {
    observation: string;
    feeling: string;
    need: string;
    request: string;
    fullMessage: string;
  };
  vitaminQuote: string;
  musicPrescription: string;
  musicYoutubeUrl: string;
}

export interface UserInput {
  nickname: string;
  content: string;
}
