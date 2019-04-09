import React from 'react'
import { render } from 'react-dom'

const Root = () => {

  return ( 
    <div> 
    Goodbye World! 
    </div>
  )
}

render(
   <Root />,
  document.getElementById('root')
);