import { ReactElement } from "react";
import styled from "styled-components";

import { ifElse } from "logics/refactorFunction";

type FormImageProps = {
  src: string;
  size?: number;
  style?: React.CSSProperties;
};

const getFormImageSize = ({ size }: { size?: number }): string =>
  ifElse({
    isTrue: size,
    ifValue: `${size}px`,
    elseValue: "100%",
  });

const StyledFormImage = styled.div<FormImageProps>`
  display: inline-block;
  background-image: url(${(props): string => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: ${getFormImageSize};
  width: ${getFormImageSize};
`;

const FormImage = (props: FormImageProps): ReactElement => {
  return <StyledFormImage {...props} />;
};

export default FormImage;
