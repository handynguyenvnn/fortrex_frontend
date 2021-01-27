import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from '@elements/LoadingIndicator';

export default loadable(() => import('./SuccessRegister'), {
  fallback: <LoadingIndicator />,
});
