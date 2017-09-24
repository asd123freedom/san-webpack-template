/**
 * @file mip index
 * @author zhangsiyuan
 */

import {router} from 'san-router';
// actions
// import './topic/action';
// import './news/action';


import './style.styl';

// routers
import routes from './routes';

routes.forEach(item => {

    router.add({
        target: '#content',
        ...item
    });

});
