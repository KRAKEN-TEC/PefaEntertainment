interface ButtonWithSVGIconProps {
  svg: React.ReactNode;
  btnType: "button" | "submit" | "reset";
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const ButtonWithSVGIcon: React.FC<ButtonWithSVGIconProps> = ({
  btnType,
  className,
  onClick,
  svg,
  disabled = false,
}) => {

  return (
    <button
      disabled={disabled}
      className={`${className}`}
      type={btnType}
      onClick={onClick}
    >
      {svg}
    </button>
  );
};

export default ButtonWithSVGIcon;
