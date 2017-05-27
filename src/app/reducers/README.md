# Reducers

## Global State
```js
{
  sketch: {
    activeComponent,
    dragging,
    focusComponent,
    focusType,
    mouseIn,
  },
  device: {
    name,
  },
  schema: {
    result:
    entities: {
      components: {
        
      },
    }
  },
}
```

## State.scheme
```
[
  {
    id: 'id0',
    component: 'root',
    children: [
      {
        id: 'id1',
        component: 'componentA',
        props: {
          c: 3,
          d: 4,
        },
        children: [
          {
            id: 'id11',
            component: 'componentB',
            props: {
              c: 33,
              d: 43,
            },
          },
        ],
      },
      {
        id: 'id2',
        component: 'componentB',
        props: {
          c: 3,
          d: 4,
        },
        children: [
          {
            id: 'id21',
            component: 'componentA',
            props: {
              c: 4,
              d: 5,
            },
            children: [
              {
                id: 'id211',
                component: 'componentB',
                props: {
                  c: 31,
                  d: 41,
                },
              },
              {
                id: 'id21',
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
]
```
