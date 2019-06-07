import { Injectable } from '@angular/core';
import { AudioPlayerSet } from './audio-player-set';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { ApiClientService } from '../api-client/api-client.service';


@Injectable({
  providedIn: 'root',
})
export class AudioService {

  private audioPlayers: AudioPlayerSet;
  private loaded = false;
  private audioSetId = -1;
  private loadedCount = 0;

  constructor(private http: HttpClient, private api: ApiClientService) {
    console.log('audio service created');
    this.audioPlayers = new AudioPlayerSet(30);
  }

  // load audio methods
  public loadAudioPlayers() {
    if(this.loaded) {
      return;
    }
    this.loaded = true;
    this.loadedCount = 0;

    let baseUrl = '/assets/headphones test sounds/';
    let filename = '';

    let leftTestUrl = baseUrl + 'Hungarian_1_hrtf4_sector4.wav';
    let rightTestUrl = baseUrl + 'Hungarian_1_hrtf4_sector2.wav';
    let leftTestPlayer = this.audioPlayers.headphonesTestPlayers.get('left');
    let rightTestPlayer = this.audioPlayers.headphonesTestPlayers.get('right');

    this.loadAudioPlayer(leftTestUrl, leftTestPlayer);
    this.loadAudioPlayer(rightTestUrl, rightTestPlayer);

    // get samples
    this.api.getSampleSet().subscribe(audioSet => {
      this.audioSetId = audioSet['id'];
      // load poll samples audio
      for(let i = 0; i < this.audioPlayers.pollPlayers.length; ++i) {
        this.loadAudioPlayer(audioSet['samples'][i], this.audioPlayers.pollPlayers[i]);
        this.audioPlayers.pollPlayers[i].loop = true;
      }
    });
  }

  public get pollAudioSetId() {
    return this.audioSetId;
  }

  public isAllAudioLoaded() {
    return (this.loadedCount === 32);
  }

  public notifyOnAllAudioLoaded(onLoaded: () => {}, onTimeout) {
    let waitPeriod = 5;
    let waitEndTime = new Date();
    waitEndTime.setMinutes(waitEndTime.getMinutes() + waitPeriod);

    let intervalID = setInterval(() => {
      if (this.isAllAudioLoaded()) {
        clearInterval(intervalID);
        onLoaded();
      }
      else if (waitEndTime > new Date() ) {
        clearInterval(intervalID);
        onTimeout();
      }
    }, 2000);
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

  // poll audio methods
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

  public testAudio() { 
    console.log(this.audioPlayers.pollPlayers);
    this.audioPlayers.pollPlayers[29].play();
  }

  private toggleAudio(audio: HTMLAudioElement): boolean {
    if (audio.paused) audio.play();
    else audio.pause();
    return !audio.paused;
  }

  private loadAudioPlayer(url: string, audio: HTMLAudioElement) {
    this.http.get(url, {responseType: 'blob'}).subscribe(response => {
      let audioBlob = response;
      let audioUrl = URL.createObjectURL(audioBlob);
      console.log('audio loaded: ' + audioUrl);
      audio.src = audioUrl;
      audio.load();
      this.loadedCount += 1;
      console.log('loaded count: ' + this.loadedCount);
    });
  }
}
