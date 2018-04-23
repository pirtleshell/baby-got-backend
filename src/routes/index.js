
import React from 'react';
import Dashboad from './dashboard';
import Editor from './editor';

export default [
  {
    route: '/editor',
    component: (<Editor />)
  },
  {
    route: '/',
    component: (<Dashboad />)
  }
];
