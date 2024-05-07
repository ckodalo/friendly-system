import {NgModule} from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HeaderModule } from './components/header/header.module'
import { FooterModule } from './components/footer/footer.module'
import {AppComponent} from './app.component'
import { LandingComponent } from './components/landing/landing.component'

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
    
    ],
    imports: [
        BrowserModule,
        HeaderModule,
        FooterModule
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}