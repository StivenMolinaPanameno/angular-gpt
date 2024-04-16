import { Injectable } from '@angular/core';
import { orthographyUseCase } from '../../core/use-cases/orthography/orthography.use-case';
import { from } from 'rxjs';
import { prosConsUseCase } from '../../core/use-cases/pros-cons/pros-cons.use-case';
import { prosConsStreamUseCase } from '../../core/use-cases/pros-cons/pros-cons-stream.use-case';
import { translateUseCase } from '../../core/use-cases/translate/translate-text.use-case';
import { textToAudioUseCase } from '../../core/use-cases/audios/text-to-audio.use-case';
import { audioToTextUseCase } from '../../core/use-cases/audios/audio-to-text.use-case';

@Injectable({providedIn: 'root'})
export class OpenAiService {
  constructor() { }


  checkOrthography(prompt: string){

    return from(orthographyUseCase(prompt));
  }

  checkProsCons(prompt: string){
    return from(prosConsUseCase(prompt));
  }

  prosConsDiscusserStream ( prompt: string, abortSignal:AbortSignal){
    return prosConsStreamUseCase(prompt,abortSignal);
  }

  translateText(prompt: string, lang: string){
    return from (translateUseCase(prompt, lang));
  }
  textToAdio(prompt: string, voice: string){
    return from (textToAudioUseCase(prompt, voice));
  }

  audioToText(file: File, prompt?:string){
    return from (audioToTextUseCase(file, prompt));
  }

}
