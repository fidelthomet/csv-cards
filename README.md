# csv-cards

creates a card deck from csv files

- [demo basic](https://csv-cards.vercel.app/#/?https://gist.githubusercontent.com/fidelthomet/17694c961ca3b53aaf9f12f6f5f774ac/raw/915778c28af511136ac6a13aa1fe09cecfa29545/cards-basic.csv)
- [demo advanced](https://csv-cards.vercel.app/#/?https://gist.githubusercontent.com/fidelthomet/17694c961ca3b53aaf9f12f6f5f774ac/raw/915778c28af511136ac6a13aa1fe09cecfa29545/cards-advanced.csv)

## Documentation

### Data

Provide CSV in this format:

```
[cat 1],[val 1],[val 2],[val 3],…
[cat 2],[val A],[val B],[val C],…
…
```

[example basic](https://gist.githubusercontent.com/fidelthomet/17694c961ca3b53aaf9f12f6f5f774ac/raw/915778c28af511136ac6a13aa1fe09cecfa29545/cards-basic.csv)

In the category field you can also provide a color (any [css color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) value will work) `@color(…)` and the number of cards `@num(…)` one draws from that category. 

```
[cat 1 @num(2) @color(#ff0000)],[val 1],[val 2],[val 3],…
[cat 2 @num(4) @color(blue)],[val A],[val B],[val C],…
```

[example advanced](https://gist.githubusercontent.com/fidelthomet/17694c961ca3b53aaf9f12f6f5f774ac/raw/915778c28af511136ac6a13aa1fe09cecfa29545/cards-advanced.csv)

### Usage

Upload your data (anywhere, as long as it supports CORS, [GitHub Gist](https://gist.github.com) works fine) and use it like `https://csv-cards.vercel.app/#/?[url-to-your-csv]` e.g. `https://csv-cards.vercel.app/#/?https://gist.githubusercontent.com/fidelthomet/17694c961ca3b53aaf9f12f6f5f774ac/raw/915778c28af511136ac6a13aa1fe09cecfa29545/cards-basic.csv`.

## Development

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
