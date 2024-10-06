> [!NOTE]
> ### Project status
> The project is in its early stages of development.
> Although some components are considered to be feature-complete, I'm planning on adding a lot of global features which will most certainly break most of the components.
>
> Use this library at your own risk!

---

<div align="center">
  <a href="https://github.com/deminearchiver/material-solid">
    <img src=".github/images/banner.svg" height="144">
  </a>
  <h3>Material Solid</h3>
  Material Components for SolidJS
  <br>
  <br>
  <p>
    <a href="https://material-solid.pages.dev">
      <b>Website</b>
    </a>
    ·
    <a href="https://github.com/deminearchiver/material-solid">
      <b>Repository</b>
    </a>
    ·
    <a href="https://github.com/deminearchiver/material-solid/issues">
      <b>Report a bug</b>
    </a>
    ·
    <a href="https://github.com/deminearchiver/material-solid/issues">
      <b>Request a feature</b>
    </a>
  </p>
</div>

---

<details>
<summary><h4>Table of contents<h4></summary>

- [About](#about)
  - [Why?](#why)
  - [Existing libraries](#existing-libraries)
  - [Regarding library choices](#regarding-library-choices)
- [Usage](#usage)
  - [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

</details>

## About

### Why?

There are a few problems with the official [**Material Web**](https://material-web.dev) library:

1. Using Web Components in JSX isn't comfortable enough
    > In order to use them properly you'd have to create TypeScript definitions, and often wrapper components

2. Web Components register global tag names.
    > I'm paranoid about global naming conflicts

3. The library isn't verbose enough.
    > The thing I don't like the most is the `md` prefix.

4. It lacks more complex components
    > I'm talking about the [Carousel](https://m3.material.io/components/carousel/overview), [Search](https://m3.material.io/components/search/overview), [Date pickers](https://m3.material.io/components/date-pickers/overview), [Time pickers](https://m3.material.io/components/time-pickers/overview), as well as newly redesigned components: [Sliders](https://m3.material.io/components/sliders/overview) and [Progress indicators](https://m3.material.io/components/progress-indicators/overview), and many more.

5. Recently MWC has been [**put into maintenance mode**](https://github.com/material-components/material-web/discussions/5642).
    > This is a big 🚩 *[red flag]* for anyone using MWC.

### Existing libraries

There are some really good attempts at implementing the new [**Material You**](https://m3.material.io) version of Material Design, but none are close to being complete:

- [<img src=".github/images/react.svg" height="12"> **Actify**](https://actifyjs.com)
  - most of the components aren't spec compliant (it's bigger of a deal than you think!)
- [<img src=".github/images/react.svg" height="12"> **Material Toys**](https://actifyjs.com):
  - a very good **Ripple** implementation, although usage of CSS filters raises some performance questions
  - certain components do not have animations ([Checkbox](https://www.material-toys.com/checkbox), [Radio Button](https://www.material-toys.com/radio-button))
  - some components aren't spec compliant ([Switch](https://www.material-toys.com/switch))

### Regarding library choices

> I have never used React since I started using Solid.

I chose SolidJS over React because the former is more performant, offers fine-grained reactivity, and has a better developer experience. SolidJS has amazing community-maintained tooling, such as [**Solid Primitives**](https://primitives.solidjs.community).

[**Vanilla Extract**](https://vanilla-extract.style) is used for styling because it brings awesome developer experience (although it has its own flaws). I'm planning to expand on styling and add support for custom *"style adapters"* in the distant future.


## Usage

### Installation

While `@material-solid/components` and `@material-solid/vanilla-extract` are required dependencies, `@material-solid/utils` is optional but contains many useful primitives related to SolidJS and Vanilla Extract, which may improve your developer experience.

<details>
  <summary>npm</summary>

  ```sh
  npm install @material-solid/components @material-solid/vanilla-extract @material-solid/utils
  ```
</details>
<details>
  <summary>pnpm</summary>

  ```sh
  pnpm install @material-solid/components @material-solid/vanilla-extract @material-solid/utils
  ```
</details>
<details>
  <summary>Yarn</summary>

  ```sh
  yarn add @material-solid/components @material-solid/vanilla-extract @material-solid/utils
  ```
</details>
<details>
  <summary>Bun</summary>

  ```sh
  bun add @material-solid/components @material-solid/vanilla-extract @material-solid/utils
  ```
</details>

## Contributing

Please refer to [**CONTRIBUTING.md**](CONTRIBUTING.md).

## License

This project is license under the [**MIT License**](LICENSE).
