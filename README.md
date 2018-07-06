# Amur
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![License][license-image]][license-url]
[![PR Welcome][pr-image]][pr-url]

With amur, you can create a full-fledged backend server with your complex app
logic and running API in less than 3 minutes.

Amur automates backend coding process.

Currently, amur support koa, mongoose and graphQL style API.

# Table of contents
* [Installation](#installation)
* [Create an Amur Project](#create-an-amur-project)
* [Generate Resources](#generate-resources)
  * [Types](#types)
  * [Array Type](#array-type)
  * [Type Modifiers](#type-modifiers)
  * [Default Values](#default-values)
  * [Nested Structure](#nested-structure)
  * [Enums](#enums)
  * [Reusable Schemas](#reusable-schemas)
* [Destroy Resources](#destroy-resources)
* [Integrate with Existing Project](#integrate-with-existing-project)
  * [Customize Amur Behavior](#customize-amur-behavior)
  * [Integrate Console Feature](#integrate-console-feature)
  * [Integrate Data Seeding Feature](#integrate-data-seeding-feature)

# Installation

Install amur command line tool globally with npm.

```bash
npm install -g amur
```

# Create an Amur Project

Create an amur app with `amur app` command.

```bash
amur app my-new-app
```

If you don't specify app name, the app will be created at your current working directory.

You can overwrite default eslint config by adding flag `--eslint-config`.

```bash
amur app my-new-app --eslint-config=your-config
```

Appending a flag `--git-init`, amur will automatically run `git init` for you
after setup your project.

```bash
amur app my-new-app --git-init
```

# Generate Resources

Amur resource generator follows this style:

``` bash
amur resource YourModelName field1:Type1 field2:Type2 ref1:RefType1 ref2:RefType2:foreignKey
```

Let's say you have a model named user, and user has a name, age and also a list of posts.
And you have a model named post, it has title, content and author. Just type like this:

``` bash
amur resource User name:String age:Int posts:[Post]:author
amur resource Post title:String content:String author:User
```

## Types

Amur supports these primitive or scalar types:
* String
* Int
* Float
* Boolean
* Date
* Enum
* Mixed

When you are defining a field with type mentioned above, amur will treat them as
primitive type. When you refer to a type that is not included in the list, amur
will treat it as a referecing to another model.

``` bash
amur resource User disabled:Boolean:false name:String age:Int spouse:User
```

In the above example, obviously `disabled`, `name` and `age` are primitive
types. `spouse` is a reference type which references to `User`.

## Array Type

Surround type with a pair of [], you get an array of that type, for example:

```
amur resource User spouse:User friends:[User] favoriteSayings:[String]
```

The field `friends` is an array of `User`s. And the field `favoriteSayings` is
an array of `String`s.

## Type Modifiers

If you are doing a website which has authentication feature. You may want a
user's email to match designated format and to be required and unique. You can
specify type modifiers.

``` bash
amur resource User 'email:String/.*@.*\..*/!$'
```

In the above example, `/.*@.*\..*/` means that this field matches this regexp,
`!` means required, and `$` means unique.

## Default Values

You can specify default value to a field with the following syntax.

``` bash
amur resource Post 'title:String!:Untitled' 'lastUpdate:Date!:`Date.now`'
```

## Nested Structure

You can create nested structure with the following syntax.

``` bash
amur resource User posts:[{ title:String content:String comments:[{ \
commenter:User content:String }] }] email:String password:String settings:{ \
sms:Boolean email:Boolean pushNotification:Boolean }
```

## Enums

You can create enum fields with enum syntax.

``` bash
amur resource User 'gender:Enum{male,female}!'
```

## Reusable Schemas

You can create a reusable schema and reference to it.

``` bash
amur schema Address line1:String line2:String country:String region:String
amur resource User address:addressSchema name:String
```

# Destroy Resources

If you mistakenly generated something or you spell something wrongly, you want to undo:

``` bash
amur resource User -d
```

The above example deletes all files related to User resource.

[npm-image]: https://badge.fury.io/js/amur.svg
[npm-url]: https://npmjs.org/package/amur
[travis-image]: https://travis-ci.org/zhangkaiyulw/amur.svg?branch=master
[travis-url]: https://travis-ci.org/zhangkaiyulw/amur
[daviddm-image]: https://david-dm.org/zhangkaiyulw/amur.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/zhangkaiyulw/amur
[license-image]: https://img.shields.io/github/license/zhangkaiyulw/amur.svg
[license-url]: https://github.com/zhangkaiyulw/amur/blob/master/LICENSE
[pr-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[pr-url]: https://github.com/zhangkaiyulw/amur/blob/master/CONTRIBUTING.md
