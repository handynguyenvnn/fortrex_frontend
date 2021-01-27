import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { useAppStore } from '@store';

export function LanguageProvider(props) {
  const [states] = useAppStore();

  return (
    <IntlProvider
      locale={states.language}
      key={states.language}
      messages={props.messages[states.language]}
    >
      {React.Children.only(props.children)}
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.element.isRequired,
  messages: PropTypes.any.isRequired,
};

export default LanguageProvider;
