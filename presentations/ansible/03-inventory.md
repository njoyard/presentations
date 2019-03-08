## Inventories

List target machines

```
mytarget1
mytarget2.example.com
mytarget3 ansible_host=123.45.67.89
```



## Inventories

Groups (implicit group `all`)

```
[group1]
mytarget1
mytarget2.example.com

[group2]
mytarget3 ansible_host=123.45.67.89
```



## Inventories

Also in yaml

```yaml
all:
  group1:
    mytarget1:
    mytarget2.example.com:

  group2:
    mytarget3.example.com:
      ansible_host: 123.45.67.89
```



## More

* Hostname expansion (`db-[1-9].example.com`)
* Groups of groups
* Host variables
* Group variables
* ... RTFM
