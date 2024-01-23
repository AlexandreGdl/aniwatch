import styled from "styled-components"
import { AnimeInfo } from "../../types/api/AnimeResults"
import { Link } from "react-router-dom";

type Props = {
  data: AnimeInfo[],
  title: string;
}

type MediaProps = {
  image: string
}

const HorizontalList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
  overflow-x: scroll;
  overflow-y: hidden;
  &::-webkit-scrollbar {
      display: none;
  }
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  padding: 20px;

  transition: all .3s;
`;

const CustomLink = styled(Link)`
  flex-basis: 200px;
  height: 300px;
  flex-grow: 0;
  flex-shrink: 0;
  text-decoration: none;
`;
// Avoid fowarding unwanted props to html
const MediaCard = styled('div').withConfig({
  shouldForwardProp: (prop) => !['image'].includes(prop),
})<MediaProps>`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background-image:
    linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
    url(${({image}) => image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  align-items: flex-end;
  
  &:hover {
    transform: scale(1.1);
  }

  transition: all .3s;
`;

const MediaTitle = styled.p`
  color: white;
  font-size: 14px;
  font-weight: 500;
`;
const BluredDiv = styled.div`
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(5px);
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  height: 25px;
`;
const ListContainer = styled.div`
  padding-top: 20px;
`;
const ListTitle = styled.h4`
  color: white;
  font-size: 22px;
  font-weight: 500;
  margin: 15px 15px 0 15px;
`;

export const List = ({data, title}: Props) => {
  const listItem = <HorizontalList>{data.map((item) => (
    <CustomLink key={item.id} to={'/media/'+item.id}>
      <MediaCard image={item.image}>
        <BluredDiv>
          <MediaTitle>{item.shortTitle}</MediaTitle>
        </BluredDiv>
      </MediaCard>
    </CustomLink>
  ))}</HorizontalList>
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      {listItem}
    </ListContainer>
  )
}