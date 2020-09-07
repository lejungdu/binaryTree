let tree = {
  label: 'root',
  job: 'manager',
  nodes: [
    { 
      label: 'item2',
      job: 'group leader',
      nodes: [
        { 
          label: 'item2.1111',
          nodes: [
            { label: 'item2.222'},
            { label: 'empty'}
          ]
        },
        {
          label: 'item2.222222222222222',
          nodes: [
            { label: 'item2.3'},
            { label: 'item2.4'}
          ]
        }
      ]
    },
    { 
      label: 'item5',
      job: 'group leader', 
      nodes: [
        {
          label: 'item5.1',
          nodes: [
            { label: 'item5.11'},
            { label: 'item5.13',
              nodes: [
                {
                  label: 'random guy',
                  nodes: [
                    {
                      label: 'random guy #2'
                    }
                  ]
                },
                { label: 'empty' }
              ]
            }
          ]
        },
        { label: 'empty'}
      ]
    },
  ]
}

export default tree;