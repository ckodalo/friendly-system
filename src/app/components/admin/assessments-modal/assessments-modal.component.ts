import { Component, Input, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AssessmentService } from 'src/app/services/assesment.service';
import { StudentPerformanceService } from 'src/app/services/student-performance.service';
import { Student } from 'src/app/shared/student.interface';
import {SchoolForm} from 'src/app/shared/school-form.interface'
import { ChartOptions, ChartType, } from 'chart.js';

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

    // Chart variables
    public lineChartData: any[] = [
      { data: [], label: 'Mean Mark', backgroundColor: 'rgba(63, 81, 181, 0.2)',  borderColor: 'rgba(63, 81, 181, 1)' },
    ];
    public lineChartLabels: string[] = [];
    public lineChartOptions: ChartOptions = {
      responsive: true,
    };
    // public lineChartColors: Array<any> = [
    //   {
    //     backgroundColor: 'rgba(63, 81, 181, 0.2)',
    //     borderColor: 'rgba(63, 81, 181, 1)',
    //   },
    // ];
    public lineChartLegend = true;
    public lineChartType: ChartType = 'line';
    public lineChartPlugins = [];  

  constructor(public activeModal: NgbActiveModal, private performanceService: StudentPerformanceService, private assessmentService: AssessmentService) { 
  }

  ngOnInit() {
   
    if (this.form != null) {
    this.assessmentResults = this.performanceService.findMeanMarkhistoryByForm(this.form, this.students)
     
    this.updateChart();
  
  }


 
  }

  closeModal(): void {
    this.activeModal.dismiss();
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

  updateChart() {
    const meanMarks = this.assessmentResults.map(result => result.meanMark);
    const assessmentDates = this.assessmentResults.map(result => result.assessmentDate);

    this.lineChartData = [
      { data: meanMarks, label: 'Mean Mark' },
    ];
    this.lineChartLabels = assessmentDates;
  }


}
