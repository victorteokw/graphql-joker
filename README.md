# Amur
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][cov-image]][cov-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![License][license-image]][license-url]
[![PR Welcome][pr-image]][pr-url]

Amur is the ultimate GraphQL scaffolding tool.

It automates coding process to save your precious time, enhance your work and
life experience. In other words, amur write code for you with commands you
specified.

With amur, you can create a full-fledged backend server with your complex app
logic and running API in less than 3 minutes.

# Documentation
* [Motivation](#motivation)
* [Design Concept](#design-concept)
* [Installation](#installation)
* [Create an Amur Project](#create-an-amur-project)
* [Generate Resources](#generate-resources)
  * [Primitive Types](#primitive-types)
  * [Array Type](#array-type)
  * [Reference Types](#reference-types)
  * [Upload Type](#upload-type)
  * [Type Modifiers](#type-modifiers)
  * [Default Values](#default-values)
  * [Nested Structure](#nested-structure)
  * [Enums](#enums)
  * [Reusable Schemas](#reusable-schemas)
  * [Destroy Resources](#destroy-resources)
* [Generate Uploader](#generate-uploader)
* [Integrate with Existing Project](#integrate-with-existing-project)
  * [Customize Amur Behavior](#customize-amur-behavior)
  * [Integrate Console Feature](#integrate-console-feature)
  * [Integrate Data Seeding Feature](#integrate-data-seeding-feature)
* [Issues and Helps](#issues-and-helps)
* [Roadmap](#roadmap)
* [License](#license)

# Motivation

When working on GraphQL projects, we need to define database schema and GraphQL
twice. We need to create resolvers for the standardized API. A lot of copying
and pasting are going on. It's not elegant to copy code around and find-replace
all occurrences. It's also error prone. And sometimes causing unnoticeable
errors which wastes time.

Wouldn't be nice if we could have a tool just like Ruby on Rails' scaffold tool
to generate code for us?

# Design Concept

Amur is designed to provide features at least Ruby on Rails scaffold tool has.
Aka, generate boilerplate business logic code as much as possible for you.

However, unlike Ruby on Rails, amur is not a full-fledged framework and will
never provide a framework for you. It focus on business logic generation.
Although amur also has project generation feature, it's trying to hook up the
industry standard and battle-tested libraries and components together for you.
And it's configurable. To split features into small core chunks and make them
combinable and adaptable is a good practice and especially popular in node.js
ecosystem, amur embraces this practice. That's what makes amur outstanding and
what makes amur really a flexible and configurable scaffolding tool.


# Installation

Amur is a general command line tool, thus you should install it globally.

```bash
npm install -g amur
```

# Create an Amur Project

To create an amur project, use `amur app` command.

```bash
amur app my-new-app
```

This will generate your app in 'my-new-app' folder. If you don't specify app
name, the app will be created at your current working directory.

Options:
- `--port` On which port this app is listening on.
- `--git-init` Automatically run 'git init' after project generated.
- `--skip-install` Do not install dependencies.
- `--eslint-config` Changing the default eslint config.

To change default eslint config being used:

```bash
amur app my-new-app --eslint-config=your-config
```

To automatically run `git init`:

```bash
amur app my-new-app --git-init
```

# Generate Resources

API resource generation is the core feature of amur. It's syntax is rather
simple and extensible. It follows this basic style:

``` bash
amur resource ModelName[/optionalPluralVariableName] \
primitiveField[[:Type[typeModifiers]]:defaultValue]... \
referenceField[[:ReferenceType[typeModifiers]]:foreignKey]...
```

This arguments specification is obscure to see. Let's see some examples.

Let's say you have a model named user, and user has a name, an age and also a
list of posts. And you have a model named post, it has title, content and
author. Just type like this:

``` bash
amur resource User name:String age:Int posts:[Post]:author
amur resource Post title:String content:String author:User
```

Here we specified our first model 'User', with following fields:
- `name` which is a String
- `age` which is an Int
- `posts` which is a list of Posts through foreign key named author

We defined our second model named 'Post', with following fields:
- `title` which is a String
- `content` which is also a String
- `author` which references to User

This creates six files in total, three for User and three for Post. The three
files are mongoose model, GraphQL schema and GraphQL resolver.

The autogenerated models/User.js looks like this:
```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  age: Number
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
```

The autogenerated schemas/User.gql looks like this:
```graphql
type User {
  _id: ID!
  name: String
  age: Int
  posts: [Post]
  createdAt: Date
  updatedAt: Date
}

input UserInput {
  name: String
  age: Int
}

type Query {
  user(_id: ID!): User
  users: [User]
}

type Mutation {
  createUser(input: UserInput): User
  updateUser(_id: ID!, input: UserInput): User
  deleteUser(_id: ID!): User
}
```

The autogenerated resolvers/User.js looks like this:
```js
module.exports = {
  User: {
    async posts(root, _, ctx) {
      const { Post } = ctx.models;
      return await Post.find({ author: root._id });
    }
  },
  Query: {
    async user(root, { _id }, ctx) {
      const { User } = ctx.models;
      return await User.findById(_id);
    },
    async users(root, { _ }, ctx) {
      const { User } = ctx.models;
      return await User.find();
    }
  },
  Mutation: {
    async createUser(root, { input }, ctx) {
      const { User } = ctx.models;
      return await User.create(input);
    },
    async updateUser(root, { _id, input }, ctx) {
      const { User } = ctx.models;
      return await (await User.findById(_id)).set(input).save();
    },
    async deleteUser(root, { _id }, ctx) {
      const { User } = ctx.models;
      return await (await User.findById(_id)).remove();
    }
  }
};
```

Besides your schema definition, 5 API are created for you. Those are:
- `users` query all users
- `user` query a user by id
- `createUser` create a new user
- `updateUser` modify an existing user
- `deleteUser` delete an existing user

Now you can CRUD your resources through API.

## Primitive Types

Amur supports a wide range of primitive types:
* `String` string type
* `Int` integer type
* `Float` float type
* `Boolean` bool type
* `Date` date type
* `Enum` enum type, the type specifier has a different syntax
* `File` upload typem the type specifier has a different syntax
* `Mixed` mixed type includes string, int, float, boolean, date, array and
objects

When you are defining a field with type mentioned above, amur will treat them as
primitive types. When you refer to a type that is not included in the list, amur
will treat it as a referecing to another model.

``` bash
amur resource User disabled:Boolean name:String description:Mixed spouse:User
```

In the above example, obviously `disabled`, `name` and `description` are
primitive types. `spouse` is a reference type which references to `User`.

## Array Type

Surround a type with a pair of [], you get an array of that type, for example:

```
amur resource User spouse:User friends:[User] favoriteSayings:[String]
```

The field `friends` is an array of `User`s. And the field `favoriteSayings` is
an array of `String`s.

## Reference Types

There are several ways to implement your own reference types.

### one-to-one

The simplest case is one-to-one relation ship.

```bash
amur resource User address:Address
amur resource Address user:User:address
```

In this case, we save the reference into user model, and on address model, we
use the foreign key on user model to fetch the user value.

### one-to-many

We have two ways to implement this relationship.

```bash
amur resource User posts:[Post]:owner
amur resource Post user:User:owner
```

This is the most common case. We save the reference on the 'many' side, and
fetch on the 'many' side model.

```bash
amur resource User posts:[Post]
amur resource Post user:User:[posts]
```

In this case, we are saving the references on the 'one' side, and on 'many'
side, we use a pair of [] to indicate it's an array. Be careful of performance
when you are doing this way.

### many-to-many

In simple cases, we can just do like this.

```bash
amur resource User courses:[Course]
amur resource Course users:[User]:[courses]
```

If there are tons of records, then you may want to use association table.

```bash
amur resource Favorite user:User course:Course
amur resource User courses:[Course]:Favorite
amur resource Course users:[User]:Favorite
```

In this case, we specified a relationship that is have many ... through ...

## Upload Type

To create an uploading field, use `...Uploader` as type name. See the following
example:

```bash
amur resource User avatar:AvatarUploader
```

To create an uploader, see [Generate Uploader](#generate-uploader)

## Type Modifiers

In the real world practices, fields should be validated. For example, You may
want a user's email to match designated format and to be required and unique.
You can specify type modifiers.

``` bash
amur resource User 'email:String/.*@.*\..*/!$'
```

In the above example, `/.*@.*\..*/` means that this field matches this regexp,
`!` means required, and `$` means unique.

Existing type modifiers includes:
- `!` required
- `^` index
- `$` unique
- `/regexp/` string only, matches the regexp or not
- `<=n` max for number types, maxlength for string type
- `>=n` min for number types, minlength for string type

## Default Values

You can specify default value to a primitive field with the following syntax.

``` bash
amur resource Post 'title:String!:Untitled' 'lastUpdate:Date!:`Date.now`'
```

Here, title's default value is `'Untitled'`, and lastUpdate's default value is
`Date.now`. It's a calculated default value, so surround with a pair of
back ticks.

## Nested Structure

To create nested structure, use the following syntax:

``` bash
amur resource User posts:[{ title:String content:String comments:[{ \
commenter:User content:String }] }] email:String password:String settings:{ \
sms:Boolean email:Boolean pushNotification:Boolean }
```

Specify type as `{` or `[{`, you are going into a nested context. All field
defined after this goes into the nested structure. Use plain `}` and `}]` tokens
to jump out the nesting context.

## Enums

To create enum fields, use enum syntax like this:

``` bash
amur resource User 'gender:Enum{male,female}!'
```

## Reusable Schemas

Amur supports reusable schemas and referencing them.

``` bash
amur schema Address line1:String line2:String country:String region:String
amur resource User address:addressSchema name:String
```

Specify the lowercase schema name append by 'Schema', amur will treat the type
as a subschema reference.

## Destroy Resources

If you mistakenly generated something or you spell something wrongly, use the
following syntax to delete the autogenerated files.

``` bash
amur resource User -d
```
It's equivalent to `amur resource User --destroy`.

## Generate Uploader

To generate an uploader, use `amur uploader` command.

```bash
amur uploader FileUploader extends AliOSSUploader bucket=your-bucket-name region=your-region
```

This generates an base file uploader for you.

# Integrate with Existing Project

Amur is designed to be a generic tool. It does not require a project to be a
amur project.

## Customize Amur Behavior

Create a file called `.amurrc.json` in project's root directory. And filling it
like this:

```json
{
  "schemaDir": "graphql",
  "resolverDir": "graphql",
  "test": false
}
```

Amur will generate schema files and resolver files into graphql directory, and
will not generate unit tests.

## Integrate Console Feature

Amur provides a nice console feature. It's a REPL with database connected and
you can play with your database code within it. Let's say you want to integrate
this feature to a existing project.

```bash
amur console
```

Amur will install the console dependencies for you and help you setup
configuration file.

## Integrate Data Seeding Feature

Amur project have a nice data seeding tool that supports named it. If you want
to integrate this feature into existing project. Use the following command:

```bash
amur seed
```

Again, amur will install the seeding tool for you and help you setup
configuration file.

# Issues and Helps

Amur is not mature yet. If you find anything uncomfortable or confuses you.
Any discuss, issue and pull request are welcome.

# Roadmap

Amur is an ambitious project and it still has a long way to go.

- Version 0.8
  - CLI user experience
  - configurability
  - more cli behavior tests
  - use eslint to transform user generated code if available
  - dependencies reliability
- Version 0.9
  - query filter, sorting and pagination feature
- Version 1.0
  - the first stable release
  - website should goes online
  - publicize and popularize this project

# License

[The GNU General Public License v3.0](license-url).

[npm-image]: https://badge.fury.io/js/amur.svg
[npm-url]: https://npmjs.org/package/amur
[travis-image]: https://travis-ci.org/zhangkaiyulw/amur.svg?branch=master
[travis-url]: https://travis-ci.org/zhangkaiyulw/amur
[cov-image]: https://codecov.io/gh/zhangkaiyulw/amur/branch/master/graph/badge.svg
[cov-url]: https://codecov.io/gh/zhangkaiyulw/amur
[daviddm-image]: https://david-dm.org/zhangkaiyulw/amur.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/zhangkaiyulw/amur
[license-image]: https://img.shields.io/github/license/zhangkaiyulw/amur.svg
[license-url]: https://github.com/zhangkaiyulw/amur/blob/master/LICENSE
[pr-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[pr-url]: https://github.com/zhangkaiyulw/amur/blob/master/CONTRIBUTING.md
