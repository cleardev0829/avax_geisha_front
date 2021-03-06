import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
  &:first-child {
    margin-left: 0;
  }
`;

const Title = styled.span`
  font-size: 42px;
  margin-bottom: 5px;
`;

const DigitContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
`;

const SingleDigit = styled.span`
  position: relative;
  display: flex;
  flex: 0 1 25%;
  font-size: 30px;

  border-radius: 5px;

  color: white;

`;

export default function Digit({ value, title }) {
  const leftDigit = value >= 10 ? value.toString()[0] : '0';
  const rightDigit = value >= 10 ? value.toString()[1] : value.toString();
  return (
    <Container>
      <Title>{title}</Title>
      <DigitContainer>
        <SingleDigit>
          {leftDigit}
        </SingleDigit>
        <SingleDigit>
          {rightDigit}
        </SingleDigit>
      </DigitContainer>
    </Container>
  );
}
