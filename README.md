# `marko-bind`

[Marko](https://markojs.com) custom attribute to bind an input value and events to its component state.

## Overview

Since Marko doesn't come with anything out-of-the-box, this marko plugin provides an easy way to do so. For the discussion about the feature see [github.com/marko-js/marko/issues/676](https://github.com/marko-js/marko/issues/676).

## Usage

### Install

You only need to add it to your project, Marko is smart enough to find it automatically when you use it in components.

```shell
npm install marko-bind
# OR
yarn add marko-bind
```

### Use in components

Set the component state then use the `bind` directive as an attribute on your input element, e.g.:

```marko
class {
  onCreate() {
    this.state = {
      uname: '',
    };
  }
}

<input bind('uname') type="text" name="username"/>
```

## Considerations

This plugin works at runtime so there's an additional module included in your JS bundle. There are likely to be opportunities for compile-time optimisations.

Currently, this plugin is only tested using lasso as the JS bundler although it's likely to work with any bundler (e.g. webpack or rollup).

## Licence

`marko-bind` is an Apache-2.0 licensed open source project. See [LICENCE](https://github.com/WeAreGenki/ui/blob/master/LICENCE).

-----

© 2018 [We Are Genki](https://wearegenki.com)
