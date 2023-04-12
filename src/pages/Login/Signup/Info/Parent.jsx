import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import StyledInfo from "./styled";
import StyledLogin from "../../styled";
import { SignAPI } from "../../../../api/SignAPI";
import Buttons from "../../../../components/Buttons";
import ProfileImageUploader from "../../../../components/ProfileImageUploader";
import { useProfileImageUploader } from "../../../../hooks/useProfileImageUploader";
import { REGEXP } from "../../../../helpers/regexp";

// 사용자가 정보를 다 입력하고 난 뒤에 도메인에 extrainfo 를 치면 이 화면이 보일 수 있으니까
// 그걸 방지하기 위한 로직을 구현해야만 한다.

const Parent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, profileImageUrl } = location.state?.data ?? {};

  const { selectedFile, isCancelled } =
    useProfileImageUploader(profileImageUrl);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const { mutate } = useMutation(SignAPI.signup, {
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("isCancelled", isCancelled);
    selectedFile && formData.append("profileImage", selectedFile);
    formData.append("emergencyPhoneNumber", data.emergencyPhoneNumber);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    const role = location.pathname.split("/")[2];

    // mutate({ role: role, info: formData });
    navigate("/signup/success", {
      state: { name: "이름", profileImageUrl: "프로필" },
    });
  };

  return (
    <StyledInfo.Container>
      <StyledLogin.Title>학부모님! 정보를 입력해주세요</StyledLogin.Title>
      <StyledInfo.Form onSubmit={handleSubmit(onSubmit)}>
        <StyledInfo.Wrapper>
          <ProfileImageUploader prev={profileImageUrl} />
          <StyledInfo.Box>
            <StyledInfo.ContentsWrapper>
              <StyledLogin.Label htmlFor="name" isEssential>
                이름
              </StyledLogin.Label>
              <StyledLogin.Input
                placeholder="홍길동"
                type="text"
                {...register("name", {
                  required: "이름을 입력해주세요.",
                  pattern: {
                    value: REGEXP.name,
                    message: "유효하지 않은 이름입니다.",
                  },
                })}
                id="name"
                defaultValue={name ?? ""}
                valid={errors.name}
                size={4}
              />
              {!isSubmitSuccessful && errors.name && (
                <StyledInfo.ErrorMessage>
                  {errors.name.message}
                </StyledInfo.ErrorMessage>
              )}
            </StyledInfo.ContentsWrapper>
            <StyledInfo.ContentsWrapper>
              <StyledLogin.Label htmlFor="phoneNumber" isEssential>
                연락처
              </StyledLogin.Label>
              <StyledLogin.Input
                placeholder="010-0000-0000"
                type="text"
                {...register("phoneNumber", {
                  required: "연락처를 입력해주세요",
                  pattern: {
                    value: REGEXP.phone,
                    message: "전화번호를 정확하게 입력해 주세요.",
                  },
                })}
                id="phoneNumber"
                valid={errors.phoneNumber}
                size={12}
              />
              {!isSubmitSuccessful && errors.phoneNumber && (
                <StyledInfo.ErrorMessage>
                  {errors.phoneNumber.message}
                </StyledInfo.ErrorMessage>
              )}
            </StyledInfo.ContentsWrapper>
            <StyledInfo.ContentsWrapper>
              <StyledLogin.Label htmlFor="emergencyPhoneNumber">
                비상연락처
              </StyledLogin.Label>
              <StyledLogin.Input
                placeholder="010-0000-0000"
                type="text"
                {...register("emergencyPhoneNumber", {
                  pattern: {
                    value: REGEXP.phone,
                    message: "전화번호를 정확하게 입력해 주세요.",
                  },
                })}
                id="emergencyPhoneNumber"
                valid={errors.emergencyPhoneNumber}
                size={12}
              />
              {!isSubmitSuccessful && errors.emergencyPhoneNumber && (
                <StyledInfo.ErrorMessage>
                  {errors.emergencyPhoneNumber.message}
                </StyledInfo.ErrorMessage>
              )}
            </StyledInfo.ContentsWrapper>
          </StyledInfo.Box>
        </StyledInfo.Wrapper>
        <StyledInfo.SubmitBtnWrapper>
          <Buttons.Filter colorTypes="primary" type="submit">
            작성완료
          </Buttons.Filter>
        </StyledInfo.SubmitBtnWrapper>
      </StyledInfo.Form>
    </StyledInfo.Container>
  );
};

export default Parent;