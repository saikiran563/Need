import styled, { css } from "styled-components";

const SearchModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  content: "";
  opacity: 0;
  background-color: rgba(255, 255, 255, 1);
  transition: opacity 200ms, visibility 0s 300ms;
  visibility: hidden;
  ${props => modalVisible(props)};
`;

const modalVisible = props => {
  if (props.visible) {
    return css`
      z-index: 9;
      opacity: 1;
      transition: opacity 300ms;
      visibility: visible;
    `;
  }
};

export default SearchModal;
