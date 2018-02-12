block('page-book').js()(true)

block('page-book').content()(function() {

    return[
    {
      elem: 'inner',
      content: [
        {
          block: 'header',
          label: 'us'
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
            content: 'us'
          },
          {
            block: 'paragraph',
            mix: { block: 'font', mods: { family: 'bold' } },
            content: 'we always take care about our products, so we are proud of presenting you our interactive design book'
          },
          {
            block: 'card',
            content: [
            {
              block: 'title',
              mix: { block: 'font', mods: { family: 'heavy' } },
              content: 'design book'
            },
            {
              block: 'text',
              mix: { block: 'font', mods: { family: 'bold' } },
              content: 'An interactive online book about designing in sketch, figma and other UI/UX tools and principles'
            },
            {
              block: 'button',
              mods: {
                type: 'link'
              },
              url: '#',
              text: 'check out'
            }
            ]
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
