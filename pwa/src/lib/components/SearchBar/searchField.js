import React from 'react';
import { func } from 'prop-types';
import { Search as SearchIcon, X as ClearIcon } from 'react-feather';
import { useSearchField } from '@magento/peregrine/lib/talons/SearchBar';

import Icon from '@magento/venia-ui/lib/components/Icon';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import Trigger from '@magento/venia-ui/lib/components/Trigger';

const clearIcon = <Icon src={ClearIcon} size={24} />;
const searchIcon = <Icon src={SearchIcon} size={24} />;

const SearchField = props => {
    const { isSearchOpen, onChange, onFocus, addLabel } = props;
    const { inputRef, resetForm, value } = useSearchField({ isSearchOpen });

    const resetButton = value ? (
        <Trigger action={resetForm} addLabel={addLabel}>
            {clearIcon}
        </Trigger>
    ) : null;

    return (
        <TextInput
            id="search_query"
            style={{height:"40px"}}
            after={resetButton}
            // before={searchIcon}
            field="search_query"
            data-cy="SearchField-textInput"
            onFocus={onFocus}
            onValueChange={onChange}
            forwardedRef={inputRef}
            placeholder="I'm looking for..."
        />
    );
};

export default SearchField;

SearchField.propTypes = {
    onChange: func,
    onFocus: func
};
