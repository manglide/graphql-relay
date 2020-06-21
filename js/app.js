import React from 'react'
import ReactDOM from 'react-dom'

import QuotesLibrary from './quoteslibrary'

function App() {
    return (
      <div>
        <QuotesLibrary />
      </div>
    );
}

ReactDOM.render(
  <App />,
  document.getElementById('react')
);
