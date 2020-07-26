import React from 'react';

import { withAuthorization } from '../Session';
import * as Roles from '../../constants/roles';

const AdminPage = () => {
  return (
    <div>
      <h1>Admin</h1>
      <p>Restricted Area!! Only Users with the admin role are authorized.</p>
    </div>
  );
};

const condition = (authUser) => authUser && !!authUser.roles[Roles.ADMIN];

export default withAuthorization(condition)(AdminPage);
