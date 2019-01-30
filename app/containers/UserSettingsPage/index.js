import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import H2 from 'components/H2';
import { Form } from 'react-bootstrap';
import messages from './messages';
import { makeSelectUserProfile } from '../App/selectors';

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
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={this.props.userProfile.email}
                readOnly
              />
            </Form.Group>
          </section>
        </div>
      </article>
    );
  }
}

UserSettingsPage.propTypes = {
  userProfile: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userProfile: makeSelectUserProfile(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(UserSettingsPage);
