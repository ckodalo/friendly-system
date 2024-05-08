import {NgModule} from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HeaderModule } from './components/header/header.module'
import { FooterModule } from './components/footer/footer.module'
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import {AppComponent} from './app.component'
import { LandingComponent } from './components/landing/landing.component'
import { AdminComponent } from './components/admin/admin.component'
import { TeacherComponent } from './components/teacher/teacher.component';
import { StudentModalComponent } from './components/teacher/student-modal/student-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts'
import { BaseChartDirective } from 'ng2-charts'

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        AdminComponent,
        TeacherComponent,
        StudentModalComponent,
     
    
    ],
    imports: [
        BrowserModule,
        HeaderModule,
        FooterModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule, 
        FormsModule,
        BaseChartDirective
    ],
    bootstrap: [AppComponent],
    providers:[NgbActiveModal, provideCharts(withDefaultRegisterables()), BaseChartDirective]
})

export class AppModule {}