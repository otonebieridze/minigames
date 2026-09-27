import './styles/globals.scss';
import { createRouter } from './app/router';
import { renderHeader } from './components/header/header';
import { renderFooter } from './components/footer/footer';
import { renderHomePage } from './pages/home/home-page';
import { renderLibraryPage } from './pages/library/library-page';
import { createGameDetailsDialog } from './components/game-details-dialog/game-details-dialog';

const root = document.createElement('div');
root.id = 'app';

const main = document.createElement('main');

root.append(renderHeader(), main, renderFooter());
document.body.append(root);

const gameDetailsDialog = createGameDetailsDialog();
document.body.append(gameDetailsDialog.element);

createRouter(main, [
  { path: '/', render: renderHomePage },
  { path: '/library', render: renderLibraryPage },
]);
