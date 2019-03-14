## In-repository configuration

```yaml
# .peon.yml

commands:
  - yarn
  - yarn build -prod

output: dist
```


## Restrict branches

```yaml
branches:
  - ^master$
  - ^feat/
```


## Specify environment

```yaml
environment:
  myvar: myvalue
  foo: $PEON_BUILD_ID/$PEON_BRANCH
```


## Cache build assets

```yaml
cache:
  - path: node_modules
    source: yarn.lock
```


## Coming soon...

```yaml
tags:
  - ^v\d+\.
```
