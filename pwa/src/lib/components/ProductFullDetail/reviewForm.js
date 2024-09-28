import React, { useCallback, useEffect, useState } from 'react';
import { Star } from 'react-feather';
import styles from './form.module.css';
import RatingComponent from './ratingComponent';
import { gql, useQuery, useMutation } from '@apollo/client';
import DEFAULT_OPERATIONS from './reviewfromsubmission.gql';
import mergeOperations from "@magento/peregrine/lib/util/shallowMerge";
import {useFormState} from "informed";

const colors = {
  orange: "#ffcc00",
  grey: "#dddddd"
};

const ReviewForm = (props) => {

  const [formData, setFormData] = useState({
    nickname: '',
    summary: '',
    review: '',
  });

  const [errors, setErrors] = useState({
    nickname: '',
    summary: '',
    review: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Sanitizing input: removing potential dangerous characters
    const sanitizedValue = value.replace(/(<([^>]+)>)/gi, "");

    setFormData({
      ...formData,
      [name]: sanitizedValue,
    });
  };

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!formData.nickname.trim()) {
      errors.nickname = 'Nickname is required';
      valid = false;
    }

    if (!formData.summary.trim()) {
      errors.summary = 'Summary is required';
      valid = false;
    }

    if (!formData.review.trim()) {
      errors.review = 'review is required';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  function numberToBase64(num) {
    const str = num.toString();
    const base64 = btoa(str);
    return base64;
}

  const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
  const { createAccount } = operations;

  const [createProductReview,]=useMutation(
    createAccount,{ fetchPolicy: 'no-cache' }
  );

  const handleSubmit = async e => {
    e.preventDefault();
    if (validate()) {
      try{
          console.log(formData);
          await createProductReview({ 
            variables:{
              sku: props.sku,
              nickname: formData.nickname,
              summary: formData.summary,
              text: formData.review,
              ratings: [
                {
                  id: numberToBase64(1),  // Use the correct rating ID for your Magento setup (1 is an example for Quality)
                  value_id: numberToBase64(currentValue), // The value of the rating (1-5 or your rating scale)
                }
              ]
            } 
          });
          setFormData(
            {
              nickname: '',
              summary: '',
              review: '',
            }
          );
          setCurrentValue(0);
      }
      catch  (error) {
        console.error(error.message); 
      } 
    }
  }

    useEffect(() => {
        console.log(createAccount, 'data from product review useEffect before data');
      if (createAccount) {
        console.log(operations, 'operations from product review useEffect');
      }
    }, [createAccount])
    

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       // Handle form submission
//       console.log('Form submitted:', formData);
//     }
//   };

    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)

    const handleClick = value => {
      setCurrentValue(value)
      console.log(currentValue);
    }

    const handleMouseOver = newHoverValue => {
      setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
      setHoverValue(undefined)
    }

  return (
    <div className={styles.container}>
        <div style={{width: '150px'}}>
            {/* <RatingComponent /> */}
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
        </div>
        <form  onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                <label className={styles.inputGroupLabel} htmlFor="nickname">Nickname </label>
                <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    className={styles.inputGroupInput}
                    maxLength="50"
                    required
                />
                {errors.nickname && <span className={styles.error}>{errors.nickname}</span>}
                </div>
                <div className={styles.inputGroup}>
                <label className={styles.inputGroupLabel} htmlFor="summary">Summary</label>
                <input
                    type="text"
                    id="summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    className={styles.inputGroupInput}
                    maxLength="100"
                    required
                />
                {errors.summary && <span className={styles.error}>{errors.summary}</span>}
                </div>
            </div>
            <div className={styles.textAreaGroup}>
                <label className={styles.textAreaGroupLabel} htmlFor="review">Review</label>
                <textarea
                    id="review"
                    name="review"
                    value={formData.review}
                    onChange={handleChange}
                    className={styles.textAreaGroupTextarea}
                    maxLength="800" // limiting textarea length
                    required
                />
                {errors.review && <span className={styles.error}>{errors.review}</span>}
            </div>
            <button className={styles.submitButton} 
              type="submit"
              onClick={handleSubmit}
            >
                Submit Review
            </button>
        </form>
    </div>
  );
};

export default ReviewForm;
