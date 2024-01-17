import styled from "styled-components"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 100%;
`;

export const Layout = (props: React.ComponentProps<'div'>) => {
  return (
    <Container {...props} />
  );
}