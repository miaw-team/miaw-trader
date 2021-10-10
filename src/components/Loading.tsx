import { ReactElement } from 'react'
import Lottie from 'react-lottie'
import animationData from 'images/loading.json'

const Loading = ({ size = 300 }: { size?: number }): ReactElement => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData,
      }}
      height={size}
      width={size}
    />
  )
}

export default Loading
