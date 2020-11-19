/**
 * Created by lenovo on 2020/6/21.
 */
import React, {useState, useEffect} from 'react';
import styles from './CarouselMessage.less';

function CarouselMessage({className, style, list}) {
  
  const [newMessages, setNewMessages] = useState(list);
  const [carouselClass, setCarouselClass] = useState('');
  useEffect(() => {
    setNewMessages(list);
  }, [list]);
  useEffect(()=> {
    let timer1;
    let timer2;
    if (newMessages.length > 1) {
      timer1 = setInterval(() => {
        setCarouselClass(styles.carousel)
      }, 3000);
      timer2 = setInterval(() => {
        const item = newMessages.splice(0, 1);
        newMessages.push(item[0]);
        setNewMessages([...newMessages]);
        setCarouselClass('')
      }, 3800);
    }
    const timer3 = setTimeout(() => {
      clearInterval(timer1);
      clearInterval(timer2);
      setNewMessages([]);
    }, (newMessages.length+1)*3000);
    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
      clearTimeout(timer3);
    }
  }, [newMessages]);
  return newMessages.length ? (
    <div
      className={`${styles.container} ${className}`}
      style={{...style}}
    >
      <div className={styles.showWindow}>
        <div className={`${styles.list} ${carouselClass}`}>
          {
            newMessages.map(item => (
              <div>{item}</div>
            ))
          }
        </div>
      </div>
    </div>
  ) : '';
}

export default CarouselMessage;