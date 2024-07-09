import React, { useEffect } from 'react';
import { bool, shape, string } from 'prop-types';
import { Form } from 'informed';
import { useIntl } from 'react-intl';
import { useSearchBar } from '@magento/peregrine/lib/talons/SearchBar';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Autocomplete from '@magento/venia-ui/lib/components/SearchBar/autocomplete';
import SearchField from '@magento/venia-ui/lib/components/SearchBar/searchField';
import defaultClasses from './headerSearchBar.module.css';

const HeaderSearchBar = React.forwardRef((props, ref) => {
    const isOpen= true;
    const talonProps = useSearchBar();
    const {
        containerRef,
        handleChange,
        handleFocus,
        handleSubmit,
        isAutoCompleteOpen,
        setIsAutoCompleteOpen,
        initialValues,
        valid
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);
    const rootClassName = isOpen ? classes.root_open : classes.root;
    const { formatMessage } = useIntl();


    // handle clicking outside of autocomplete or on an product
    useEffect(() => {
        let handler = (event) => {
            if(!ref.current.contains(event.target)){
                setIsAutoCompleteOpen(false);
                // console.log(event.target);
            }
        }

        document.addEventListener('click', handler);

        return () => {
            document.removeEventListener('click', handler);
        }
    }, []);


    return (
        <div className={classes.root_open} data-cy="SearchBar-root" ref={ref}>
            <div ref={containerRef} className={classes.container}>
                <Form
                    autoComplete="on"
                    className={classes.form}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <div className={classes.search}>
                    {!valid && <div className={classes.searchButton}>Search</div>}
                        <SearchField
                            addLabel={formatMessage({
                                id: 'global.clearText',
                                defaultMessage: 'Clear Text'
                            })}
                            isSearchOpen={isOpen}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                        {valid && <div className={classes.autocomplete}>
                            <Autocomplete
                                setVisible={setIsAutoCompleteOpen}
                                valid={valid}
                                visible={isAutoCompleteOpen}
                            />
                        </div> }

                    </div>
                </Form>
            </div>
        </div>
    );
});

export default HeaderSearchBar;

HeaderSearchBar.propTypes = {
    classes: shape({
        autocomplete: string,
        container: string,
        form: string,
        root: string,
        root_open: string,
        search: string
    }),
    isOpen: bool
};
