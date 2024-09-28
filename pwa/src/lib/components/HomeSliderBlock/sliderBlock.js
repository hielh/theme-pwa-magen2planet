import React, {Fragment, useEffect, useState, useRef} from 'react';
import { useQuery, gql } from '@apollo/client';
import { useCmsPage } from '@magento/peregrine/lib/talons/Cms/useCmsPage';
import RichContent from '@magento/venia-ui/lib/components/RichContent';



const SliderBlock = () => {

    const [cms, setCms] = useState(null);

    const identifier = "news-test";
    const talonProps = useCmsPage({ identifier : identifier});
    const { cmsPage } = talonProps;
    // console.log(talonProps);
    // console.log(cmsPage, 'cmsPage');

    useEffect(() => {

        if(cmsPage) {
            setCms(cmsPage);
        }

        // console.log(cmsPage.content);

    }, [cmsPage])
    
    
    

    return (
        <div className='SliderBlock-component' style={{maxWidth: '100vw', overflow: 'hidden'}}>
            { cmsPage && <RichContent html={cmsPage.content} />}
        </div>
    );
};

export default SliderBlock;
