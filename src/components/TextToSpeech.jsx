import {  useState } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';


const TextToSpeech =({ text }) => {
  const apiKey = process.env.API_KEY || "fc18944df12442a7af603347f2aca84e";
  const [status, setStatus] = useState('');
  const [player, setPlayer] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const subscriptionKey = apiKey;
  const serviceRegion = 'eastus';
  let newSynthesizer;

  const handleSynthesize = () => {
    if(!isSpeaking){
      setIsDisabled(true);
      const newPlayer = new sdk.SpeakerAudioDestination();
      setPlayer(newPlayer);
      const audioConfig = sdk.AudioConfig.fromSpeakerOutput(newPlayer);
      const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
  
      speechConfig.speechSynthesisVoiceName = "es-CU-ManuelNeural";
     
      newSynthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
    
      newSynthesizer.speakTextAsync(
        text,
        result => {
          if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            setStatus('Synthesis finished.');
          } else {
            setStatus(`Speech synthesis canceled, ${result.errorDetails}`);
          }
          setIsSpeaking(false);
          setIsDisabled(true);
          newSynthesizer.close();
        },
        err => {
          console.error(err, status);
          setIsSpeaking(false);
          setIsDisabled(false);
          newSynthesizer.close();
        }
      );
      setIsSpeaking(true);
    }
  };

  const handlePause = () => {
   if(player){
    player.pause()
    setIsDisabled(false);
   }
  };

  const handleResume = () => {
      if(player){
        player.resume()
      }
  };

  return (
    <div className='flex flex-row items-start mt-3'>
      <button disabled={isDisabled} onClick={handleSynthesize}>
        {isDisabled ? 
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M320-640v320-320Zm-80 400v-480h480v480H240Zm80-80h320v-320H320v320Z"/></svg> 
        : <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={isDisabled ? '#ADD8E6' : '#87CEEB'}><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg>}
      </button>
      <button onClick={handlePause}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={isDisabled ? '#e8eaed' : '#87CEEB'}><path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"/></svg>
      </button>
      <button onClick={handleResume}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M240-240v-480h80v480h-80Zm160 0 400-240-400-240v480Zm80-141v-198l165 99-165 99Zm0-99Z"/></svg>
      </button>
    </div>
  );
};

export default TextToSpeech;
