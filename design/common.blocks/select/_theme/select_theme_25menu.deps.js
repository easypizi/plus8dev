[{
    mustDeps : [
        { block : 'button', mods : { theme : 'plus' } }
    ],
    shouldDeps : [
        { block : 'popup', mods : { theme : 'plus' } },
        { block : 'menu', mods : { theme : 'plus' } },
        { block : 'icon' }
    ]
},
{
    tech: 'js',
    mustDeps: [
      { tech : 'bemhtml', block : 'select', mods : { mode : ['radio', 'check', 'radio-check'], focused: true, }, elems: [ 'button', 'control', 'menu' ] },
    ]
}]
