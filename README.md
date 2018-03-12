<!-- markdownlint-disable first-line-h1 -->

[![NPM version](https://img.shields.io/npm/v/@wearegenki/marko-bind.svg)](https://www.npmjs.com/package/@wearegenki/marko-bind)
[![Build status](https://img.shields.io/travis/WeAreGenki/marko-bind.svg)](https://travis-ci.org/WeAreGenki/marko-bind)
[![Coverage status](https://img.shields.io/codecov/c/github/WeAreGenki/marko-bind.svg)](https://codecov.io/gh/WeAreGenki/marko-bind)
[![Vulnerability status](https://snyk.io/test/github/WeAreGenki/marko-bind/badge.svg)](https://snyk.io/test/github/WeAreGenki/marko-bind)
[![Licence](https://img.shields.io/npm/l/@wearegenki/marko-bind.svg)](https://github.com/WeAreGenki/marko-bind/blob/master/LICENCE)

# `marko-bind`

Easy reactive data binding for [MarkoJS](https://markojs.com).

Provides a custom `bind()` directive which binds an input's value and events to a marko component state.

## Overview

Simply use the `bind()` directive on any form input, select, or textarea element for quick and easy reactive data binding. You don't need to worry about any special or edge cases as it's all handled internally. No more need to repeatedly set up finicky custom event bindings, just focus on being productive!

This package tries to do as much as possible during compile time resulting in little overhead via a very small runtime module.

Since Marko doesn't come with anything out-of-the-box, this marko package provides an easy way to do so. For the discussion about the feature see [github.com/marko-js/marko/issues/676](https://github.com/marko-js/marko/issues/676).

The tag handling logic was very much inspired by [Vue.js's `v-model` directive](https://github.com/vuejs/vue/blob/master/src/platforms/web/compiler/directives/model.js).

> NOTE: The tag and edge case handling is currently a work in progress. Most input tags already work great out of the box though!

## Usage

### Install

You only need to add it to your project, Marko is smart enough to find the tag automatically when you use it in components.

```shell
npm install marko-bind
# OR
yarn add marko-bind
```

### Use in components

Set the component state then use the `bind()` directive as an attribute on your input element. Example:

```marko
class {
  onCreate() {
    this.state = {
      userName: '',
    };
  }
}

<input bind('userName') type="text" name="username"/>
```

For the attribute value you can use whatever makes sense to your application. String values will resolve automatically to your component state. You can also pass in the state object directly:

```marko
<input bind(state.userName) type="text" name="username"/>
```

**WARNING: Dynamic expressions are not implemented yet. PRs welcome.**

~~It's also possible to use a dynamic JavaScript expression or reference a component method. This can also return either a string or the state object.~~

> NOTE: When the attribute value is evaluated at runtime we need to include an additional runtime module to handle setup once we know which event and state to bind to.

Example:

```marko
class {
  onCreate() {
    this.state = {
      userName: '',
    };
  }

  someMethod() {
    return this.state.userName;
  }
}

<input bind(someMethod) type="text" name="username"/>
```

## Licence

`marko-bind` is an Apache-2.0 licensed open source project. See [LICENCE](https://github.com/WeAreGenki/ui/blob/master/LICENCE).

-----

© 2018 [We Are Genki](https://wearegenki.com)
