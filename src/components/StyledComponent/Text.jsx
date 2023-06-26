import styled from "styled-components";

const TextBase = styled.p`
  font-family: "Inter";
  font-weight: ${({ bold }) => bold || 400};
  color: ${({ color, theme }) => color || theme.text};
`;

export const H1 = styled(TextBase)`
  font-size: 1.8rem;
  line-height: 44px;
  margin: 0;
  font-weight: 600;
`;

export const Title = styled(TextBase)`
  font-size: 36px;
  line-height: 44px;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 25px;
    margin: 0 0 20px 0;
  }
`;

export const Title2 = styled(Title)`
  font-size: 24px;
`;

export const CategoryTitle = styled(TextBase)`
  font-size: 16px;
  line-height: 125%;
  font-weight: 400;
`;

export const Label = styled.label`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

export const LabelError = styled(Label)`
  font-weight: 400;
  font-size: 11px;
  line-height: 22px;
  color: #f54c57;
`;

export const TextDescription1 = styled(TextBase)`
  font-size: 16px;
  color: ${({ color, theme }) => color || theme.text2};
  display: flex;
  justify-content: start;
  text-align: center;
`;

export const TextDescriptionValue = styled(TextBase)`
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  color: ${({ color, theme }) => color || theme.text};
`;

export const TextDiscount = styled(TextBase)`
  font-size: 16px;
  line-height: 150%;
  color: #737780;
  text-decoration-line: line-through;
`;

export const TextPrice = styled(TextBase)`
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  color: #e30613;
`;

export const TextPay = styled(TextPrice)`
  color: ${({ color, theme }) => color || theme.text};
  margin: 0 0 32px 0;
`;

export const TextPay2 = styled(TextPrice)`
  color: ${({ color, theme }) => color || theme.text};
  font-size: 18px;
`;

export const TextPercentage = styled(TextBase)`
  font-size: 14px;
  line-height: 154%;
  font-weight: 500;
  color: #f6220e;
`;

export const Text4 = styled(TextBase)`
  font-size: 16px;
  line-height: 125%;
  font-weight: 500;
  color: ${({ color, theme }) => color || theme.text4};
`;

export const Text5 = styled(TextBase)`
  font-size: 14px;
  font-weight: 500;
  color: ${({ color, theme }) => color || theme.text};
`;

export const Text6 = styled(TextBase)`
  font-size: 14px;
  color: ${({ color, theme }) => color || theme.text3};
`;
export const Text7 = styled(TextBase)`
  font-size: 14px;
  font-weight: 400;
  color: ${({ color, theme }) => color || theme.text};
`;

export const Text8 = styled(TextBase)`
  font-size: 20px;
  font-weight: 600;
  color: ${({ color, theme }) => color || theme.text};
`;
