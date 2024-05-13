import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../services/assesment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAssessmentComponent } from '../components/teacher/create-assessment/create-assessment.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessments',
  standalone: false,
  templateUrl: 'assessments.component.html'
})
export class AssessmentsComponent implements OnInit {

  assessments: any[] = [];

  constructor(private assessmentsService: AssessmentService, private modalService: NgbModal, private router: Router) {}

 ngOnInit(): void {
    this.findAssessments();
 }


  findAssessments() {
    
    this.assessments = this.assessmentsService.getAssessments();
    console.log("assesments in the component are :" + this.assessments)
  }

  showForm() {
    console.log("Open form for creating a new assessment");
    const modalRef = this.modalService.open(CreateAssessmentComponent);
    modalRef.componentInstance.showNewAssessmentModal = true;
    
  }

  goBack() {

   this.router.navigate(['/teacher']); 
  }

}
