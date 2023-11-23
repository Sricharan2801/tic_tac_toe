import React from 'react'

const CrossLogo = ({fill,size,strokeWidth}) => {
  return (
    <div>
      <svg width={size} height={size} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.4375 4L4 19.4375M4 4L19.4375 19.4375" 
   stroke={fill} stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    </div>
  )
}

export default CrossLogo
