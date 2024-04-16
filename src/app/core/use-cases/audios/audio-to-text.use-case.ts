import { environment } from "../../../../environments/environment.development";
import { AudioToTextResponse } from "../../../interfaces/audio-text.response";

export const audioToTextUseCase = async(audioFile:File, prompt?:string) => {
  try {
    const formData = new FormData();
    formData.append('file', audioFile); // 'file' porque así le pusimos nosotros en la key del Backend se puede ver en postman
    if(prompt){
      formData.append('prompt', prompt);
    }

    const resp = await fetch(`${environment.backendApi}/audio-to-text`, {
      method: 'post',
      body: formData,
    })
    const data = await resp.json() as AudioToTextResponse;
    return data;


  } catch (error) {
    console.log(error);
    return null
  }



}

