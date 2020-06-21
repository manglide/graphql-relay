import React from 'react'

import { createFragmentContainer, graphql } from "react-relay"

function Quote(props) {
  return (
    <blockquote>
      <p>{props.quote.text}</p>
      <footer>{props.quote.author}</footer>
    </blockquote>
  )
}

export default createFragmentContainer(Quote, {
  quotes: graphql`
    fragment allQuotes on Quote {
      id
      text
      author
    }
  `,
});
