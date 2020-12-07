import * as _ from 'lodash';
import './style.scss';
import './index.hbs'

function component() {
    const element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'd'], ' ');

    return element;
  }

  document.body.appendChild(component());

  if (module.hot) {
    module.hot.accept('./print.js', function() {
      console.log('Accepting the updated printMe module!');
      //printMe();
    })
  }