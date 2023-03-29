import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SignAPI } from "../../../api/SignAPI";
import tokenCookie from "../../../utils/tokenCookie";

const KakaoLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    setCode(code);
  }, [location]);

  useEffect(() => {
    if (!code) return;
    const source = axios.CancelToken.source();
    const request = SignAPI.kakaoAuth(code, source.token);

    request
      .then((res) => {
        console.log(res);
        console.log(res.headers);
        tokenCookie.set(res.data.token);
        switch (res.statusCode) {
          case 201:
            // navigate("/signup");
            break;
          default:
            // navigate("/");
            break;
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("요청이 거절되었습니다", error.message);
        } else {
          console.log("다른 에러로 인한 요청 거절", error.message);
        }
      });

    return () => {
      source.cancel("인증 요청이 취소되었습니다.");
    };
  }, [code]);

  return <></>;
};

export default KakaoLogin;
