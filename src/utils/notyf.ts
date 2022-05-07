import { Notyf } from 'notyf'

const notyf = new Notyf({
  position: { x: 'right', y: 'bottom' },
  ripple: false,
  duration: 3000,
})

export const success = (message: string) => {
  notyf.success(message)
}

export const failed = (message: string) => {
  notyf.error(message)
}
