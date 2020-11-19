/**
 * Created by lenovo on 2019/11/8.
 */
export const hasLogin = () => {
  return sessionStorage.getItem('hasLogin');
};

export const login = (token) => {
  sessionStorage.removeItem('hasLogin');
  sessionStorage.setItem('hasLogin', token);
};

export const loginOut = () => {
  sessionStorage.removeItem('hasLogin');
};
