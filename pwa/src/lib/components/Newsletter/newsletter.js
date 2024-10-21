import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from 'informed';
import { shape, string } from 'prop-types';

import { useNewsletter } from '@magento/peregrine/lib/talons/Newsletter/useNewsletter';
import { useToasts } from '@magento/peregrine';

import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import { useStyle } from '@magento/venia-ui/lib/classify';
import FormError from '@magento/venia-ui/lib/components/FormError';
import Button from '../Button';
import Field from '@magento/venia-ui/lib/components/Field';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import TextInput from '../TextInput';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import Shimmer from '@magento/venia-ui/lib/components/Newsletter/newsletter.shimmer';
import defaultClasses from '@magento/venia-ui/lib/components/Newsletter/newsletter.module.css';
import testClasses from './newsletter.module.css';
import childsClasses from './components.module.css';

const Newsletter = props => {
    const { formatMessage } = useIntl();
    const classes = useStyle(defaultClasses, props.classes, testClasses, childsClasses);
    const talonProps = useNewsletter();
    const newsletter = formatMessage({
        id: 'NEWSLETTER',
        defaultMessage: 'NEWSLETTER'
    })

    const emailMessage = formatMessage({
        id: 'Enter your email here...',
        defaultMessage: 'Enter your email here...'
    })
    const [, { addToast }] = useToasts();
    const {
        isEnabled,
        errors,
        handleSubmit,
        isBusy,
        isLoading,
        setFormApi,
        newsLetterResponse,
        clearErrors
    } = talonProps;

    useEffect(() => {
        if (newsLetterResponse && newsLetterResponse.status) {
            addToast({
                type: 'success',
                message: formatMessage({
                    id: 'newsletter.subscribeMessage',
                    defaultMessage: 'The email address is subscribed.'
                }),
                timeout: 5000
            });
        }
    }, [addToast, formatMessage, newsLetterResponse]);

    if (isLoading) {
        return <Shimmer />;
    }

    if (!isEnabled) {
        return null;
    }

    const maybeLoadingIndicator = isBusy ? (
        <div className={classes.loadingContainer}>
            <LoadingIndicator>
                <FormattedMessage
                    id={'newsletter.loadingText'}
                    defaultMessage={'Subscribing'}
                />
            </LoadingIndicator>
        </div>
    ) : null;

    return (
        <div className={classes.root} data-cy={'Newsletter-root'}>
            {maybeLoadingIndicator}
            <span data-cy="Newsletter-title" className={classes.title}>
             {newsletter}
            </span>

            <p
                data-cy="Newsletter-infoText"
                className={classes.newsletter_text}
            >
                <FormattedMessage id="Register now to get updates on promotions & coupons" defaultMessage="Register now to get updates on promotions & coupons" />
            </p>
            <FormError
                allowErrorMessages
                errors={Array.from(errors.values())}
            />
            <Form
                getApi={setFormApi}
                className={classes.form}
                onSubmit={handleSubmit}
            >
                <Field
                        className={testClasses.border}
                    id="email"
                    label={formatMessage({
                        id: 'global.email',
                        defaultMessage: 'Email'
                    })}
                >
                    <TextInput
                        className={testClasses.border}
                        autoComplete="email"
                        field="email"
                        id="email"
                        placeholder={emailMessage}
                        validate={isRequired}
                    />
                </Field>
                <LinkButton
                    data-cy="Newsletter-submitButton"
                    className={classes.test}
                    type="submit"
                    disabled={isBusy}
                    onClick={clearErrors}
                >
                    <FormattedMessage id="Subscribe" defaultMessage="Subscribe" />
                </LinkButton>
            </Form>
        </div>
    );
};

Newsletter.propTypes = {
    classes: shape({
        modal_active: string,
        root: string,
        title: string,
        form: string,
        buttonsContainer: string
    })
};

export default Newsletter;
