import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SharedConfig {

	public appVersion = 2.3;
	public testCount = 30;
}
