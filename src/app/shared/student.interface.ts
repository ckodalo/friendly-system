export interface Student {
    meanMark: number;
    meanGrade: string;
    id: number;
    name: string;
    form: number;
    marks: Assessment[];
  }


  interface Assessment {
    assessmentType: string;
    assessmentDate: string;
    scores: { [subject: string]: number };
  }
  