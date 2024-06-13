import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getToken = (): string => cookies.get('@kel14/token');

export const setToken = (token: string) => {
  cookies.set('@kel14/token', token, { path: '/' });
};

export const removeToken = () => cookies.remove('@kel14/token', { path: '/' });
