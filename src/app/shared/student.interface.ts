export interface Student {
    meanMark: number;
    meanGrade: string;
    id: number;
    name: string;
    form: number;
    marks: {
      [subject: string]: number;
    };
  }
  