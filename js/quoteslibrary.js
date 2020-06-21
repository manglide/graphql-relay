import React, { useState, useEffect } from 'react'
import Quote from './quote'
import ErrorBoundary from '../errors'

// import Relay from 'react-relay';
// import { createFragmentContainer, graphql } from "react-relay"

function QuotesLibrary(props) {
  const [quotes, setQuotes] = useState([])
  const [error, setError] = useState(null)

  async function getQuotes() {
    await fetch("/graphql?query={allQuotes{id,text,author}}")
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      setQuotes(data.data.allQuotes)
    })
    .catch((error) => {
      setError(error.toString())
    });
  }
  useEffect(() => {
    getQuotes();
  }, [])

  if(!quotes) {
    return "...loading"
  }

  return(
    <div>
      <ErrorBoundary message={error}>
        {
          quotes.map((item, index) => (
            <Quote quote={item} key={index} />
          ))
        }
      </ErrorBoundary>
    </div>
  )
}

// QuotesLibrary = Relay.createContainer(QuotesLibrary, { fragments: {}});

export default QuotesLibrary
