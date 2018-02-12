block('page-team').content()(function() {

    let team = [
      { image: 'http://babeholder.pixoil.com/img/220/220', name: 'Andrey Alikimovich', position: 'CEO, Art-director'},
      { image: 'http://babeholder.pixoil.com/img/220/220', name: 'Vova Krasilnikov',   position: 'UX/UI Designer, motion designer' },
      { image: 'http://babeholder.pixoil.com/img/220/220', name: 'Olesya', position: 'CEO, Art-director'},
      { image: 'http://babeholder.pixoil.com/img/220/220', name: 'Darya Sobinova', position: 'UX/UI Designer, motion designer'}
    ]

    return[
    {
      elem: 'inner',
      content: [
        {
          block: 'header',
          label: 'our team'
        },
        {
          elem: 'content',
          content: [
          {
            elem: 'title',
            mix: { block: 'font', mods: { family: 'bold' } },
            mods: {
              mobile: true
            },
            content: 'our team'
          },
          {
            block: 'paragraph',
            mix: { block: 'font', mods: { family: 'bold' } },
            content: 'The monkey-rope is found in all whalers; but it was only in the Pequod that the monkey and his holder were ever tied together. This improvement upon the original usage was introduced by no less a man than Stubb, in order to afford the impe.'
          },
          {
            block: 'slider',
            content: team.map( item => {
              return {
                elem: 'item',
                content: [
                {
                  block: 'image',
                  url: item.image
                },
                {
                  elem: 'name',
                  mix: { block: 'font', mods: { family: 'bold' } },
                  content: item.name
                },
                {
                  elem: 'position',
                  content: item.position
                }
                ]
              }
            })
          }
          ]
        },
        {
          block: 'wave',
          mods: {
            hidden: true,
            side: true
          }
        }
      ]
    }
    ]
});
