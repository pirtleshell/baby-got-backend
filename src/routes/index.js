
import React from 'react';
import Dashboad from './dashboard';
import Edit from './edit';

export default [
  {
    route: '/edit/*',
    component: (<Edit />)
  },
  {
    route: '/',
    component: (<Dashboad />)
  }
];
