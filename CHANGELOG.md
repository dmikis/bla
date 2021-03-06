### 0.0.13
  * Change handling errors. If you throw ApiError in methods, you should return ```vow.reject``` instead. (**breaks backward compatibility**)
  * Add tests for examples.
  * Improve batch speed (using next tick for modern browsers).

### 0.0.12
  * Build on `npm prepublish`

### 0.0.11
  * Change package name: ```baby-loris-api``` -> ```bla```  (**breaks backward compatibility**).

### 0.0.10
  * Find api methods synchronously.

### 0.0.9
  * Delete using express session for search parameter value (**breaks backward compatibility**).
  * Fix bug when the batch method does not proxy request to submethods.

### 0.0.8
  * Add a possibility to pass an Api instance to the middleware. [#22](../../issues/22)
  * Proxy express request to a method. [#20](../../issues/20)
  * Export namespace instead of paths on file system.

### 0.0.7
  * Add ```setOption``` method. [#9](../../issues/9) (**breaks backward compatibility**)
  * Add batch support for the client side. [#10](../../issues/10)
  * Add more examples. [#6](../../issues/6), [#11](../../issues/11)
  * Add a special example for enb project. [#12](../../issues/12)
  * Add a contribution guide. [#18](../../issues/18)
  * Add AMD support and global for the client (remove ym dependency). [#16](../../issues/16)
  * Build baby-loris-api.min.js for each npm release. [#15](../../issues/15)
  * Remove jquery and inherit dependecies for the client. [#13](../../issues/13), [#14](../../issues/14)
  * Fix coverage calculating.

### 0.0.6
  * Add Features part and link to the [demo project](https://github.com/tarmolov/weatherpic).
  * Use json for body in post requests (**breaks backward compatibility**).
  * Fix a couple of issues: [#5](../../issues/5), [#7](../../issues/7)

### 0.0.5
  * Add ym to peerDependencies.
  * Strict a node engine. Works properly only with node >= 0.10.x.

### 0.0.4
  * Fix misprint in peerDependencies.

### 0.0.3
  * Add ```Array``` type.
  * Fix bugs: [#1](../../issues/1), [#2](../../issues/2), [#3](../../issues/3), [#4](../../issues/4).

### 0.0.2
  * Add the licence (MIT).
  * Add a test coverage.
  * Middleware looks up params in ```req.session```, too. See [express-session](https://github.com/expressjs/session) for more details.

### 0.0.1
  * Add the server side implementation (Api class, ApiMethod class, ApiError class).
  * Add the express middleware (provide access from the frontend side and can generate documentation for all api methods).
  * Add the frontend side implementation (Api class, ApiError class).
  * Add examples for each major cases.
  * Add tests and validation for the server side, for the frontend side, and for the middleware.
  * Add documentation.
