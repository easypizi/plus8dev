block('page-clients').js()(true)


block('page-clients').content()(function() {

    let team = [
      { image: 'http://babeholder.pixoil.com/img/220/220', name: 'Такие вот шлюхи'},
      { image: 'http://babeholder.pixoil.com/img/220/220', name: 'Такие вот шлюхи'},
      { image: 'http://babeholder.pixoil.com/img/220/220', name: 'Такие вот шлюхи'},
      { image: 'http://babeholder.pixoil.com/img/220/220', name: 'Такие вот шлюхи'},
      { image: 'http://babeholder.pixoil.com/img/220/220', name: 'Такие вот шлюхи'},
      { image: 'http://babeholder.pixoil.com/img/220/220', name: 'Такие вот шлюхи'},
      { image: 'http://babeholder.pixoil.com/img/220/220', name: 'Такие вот шлюхи'},
      { image: 'http://babeholder.pixoil.com/img/220/220', name: 'Такие вот шлюхи'}
    ]

    return[
    {
      elem: 'inner',
      content: [
        {
          block: 'header',
          label: 'clients'
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
            content: 'clients'
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
                  elem: 'title',
                  mix: { block: 'font', mods: { family: 'bold' } },
                  content: item.name
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
            bottom: true
          }
        }
      ]
    }
    ]
});

