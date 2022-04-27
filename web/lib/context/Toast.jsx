import { createContext, useState } from 'react'

export const ToastContext = createContext()

export const ToastContextProvider = ({ children }) => {
  const [props, setProps] = useState({
    open: false,
    title: null,
    description: null,
    action: null,
    actionProps: {},
    variant: 'success',
  })

  const openChange = (state) => setProps({ ...props, open: state })

  /* If you would like to use action, remember to add actionProps
   * ActionProps: { asChild?: boolean; altText: string }
   */
  const notify = ({
    title,
    description,
    duration,
    action = null,
    actionProps = {},
    type = 'background',
    variant = 'success',
  }) => {
    setProps({
      title,
      description,
      action,
      actionProps,
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
