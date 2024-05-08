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
    // form1Students: Student[] = [];
    // form2Students: Student[] = [];
    // form3Students: Student[] = [];
    // form4Students: Student[] = [];
  
    showModalFlag: boolean = false;
    selectedStudent: Student | null = null;

  selectedForm: number = 0;
  studentsByForm: { [form: number]: Student[] } = {};
  //selectedStudent: Student;


  constructor(private performanceService: StudentPerformanceService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.performanceService.getMockStudentPerformance().subscribe(data => {

        this.students = data;
        this.addMeanGradeandMeanMarktoData(this.students);
        // this.filterStudentsByForm(this.students);
        this.fetchStudentsByForm(this.students);
      })
  }

  goToAdminDashboard(): void {
    this.router.navigate(['/admin']);
  }


  showModal(student: Student): void {

    const modalRef = this.modalService.open(StudentModalComponent);
    this.selectedStudent = student;
    this.selectedStudent = student;
    modalRef.componentInstance.student = this.selectedStudent;
  }

  selectForm(form: number) {
    this.selectedForm = form;
  }

  closeModal(): void {
    this.showModalFlag = false;
    this.selectedStudent = null;
  }

  addMeanGradeandMeanMarktoData(students : Student[]): void {

    students.forEach(student => {

      const meanMark = this.performanceService.findMeanMarkByStudent(student);

      const meanGrade = this.performanceService.findMeanGrade(meanMark);
    
      student.meanMark = meanMark;
      student.meanGrade = meanGrade;
        
      });

  }

  // filterStudentsByForm(students: Student[]) {
  //   this.form1Students = this.performanceService.filterStudentsByForm(students, 1);
  //   this.form2Students = this.performanceService.filterStudentsByForm(students, 2);
  //   this.form3Students = this.performanceService.filterStudentsByForm(students, 3);
  //   this.form4Students = this.performanceService.filterStudentsByForm(students, 4);
  // }


  fetchStudentsByForm(students: Student[]) {

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


}
