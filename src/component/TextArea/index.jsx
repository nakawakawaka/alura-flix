/* eslint-disable import/no-anonymous-default-export */
import styled from "styled-components"

const TextArea = styled.textarea`
  width: 100%;
  height: 8rem;
  padding: var(--input-padding);
  margin: 1.5rem 0;
`
export default ({placeholder}) => <TextArea placeholder={placeholder} />
