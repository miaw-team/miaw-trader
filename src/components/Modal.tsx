import { ReactElement, ReactNode } from 'react'
import ReactModal, { Props } from 'react-modal'

const Modal = (props: { children: ReactNode } & Props): ReactElement => {
  const { style, ...rest } = props
  return (
    <ReactModal
      style={{
        overlay: {
          backgroundColor: '#00000080',
          ...style?.overlay,
        },
        content: {
          inset: 0,
          border: 'none',
          padding: 0,
          borderRadius: 0,
          backgroundColor: 'transparent',
          ...style?.content,
        },
      }}
      {...rest}
    />
  )
}

export default Modal
