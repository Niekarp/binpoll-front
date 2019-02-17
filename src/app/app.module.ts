import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { 
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatRadioModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { QuestionnairePageComponent } from './pages/questionnaire-page/questionnaire-page.component';
import { PollDescriptionPageComponent } from './pages/poll-description-page/poll-description-page.component';
import { TermsSoundsPageComponent } from './pages/terms-sounds-page/terms-sounds-page.component';
import { TermsFrontScenePageComponent } from './pages/terms-front-scene-page/terms-front-scene-page.component';
import { TermsBackScenePageComponent } from './pages/terms-back-scene-page/terms-back-scene-page.component';
import { TermsAllAroundScenePageComponent } from './pages/terms-all-around-scene-page/terms-all-around-scene-page.component';
import { HeadphonesTestComponent } from './pages/headphones-test/headphones-test.component';
import { PollPageComponent } from './pages/poll-page/poll-page.component';
import { FinishPageComponent } from './pages/finish-page/finish-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    QuestionnairePageComponent,
    PollDescriptionPageComponent,
    TermsSoundsPageComponent,
    TermsFrontScenePageComponent,
    TermsBackScenePageComponent,
    TermsAllAroundScenePageComponent,
    HeadphonesTestComponent,
    PollPageComponent,
    FinishPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
