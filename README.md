# vk-tools

vk-tools - this is a [Node.JS](https://nodejs.org/) tools package for [VK](https://vk.com/).

### [📚 Documentation](docs/)

## Install
```shell
npm i vk-tools
```

## Example usage
```js
const { VKTools } = require('vk-tools');

let vk = new VKTools(process.env.TOKEN);

vk.setStatus('Cool!');
```