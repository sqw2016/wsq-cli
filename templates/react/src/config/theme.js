/**
 * Created by lenovo on 2020/3/11.
 */
import headerBgImageDark from '../assets/top-bg-dark.jpg';
import headerBgImageLight from '../assets/top-bg-light.jpg';
import bodyBgDark from '../assets/bg-dark.jpg';
import bodyBgLight from '../assets/bg-light.jpg';
import bodyBgBlack from '../assets/bg-black.jpg';
import bodyBgGolden from '../assets/bg-golden.jpg';

export const themes = [
  {
    // 浅色主题
    id: 1,
    name: '深圳地铁浅色',
    themeColor: '#3fb7f9',
    headerTextColor: '#fff',
    headerBackground: `url(${headerBgImageLight})`,
    headerTextOtherColor1: '#fff',
    sidebarBackground: 'white',
    sidebarText: '#353535',
    sidebarItemActivatedBackground:
      'linear-gradient(270deg,rgba(0,84,169,1) 0%,rgba(40,145,253,1) 100%',
    sidebarItemActivatedText: '#fff',
    contentBackground: `url(${bodyBgLight})`,
    contentText: 'rgba(0,0,0,.65)',
    conTextColor: '#2891FD',
    tableLightColor: '#888888',
    tableBgColor: '#d9d9d9',
    conPColor: '#ffffff',
    dataConentBgColor: 'transparent',
    triangleColor: '#fff',
    modalBgColor: '#fff',
    dataWrapBorderColor: '#17e2f5',
    dataWrapBgColor:
      'linear-gradient(270deg,rgba(40,145,253,1) 0%,rgba(40,145,253,0) 100%)',
  },
  {
    // 深色主题
    id: 2,
    name: '深圳地铁深色',
    themeColor: '#0A406A',
    headerTextColor: '#17E2F5',
    headerBackground: `url(${headerBgImageDark})`,
    headerTextOtherColor1: '#1A9EE3',
    sidebarBackground:
      'linear-gradient(180deg,rgba(10,34,97,1) 0%,rgba(16,37,92,1) 100%)',
    sidebarText: '#B4E4FF',
    sidebarItemActivatedBackground:
      'linear-gradient(270deg,rgba(23,226,245,1) 0%,rgba(0,122,153,1) 100%)',
    sidebarItemActivatedText: '#fff',
    contentBackground: `url(${bodyBgDark})`,
    contentText: '#B4E4FF',
    conTextColor: '#17e2f5',
    tableLightColor: '#B4E4FF',
    tableBgColor: '#0A406A',
    conPColor: '#353535',
    dataConentBgColor:
      'linear-gradient(180deg, rgba(24, 69, 155, 0.6) 0%, rgba(6, 28, 54, 0.6) 100%)',
    triangleColor: '#082034',
    modalBgColor: '#0a2147',
    dataWrapBorderColor: '#17e2f5',
    dataWrapBgColor:
      'linear-gradient(to right, rgba(23, 225, 244, 0.2), rgba(23, 226, 245, 0.6))',
  },
  {
    // 深色主题
    id: 3,
    name: '工业黑',
    themeColor: '#1E2126',
    headerTextColor: '#949BA9FF',
    headerTextOtherColor1: '#949BA9FF',
    headerBackground: `#1E2126`,
    sidebarBackground: '#1E2126',
    sidebarText: '#949BA9FF',
    sidebarItemActivatedBackground:
      'linear-gradient(90deg,rgba(43,122,255,0) 0%,rgba(43,122,255,1) 100%)',
    sidebarItemActivatedText: '#dce6f8',
    contentBackground: `url(${bodyBgBlack})`,
    contentText: '#D8D8D8FF',
    conTextColor: '#17e2f5',
    tableLightColor: '#B4E4FF',
    tableBgColor: '#0A406A',
    conPColor: '#353535',
    dataConentBgColor:
      'rgba(30,33,38,1)',
    triangleColor: '#082034',
    modalBgColor: '#0a2147',
    dataWrapBorderColor: 'rgba(64,69,78,1)',
    dataWrapBgColor:
      'linear-gradient(270deg,rgba(104,112,127,0) 0%,rgba(148,155,169,0.5) 100%)',
  },
  {
    // 浅色主题
    id: 4,
    name: '金融金色',
    themeColor: 'rgb(208, 169, 112)',
    headerTextColor: '#fff',
    headerBackground: `linear-gradient(270deg,rgba(208,169,112,1) 0%,rgba(183,154,97,1) 100%)`,
    headerTextOtherColor1: '#fff',
    sidebarBackground: 'white',
    sidebarText: '#38393A',
    sidebarItemActivatedBackground:
      'linear-gradient(90deg,rgba(208,169,112,0) 0%,rgba(208,169,112,1) 100%)',
    sidebarItemActivatedText: '#38393A',
    contentBackground: `url(${bodyBgGolden})`,
    contentText: 'rgba(0,0,0,.65)',
    conTextColor: '#2891FD',
    tableLightColor: '#888888',
    tableBgColor: '#d9d9d9',
    conPColor: '#ffffff',
    dataConentBgColor: '#fff',
    triangleColor: '#fff',
    modalBgColor: '#fff',
    dataWrapBorderColor: 'rgb(208,169,112)',
    dataWrapBgColor:
      'linear-gradient(90deg,rgba(208,169,112,0) 0%,rgba(208,169,112,1) 100%)',
  },
];

export const DAEKTHEMEINDEX = 1;
export const LIGHTTHEMEINDEX = 0;
export const INDUSTRYINDEX = 2;
