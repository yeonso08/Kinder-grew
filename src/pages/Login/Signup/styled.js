import styled from "styled-components";
import textVariants from "../../../styles/variants/textVariants";

const StyledSignup = {
  Container: styled.div`
    display: flex;
    width: 300px;
    flex-direction: column;
  `,

  

  Label: styled.label`
    ${textVariants.Body2_Bold}
  `,

  Input: styled.input``,

  Button: styled.button``,

  ErrorMessage: styled.span`
    color: ${({ theme }) => theme.color.red};
  `,
};

export default StyledSignup;
