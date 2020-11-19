/**
 * Created by lenovo on 2019/11/6.
 */
import en from '../../language/en';
import cn from '../../language/cn';

export const getLanguageMap = function(language) {
  let languageMap;
  switch (language) {
    case 'EN':
      languageMap = en;
      break;
    default:
      languageMap = cn;
  }
  return languageMap;
};

export const findTextByKey = function(language, key) {
  return getLanguageMap(language)[key];
};