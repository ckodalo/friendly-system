import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssessmentService } from 'src/app/services/assesment.service';

@Component({
  selector: 'app-create-assessment',
  standalone: false,
  templateUrl: 'create-assessment.component.html'
})
export class CreateAssessmentComponent implements OnInit{

  student: any;
  showNewAssessmentModal: boolean = false;
  newAssessmentForm!: FormGroup;

  constructor (private assessmentService: AssessmentService, private formBuilder: FormBuilder, public activeModal: NgbActiveModal ) {}

  ngOnInit(): void {
    
    this.newAssessmentForm = this.formBuilder.group({
      assessmentType: ['', Validators.required],
      assessmentIssueDate: ['', Validators.required],
      assessmentDueDate: ['', Validators.required]
    });
  }

  openNewAssessmentModal() {
    this.showNewAssessmentModal;
  }

  closeNewAssessmentModal() {
    this.showNewAssessmentModal = false;
    // Reset form
    this.newAssessmentForm.reset();
    this.activeModal.dismiss();
  }
  
  
  submitNewAssessment() {
    // Stop if the form is invalid
    if (this.newAssessmentForm.invalid) {
      return;
    }

    // Create a new assessment object based on the form value
    const newAssessment = {
      assessmentType: this.newAssessmentForm.value.assessmentType,
      assessmentIssueDate: this.newAssessmentForm.value.assessmentIssueDate,
      assessmentDueDate: this.newAssessmentForm.value.assessmentDueDate,
    };

    this.assessmentService.addAssessment(newAssessment);

    this.closeNewAssessmentModal();
  }
}
