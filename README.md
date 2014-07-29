# Dapper Presentation Framework

Dapper is an HTML presentation framework implemented using Web Components. It
is opinionated and built on the following principles:

1. **Performant.** Dapper is designed to display and execute smoothly at 60fps
   in modern browsers.
2. **Opinionated.** Dapper favors convention over configuration and makes as
   many as many decisions as possible autonomous. You can tweak things if you
   want, but we aim to give you a fantastic default experience.
3. **Animated.** Motion has become a vital part of user experience and the same
   can be said for presentations. Dapper considers animation to be a core
   competency and goes beyond simple slide transitions.
4. **Mobile Friendly.** Dapper presentations are designed to display well on
   mobile devices in landscape mode, as well as be easily navigable on same.
5. **Tool Friendly.** Because Dapper uses semantic attributes for configuration,
   it is extremely easy to hook into generation tools.
6. **Themeable.** Customize the look and feel of a presentation with just a few
   settings or dig in deep with custom CSS.

## Installation

Dapper is designed to be installed using Bower. To install it into your project:

```
bower install --save divshot/dapper
```

## Usage

```html
<!doctype html>
<html>
  <head>
    <script src="bower_components/platform/platform.js"></script>
    <link rel="import" href="bower_components/dapper/dapper.js">
  </head>
  <body>
    <dapper-deck>
      <dapper-slide>
        <h1>This is a Slide</h1>
        <h2>Isn't That Neat?</h2>
      </dapper-slide>
    </dapper-deck>
  </body>
</html>
```

## Acknowledgements

While Dapper has been written from the ground up for its own needs, much credit
and thanks goes to Hakim El Hattab and the excellent [Reveal.js](https://github.com/hakimel/reveal.js).
Some tricks were learned and lifted directly from its source.