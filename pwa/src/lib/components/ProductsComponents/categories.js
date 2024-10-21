import React, { useEffect, useMemo } from 'react';
import styles from './categories.module.css';
import { FormattedMessage } from 'react-intl';
import {gql, useQuery} from '@apollo/client';
import { Link } from 'react-router-dom';

const CategoryListingFragment = gql`
    query categoryList($ids: [String!], $parentId: [String!], $limit: Int) {
    categoryList(
      filters: {
        ids: { in: $ids }
        parent_id: { in: $parentId }
      },
      pageSize: $limit
    ){
    uid
    children_count
    name
    image
    url_path
    children {
      uid
      level
      name
      path
      url_path
      url_key
      children {
        uid
        level
        name
        path
        url_path
        url_key
      }
    }
    }
    }
  `;

const Categories = () => {

    const numberIds = Array.from({ length: 102 }, (_, index) => index);
    const { error, loading, data: sidebarCategoriesData } = useQuery(CategoryListingFragment, {
        // variables: { ids: [8, 11, 14, 3, 15, 7, 20, 9, 37], parentId: ["2"] },
        variables: { ids: numberIds, parentId: ["2"], limit: 6 },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        skip: numberIds.length === 0
    });
    const categoryUrlSuffix = '.html';

    const renderCategories = (categories) => {
      return categories.map((category) => (
        <Link className={styles.menuItemSpan} key={category.uid} to={`/${category.url_path}${categoryUrlSuffix}`}>
          <div className={styles.categoryCategory}>
            <img src={category?.image} alt={category.name} className={styles.categoryImage} loading="lazy" />
            <p className={styles.categoryName}>
              <FormattedMessage id={category.name} defaultMessage={category.name} />
            </p>
          </div>
        </Link>
      ));
    };

    const memoizedCategories = useMemo(() => {
      return sidebarCategoriesData?.categoryList.slice(0, 6) || [];
    }, [sidebarCategoriesData]);
    

    return (
        <div className={styles.categoryContainer} id='categoriesFromApi'>
            <h2 className={styles.categoryTitle}><FormattedMessage id="Top Categories Of The Month" defaultMessage="Top Categories Of The Month" /></h2>
            <div className={styles.categoryCategories}>
              {renderCategories(memoizedCategories)}
            </div>
        </div>
    );
}

export default React.memo(Categories);