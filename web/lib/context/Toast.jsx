import { createContext, useState } from 'react'

export const ToastContext = createContext()

export const ToastContextProvider = ({ children }) => {
  const [props, setProps] = useState({
    open: false,
    title: null,
    description: null,
    action: null,
    variant: 'success',
  })

  const openChange = (state) => setProps({ ...props, open: state })

  const notify = ({
    title,
    description,
    action = null,
    type = 'background',
    duration = 3000,
    variant = 'success',
  }) => {
    setProps({
      title,
      description,
      action,
      type,
      duration,
      open: true,
      variant,
      onOpenChange: openChange,
    })
  }

  return (
    <ToastContext.Provider value={{ props, notify }}>
      {children}
    </ToastContext.Provider>
  )
}
