function randomNumberColor(){ // random number for selecting color
  return Math.floor(Math.random()*4)
}

const color = [
  "#f7da88", // Yellow 仕入ない
  "#FFD1D1", // pink 新規登録あり
  "#CDCBFF", // blue 仕入あり
  "#E6E6E6", // gray 退会・クーリングオフ
]

function randomNumberImg(){ // random number for selecting badge
  return Math.floor(Math.random()*6)
}

const img = [
  "gfc", // Group Leader FC 正規本部
  "lfc", // Leader FC 正規本部
  "mfc", // Manager FC 正規本部
  "sfc", // Sub Manager FC 正規本部
  "正規本部", // 正規本部
  "準本部", // 準本部
]

function randomNumber0_99(){ // randon number for 会員番号
  return Math.floor(Math.random()*100)
}

let tree = {
  name: 'root',
  number: randomNumber0_99(),
  bgcolor: color[randomNumberColor()],
  title: require(`@/assets/diamond_${img[randomNumberImg()]}.svg`),
  nodes: [
    { 
      name: 'New York',
      number: randomNumber0_99(),
      bgcolor: color[randomNumberColor()],
      title: require(`@/assets/diamond_${img[randomNumberImg()]}.svg`),
      nodes: [
        { 
          name: 'Hanoi',
          number: randomNumber0_99(),
          bgcolor: color[randomNumberColor()],
          title: require(`@/assets/diamond_${img[randomNumberImg()]}.svg`),
          nodes: [
            { 
              name: 'Seoul',
              number: randomNumber0_99(),
              bgcolor: color[randomNumberColor()],
              title: require(`@/assets/diamond_${img[randomNumberImg()]}.svg`),
              nodes: [
                {
                  name: 'Shanghai', number: randomNumber0_99(), 
                  bgcolor: color[randomNumberColor()], 
                  title: require(`@/assets/diamond_${img[randomNumberImg()]}.svg`),
                },
                { 
                  name: 'Taipei', 
                  number: randomNumber0_99(), 
                  bgcolor: color[randomNumberColor()], 
                  title: require(`@/assets/diamond_${img[randomNumberImg()]}.svg`),}
              ]
            },
            { name: 'empty'}
          ]
        },
        {
          name: 'Tokyo',
          number: randomNumber0_99(),
          bgcolor: color[randomNumberColor()],
          title: require(`@/assets/diamond_${img[randomNumberImg()]}.svg`),
          nodes: [
            { 
              name: 'Osaka', 
              number: randomNumber0_99(), 
              bgcolor: color[randomNumberColor()], 
              title: require(`@/assets/diamond_${img[randomNumberImg()]}.svg`),
            },
            { 
              name: 'London', 
              number: randomNumber0_99(), 
              bgcolor: color[randomNumberColor()], 
              title: require(`@/assets/diamond_${img[randomNumberImg()]}.svg`),
            }
          ]
        }
      ]
    },
    { 
      name: 'Busan',
      number: randomNumber0_99(),
      bgcolor: color[randomNumberColor()],
      title: require(`@/assets/diamond_${img[randomNumberImg()]}.svg`),
      nodes: [
        {
          name: 'L.A.',
          number: randomNumber0_99(),
          bgcolor: color[randomNumberColor()],
          title: require(`@/assets/diamond_${img[randomNumberImg()]}.svg`),
          nodes: [
            { 
              name: 'Vancouver', 
              number: randomNumber0_99(), 
              bgcolor: color[randomNumberColor()], 
              title: require(`@/assets/diamond_${img[randomNumberImg()]}.svg`),
            },
            { name: 'Paris', 
              number: randomNumber0_99(),
              bgcolor: color[randomNumberColor()],
              title: require(`@/assets/diamond_${img[randomNumberImg()]}.svg`),
              nodes: [
                {
                  name: 'Berlin',
                  number: randomNumber0_99(),
                  bgcolor: color[randomNumberColor()],
                  title: require(`@/assets/diamond_${img[randomNumberImg()]}.svg`),
                  nodes: [
                    {
                      name: 'Moscow',
                      number: randomNumber0_99(),
                      bgcolor: color[randomNumberColor()],
                      title: require(`@/assets/diamond_${img[randomNumberImg()]}.svg`),
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