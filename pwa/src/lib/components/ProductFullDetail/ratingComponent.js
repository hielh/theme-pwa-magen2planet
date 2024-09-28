import React, { useState } from 'react';
import { Star } from 'react-feather';
import styles from './form.module.css';

const colors = {
  orange: "#ffcc00",
  grey: "#dddddd"
};

const RatingComponent = () => {

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  // const stars = Array(5).fill(0)
  const stars = [1, 2, 3, 4, 5]

  const handleClick = value => {
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }
  

  return (
    <>
      <div>
      <label className={styles.inputGroupLabel} htmlFor="input2">Your Rating</label>
        <ul className={styles.stars}>
        {stars.map((star, index) => {
          return (
              <li key={index}>
                  <Star
                    size={20}
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    onMouseLeave={handleMouseLeave}
                    fill={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                    style={{color: (hoverValue || currentValue) > index ? colors.orange : colors.grey,
                      cursor: "pointer"
                    }}
                />
              </li>
          )
        })}
        </ul>
      </div>
    </>
  );
};

export default RatingComponent;
