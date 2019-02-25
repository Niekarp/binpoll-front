import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SharedConfig } from '../../config/shared-config';

@Component({
  selector: 'app-poll-page',
  templateUrl: './poll-page.component.html',
  styleUrls: ['./poll-page.component.scss']
})
export class PollPageComponent implements OnInit {

  public testCount: number;
  public currentTestNumber: number = 1;
  private audio = new Audio();
  private selectedScene: string = null;
  private selectedAudio: string[] = new Array(this.testCount);

  constructor(private router: Router, public sharedConfig: SharedConfig) {
    this.testCount = sharedConfig.testCount;
   }

  ngOnInit() {
    for(let i = 0; i < this.testCount + 1; ++i) {
      this.selectedAudio[i] = this.soundsFilenames[Math.floor(Math.random() * this.soundsFilenames.length)];
    }

    this.audio.loop = true;
    this.updateCurrentAudio();
  }

  public selectScene(selectedSceneButton: HTMLElement): void {
    this.unselectScenes();
    selectedSceneButton.style.backgroundColor = 'green';

    this.selectedScene = selectedSceneButton.textContent;
  }

  public goToNextTest(): void {
    this.unselectScenes();
    this.currentTestNumber += 1;

    if (this.currentTestNumber == this.testCount + 1) {
      // save results
      this.audio.pause();
      this.router.navigate(['finish']);
      return;
    }
    this.updateCurrentAudio();
  }

  public goToPreviousTest(): void {
    this.unselectScenes();
    this.currentTestNumber -= 1;

    if (this.currentTestNumber == 0) {
      // save results
      this.audio.pause();
      this.router.navigate(['headphones-test']);
      return;
    }
    this.updateCurrentAudio();
  }

  private updateCurrentAudio(): void {
    this.audio.pause();
    this.audio.src = this.selectedAudio[this.currentTestNumber];
    this.audio.load();
    this.audio.play();
  }

  private unselectScenes(): void {
    let selectSceneButtons = document.getElementsByClassName('scene-select-button');
    for (let i = 0; i < selectSceneButtons.length; ++i) {
      selectSceneButtons.item(i).setAttribute('style', 'background-color: gray');
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.goToPreviousTest();
    }
    else if (event.key === 'ArrowRight') {
      this.goToNextTest();
    }
  }

  private soundsFilenames: string[] = [ " ./../../assets/poll sounds/AloneWithYou_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/AloneWithYou_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/AloneWithYou_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/AloneWithYou_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/AloneWithYou_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/AloneWithYou_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/APlaceForUs_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/APlaceForUs_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/APlaceForUs_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/APlaceForUs_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/APlaceForUs_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/APlaceForUs_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/BackFromTheStart_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/BackFromTheStart_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/BackFromTheStart_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/BackFromTheStart_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/BackFromTheStart_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/BackFromTheStart_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/Directions_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/Directions_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/Directions_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/Directions_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/Directions_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/Directions_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/DonCamilloChoir_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/DonCamilloChoir_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/DonCamilloChoir_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/DonCamilloChoir_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/DonCamilloChoir_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/DonCamilloChoir_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/Downtempo_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/Downtempo_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/Downtempo_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/Downtempo_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/Downtempo_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/Downtempo_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/FlecheDOr_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/FlecheDOr_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/FlecheDOr_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/FlecheDOr_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/FlecheDOr_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/FlecheDOr_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/FlyHigh_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/FlyHigh_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/FlyHigh_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/FlyHigh_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/FlyHigh_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/FlyHigh_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/GhostlyBeard_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/GhostlyBeard_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/GhostlyBeard_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/GhostlyBeard_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/GhostlyBeard_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/GhostlyBeard_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/GoodTime_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/GoodTime_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/GoodTime_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/GoodTime_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/GoodTime_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/GoodTime_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/HappyBlues_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/HappyBlues_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/HappyBlues_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/HappyBlues_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/HappyBlues_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/HappyBlues_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/IAmAlright_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/IAmAlright_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/IAmAlright_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/IAmAlright_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/IAmAlright_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/IAmAlright_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/Mozart_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/Mozart_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/Mozart_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/Mozart_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/Mozart_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/Mozart_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/MyOwn_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/MyOwn_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/MyOwn_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/MyOwn_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/MyOwn_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/MyOwn_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/NewDayDawning_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/NewDayDawning_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/NewDayDawning_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/NewDayDawning_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/NewDayDawning_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/NewDayDawning_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/OdeToBregovic_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/OdeToBregovic_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/OdeToBregovic_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/OdeToBregovic_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/OdeToBregovic_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/OdeToBregovic_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/PassingShips_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/PassingShips_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/PassingShips_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/PassingShips_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/PassingShips_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/PassingShips_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/Place2Be_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/Place2Be_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/Place2Be_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/Place2Be_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/Place2Be_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/Place2Be_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/PrayForTheRain_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/PrayForTheRain_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/PrayForTheRain_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/PrayForTheRain_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/PrayForTheRain_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/PrayForTheRain_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/Progresivo_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/Progresivo_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/Progresivo_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/Progresivo_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/Progresivo_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/Progresivo_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/Rachel_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/Rachel_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/Rachel_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/Rachel_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/Rachel_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/Rachel_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/RumbaChonta_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/RumbaChonta_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/RumbaChonta_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/RumbaChonta_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/RumbaChonta_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/RumbaChonta_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/Scar_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/Scar_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/Scar_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/Scar_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/Scar_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/Scar_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/SchoolboyFascination_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/SchoolboyFascination_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/SchoolboyFascination_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/SchoolboyFascination_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/SchoolboyFascination_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/SchoolboyFascination_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/Shore_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/Shore_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/Shore_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/Shore_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/Shore_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/Shore_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/SixtyFourBristol_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/SixtyFourBristol_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/SixtyFourBristol_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/SixtyFourBristol_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/SixtyFourBristol_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/SixtyFourBristol_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/SlowDown_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/SlowDown_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/SlowDown_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/SlowDown_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/SlowDown_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/SlowDown_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/TalkToMeBaby_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/TalkToMeBaby_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/TalkToMeBaby_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/TalkToMeBaby_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/TalkToMeBaby_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/TalkToMeBaby_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/TearsInTheRain_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/TearsInTheRain_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/TearsInTheRain_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/TearsInTheRain_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/TearsInTheRain_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/TearsInTheRain_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/ThatsEntertainment_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/ThatsEntertainment_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/ThatsEntertainment_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/ThatsEntertainment_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/ThatsEntertainment_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/ThatsEntertainment_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/TheBluesIsALady_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/TheBluesIsALady_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/TheBluesIsALady_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/TheBluesIsALady_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/TheBluesIsALady_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/TheBluesIsALady_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/TheLongWait_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/TheLongWait_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/TheLongWait_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/TheLongWait_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/TheLongWait_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/TheLongWait_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/ThroughMyEyes_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/ThroughMyEyes_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/ThroughMyEyes_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/ThroughMyEyes_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/ThroughMyEyes_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/ThroughMyEyes_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/TooBright_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/TooBright_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/TooBright_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/TooBright_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/TooBright_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/TooBright_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/TrudeTheBumblebee_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/TrudeTheBumblebee_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/TrudeTheBumblebee_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/TrudeTheBumblebee_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/TrudeTheBumblebee_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/TrudeTheBumblebee_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/Verdi_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/Verdi_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/Verdi_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/Verdi_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/Verdi_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/Verdi_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/Widow_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/Widow_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/Widow_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/Widow_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/Widow_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/Widow_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/WolfsHead_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/WolfsHead_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/WolfsHead_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/WolfsHead_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/WolfsHead_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/WolfsHead_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/WordGetsAround_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/WordGetsAround_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/WordGetsAround_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/WordGetsAround_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/WordGetsAround_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/WordGetsAround_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/AllTheGinIsGone_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/AllTheGinIsGone_brir1_scene1_FB.wav",
  " ./../../assets/poll sounds/AllTheGinIsGone_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/AllTheGinIsGone_brir1_scene2_BF.wav",
  " ./../../assets/poll sounds/AllTheGinIsGone_brir1_scene3_FF.wav",
  " ./../../assets/poll sounds/AllTheGinIsGone_brir1_scene3_FF.wav"];
}
