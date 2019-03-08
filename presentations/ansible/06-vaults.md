## Vaults

_... ssssseeeecreeeeetsssss ..._

* Password-encrypted variable files
* AES256-ciphered Yaml files
* Production secrets \o/


## Creation

```
$ ansible-vault create myvault.yml
New Vault password:
Confirm Vault password:

...

$ cat myvault.yml
$ANSIBLE_VAULT;1.1;AES256
33383365343338656566633864386132323333633634643934326639646362306
3066326662326434626233626565323932306138316461380a333162306566396
...
```


## Edition

```
$ ansible-vault edit myvault.yml
Vault password:

...

$ cat myvault.yml
$ANSIBLE_VAULT;1.1;AES256
33383365343338656566633864386132323333633634643934326639646362306
3066326662326434626233626565323932306138316461380a333162306566396
...
```


## Encrypt/Decrypt

```
$ ansible-vault decrypt myvault.yml
Vault password:

$ cat myvault.yml
var1: value
var2:
  key: value

$ ansible-vault encrypt myvault.yml
New Vault password:
Confirm Vault password:

$ cat myvault.yml
$ANSIBLE_VAULT;1.1;AES256
33383365343338656566633864386132323333633634643934326639646362306
```


## Password file

```
$ echo "mysupersecret" > passwordfile
$ ansible-vault encrypt --vault-id passwordfile foo.yml
$ ansible-vault decrypt --vault-id passwordfile foo.yml
```

Meh...


## Password file, but better

```
$ echo "mysecret" \
  gpg2 --allow-weak-digest-algos --armor --trust-model=always \
  --output password.gpg --encrypt --recipient DE30F19077DFD9BB
```

```
#!/bin/bash
gpg -d "password.gpg" 2> /dev/null
```

```
$ chmod +x decrypt.sh                    # /!\ /!\ /!\
$ ansible-vault edit --vault-id decrypt.sh foo.yml
```

\o/
