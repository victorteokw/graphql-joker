const heading = (descriptor) =>
  `const { ${descriptor.varName} } = require('mexpect/lib/descriptors');`;

const indentEveryLine = (content, level = 1, space = 2) => {
  const lines = content.split('\n');
  return lines.map((l) => ' '.repeat(level * space) + l).join('\n');
};

const describe = (title, callback) =>
  ```
    describe("${title}", () => {
    ${indentEveryLine(callback())}
    });
  ```;

const it = (title, context, f, matcher) =>
  ```
    it("${title}", () => {
      expect(${[...context, f.name].join('.')}).${matcher};
    });
  ```;

const wrapping = (descriptor, callback) =>
  describe(`${descriptor.modelName}'s`, () => {
    describe('fields: ', () => {
      callback();
    });
  });

const body = (fields, context) =>
  fields.map((f) =>
    describe(f.name, () => {
      const blocks = [];
      blocks.push(it('exists', context, f, 'toBeExist()'));

      it(`is a ${f.jsType}`,context, f, `toBeA('${f.jsType}')`);
      return blocks;
    })
  ).join('\n');


module.exports = (descriptor) => {
  const header = heading();
  const main = wrapping(descriptor,
    () => body(descriptor.fields, [descriptor.varName])
  );
  return `${header}\n\n${main}`;
};
