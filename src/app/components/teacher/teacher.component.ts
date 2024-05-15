import { Component, OnInit } from '@angular/core';
import { StudentPerformanceService } from 'src/app/services/student-performance.service';
import { Student } from 'src/app/shared/student.interface';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentModalComponent } from './student-modal/student-modal.component';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  
    students: Student[] = [];
    showModalFlag: boolean = false;
    selectedStudent: Student | null = null;
    
    selectedForm: number = 0;
    studentsByForm: { [form: number]: Student[] } = {};
    //selectedStudent: Student;


  constructor(private performanceService: StudentPerformanceService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.performanceService.getMockStudentPerformance().subscribe(data => {

        this.students = data;
        this.findStudentsByForm(this.students);
      })
  }

  goToAdminDashboard(): void {
    this.router.navigate(['/admin']);
  }


  showModal(student: Student): void {

    const modalRef = this.modalService.open(StudentModalComponent);
    this.selectedStudent = student;
    modalRef.componentInstance.student = this.selectedStudent;
    modalRef.componentInstance.students = this.students
  }

  selectForm(form: number) {
    this.selectedForm = form;
  }

  closeModal(): void {
    this.showModalFlag = false;
    this.selectedStudent = null;
  }

  findStudentsByForm(students: Student[]) {

    for (const student of students) {
      if (!this.studentsByForm[student.form]) {
        this.studentsByForm[student.form] = [];
      }
      this.studentsByForm[student.form].push(student);
    }
  }

  getFormKeys(): string[] {
    return Object.keys(this.studentsByForm);
  }

  goToAssessments() {
     
    this.router.navigate(['/assessments']);

  }

  goBack() {
    this.router.navigate(['/navigation'])
  }

}
