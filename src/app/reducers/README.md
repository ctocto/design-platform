# Reducers

## Global State
```js
{
  canvasDimension: {
    width,
    height,
    left,
    top,
    right,
    bottom,
  },
  currentPicker,
  pickerPosition,
  schema,
}
```

## State.scheme
```
{
  app: {
    component: 'root',
    children: [
      {
        component: 'componentA',
        props: {
          c: 3,
          d: 4,
        },
        children: [
          {
            component: 'componentB',
            props: {
              c: 33,
              d: 43,
            },
          },
        ],
      },
      {
        component: 'componentB',
        props: {
          c: 3,
          d: 4,
        },
        children: [
          {
            component: 'componentA',
            props: {
              c: 4,
              d: 5,
            },
            children: [
              {
                component: 'componentB',
                props: {
                  c: 31,
                  d: 41,
                },
              },
              {
                component: 'componentC',
                props: {
                  c: 32,
                  d: 42,
                },
              },
            ],
          },
        ],
      },
    ],
    props: {
      a: 1,
      b: 2,
    },
  }
}
```
