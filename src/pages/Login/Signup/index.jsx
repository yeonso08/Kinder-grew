import { Link } from "react-router-dom";
import styled from "styled-components";
import Buttons from "../../../components/Buttons";
import StyledLogin from "../styled";

const Signup = () => {
  const role = [
    { link: "parent", label: "학부모로 가입하기" },
    { link: "teacher", label: "선생님으로 가입하기" },
    { link: "principal", label: "원장선생님으로 가입하기" },
  ];

  return (
    <SignupPage.Container>
      <StyledLogin.Title>안녕하세요</StyledLogin.Title>
      <SignupPage.BtnBox>
        {role.map((role) => (
          <Link key={`${role.link}`} to={role.link}>
            <SignupPage.Btn colorTypes="primary">{role.label}</SignupPage.Btn>
          </Link>
        ))}
      </SignupPage.BtnBox>
    </SignupPage.Container>
  );
};
export default Signup;

const SignupPage = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 80px 200px;
  `,

  BtnBox: styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-top: 60px;
  `,

  Btn: styled(Buttons.NB)`
    border-radius: 8px;
    width: min-content;
    justify-content: flex-start;
  `,
};
