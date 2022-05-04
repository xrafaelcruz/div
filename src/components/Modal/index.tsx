import ReactDOM from 'react-dom'

import Button from 'components/Button'

import * as s from './styles'
import * as t from './types'

const Modal = ({ text, onClickYes, onClickNo }: t.ModalProps) =>
  ReactDOM.createPortal(
    <s.Overlay>
      <s.Modal>
        <s.Text>{text}</s.Text>
        <s.Buttons>
          <Button type="button" variant="secondary" onClick={onClickNo}>
            Não
          </Button>

          <Button type="button" variant="danger" onClick={onClickYes}>
            Sim
          </Button>
        </s.Buttons>
      </s.Modal>
    </s.Overlay>,
    document.querySelector('#__next') as HTMLElement
  )

export default Modal
