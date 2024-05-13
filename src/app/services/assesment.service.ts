import { Injectable } from '@angular/core';
import { assessments } from '../data/assesment-data';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  constructor() {}


  getAssessments() {
    console.log(assessments)
    return assessments;
  }

  // Get assessments for a specific student by studentId
  // getAssessmentsForStudent(studentId: number) {
  //   return assessments.filter(assessment => assessment.studentId === studentId);
  // }


  addAssessment(assessment: any) {
    assessments.push(assessment);
  }

  updateAssessment(updatedAssessment: any) {
    const index = assessments.findIndex(assessment => assessment.id === updatedAssessment.id);
    if (index !== -1) {
      assessments[index] = updatedAssessment;
    }
  }

  deleteAssessment(assessmentId: number) {
    const index = assessments.findIndex(assessment => assessment.id === assessmentId);
    if (index !== -1) {
      assessments.splice(index, 1);
    }
  }
}
