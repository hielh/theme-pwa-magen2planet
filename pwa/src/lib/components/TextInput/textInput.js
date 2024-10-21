import React, { Fragment, useEffect, useRef } from 'react';
import { node, shape, string } from 'prop-types';
import { Text as InformedText } from 'informed';
import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { FieldIcons, Message } from '@magento/venia-ui/lib/components/Field';
import defaultClasses from './textInput.module.css';

const TextInput = props => {
    const {
        after,
        before,
        classes: propClasses,
        regionError,
        field,
        message,
        ...rest
    } = props;

    const inputRef = useRef(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
          }
        const timer = setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.blur();
              window.scrollTo(0, 0)
            }
          }, 100); // Adjust the delay as needed
          return () => clearTimeout(timer);
    }, [])
    
    const fieldState = useFieldState(field);
    const classes = useStyle(defaultClasses, propClasses);
    var inputClass =
        fieldState.error || regionError ? classes.input_error : classes.input;

    return (
        <Fragment>
            <FieldIcons after={after} before={before}>
                <InformedText ref={inputRef}  {...rest} className={inputClass} field={field} />
            </FieldIcons>
            <Message fieldState={fieldState}>{message}</Message>
        </Fragment>
    );
};

export default TextInput;

TextInput.propTypes = {
    after: node,
    before: node,
    classes: shape({
        input: string
    }),
    field: string.isRequired,
    message: node
};
