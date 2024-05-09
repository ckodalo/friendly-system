
import { Component, Input, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AssessmentService } from 'src/app/services/assesment.service';
import { StudentPerformanceService } from 'src/app/services/student-performance.service';
import { Student } from 'src/app/shared/student.interface';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
  styleUrls: ['./student-modal.component.css']
})
export class StudentModalComponent {
  @Input() student: Student | null = null;


  @Input() students: Student[] = [];

  recentMeanHistory: number[] = [];

  

  constructor(public activeModal: NgbActiveModal, private performanceService: StudentPerformanceService) { 
  }

  ngOnInit() {
    console.log('Received student:', this.student);

    if (this.student != null) {

    this.getRecentStudentMeanMarks(this.students, this.student);
    console.log(this.recentMeanHistory);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['student']) {
      console.log('Received student:', this.student);
    }
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }

  getSubjectKeys() {
    if (this.student) {
    return Object.keys(this.student.marks[0].scores);
    }

    return null;
  }

  getRecentStudentMeanMarks(students: Student[], currentStudent: Student): void {

     this.recentMeanHistory = this.performanceService.meanMarkHistoryByStudent(students, currentStudent);
    
     this.lineChartData = [
      { data: this.recentMeanHistory, label: 'Mean History' }
    ];
  
  }


  lineChartOptions: any = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };


  //need to make this dynamic
  lineChartLabels: string[] = ['MidTerm', 'Finals'];

  lineChartData: any[] = [
    { data: this.recentMeanHistory, label: 'Progress History' }
  ];

  lineChartColors: any[] = [
    {
      borderColor: 'blue',
      backgroundColor: 'rgba(0, 0, 255, 0.1)',
    },
  ];

  lineChartType: string = 'line';

  lineChartLegend: boolean = true;

}
