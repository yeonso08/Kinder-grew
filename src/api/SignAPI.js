import instance from "./instance";

export const SignAPI = {
  kakaoAuth: (code, cancelToken) =>
    instance.get(`/oauth/kakao/callback?code=${code}`, null, {
      cancelToken: cancelToken,
    }),
  signup: ({ role, info }) => instance.put(`/${role}/info`, info),
  search: (keyword) => instance.get(`/search/kindergarten?keyword=${keyword}`),
  selectKinder: (id) => instance.put(`kindergarten/${id}`),
};
