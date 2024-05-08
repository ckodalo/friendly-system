import { Component, OnInit } from '@angular/core';
import { StudentPerformanceService } from 'src/app/services/student-performance.service';
import { Student } from 'src/app/shared/student.interface';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  

  studentPerformanceData: any;

  students: Student[] = [];
  
  formPerformanceMetrics: any[] = [];

  numberOfTeachers: number = 7;
  numberOfStudents: number = 0;
  numberOfForms: number = 0;

  constructor(private performanceService : StudentPerformanceService, private router: Router) {
    
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
  
      this.chartData = [
        { data: [this.numberOfTeachers, this.numberOfStudents, this.numberOfForms], label: 'Summary Metrics' }
      ];
    });
  }

  findNumberofForms(students: Student[]): number {
    const forms = new Set(students.map(student => student.form));
    return forms.size;
  }

  goToTeacherDashboard(): void {
    this.router.navigate(['/teacher']);
  }


  chartData: any[] = [
    { data: [this.numberOfTeachers, this.numberOfStudents, this.numberOfForms], label: 'Summary Metrics' }
  ];

  chartLabels: string[] = ['Teachers', 'Students', 'Forms'];

  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };


  chartLegend: boolean = false;

}
