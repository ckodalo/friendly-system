import {NgModule} from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HeaderModule } from './components/header/header.module'
import { FooterModule } from './components/footer/footer.module'
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import {AppComponent} from './app.component'
import { LandingComponent } from './components/landing/landing.component'
import { AdminComponent } from './components/admin/admin.component'
import { TeacherComponent } from './components/teacher/teacher.component';
import { StudentModalComponent } from './components/teacher/student-modal/student-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideCharts, withDefaultRegisterables } from 'ng2-charts'
import { BaseChartDirective } from 'ng2-charts'
import { DashboardNavigationComponent } from './dashboard-navigation/dashboard-navigation.component'
import { AssessmentsComponent } from './assessments/assessments.component'
import { CreateAssessmentComponent } from './components/teacher/create-assessment/create-assessment.component'


@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        AdminComponent,
        TeacherComponent,
        StudentModalComponent,
        AssessmentsComponent,
        CreateAssessmentComponent
     
    
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HeaderModule,
        FooterModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule, 
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BaseChartDirective
    ],
    bootstrap: [AppComponent],
    providers:[NgbActiveModal, provideCharts(withDefaultRegisterables()), BaseChartDirective]
})

export class AppModule {}