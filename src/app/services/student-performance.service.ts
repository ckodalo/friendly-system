import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, find, map } from 'rxjs';
import { Student } from '../shared/student.interface';
import { SchoolForm } from '../shared/school-form.interface';


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

  findMeanMarkByStudent(student :Student, assesmentIndex: number): number {

    const scoresArray = Object.values(student.marks[assesmentIndex].scores);
     
    const sum = scoresArray.reduce((total, mark) => total + mark, 0);

    return Math.round(sum/scoresArray.length); 
  }

  findMeanGradeByStudent(student :Student, assesmentIndex: number): string {

    const meanMark = this.findMeanMarkByStudent(student, assesmentIndex);
    
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

  addMeanGradeandMeanMarktoStudent(students : Student[], assesmentIndex: number): void {

    console.log("receieved students :" + students);
    
    console.log("received assesment Index :" + assesmentIndex );

    students.forEach(student => {

      const meanMark = this.findMeanMarkByStudent(student, assesmentIndex);

      const meanGrade = this.findMeanGrade(meanMark);
    
      student.meanMark = meanMark;
      student.meanGrade = meanGrade;

      console.log(students);
        
      });

      
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
  
    return Math.round(meanMark);
  }

  meanMarkHistoryByStudent (students: Student[], student: Student):  {meanMark: number, assessmentDate: string}[] {
 
    const results: {meanMark: number, assessmentDate: string}[] = [];

    const studentAssesments = student.marks;

    for (const assesment of studentAssesments) {

      const meanMark = this.findMeanMarkTwo(assesment.scores);
        
        results.push({
          meanMark: Math.round(meanMark),
          assessmentDate: assesment.assessmentDate  
        });
    }
    return results;
  }

  //mean mark across all assessments given to a form 
  findMeanMarkhistoryByForm(formName: number, students: Student[]): {meanMark: number, meanGrade: string, meanPoints: number, enrolledStudents: number, assessmentType: string, assessmentDate: string}[]  {
  
    
    const results: {meanMark: number, meanGrade: string, meanPoints: number, enrolledStudents: number, assessmentType: string, assessmentDate: string}[] = [];
  

    
   
    for (let currentAssessmentIndex = 0; currentAssessmentIndex < students[0].marks.length; currentAssessmentIndex++) {  
  
      const preliminaryHolder: number[] = [];
      let numberOfStudents = 0; 

      const currentAssessmentType = students[0].marks[currentAssessmentIndex].assessmentType;
      const currentAssesmentDate = students[0].marks[currentAssessmentIndex].assessmentDate;
  
      for (const student of students) {

         if (student.form == formName) {

          numberOfStudents++;
          const studentMean = this.findMeanMarkTwo(student.marks[currentAssessmentIndex].scores);
          console.log("student mean is :" + studentMean);     
          preliminaryHolder.push(studentMean);

        }
      }

      if (preliminaryHolder.length === 0) {
        console.error(`No valid students found for form: ${formName} at assessment index: ${currentAssessmentIndex}`);
        continue; // Skip this assessment if no valid marks
      }


      console.log("preliminary Holder is :" + preliminaryHolder);

      const sum = preliminaryHolder.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      const meanMarkByAssessment = Math.round(sum / preliminaryHolder.length);
      console.log("meanmark by assessment :" + meanMarkByAssessment);
      const meanGradeByAssessment = this.findMeanGrade(meanMarkByAssessment); 
      const pointsByAssessment = this.awardPoints(meanGradeByAssessment);


      results.push({
        meanMark: Math.round(meanMarkByAssessment),
        meanGrade: meanGradeByAssessment,
        meanPoints: pointsByAssessment,
        enrolledStudents: numberOfStudents,
        assessmentType: currentAssessmentType,
        assessmentDate: currentAssesmentDate
      })

    }
   return results; 
  }
}
