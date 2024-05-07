import { Component, OnInit } from '@angular/core';
import { StudentPerformanceService } from 'src/app/services/student-performance.service';
import { Student } from 'src/app/shared/student.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  studentPerformanceData: any;

  students: Student[] = [];
  
  formPerformanceMetrics: any[] = [];

  numberOfTeachers: number;
  numberOfStudents: number;
  numberOfForms: number;

  constructor(private performanceService : StudentPerformanceService, private router: Router) {

    this.numberOfTeachers = 10;
    this.numberOfStudents = 1000;
    this.numberOfForms = 4;
  }

  ngOnInit(): void {

    this.performanceService.getMockStudentPerformance().subscribe(data => {

      this.students = data;
      this.findFormPerformanceMetrics();
      this.findSummaryMetrics();
    })
  }


  findFormPerformanceMetrics(): void {
    const forms = new Set(this.students.map(student => student.form));
    forms.forEach(form => {
      const studentsInForm = this.students.filter(student => student.form === form);
      const meanMark = this.performanceService.findMeanMarkByStudents(studentsInForm);
      const meanGrade = this.performanceService.findMeanGrade(meanMark);
      const points = this.performanceService.awardPoints(meanGrade);
      console.log(points);
      this.formPerformanceMetrics.push({
        form: form,
        totalStudents: studentsInForm.length,
        meanMark: meanMark,
        meanGrade: meanGrade,
        meanPoints: points 
      });
    });
  }

  findSummaryMetrics(): void {
    this.performanceService.getMockStudentPerformance().subscribe(students => {
      this.numberOfStudents = students.length;
      this.numberOfForms = this.findNumberofForms(students); 
    });
  }

  findNumberofForms(students: Student[]): number {
    const forms = new Set(students.map(student => student.form));
    return forms.size;
  }

  goToTeacherDashboard(): void {
    this.router.navigate(['/teacher']);
  }


}
