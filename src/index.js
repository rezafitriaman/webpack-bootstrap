import _ from 'lodash';
import Print from './print';
import {cube} from './math';

 function component() {
   const element = document.createElement('div');

   // Lodash, now imported by this script
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.onclick = cube.bind(null, 2);

   return element;
 }

 document.body.appendChild(component());