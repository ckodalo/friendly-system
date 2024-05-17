
import { Component, Input, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AssessmentService } from 'src/app/services/assesment.service';
import { StudentPerformanceService } from 'src/app/services/student-performance.service';
import { Student } from 'src/app/shared/student.interface';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
})
export class StudentModalComponent {
  @Input() student: Student | null = null;


  @Input() students: Student[] = [];

  currentAssessmentIndex: number = 0;

  meanHistory: {meanMark: number, assessmentDate: string}[] = [];

  

  constructor(public activeModal: NgbActiveModal, private performanceService: StudentPerformanceService) { 
  }

  ngOnInit() {
   
   this.performanceService.addMeanGradeandMeanMarktoStudent(this.students, this.currentAssessmentIndex)

    if (this.student != null) {

    this.getRecentStudentMeanMarks(this.students, this.student);
    console.log(this.meanHistory);
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
    return Object.keys(this.student.marks[this.currentAssessmentIndex].scores);
    }

    return null;
  }

  getRecentStudentMeanMarks(students: Student[], currentStudent: Student): void {
     console.log(this.meanHistory);
    
     this.meanHistory = this.performanceService.meanMarkHistoryByStudent(students, currentStudent);
  
    const meanMarks = this.meanHistory.map(element => element.meanMark);

    const assesmentDates = this.meanHistory.map(element => element.assessmentDate);
      
     this.lineChartData = [
      { data: meanMarks, label: 'Mean History' }
    ];

    this.lineChartLabels = assesmentDates;
  
  }

  nextAssessment() {
    if (this.student && this.currentAssessmentIndex < this.student.marks.length - 1) {
      this.currentAssessmentIndex++;
    
       this.performanceService.addMeanGradeandMeanMarktoStudent(this.students, this.currentAssessmentIndex);

    }
  }

  previousAssessment() {
    if (this.currentAssessmentIndex > 0) {
      this.currentAssessmentIndex--;
      this.performanceService.addMeanGradeandMeanMarktoStudent(this.students, this.currentAssessmentIndex);
    }
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
    { data: this.meanHistory, label: 'Progress History' }
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
