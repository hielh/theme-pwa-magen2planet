import React, {Fragment, useEffect, useState, useRef, lazy, Suspense} from 'react';
import { useQuery, gql } from '@apollo/client';
import { useCmsPage } from '@magento/peregrine/lib/talons/Cms/useCmsPage';
const RichContent = lazy(
    () => import('@magento/venia-ui/lib/components/RichContent')
)


const SliderBlock = () => {

    const [cms, setCms] = useState(null);

    const identifier = "news-test";
    const talonProps = useCmsPage({ identifier : identifier});
    const { cmsPage } = talonProps;

    useEffect(() => {
        if(cmsPage) {
            setCms(cmsPage);
        }
    }, [cmsPage])
    
    return (
        <div className='SliderBlock-component' style={{maxWidth: '100vw', overflow: 'hidden'}}>
            { cmsPage &&
            <Suspense fallback={"Loading..."}>
                <RichContent html={cmsPage.content} />
            </Suspense>
            }
        </div>
    );
};

export default SliderBlock;
