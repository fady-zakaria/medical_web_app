import React, { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

const Voice = () => {
  const onEnd = () => {
    // You could do something here after speaking has finished
  };

  const { speak, voices } = useSpeechSynthesis({
    onEnd,
  });
  const [value, setValue] = useState('');

  const voice = voices[1] || null; //voices [7] arabic eg 1/6/7

  const styleFlexRow = { display: 'flex', flexDirection: 'row' };
  const styleContainerRatePitch = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 12,
  };

  return (
    <>
          <div>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button onClick={() => speak({ text: value , voice : voice })}>Speak</button>
    </div>
      
    </>
  );
};

export default Voice;