import styled from "styled-components"

type Props = {
  background?: string;
  fullScreen?: boolean
} & React.ComponentProps<'div'>

const Container = styled('div').withConfig({
  shouldForwardProp: (prop) => !['background', 'fullScreen'].includes(prop)
})<Props>`
  width: 100%;
  height: 100vh;
  ${({background}) => background && `
    background: ${background};
  `}
`;

export const Layout = (props: Props) => {
  return (
    <Container {...props} />
  );
}