import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

function renderWithRouter(component) {
  const customHistory = createMemoryHistory();
  const allSelectors = render(
    <Router history={ customHistory }>
      {component}
    </Router>,
  );

  return { ...allSelectors, customHistory };
}

export default renderWithRouter;
