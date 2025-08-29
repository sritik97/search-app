import React, { useEffect, useState } from 'react'
import { checkHeading,replaceHeading } from '../helper'
import ReactMarkDown from 'react-markdown'
import SyntaxHighLighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
function Answer({ans,totalResult,index,type}) {
    const [heading,setHeading] = useState(false)
    const [answer,setAnswer] = useState(ans)

    useEffect(()=>{
        if (checkHeading(ans)) {
            setHeading(true)
            setAnswer(replaceHeading(ans))
        }
    },[])
    const render ={
      code({node, inLine,className,children,...props}){
          const match =  /language-(\w+)/.exec(className || '');
          return !inLine &&match?(
          <SyntaxHighLighter
          {...props}
          children={String(children).replace(/\n$/,'')}
          language={match[1]}
          style={dark}
          PreTag="div"
          />
          ):(
            <code {...props} className={className}>
              {children}
            </code>
          )
      }
    }
  return (
    <>
      {
        index==0 && totalResult>1?<span className='pt-2 text-xl block text-white'>{answer}</span>:
        heading?<span className='pt-2 text-lg block text-white'>{answer}</span>:
        <span className={type=="q"?'pl-1':'pl-5'}>
          <ReactMarkDown components={render}>{answer}</ReactMarkDown>
        </span>
      }
    </>
  )
}

export default Answer
