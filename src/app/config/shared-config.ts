import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SharedConfig {

	public appVersion = "3.0";
	public testCount = 30;
}
