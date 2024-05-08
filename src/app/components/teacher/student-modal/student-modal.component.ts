
import { Component, Input, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from 'src/app/shared/student.interface';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
  styleUrls: ['./student-modal.component.css']
})
export class StudentModalComponent {
  @Input() student: Student | null = null;

  

  constructor(public activeModal: NgbActiveModal) { 
  }

  ngOnInit() {
    console.log('Received student:', this.student);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['student']) {
      console.log('Received student:', this.student);
    }
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }
}
