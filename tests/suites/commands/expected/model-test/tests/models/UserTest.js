const { user } = require('mexpect/lib/descriptors');

describe("User's", () => {
  describe("fields: ", () => {
    describe("name", () => {
      it("exists", () => {
        expect(user.name).toBeExist();
      });
    });
    describe("age", () => {
      it("exists", () => {
        expect(user.age).toBeExist();
      });
    });
  });
});
