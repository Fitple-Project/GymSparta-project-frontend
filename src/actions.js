login({ commit }, { token, user }); {
  try {
    commit('setLoggedIn', true);
    commit('setAccessToken', token);
    commit('setCurrentUser', user);
    localStorage.setItem('accessToken', token);
    console.log('Logged in user:', user); // 로그로 확인
  } catch (error) {
    console.error('로그인 처리 중 오류:', error.message);
    commit('setLoggedIn', false);
    commit('setAccessToken', null);
    commit('setCurrentUser', null);
    localStorage.removeItem('accessToken');
  }
}