let tree = {
  name: 'root',
  number: 12345,
  job: 'manager',
  nodes: [
    { 
      name: 'New York',
      number: 12345,
      job: 'group leader',
      nodes: [
        { 
          name: 'Hanoi',
          number: 12345,
          nodes: [
            { 
              name: 'Seoul',
              number: 12345,
              nodes: [
                {name: 'Shanghai', number: 12345,},
                {name: 'Taipei', number: 12345,}
              ]
            },
            { name: 'empty'}
          ]
        },
        {
          name: 'Tokyo',
          number: 12345,
          nodes: [
            { name: 'Takamatsu', number: 12345,},
            { name: 'Jordan', number: 12345,}
          ]
        }
      ]
    },
    { 
      name: 'Kim',
      number: 12345,
      job: 'group leader', 
      nodes: [
        {
          name: 'Smith',
          number: 12345,
          nodes: [
            { name: 'Suzuki', number: 12345,},
            { name: 'Tanaka', number: 12345,
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