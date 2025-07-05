const Button = (props: {
  label: string;
  onClick: () => void;
  disable: boolean;
}) => {
  const { label, onClick, disable } = props;

  return (
    <div>
      <h1>Button Compo</h1>
      <button
        className="p-3 border my-5 cursor-pointer"
        disabled={disable}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
