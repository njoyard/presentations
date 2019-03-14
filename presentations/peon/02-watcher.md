## The watcher era

Context: tooling machine inaccessible from outside

* Watch repositories
* Fetch at regular intervals
* Detect head changes and trigger builds

```json
{
  "watcher": {
    "enabled": true,
    "interval": 5000,
    "repositories": [
      { "url": "git@github.com:org/repo",
        "branches": ["master"] }
    ]
  }
}
```
