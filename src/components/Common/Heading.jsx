import React from 'react'

const Heading = ({text}) => {
  console.log(text)
  return (
    <div className='! mt-2 rounded-md inline-block'>
        <p className="m-0 text-lg text-slate-600 font-semibold capitalize " dangerouslySetInnerHTML={{__html: text}}></p>
    </div>
  )
}

export default Heading