import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import H2 from 'components/H2';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import messages from './messages';
import { makeSelectEmail } from '../LoginPage/selectors';

export class UserSettingsPage extends React.PureComponent {
  render() {
    return (
      <article>
        <Helmet>
          <title>Settings</title>
          <meta
            name="description"
            content="A Family Caregiver Application settings page"
          />
        </Helmet>
        <div>
          <H2>
            <FormattedMessage {...messages.userSettingsHeader} />
          </H2>
          <section>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl type="email" value={this.props.email} readOnly />
            </FormGroup>
          </section>
        </div>
      </article>
    );
  }
}

UserSettingsPage.propTypes = {
  email: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(UserSettingsPage);
