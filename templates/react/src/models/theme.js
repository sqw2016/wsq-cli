/**
 * Created by lenovo on 2019/11/5.
 */
export default {
  state: {
    menuPosition: 'left',
    theme: {
      id: 2,
      sidebarBackground: 'linear-gradient(180deg,rgba(10,34,97,1) 0%,rgba(16,37,92,1) 100%)',
      sidebarText: '#B4E4FF',
      sidebarItemActivatedBackground: 'linear-gradient(270deg,rgba(23,226,245,1) 0%,rgba(0,122,153,1) 100%)',
      sidebarItemActivatedText: '#fff',
      contentBackground: '#f0f2f5',
      contentText: 'white',
    },
    themeIndex: 1,
    themeMenuOpen: false,
  },
  reducers: {
    menuPositionChange(state, { payload }) {
      return {
        ...state,
        menuPosition: payload
      }
    },
    themeChange(state, paylaod) {
      return {
        ...state,
        themeIndex: paylaod
      }
    },
    themeMenuOpenChange(state, payload) {
      return {
        ...state,
        themeMenuOpen: payload
      }
    }
  }
}