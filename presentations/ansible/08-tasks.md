## Conditional tasks

```yaml
- service:
    name: nginx
    state: restarted
  when: do_restart_nginx == 'yes, please'
```


## Loops

With lists

```yaml
- service:
    name: "{{ item.name }}"
    state: "{{ item.restart | ternary('restarted', 'started') }}"
  with_items:
    - name: nginx
      restart: yes
    - docker:
      restart: no
# also: with_items: "{{ mylistofitems }}"
```


## Loops

With dicts/hashes

```yaml
- service:
    name: "{{ item.key }}"
    state: "{{ item.value }}"
  with_dict:
    nginx: restarted
    docker: started
```


## Loops, non-deprecated ;)

And with a lot more `loop_control`

```yaml
- service:
    name: "{{ what.name }}"
    state: "{{ what.restart | ternary('restarted', 'started') }}"
  loop:
    - name: nginx
      restart: yes
    - docker:
      restart: no
  loop_control:
    loop_var: what
```


## Get output of a task

Use `register` to store the return values from a module.

```yaml
- command: cat /etc/hosts
  register: cat_etc_hosts

- debug:
    msg: "/etc/hosts contains {{ cat_etc_hosts.stdout }}"
```
