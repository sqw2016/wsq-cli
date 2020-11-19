/**
 * Created by lenovo on 2020/4/23.
 */
import { init } from '@rematch/core';

import global from './global';
import theme from './theme';

export default init({
  models: {
    global,
    theme,
  },
});
