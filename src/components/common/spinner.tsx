import React from 'react';
import styled, { keyframes } from 'styled-components';

type Props = {
  size?: number;
}

// Keyframe animation for the spinner rotation
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styling for the spinner container
const SpinnerContainer = styled('div').withConfig({
  shouldForwardProp: (prop) => !['size'].includes(prop)
})<Props>`
  display: inline-block;
  width: ${(props) => (props.size ? props.size : '40px')};
  height: ${(props) => (props.size ? props.size : '40px')};
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

const SpinLoader = ({ size }: Props) => {
  return <SpinnerContainer size={size} />;
};

export default SpinLoader;