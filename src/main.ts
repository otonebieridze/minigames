import './styles/globals.scss';
import { createRouter } from './app/router';
import { renderHeader } from './components/header/header';
import { renderFooter } from './components/footer/footer';
import { renderHomePage } from './pages/home/home-page';

const root = document.createElement('div');
root.id = 'app';

const main = document.createElement('main');

root.append(renderHeader(), main, renderFooter());
document.body.append(root);

createRouter(main, [{ path: '/', render: renderHomePage }]);