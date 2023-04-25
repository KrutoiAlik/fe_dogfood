export const Form = ({ handleSubmit, children, ...props }) => {
  return <form {...props} onSubmit={handleSubmit}>
    {children}
  </form>;
};