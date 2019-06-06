import { Injectable } from '@angular/core';
import { AudioPlayerSet } from './audio-player-set';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { ApiClientService } from '../api-client/api-client.service';

//config
//"apiUrl": "http://audio.wi.pb.edu.pl:8000/"

@Injectable({
  providedIn: 'root',
})
export class AudioService {

  private audioPlayers: AudioPlayerSet;
  private loaded = false;

  constructor(private http: HttpClient, private api: ApiClientService) {
    console.log('audio service created');
    this.audioPlayers = new AudioPlayerSet(30);
  }

  public loadAudioPlayers() {
    if(this.loaded) {
      return;
    }
    this.loaded = true;

    let baseUrl = '/assets/headphones test sounds/';
    let filename = '';

    let leftTestUrl = baseUrl + 'Hungarian_1_hrtf4_sector4.wav';
    let rightTestUrl = baseUrl + 'Hungarian_1_hrtf4_sector2.wav';
    let leftTestPlayer = this.audioPlayers.headphonesTestPlayers.get('left');
    let rightTestPlayer = this.audioPlayers.headphonesTestPlayers.get('right');

    this.loadAudioPlayer(leftTestUrl, leftTestPlayer);
    this.loadAudioPlayer(rightTestUrl, rightTestPlayer);

    // get samples
    this.api.getSampleSet().subscribe(sampleUrls => {
      // load poll samples audio
      for(let i = 0; i < this.audioPlayers.pollPlayers.length; ++i) {
        this.loadAudioPlayer(sampleUrls[i], this.audioPlayers.pollPlayers[i]);
        this.audioPlayers.pollPlayers[i].loop = true;
      }
    });
  }

  private loadAudioPlayer(url: string, audio: HTMLAudioElement) {
    this.http.get(url, {responseType: 'blob'}).subscribe(response => {
      let audioBlob = response;
      let audioUrl = URL.createObjectURL(audioBlob);
      console.log('audio loaded: ' + audioUrl);
      audio.src = audioUrl;
      audio.load();
    });
  }

  private toggleAudio(audio: HTMLAudioElement): boolean {
    if (audio.paused) audio.play();
    else audio.pause();
    return !audio.paused;
  }

  // headphones test audio methods
  public pauseHeadphonesTestAudio() {
    this.audioPlayers.headphonesTestPlayers.get('left').pause();
    this.audioPlayers.headphonesTestPlayers.get('right').pause();
  }

  public toggleHeadphonesTestLeftChannelAudio(): boolean {
    return this.toggleAudio(this.audioPlayers.headphonesTestPlayers.get('left'));
  }

  public toggleHeadphonesTestRightChannelAudio(): boolean {
    return this.toggleAudio(this.audioPlayers.headphonesTestPlayers.get('right'));
  }

  public get headphonesTestLeftChannelAudio(): HTMLAudioElement {
    return this.audioPlayers.headphonesTestPlayers.get('left');
  }

  public get headphonesTestRightChannelAudio(): HTMLAudioElement {
    return this.audioPlayers.headphonesTestPlayers.get('right');
  }

  public testAudio() { 
    console.log(this.audioPlayers.pollPlayers);
    this.audioPlayers.pollPlayers[29].play();
  }

  public togglePollAudio(audioIndex: number): boolean {
    if (this.audioPlayers.pollPlayers[audioIndex].paused) {
      this.playPollAudio(audioIndex);
      return true;
    } else {
      this.audioPlayers.pollPlayers[audioIndex].pause();
      return false;
    }
  }

  public playPollAudio(audioIndex: number) {
    this.pauseAllPollAudio();
    this.audioPlayers.pollPlayers[audioIndex].play();
  }

  public getPollAudio(audioIndex: number): HTMLAudioElement {
    return this.audioPlayers.pollPlayers[audioIndex];
  }

  public pauseAllPollAudio() {
    for(let audio of this.audioPlayers.pollPlayers) {
      audio.pause();
    }
  }

  private soundsFilenames: string[] = [ 
    "./../../../assets/poll sounds/Place2Be_brir1_scene3_FF.wav",
    "./../../../assets/poll sounds/RumbaChonta_brir1_scene1_FB.wav",
    "./../../../assets/poll sounds/RumbaChonta_brir1_scene2_BF.wav",
    "./../../../assets/poll sounds/RumbaChonta_brir1_scene3_FF.wav",
    "./../../../assets/poll sounds/Scar_brir1_scene1_FB.wav",
    "./../../../assets/poll sounds/Scar_brir1_scene2_BF.wav",
    "./../../../assets/poll sounds/Scar_brir1_scene3_FF.wav",
    "./../../../assets/poll sounds/SchoolboyFascination_brir1_scene1_FB.wav",
    "./../../../assets/poll sounds/SchoolboyFascination_brir1_scene2_BF.wav",
    "./../../../assets/poll sounds/SchoolboyFascination_brir1_scene3_FF.wav",
    "./../../../assets/poll sounds/GhostlyBeard_brir1_scene1_FB.wav",
    "./../../../assets/poll sounds/GhostlyBeard_brir1_scene2_BF.wav",
    "./../../../assets/poll sounds/GhostlyBeard_brir1_scene3_FF.wav",
    "./../../../assets/poll sounds/Place2Be_brir1_scene1_FB.wav",
    "./../../../assets/poll sounds/Place2Be_brir1_scene2_BF.wav",
    "./../../../assets/poll sounds/Place2Be_brir1_scene3_FF.wav",
    "./../../../assets/poll sounds/RumbaChonta_brir1_scene1_FB.wav",
    "./../../../assets/poll sounds/RumbaChonta_brir1_scene2_BF.wav",
    "./../../../assets/poll sounds/RumbaChonta_brir1_scene3_FF.wav",
    "./../../../assets/poll sounds/Scar_brir1_scene1_FB.wav",
    "./../../../assets/poll sounds/Scar_brir1_scene2_BF.wav",
    "./../../../assets/poll sounds/Scar_brir1_scene3_FF.wav",
    "./../../../assets/poll sounds/SchoolboyFascination_brir1_scene1_FB.wav",
    "./../../../assets/poll sounds/SchoolboyFascination_brir1_scene2_BF.wav",
    "./../../../assets/poll sounds/SchoolboyFascination_brir1_scene3_FF.wav",
    "./../../../assets/poll sounds/GhostlyBeard_brir1_scene1_FB.wav",
    "./../../../assets/poll sounds/GhostlyBeard_brir1_scene2_BF.wav",
    "./../../../assets/poll sounds/GhostlyBeard_brir1_scene3_FF.wav",
    "./../../../assets/poll sounds/Place2Be_brir1_scene1_FB.wav",
    "./../../../assets/poll sounds/Place2Be_brir1_scene2_BF.wav"];
  /* [ " ./../../assets/poll sounds/AloneWithYou_brir1_scene1_FB.wav",
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
  " ./../../assets/poll sounds/AllTheGinIsGone_brir1_scene3_FF.wav"]; */
}
