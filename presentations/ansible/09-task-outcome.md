## Task outcome

* Changed
* OK - nothing was needed
* Skipped
* Failed :(


## Read outcome using `register`

```yaml
- copy:
    ...
  register: copy_result

- service:
    name: nginx
    state: restarted
  when: copy_result.changed
```


## Override outcome

```yaml
# Command will never be "ok", unless...
- command: cat /etc/hosts
  changed_when: no
```
