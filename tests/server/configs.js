lagConfig = {
  foo: 3500,
  bar: 1400
};

lagDefault = 1000;
foo = {
  "lagMethods": {
    "persist": false,
    "methods": {
      "methodName1": delay1,
      "methodName2": delay2,
    },
    "usePredefinedExcludes": true,
    "exclude": [
      'excludedMethod1',
      'excludedMethod2'
    ],
    "log": false
  }
};