## www

The main website tudien.io written in [janet](https://janet-lang.org).

### Install and run

Make sure to have `janet` and `jpm` installed.

- Run this to install `joy`, the web framework.

```sh
$ jpm install joy
```

Maybe we need to update PATH for `joy` to be available. In MacOS + fish terminal:

```sh
$ fish_add_path /usr/local/Cellar/janet/1.31.0/bin
```

- Then start the server:

```sh
$ joy server
```

### Deployment

There is one `fly.toml` and `Dockerfile` included to deploy the app to Fly.io.

```sh
$ fly deploy
```
