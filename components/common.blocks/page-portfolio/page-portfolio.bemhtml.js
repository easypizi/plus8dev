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
            },
            {
              block: 'image',
              url: 'http://babeholder.pixoil.com/img/257/'
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
            },
            {
              block: 'image',
              url: 'http://babeholder.pixoil.com/img/257/'
            }
            ]
          }
          ]
        }
      ]
    }
    ]
});
