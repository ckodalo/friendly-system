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
  findMeanMarkByStudents(students: Student[]): number {
     
    let totalMarks = 0;
    let totalSubjects = 0;
   
    students.forEach(student => {
    
      for (const subject in student.marks) {
        if (Object.prototype.hasOwnProperty.call(student.marks, subject)) {
          totalMarks += student.marks[subject];
          totalSubjects++;
        }
      }
    });
    const meanMark = totalMarks / totalSubjects;
    return Math.round(meanMark);
  }

  findMeanMarkByStudent(student :Student): number {

    const marksArray = Object.values(student.marks);
     

    const sum = marksArray.reduce((total, mark) => total + mark, 0);

    return sum/marksArray.length; 
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
  
}
