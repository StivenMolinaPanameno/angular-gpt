import { Injectable } from '@angular/core';
import { orthographyUseCase } from '../../core/use-cases/orthography/orthography.use-case';
import { Observable, from, of, tap } from 'rxjs';
import { prosConsUseCase } from '../../core/use-cases/pros-cons/pros-cons.use-case';
import { prosConsStreamUseCase } from '../../core/use-cases/pros-cons/pros-cons-stream.use-case';
import { translateUseCase } from '../../core/use-cases/translate/translate-text.use-case';
import { textToAudioUseCase } from '../../core/use-cases/audios/text-to-audio.use-case';
import { audioToTextUseCase } from '../../core/use-cases/audios/audio-to-text.use-case';
import { imageGenerationUseCase } from '../../core/use-cases/imageGeneration/image-generation.use-case';
import { imageVariationUseCase } from '../../core/use-cases/imageGeneration/image-variation.use-case';
import { createThreadUseCase } from '../../core/use-cases/assistant/create-thread.use-case';
import { postQuestionUseCase } from '../../core/use-cases/assistant/post-question.use-case';

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

  imageGeneration (prompt: string, originalImage?: string, maskImage?:string) {
    return from (imageGenerationUseCase(prompt, originalImage, maskImage))
  }

  imageVariation (originalImage:string){
    return from (imageVariationUseCase(originalImage));
  }

  createThread():Observable<string>{
    if(localStorage.getItem('thread')) return of(localStorage.getItem('thread')!)

      return from(createThreadUseCase())
        .pipe(
          tap((thread)=>{
            console.log(thread);
            localStorage.setItem('thread', thread)
          })
        );
  }

  postQuestion(question: string, threadId: string){
    return from (postQuestionUseCase(question, threadId));
  }
}
