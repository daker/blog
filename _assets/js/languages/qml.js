/**
 * QML Language
 *
 * @author Adnane Belmadiaf
 * @version 1.0
 */
Rainbow.extend('qml', [

    /**
     * matches $. or $(
     */
    {
        'name': 'selector',
        'pattern': /(\s|^)\$(?=\.|\()/g
    },
    {
        'name': 'support',
        'pattern': /\b(window|document)\b/g
    },
    {
        'matches': {
            1: 'support.property'
        },
        'pattern': /\.(length|node(Name|Value))\b/g
    },
    {
        'matches': {
            1: 'support.function'
        },
        'pattern': /(setTimeout|setInterval)(?=\()/g

    },
    {
        'matches': {
            1: 'support.method'
        },
        'pattern': /\.(getAttribute|push|getElementById|getElementsByClassName|log)(?=\()/g
    },
    {
        'name': 'string.regexp',
        'matches': {
            1: 'string.regexp.open',
            2: {
                'name': 'constant.regexp.escape',
                'pattern': /\\(.){1}/g
            },
            3: 'string.regexp.close',
            4: 'string.regexp.modifier'
        },
        'pattern': /(\/)(?!\*)(.+)(\/)([igm]{0,3})/g
    },

    /**
     * matches runtime function declarations
     */
    {
        'matches': {
            1: 'storage',
            3: 'entity.function'
        },
        'pattern': /(var)?(\s|^)(\S*)(?=\s?=\s?function\()/g
    },

    {
        'matches': {
            1: 'keyword',
        },
        'pattern': /\b(b(oolean|yte|reak)|c(atch|har|ase|onst|ontinue)|d(efault|efer)|else|f(inally|or)|goto|if|import|property|return|s(ignal|witch)|t(hrow|ry|ype)|var)(?=\(|\b)/gi
    },

    /**
     * matches any function call in the style functionName: function()
     */
    {
        'name': 'entity.function',
        'pattern': /(\w+)(?=:\s{0,}function)/g
    },

    {
        'name': 'comment',
        'pattern': /\/\*[\s\S]*?\*\/|(\/\/)[\s\S]*?$/gm
    },
    {
        'name': 'constant.numeric',
        'pattern': /\b(\d+(\.\d+)?(e(\+|\-)?\d+)?(f|d)?|0x[\da-f]+)\b/gi
    },
    {
        'name': 'constant.language',
        'pattern': /true|false|null|string|rune|u?int(8|16|32|64)?|float(32|64)|complex(64|128)/g
    },
    {
        'name': 'keyword.operator',
        'pattern': /\+|\!|\-|&(gt|lt|amp);|\||\*|\:?=/g
    },
]);
