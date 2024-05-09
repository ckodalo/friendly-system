import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Student } from '../shared/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentPerformanceService {

  constructor(private http: HttpClient) { }

  getMockStudentPerformance(): Observable<Student[]> {
    return this.http.get<any>('assets/mock-data.json').pipe(
      map((response: any) => response.students)
    );
  }


  filterStudentsByForm(students: Student[], form: number): Student[] {
    return students.filter(student => student.form === form);
  }

  //produces mean Mark of a group of Students, say one form

  //need to edit this functions to also take assesment identifier
  findMeanMarkByStudents(students: Student[]): number {
     
    let totalMarks = 0;
    let totalSubjects = 0;
   
    students.forEach(student => {
    
      for (const subject in student.marks[0].scores) {
        if (Object.prototype.hasOwnProperty.call(student.marks[0].scores, subject)) {
          totalMarks += student.marks[0].scores[subject];
          totalSubjects++;
        }
      }
    });
    const meanMark = totalMarks / totalSubjects;
    return Math.round(meanMark);
  }

  findMeanMarkByStudent(student :Student): number {

    const scoresArray = Object.values(student.marks[0].scores);
     
    const sum = scoresArray.reduce((total, mark) => total + mark, 0);

    return sum/scoresArray.length; 
  }

  findMeanGradeByStudent(student :Student): string {

    const meanMark = this.findMeanMarkByStudent(student);
    
    return this.findMeanGrade(meanMark);

  }

  findMeanGrade(mark :number): string {

    if (mark >= 80) {
      return 'A';
    } else if (mark >= 70) {
      return 'B';
    } else if (mark >= 60) {
      return 'C';
    } else if (mark >= 50) {
      return 'D';
    } else {
      return 'E';
    }
    
  }

  awardPoints(meanGrade: string): number {
    switch (meanGrade) {
      case 'A':
        return 5;
      case 'B':
        return 4;
      case 'C':
        return 3;
      case 'D':
        return 2;
      case 'E':
        return 1;
      default:
        return 0;
    }
  }

  //for each assesment, we need to find the mean mark, and we will plot a graph of meanmark against time

  // do it for different subject as well,,,

  // your probably want this method in the service, and you can draw on it from both student and teacher components 

  
  //need to calll the type StudentPerformance

  findMeanMarkTwo(scores: { [subject: string]: number }): number {
   
    const sum = Object.values(scores).reduce((acc: number, score: number) => acc + score, 0);
    const meanMark = sum / Object.keys(scores).length;
  
    return meanMark;
  }

  meanMarkHistoryByStudent (students: Student[], student: Student): number[] {

    const results: number[] = [];

    const studentAssesments = student.marks;

    for (const assesment of studentAssesments) {

      const meanMark = this.findMeanMarkTwo(assesment.scores);
        
        results.push(Math.round(meanMark));
    }
    return results;
  }
}
