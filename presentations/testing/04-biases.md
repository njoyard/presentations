## Testing biases

* Data
* Coupling
* Expectations
* Coder biases


## Coder biases

You always write tests on your own code with biases towards your implementation.

Countermeasures:
* Tests written by a different person
* TDD


## Expectations/coupling biases

* Test outcome depends on an external component
  * Browser, network, other component
  * OS, graphics driver, ...
* **Do not** test what is not in the scope of your test
  * eg: `maxlength` restriction on an `<input>`
  * Replace expectations from other components with mocks

## Data biases
