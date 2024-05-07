export interface Student {
    meanMark: number;
    id: number;
    name: string;
    form: number;
    marks: {
      [subject: string]: number;
    };
  }
  