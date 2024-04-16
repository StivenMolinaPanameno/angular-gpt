import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Message } from '../../interfaces/message.interface';
import { OpenAiService } from '../../presentation/services/openai.service';
import { TextMessageEvent } from '../../presentation/components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TextMessageBoxEvent } from '../../presentation/components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TypingLoaderComponent } from '../../presentation/components/typingLoader/typingLoader.component';
import { MyMessageComponent } from '../../presentation/components/chat-bubbles/myMessage/myMessage.component';
import { ChatMessageComponent } from '../../presentation/components/chat-bubbles/chatMessage/chatMessage.component';
import { TextMessageBoxComponent } from '../../presentation/components/text-boxes/textMessageBox/textMessageBox.component';

@Component({
  selector: 'app-chat-template',
  standalone: true,
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,

    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './chatTemplate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {


  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);


  handleMessage(prompt:string){
    console.log({prompt});
  }
  // handleMessageWithFile({prompt, file}:TextMessageEvent){
  //   console.log({file});
  // }
  // handleMessageWithSelect(event: TextMessageBoxEvent){
  //   console.log({event})
  // }
 }
