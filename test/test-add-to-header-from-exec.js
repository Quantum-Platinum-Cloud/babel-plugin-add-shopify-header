import * as babel from 'babel-core';
import path from 'path';
import pluginPath from './plugin-path';
import assertTest from './assert-test';

export default function() {
  it('should add to header from exec', () => {

    const source = babel.transform('console.log("nom nom nom");', {
      plugins: [
        [pluginPath, {
          header: `!node ${path.resolve(__dirname, 'toExec.js')}`,
        }],
      ],
    });

    assertTest('test-add-to-header-from-exec', source, 'Generated source matches expected source');
  });
}