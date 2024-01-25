import 'styled-components';


declare module 'styled-components' {
  export interface DefaultTheme {
    iconSize: number;
    iconSizeSM: number;
    color: {
      primary: string;
    }
  }
}