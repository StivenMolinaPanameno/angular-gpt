import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Message } from '../../../interfaces/message.interface';
import { ChatMessageComponent } from '../../components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '../../components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '../../components/text-boxes/textMessageBox/textMessageBox.component';
import { TypingLoaderComponent } from '../../components/typingLoader/typingLoader.component';
import { OpenAiService } from '../../services/openai.service';
import { TextMessageBoxFileComponent, TextMessageEvent } from '../../components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { AudioToTextResponse } from '../../../interfaces/audio-text.response';

@Component({
  selector: 'app-audio-to-text-page',
  standalone: true,
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxFileComponent,

    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './audioToTextPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent {


  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);


    handleMessageWithFile({prompt, file}:TextMessageEvent){
    console.log({prompt, file});
    const text = prompt ?? file.name ?? 'Traduce el audio';
    this.isLoading.set(true);
    this.messages.update(prev => [...prev, {isGpt: false, text: text}]);
    this.openAiService.audioToText(file, text)
      .subscribe(resp => this.handleResponse(resp));

  }

  handleResponse(response: AudioToTextResponse | null){
    this.isLoading.set(false);
    if(!response) return;

    const text = `## Transcripción:
__Duración:__ ${Math.round(response.duration)} segundos.

## El texto es:
${response.text}
    `;
    this.messages.update(prev => [...prev, {isGpt: true, text: text}]);
    for (const segment of response.segments) {

      const segmentMessage = `
__De ${Math.round(segment.start)} a ${Math.round(segment.end)} segundos.__
${segment.text}
      `;
      this.messages.update(prev=>[...prev, {isGpt: true, text: segmentMessage}])
    }

  }
}
