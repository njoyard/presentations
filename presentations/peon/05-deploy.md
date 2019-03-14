## Deployment

### The "local-only" era

```json
{
  "publicDirectory": "/var/www/peon"
}
```

➟ `$publicDirectory/$repo/$branch`


## Remote Deployment

```json
"destinations": {
    "myremote": {
      "destination": "user@remote:/var/www/doc",
      "rootUrl": "/doc/",
      "absoluteUrl": "https://my.remote/doc/",
      "shell": "ssh -i /path/to/id_rsa"
    },
    "local": {
      "destination": "/var/www/peon",
      "rootUrl": "/peon/",
      "absoluteUrl": "https://my.host/peon/"
    }
},
```


## Remote Deployment

```yaml
# .peon.yml

destinations:
  - name: myremote
    branch: ^master$
  - name: local
```
