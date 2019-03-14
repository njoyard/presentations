## When to test?

* Scheduled testing (daily, weekly)
  * Functional, performance, scaling, monkey

    ➟ dedicated tools & platforms

* Review-testing (on merges)
  * Acceptance, integration, unit
  * Deployment, migration

* Before/during coding (TDD)


## Review testing

* Should be automated
  * webhooks, triggers
  * CircleCI, Jenkins, Travis...
* Proof that requirements are met
* Opportunity to think and discuss the implementation
  * Missing test cases
  * Future evolutions


## Test-driven development

> A test that passes is a useless test

* Write requirements as (failing) tests before coding
* Implement by fixing tests
* Also useful when bugfixing:
  1. Write a failing test that reproduces the bug
  2. Fix it
