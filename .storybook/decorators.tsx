import React from 'react';

export const withDarkBackground = (Story: React.ComponentType) => {
  return (
    <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#0d0d0d' }}>
      <Story />
    </div>
  );
};

