/* eslint-disable no-console */
export default {
  get user() {
    const val = sessionStorage.getItem('user');
    try {
      if (val) return JSON.parse(val);
    } catch (err) {
      console.error(err);
    }
    return null;
  },
  set user(userinfo) {
    sessionStorage.setItem('user', JSON.stringify(userinfo));
  },
  get token() {
    return sessionStorage.getItem('token');
  },
  set token(token) {
    sessionStorage.setItem('token', token);
  },
  get isGuest() {
    return !this.user || this.user.role === 'guest';
  },
  save({ userinfo, token }) {
    sessionStorage.setItem('user', JSON.stringify(userinfo));
    sessionStorage.setItem('token', token);
  },
};
