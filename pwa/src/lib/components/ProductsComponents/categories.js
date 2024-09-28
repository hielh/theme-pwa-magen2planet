import React from 'react';
import styles from './categories.module.css';

const categories = [
    { id: 1, name: 'Milks & Creams', image: 'http://magento.loc/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/t/vt12-kh_main.jpg' },
    { id: 2, name: 'Fruits', image: 'http://magento.loc/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/a/va22-si_main.jpg' },
    { id: 3, name: 'Vegetables', image: 'http://magento.loc/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/t/vt11-ll_main.jpg' },
    { id: 4, name: 'Ocean Foods', image: 'http://magento.loc/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/s/vsw04-pe_main.jpg' },
    { id: 5, name: 'Butters & Eggs', image: 'http://magento.loc/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/s/vsw05-kh_main.jpg' },
    { id: 6, name: 'Fresh Meats', image: 'http://magento.loc/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/s/vsw10-ly_main.jpg' },
  ];

const Categories = () => {
    return (
        <div className={styles.categoryContainer}>
            <h2 className={styles.categoryTitle}>Top Categories Of The Month</h2>
            <div className={styles.categoryCategories}>
            {categories.map(category => (
                <div key={category.id} className={styles.categoryCategory}>
                <img src={category.image} alt={category.name} className={styles.categoryImage} />
                <p className={styles.categoryName}>{category.name}</p>
                </div>
            ))}
            </div>
        </div>
    );
}

export default Categories;