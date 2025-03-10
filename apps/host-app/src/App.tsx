import React, { Suspense } from 'react';

const RemoteComponent = React.lazy(() => import('remoteApp/RemoteComponent'));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>I am host </div>
      <RemoteComponent />
    </Suspense>
  );
};

export default App;
