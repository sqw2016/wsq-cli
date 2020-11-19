/**
 * Created by lenovo on 2019/11/5.
 */
import { getRouters } from '../services/login';

export default {
  state: {
    language: 'CN',
    menuRouters: [],
    menus: [
      {
        "id": 1,
        "icon": "home",
        "parentId": 0,
        "path": "/home",
        "contentType": "basic",
        "title": "首页",
      },
    ],
  },
  effects: {
    async fetchRouters() {
      const res = await getRouters();
      res && this.saveRouters(res)
    }
  },
  reducers: {
    changeLanguage(state, { data }) {
      return {
        ...state,
        language: data
      }
    },
    saveRouters(state, data) {
      return {
        ...state,
        menuRouters: data
      }
    },
    saveMenus(state, data) {
      return {
        ...state,
        menus: [...data]
      }
    }
  }
}