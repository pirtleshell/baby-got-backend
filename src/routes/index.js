
import React from 'react';
import Dashboad from './dashboard';
import Edit from './edit';
import ExpandingList from '../components/ExpandingList'

export default [
  {
    route: '/edit/*',
    component: (<Edit />)
  },
  {
    route: '/testing',
    component: (<ExpandingList />)
  },
  {
    route: '/',
    component: (<Dashboad />)
  },
];
