# Generator Amur
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
Gimme a koa mongoose graphQL app

## Setup an Amur Project

Assume that you have [node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

First, install [Yeoman](http://yeoman.io) and [Generator Amur](https://github.com/zhangkaiyulw/generator-amur/).

```bash
npm install -g yo
npm install -g generator-amur
```

Then generate your new project:

```bash
yo amur my-new-app
```

If you don't specify app name, the app will be installed to your current working directory.

## Generate Resources

Amur resource generator follows this style

``` bash
yo amur:resource YourModelName field1:Type1 field2:Type2 ref1:RefType1 ref2:RefType2:foreignKey
```

Let's say you have a model named user, and user has a name, age and also a list of posts.
And you have a model named post, it has title, content and author. Just type like this:

``` bash
yo amur:resource User name:String age:Int posts:[Post]:author
yo amur:resource Post title:String content:String author:User
```

And then open `npm start` to try out auto generated API suite.

## Destroy Resources

If you mistakenly generated something or you spell something wrongly, you want to undo:

``` bash
yo amur:resource ResourceToDelete --destroy --force
```

## Todo List

There is still a long way to go. Feel free to discuss with me and find a task that you like.

1. Update README to have better documentation.
2. Create github wiki pages for documentation and manuals.
3. Separate the generators into model generator, schema generator and resolver generator.
4. Open an issue or pull request, this is very welcome.

## License

MIT © [Zhang Kaiyu](https://github.com/zhangkaiyulw)


[npm-image]: https://badge.fury.io/js/generator-amur.svg
[npm-url]: https://npmjs.org/package/generator-amur
[travis-image]: https://travis-ci.org/zhangkaiyulw/generator-amur.svg?branch=master
[travis-url]: https://travis-ci.org/zhangkaiyulw/generator-amur
[daviddm-image]: https://david-dm.org/zhangkaiyulw/generator-amur.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/zhangkaiyulw/generator-amur
