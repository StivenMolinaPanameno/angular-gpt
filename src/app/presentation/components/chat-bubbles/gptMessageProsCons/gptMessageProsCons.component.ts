import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-gpt-message-pros-cons',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownModule
  ],
  templateUrl: './gptMessageProsCons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageProsConsComponent {

  @Input({required: true}) text!:string;
}
