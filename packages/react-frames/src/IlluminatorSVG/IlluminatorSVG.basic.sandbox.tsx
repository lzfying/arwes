import React, { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { IlluminatorSVG } from '@arwes/react-frames';

const Sandbox = (): ReactElement => {
  return (
    <div>
      <p style={{ color: '#fff' }}>Move mouse over the page.</p>
      <svg
        style={{
          display: 'block',
          width: 300,
          height: 300
        }}
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='none'
        viewBox='0 0 300 300'
      >
        <IlluminatorSVG
          hue='180'
          saturation='50%'
          lightness='50%'
          size={300}
        />
      </svg>
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
