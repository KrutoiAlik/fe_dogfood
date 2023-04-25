import { forwardRef } from 'react';

export const FormInput = forwardRef(({ typetag, ...props }, ref) => {

  if (typetag === 'textarea') {
    return <textarea ref={ref} {...props}></textarea>;
  }

  return <input ref={ref} {...props}/>;
});