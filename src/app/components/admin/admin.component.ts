import { Component, OnInit } from '@angular/core';
import { StudentPerformanceService } from 'src/app/services/student-performance.service';
import { Student } from 'src/app/shared/student.interface';
import {Assessment} from 'src/app/shared/assessment.interface';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { AssessmentService } from 'src/app/services/assesment.service';
import { AssessmentsModalComponent } from './assessments-modal/assessments-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SchoolForm } from 'src/app/shared/school-form.interface';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  
  students: Student[] = [];
  selectedForm: number = 0;
  assessmentsByForm: { [form: number]:  Assessment[]} = {};
  showModalFlag: boolean = false;

  constructor(private performanceService : StudentPerformanceService, private assessmentService: AssessmentService, private router: Router, private modalService: NgbModal) {
    
  }

  ngOnInit(): void {

    this.performanceService.getMockStudentPerformance().subscribe(data => {
      this.students = data;    
    })
  }

  goToNavigation(): void {
    this.router.navigate(['/navigation']);
  }


  selectForm(formNumber: number) {
    this.selectedForm = formNumber;
    console.log("form is :" + formNumber)
    const modalRef = this.modalService.open(AssessmentsModalComponent);
    
    modalRef.componentInstance.form = formNumber;
    modalRef.componentInstance.students = this.students;
  }

}
