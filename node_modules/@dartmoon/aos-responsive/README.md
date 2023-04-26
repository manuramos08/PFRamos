# AOS Responsive
Make [Animate On Scroll](https://michalsnik.github.io/aos/) responsive! With this module you can ovveride the attributes of AOS as you would do it in CSS.

This package use mobile first. This means that normal `data-aos-*` attributes are valid from mobile devices to larger once and you can ovveride them using breakpoints.

### Installation

```bash
yarn add @dartmoon/aos-responsive
```

or 

```bash
npm i @dartmoon/aos-responsive --save
```

### Usage
How to use it? Exactly like you would do with the standard AOS library!

```js
import AOS from '@dartmoon/aos-responsive'

AOS.init({
    // You AOS configs
})
```


### How to use it?
Simply put a breakpoint name before the attribute.

```html
<div data-aos="fade-up" data-md-aos="fade-right">...</div>
```

So now on mobile will get the beautiful `fade-up` animation, while starting from the `md` breakpoint you will have `fade-right`.

### Default breakpoints
Breakpoints have been inspired by [Tailwind CSS](https://tailwindcss.com/docs/breakpoints).

```js
'sm': '640px',
// => @media (min-width: 640px) { ... }

'md': '768px',
// => @media (min-width: 768px) { ... }

'lg': '1024px',
// => @media (min-width: 1024px) { ... }

'xl': '1280px',
// => @media (min-width: 1280px) { ... }

'2xl': '1536px',
// => @media (min-width: 1536px) { ... }
```

If you want you can even override them.

```js
import AOS from '@dartmoon/aos-responsive'

AOS.init({
    // ... your AOS configs

    breakpoints: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }

        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }

        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
    }
})
```

So now you can do something like this:

```html
<div data-aos="fade-up" data-tablet-aos="fade-right">...</div>
```

### Disable some attributes override
Maybe you don't want to override all attributes of AOS.

```js
import AOS from '@dartmoon/aos-responsive'

AOS.init({
    // ... your AOS configs

    attributes: [
        'aos'
    ]
})
```

Now, only `data-aos` will be checked against the breakpoint overrides.

Just to be clear:

```html
<!-- This will work -->
<div data-aos="fade-up" data-md-aos="fade-right">...</div>

<!-- This will NOT work -->
<div data-aos="fade-up" data-aos-duration="1200" data-md-aos-duration="900">...</div>
```