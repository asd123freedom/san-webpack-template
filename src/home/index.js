/**
 * @file index
 * @author menglingjun
 */

import {router} from 'san-router';


import HomePage from './Home';

router.add({
    target: '#content',
    rule: '/',
    Component: HomePage
});
