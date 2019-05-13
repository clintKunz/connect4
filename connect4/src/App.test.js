import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders turn text', () => {
  const { getByText } = render(<App/>)
  const turn = getByText(/turn/i)
  expect(turn).toBeInTheDocument()
})
