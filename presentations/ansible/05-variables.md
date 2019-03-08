## Variables

* Strings, numbers, booleans, lists, hashes
* Defined by ansible ("facts")
  * Devices (network, storage...), OS info...
* Defined in your files
  * Inventory, Playbook, Roles, Group/host var files...
* Passed on command-line
* Rules of precedence


## Inventory variables

```
target1 variable=value variable=value...
target2 ansible_host=123.45.67.89 ansible_ssh_port=2222

[group1:vars]
variable=value
variable=value
```


## Play variables

```yaml
- hosts: group1
  vars:
    variable: value
    ...
  tasks:
    - ...
```


## Play variable files

```yaml
- hosts: group1
  vars_files:
    - path/to/vars.yml
    - ...
  tasks:
    - ...
```


## Group/host var files

Can be scoped to an inventory or playbook

```
group_vars/all/vars1.yml
group_vars/all/vars2.yml
group_vars/group1/foo.yml
host_vars/target1.example.com/bar.yml
```


## Yaml variable files

```yaml
variable: value

hash:
  key: value
  key2:
    subkey: value
    inline_list: [1, 2, 3]
    yaml_list:
      - value1
      - 2
      - true
      - yes
  inline_hash: { a:1, b: "foo", c: false }
```


## Precedence

(incomplete list)

* role defaults
* inventory group variables
* group_vars files
* inventory host variables
* host_vars files
* play vars
* play vars_files
* task overrides
* command line extra vars (`-e var=value ...`)



## Jinja2 evaluation

```
var1: value
var2: "var1 = {{ var1 }}"
list:
  - a
  - b
joined: "{{ list | join(', ') }}"
joined2: "{% for item in list %}'{{ item }}'{% endfor %}"
```


## Load first, evaluate next

```
var2: "var1 = {{ var1 }}"
var1: value
```
