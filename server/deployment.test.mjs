import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

test('emitted API runs using JavaScript artifacts, without source TypeScript files', async () => {
  const output = await mkdtemp(join(tmpdir(), 'onz-deployment-test-'));
  try {
    const config = ts.readConfigFile(resolve('tsconfig.json'), ts.sys.readFile).config;
    // Vercel reads the root config, not its project references. Its Node builder emits .ts as .js.
    const { options } = ts.convertCompilerOptionsFromJson({
      module: 'NodeNext', moduleResolution: 'NodeNext', target: 'ES2021',
      ...config.compilerOptions, noEmit: false, outDir: output, rootDir: process.cwd(),
    }, process.cwd());
    const program = ts.createProgram([resolve('api/recommendations.ts')], options);
    assert.equal(program.emit().emitSkipped, false);
    await writeFile(join(output, 'package.json'), '{"type":"module"}');
    const { default: handler } = await import(pathToFileURL(join(output, 'api/recommendations.js')).href);
    let status, body;
    handler({ method: 'GET', url: '/api/recommendations?taste=SWEET&aroma=FRUIT&alcohol=MILD&texture=FIZZY&occasion=PARTY&adventure=1' }, {
      writeHead(value) { status = value; }, end(value) { body = JSON.parse(value); },
    });
    assert.equal(status, 200);
    assert.equal(body.datasetCount, 530);
    assert.equal(body.data.length, 5);
  } finally { await rm(output, { recursive: true, force: true }); }
});
