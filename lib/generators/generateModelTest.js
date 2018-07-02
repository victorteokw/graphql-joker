const indentEveryLine = require('../utils/string/indentEveryLine');

const heading = (descriptor) =>
  `const { ${descriptor.varName} } = require('mexpect/lib/descriptors');`;

const describe = (title, callback) =>
  `describe("${title}", () => {
${indentEveryLine(callback())}
});`;

const it = (title, context, f, matcher) =>
  `it("${title}", () => {
  expect(${[...context, f.name].join('.')}).${matcher};
});`;

const wrapping = (descriptor, callback) =>
  describe(`${descriptor.modelName}'s`, () =>
    describe('fields: ', () =>
      callback()
    )
  );

const body = (fields, context) =>
  fields.map((f) =>
    describe(f.name, () => {
      const blocks = [];
      blocks.push(it('exists', context, f, 'toBeExist()'));

      it(`is a ${f.jsType}`,context, f, `toBeA('${f.jsType}')`);
      return blocks.join('\n');
    })
  ).join('\n');

module.exports = (descriptor) => {
  const header = heading(descriptor);
  const main = wrapping(descriptor,
    () => body(descriptor.fields, [descriptor.varName]));
  return `${header}\n\n${main}`;
};
