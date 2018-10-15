# ACT-Sphero

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/wesselperik/ACT-Sphero/blob/master/LICENSE)
[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg)](https://gitmoji.carloscuesta.me)

This project was made to control [Sphero](https://www.sphero.com) app-enabled robotic balls using a browser instead of the default app. This project is made by [Thymo van Beers](https://github.com/Thymo-) and [Wessel Perik](https://github.com/wesselperik), members of the [Saxion](https://saxion.nl) HBO-ICT Promoteam (HIP).

## Prerequisites
Currently this project runs on two platforms: Linux and macOS.

### Linux
* NodeJS with npm
* BlueZ (with extra-tools for rfcomm utility)
* Kernel with CONFIG_BT_RFCOMM and CONFIG_BT_RFCOMM_TTY

### macOS
* None

## Build setup
``` bash
# clone the project
$ git clone https://github.com/wesselperik/ACT-Sphero

# install dependencies
$ npm install

# run according to your operating system
$ npm run linux
$ npm run mac
```

## License
[MIT](https://github.com/wesselperik/ACT-Sphero/blob/master/LICENSE)

## Copyright
&copy; 2018 Wessel Perik & Thymo van Beers
