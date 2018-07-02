# Amur
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

With amur, you can create a full-fledged backend server with your complex app
logic and running API in less than 3 minutes.

Amur automate backend coding process.

Currently, amur support koa, mongoose and graphQL style API.

## Installation

```bash
npm install -g amur
```

## Create an Amur Project

```bash
amur app my-new-app
```

If you don't specify app name, the app will be created at your current working directory.

## Generate Resources

Amur resource generator follows this style

``` bash
amur resource YourModelName field1:Type1 field2:Type2 ref1:RefType1 ref2:RefType2:foreignKey
```

Let's say you have a model named user, and user has a name, age and also a list of posts.
And you have a model named post, it has title, content and author. Just type like this:

``` bash
amur resource User name:String age:Int posts:[Post]:author
amur resource Post title:String content:String author:User
```

### Type Modifiers

If you are doing a website which has authentication feature. You may want a
user's email to match designated format and to be required and unique. You can
specify type modifiers.

``` bash
amur resource User 'email:String/.*@.*\..*/!$'
```

In the above example, `/.*@.*\..*/` means that this field matches this regexp,
`!` means required, and `$` means unique.

### Default Values

You can specify default value to a field with the following syntax.

``` bash
amur resource Post 'title:String!:Untitled' 'lastUpdate:Date!:`Date.now`'
```

### Nested Structure

You can create nested structure with the following syntax.

``` bash
amur resource User posts:[{ title:String content:String comments:[{ \
commenter:User content:String }] }] email:String password:String settings:{ \
sms:Boolean email:Boolean pushNotification:Boolean }
```

### Enums

You can create enum fields with enum syntax.

``` bash
amur resource User 'gender:Enum{male,female}!'
```

### Reusable schemas

You can create a reusable schema and reference to it.

``` bash
amur schema Address line1:String line2:String country:String region:String
amur resource User address:addressSchema name:String
```

## Destroy Resources

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
