const indentEveryLine = require('../utils/string/indentEveryLine');

const heading = (schemaDefs) =>
  `const { ${schemaDefs.varName} } = require('mexpect/lib/descriptors');`;

const describe = (title, callback) =>
  `describe("${title}", () => {
${indentEveryLine(callback())}
});`;

const it = (title, context, f, matcher) =>
  `it("${title}", () => {
  expect(${[...context, f.name].join('.')}).${matcher};
});`;

const wrapping = (schemaDefs, callback) =>
  describe(`${schemaDefs.modelName}'s`, () =>
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

module.exports = (schemaDefs) => {
  const header = heading(schemaDefs);
  const main = wrapping(schemaDefs,
    () => body(schemaDefs.fields, [schemaDefs.varName]));
  return `${header}\n\n${main}`;
};
