block('page-portfolio').content()(function() {
    return[
    {
      elem: 'inner',
      content: [
        {
          block: 'header',
          label: 'portfolio'
        },
        {
          elem: 'content',
          content:[
          {
            block: 'section',
            mods: {
              midscreen : true
            },
            content: [
            {
              block: 'link',
              mix: {
                block: 'font',
                mods: {
                  family: 'bold'
                }
              },
              target: '_blank',
              url: '/',
              content: 'Dribbble'
            }
            ]
          },
          {
            block: 'section',
            mods: {
              midscreen : true
            },
            content: [
            {
              block: 'link',
              mix: {
                block: 'font',
                mods: {
                  family: 'bold'
                }
              },
              target: '_blank',
              url: '#',
              content: 'Behance'
            }
            ]
          }
          ]
        }
      ]
    }
    ]
});
