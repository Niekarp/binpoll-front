import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { QuestionnairePageComponent } from './pages/questionnaire-page/questionnaire-page.component'
import { PollDescriptionPageComponent } from './pages/poll-description-page/poll-description-page.component';
import { TermsSoundsPageComponent } from './pages/terms-sounds-page/terms-sounds-page.component';
import { TermsFrontScenePageComponent } from './pages/terms-front-scene-page/terms-front-scene-page.component';
import { TermsBackScenePageComponent } from './pages/terms-back-scene-page/terms-back-scene-page.component';
import { TermsAllAroundScenePageComponent } from './pages/terms-all-around-scene-page/terms-all-around-scene-page.component';
import { HeadphonesTestComponent } from './pages/headphones-test/headphones-test.component';
import { PollPageComponent } from './pages/poll-page/poll-page.component';
import { FinishPageComponent } from './pages/finish-page/finish-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'questionnaire', component: QuestionnairePageComponent },
  { path: 'poll-description', component: PollDescriptionPageComponent },
  { path: 'terms-sounds', component: TermsSoundsPageComponent },
  { path: 'terms-front-scene', component: TermsFrontScenePageComponent },
  { path: 'terms-back-scene', component: TermsBackScenePageComponent },
  { path: 'terms-all-around-scene', component: TermsAllAroundScenePageComponent },
  { path: 'headphones-test', component: HeadphonesTestComponent },
  { path: 'poll', component: PollPageComponent },
  { path: 'finish', component: FinishPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
