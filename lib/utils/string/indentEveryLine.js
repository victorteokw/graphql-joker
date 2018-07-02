const indentEveryLine = (content, level = 1, space = 2) => {
  if (!content) return content;
  const lines = content.split('\n');
  if (lines[lines.length - 1] === '') {
    lines.pop();
  }
  return lines.map((l) => ' '.repeat(level * space) + l).join('\n');
};

module.exports = indentEveryLine;
