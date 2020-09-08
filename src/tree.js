let tree = {
  name: 'root',
  number: 12345,
  job: 'manager',
  nodes: [
    { 
      name: 'item2',
      number: 12345,
      job: 'group leader',
      nodes: [
        { 
          name: 'item2.1111',
          number: 12345,
          nodes: [
            { 
              name: 'item2.222',
              number: 12345,
              nodes: [
                {name: 'item2.5', number: 12345,},
                {name: 'item2.6', number: 12345,}
              ]
            },
            { name: 'empty'}
          ]
        },
        {
          name: 'item2.222',
          number: 12345,
          nodes: [
            { name: 'item2.3', number: 12345,},
            { name: 'item2.4', number: 12345,}
          ]
        }
      ]
    },
    { 
      name: 'item5',
      number: 12345,
      job: 'group leader', 
      nodes: [
        {
          name: 'item5.1',
          number: 12345,
          nodes: [
            { name: 'item5.11', number: 12345,},
            { name: 'item5.13', number: 12345,
              nodes: [
                {
                  name: 'random',
                  number: 12345,
                  nodes: [
                    {
                      name: 'random#2',
                      number: 12345,
                    }
                  ]
                },
                { name: 'empty' }
              ]
            }
          ]
        },
        { name: 'empty'}
      ]
    },
  ]
}

export default tree;