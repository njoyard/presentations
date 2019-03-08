## Play

{ targets } * { tasks}

```yaml
hosts: mygroup
tasks:
  - ...
  - ...
```


## Playbook

List of plays

```yaml
- hosts:
    - host1
    - host2
  tasks:
    - ...

- hosts: group1
  tasks:
    - ...
```
