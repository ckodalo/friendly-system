import { Component, Input, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AssessmentService } from 'src/app/services/assesment.service';
import { StudentPerformanceService } from 'src/app/services/student-performance.service';
import { Student } from 'src/app/shared/student.interface';
import {SchoolForm} from 'src/app/shared/school-form.interface'

@Component({
  selector: 'app-assessments-modal',
  standalone: false,
  templateUrl: './assessments-modal.component.html',
  styles: ``
})
export class AssessmentsModalComponent {

  @Input() form: number | null = null;

  @Input() students: Student[] = [];

  currentAssessmentIndex: number = 0;

  meanHistory: {meanMark: number, assessmentDate: string}[] = [];


  assessmentResults: {meanMark: number, meanGrade: string, meanPoints: number, enrolledStudents: number, assessmentType: string, assessmentDate: string}[] = [];

  

  constructor(public activeModal: NgbActiveModal, private performanceService: StudentPerformanceService, private assessmentService: AssessmentService) { 
  }

  ngOnInit() {
   
    if (this.form != null) {
    this.assessmentResults = this.performanceService.findMeanMarkhistoryByForm(this.form, this.students)
    }
 
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['student']) {
      console.log('Received student:', this.form);
    }
  }

  closeModal(): void {
    this.activeModal.dismiss();
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
    if (this.currentAssessmentIndex < this.students[0].marks.length - 1) {
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
