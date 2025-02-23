interface ButtonWithSVGIconProps {
  svg: React.ReactNode;
  btnType: "button" | "submit" | "reset";
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonWithSVGIcon: React.FC<ButtonWithSVGIconProps> = ({
  btnType,
  className,
  onClick,
  svg,
}) => {
  return (
    <button className={className} type={btnType} onClick={onClick}>
      {svg}
    </button>
  );
};

export default ButtonWithSVGIcon;
