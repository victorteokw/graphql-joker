# Amur
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

With amur, you can create a full-fledged backend server with your complex app
logic and running API in less than 3 minutes.

Amur automate backend coding process.

## Installation

```bash
npm install -g amur
```

## Setup an Amur Project

```bash
amur my-new-app
```

If you don't specify app name, the app will be installed to your current working directory.

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

And then open `npm start` to try out auto generated API suite.

## Destroy Resources

If you mistakenly generated something or you spell something wrongly, you want to undo:

``` bash
amur resource ResourceToDelete -d
```

[npm-image]: https://badge.fury.io/js/amur.svg
[npm-url]: https://npmjs.org/package/amur
[travis-image]: https://travis-ci.org/zhangkaiyulw/amur.svg?branch=master
[travis-url]: https://travis-ci.org/zhangkaiyulw/amur
[daviddm-image]: https://david-dm.org/zhangkaiyulw/amur.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/zhangkaiyulw/amur
