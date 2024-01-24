import React from 'react'

function Dot({ color }) {
  const style = {
    borderRadius: '100%',
    width: '0.65rem',
    height: '0.65rem',
    backgroundColor: color
  }
  return <div style={style} />
}

export default Dot
