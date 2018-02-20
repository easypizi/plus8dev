block('page-index').js()(true)

block('page-index').content()(function() {
  return [
  {
    block: 'header'
  },
  {
    elem: 'content',
    content: [
    {
      block: 'screen',
      mix: { block: 'page-index', elem: 'topscreen' },
      mods: { fullscreen: true },
      content: [
        {
          block: 'section',
          mix: { block: 'page-index', elem: 'mainbox' },
          content: [
          {
            block: 'icon',
            mix: {
              block: 'icon', mods: { size: 'xl' }
            },
            mods: {
              symbol: 'logo'
            }
          },
          {
            block: 'font',
            mix: { block: 'page-index', elem: 'slogan' },
            mods: {
              family: 'bold'
            },
            content: { html: 'make service design '  + '<br>' + ' not war' },
          },
          ]
        },
        {
          block: 'wave',
          attrs: {
            id: 'canvas'
          }
        }
      ]
    },
    {
      elem: 'background',
      content: [
        {
          block: 'screen',
          mix: { block: 'page-index', elem: 'midscreen' },
          mods: { fullscreen: true },
          content: [
            {
              block: 'section',
              mix: { block: 'page-index', elem: 'mainbox' },
              content: [
              {
                block: 'font',
                mix: { block: 'page-index', elem: 'benefits' },
                mods: {
                  family: 'bold'
                },
                content: 'serviсe design can be even better',
              },
              {
                block: 'icon',
                mix: [
                  { block: 'icon', mods: { size: 'm' } },
                  { block: 'page-index', elem: 'cross' }
                ],
                mods: {
                  symbol: 'plus'
                }
              },
              {
                block: 'font',
                mix: { block: 'page-index', elem: 'benefits' },
                mods: {
                  family: 'bold'
                },
                content: [
                  'bring benefits for ',
                  {
                    block: 'text',
                    mix: { block: 'font', mods: { family: 'heavy' } },
                    content: 'everyone',
                  }
                ]
              }
              ]
            }
          ]
        },
        {
          block: 'screen',
          mix: { block: 'page-index', elem: 'bottomscreen' },
          mods: {
             fullscreen: true,
             movable: true
          },
          content: [
            {
              block: 'section',
              mods: { hide: true },
              mix: { block: 'page-index', elem: 'wrapper' },
              content: [
              {
                elem: 'quarter',
                content: [
                {
                  block: 'link',
                  js: { url: '/clients'  },
                  mix: [
                    { block: 'font', mods: { family: 'bold' } }
                  ],
                  url: '/clients',
                  content: 'Clients '
                },
                {
                  elem: 'holder',
                  content: [
                    {
                      block: 'circle'
                    },
                    {
                      block: 'circle',
                      mix: { block: 'link', elem: 'underline' }
                    }
                  ]
                }
                ]
              },
              {
                elem: 'quarter',
                content:[
                {
                  block: 'link',
                  js: { url: '/team'  },
                  mix: [
                    { block: 'font', mods: { family: 'bold' } }
                  ],
                  url: '/team',
                  content: 'Us '
                },
                {
                  elem: 'holder',
                  content: [
                    {
                      block: 'circle'
                    },
                    {
                      block: 'circle',
                      mix: { block: 'link', elem: 'underline' }
                    }
                  ]
                }
                ]
              },
              {
                elem: 'quarter',
                content:[
                {
                  block: 'link',
                  js: { url: '/portfolio'  },
                  mix: [
                    { block: 'font', mods: { family: 'bold' } }
                  ],
                  url: '/portfolio',
                  content: 'Users '
                },
                {
                  elem: 'holder',
                  content: [
                    {
                      block: 'circle'
                    },
                    {
                      block: 'circle',
                      mix: { block: 'link', elem: 'underline' }
                    }
                  ]
                }
                ]
              },
              {
                elem: 'quarter',
                content: {
                  block: 'link',
                  js: { url: '/book'  },
                  mix: [
                    { block: 'font', mods: { family: 'bold' } }
                  ],
                  url: '/book',
                  content: 'You '
                }
              }
              ]
            }
          ]
        }
      ]
    },
    {
      block: 'footer'
    }
    ]
  }
  ];
});
