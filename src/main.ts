import './styles/globals.scss';
import { createRouter } from './app/router';
import { renderHomePage } from './pages/home/home-page';

const root = document.createElement('div');
root.id = 'app';
document.body.append(root);

createRouter(root, [{ path: '/', render: renderHomePage }]);
