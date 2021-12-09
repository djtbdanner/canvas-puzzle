
const shapes = [
    // vertical bar
    [1, 1, 1, 1],
    [1, 1, 1, 0,
        1],
    [1, 1, 1, 0,
        0, 0, 1],
    [1, 1, 0, 0,
        1, 1],
    [1, 1, 0, 0,
        0, 1, 1],
    // square
    [0, 1, 1, 0,
        1, 1],
    // three and one pointing up _-_
    [0, 1, 0, 0,
        1, 1, 1],
    // one
    [1, 0, 0, 0,
        0, 0, 0],
    // vertical
    [1, 0, 0, 0,
        1, 0, 0, 0,
        1, 0, 0, 0,
        1, 0, 0, 0],
    // left vertical corner
    [1, 1, 0, 0,
        0, 1, 0, 0,
        0, 1, 0, 0,
        0, 0, 0, 0],
    // vertical
    [1, 1, 0, 0,
        1, 0, 0, 0,
        1, 0, 0, 0,
        0, 0, 0, 0],
    [1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1],
    // bucket
    [1, 0, 1, 0,
        1, 1, 1, 0,
        0, 0, 0, 0,
        0, 0, 0, 0],
    // three and one pointing down
    [1, 1, 1, 0,
        0, 1, 0],
    // three and one pointing right
    [1, 0, 0, 0,
        1, 1, 0, 0,
        1, 0, 0, 0,
        0, 0, 0, 0],
    // three and one pointing left
    [0, 1, 0, 0,
        1, 1, 0, 0,
        0, 1, , 0,
        0, 0, 0, 0],
    //two corner
    [1, 1, 0, 0,
        1, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0],
    //two corner
    [0, 1, 0, 0,
        1, 1, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0],
    [1, 0, 0, 0,
        1, 1, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0],
    [1, 1, 0, 0,
        1, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0],

];
const colors = [
    'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'
];


const board =
    [
        [{ filled: false, color: "Linen", border: "none", square: 1 }, {
            filled: false,
            color: "Linen",
            border: "none",
            square: 1
        }, { filled: false, color: "Linen", border: "none", square: 1 }, {
            filled: false,
            color: "white",
            border: "none",
            square: 2
        }, { filled: false, color: "whitesmoke", border: "none", square: 2 }, {
            filled: false,
            color: "white",
            border: "none",
            square: 2
        }, { filled: false, color: "Linen", "order": "none", square: 3 }, {
            filled: false,
            color: "Linen",
            border: "none",
            square: 3
        }, { filled: false, color: "Linen", border: "none", square: 3 }],
        [{ filled: false, color: "Linen", border: "none", square: 1 }, {
            filled: false,
            color: "Linen",
            border: "none",
            square: 1
        }, { filled: false, color: "Linen", border: "none", square: 1 }, {
            filled: false,
            color: "white",
            border: "none",
            square: 2
        }, { filled: false, color: "white", border: "none", square: 2 }, {
            filled: false,
            color: "white",
            border: "none",
            square: 2
        }, { filled: false, color: "Linen", "order": "none", square: 3 }, {
            filled: false,
            color: "Linen",
            border: "none",
            square: 3
        }, { filled: false, color: "Linen", border: "none", square: 3 }],
        [{ filled: false, color: "Linen", border: "none", square: 1 }, {
            filled: false,
            color: "Linen",
            border: "none",
            square: 1
        }, { filled: false, color: "Linen", border: "none", square: 1 }, {
            filled: false,
            color: "white",
            border: "none",
            square: 2
        }, { filled: false, color: "white", border: "none", square: 2 }, {
            filled: false,
            color: "white",
            border: "none",
            square: 2
        }, { filled: false, color: "Linen", "order": "none", square: 3 }, {
            filled: false,
            color: "Linen",
            border: "none",
            square: 3
        }, { filled: false, color: "Linen", border: "none", square: 3 }],

        [{ filled: false, color: "white", border: "none", square: 4 }, {
            filled: false,
            color: "white",
            border: "none",
            square: 4
        }, { filled: false, color: "white", border: "none", square: 4 }, {
            filled: false,
            color: "Linen",
            border: "none",
            square: 5
        }, { filled: false, color: "Linen", border: "none", square: 5 }, {
            filled: false,
            color: "Linen",
            border: "none",
            square: 5
        }, { filled: false, color: "white", "order": "none", square: 6 }, {
            filled: false,
            color: "white",
            border: "none",
            square: 6
        }, { filled: false, color: "white", border: "none", square: 6 }],
        [{ filled: false, color: "white", border: "none", square: 4 }, {
            filled: false,
            color: "white",
            border: "none",
            square: 4
        }, { filled: false, color: "white", border: "none", square: 4 }, {
            filled: false,
            color: "Linen",
            border: "none",
            square: 5
        }, { filled: false, color: "Linen", border: "none", square: 5 }, {
            filled: false,
            color: "Linen",
            border: "none",
            square: 5
        }, { filled: false, color: "white", "order": "none", square: 6 }, {
            filled: false,
            color: "white",
            border: "none",
            square: 6
        }, { filled: false, color: "white", border: "none", square: 6 }],
        [{ filled: false, color: "white", border: "none", square: 4 }, {
            filled: false,
            color: "white",
            border: "none",
            square: 4
        }, { filled: false, color: "white", border: "none", square: 4 }, {
            filled: false,
            color: "Linen",
            border: "none",
            square: 5
        }, { filled: false, color: "Linen", border: "none", square: 5 }, {
            filled: false,
            color: "Linen",
            border: "none",
            square: 5
        }, { filled: false, color: "white", "order": "none", square: 6 }, {
            filled: false,
            color: "white",
            border: "none",
            square: 6
        }, { filled: false, color: "white", border: "none", square: 6 }],

        [{ filled: false, color: "Linen", border: "none", square: 7 }, {
            filled: false,
            color: "Linen",
            border: "none",
            square: 7
        }, { filled: false, color: "Linen", border: "none", square: 7 }, {
            filled: false,
            color: "white",
            border: "none",
            square: 8
        }, { filled: false, color: "white", border: "none", square: 8 }, {
            filled: false,
            color: "white",
            border: "none",
            square: 8
        }, { filled: false, color: "Linen", "order": "none", square: 9 }, {
            filled: false,
            color: "Linen",
            border: "none",
            square: 9
        }, { filled: false, color: "Linen", border: "none", square: 9 }],
        [{ filled: false, color: "Linen", border: "none", square: 7 }, {
            filled: false,
            color: "Linen",
            border: "none",
            square: 7
        }, { filled: false, color: "Linen", border: "none", square: 7 }, {
            filled: false,
            color: "white",
            border: "none",
            square: 8
        }, { filled: false, color: "white", border: "none", square: 8 }, {
            filled: false,
            color: "white",
            border: "none",
            square: 8
        }, { filled: false, color: "Linen", "order": "none", square: 9 }, {
            filled: false,
            color: "Linen",
            border: "none",
            square: 9
        }, { filled: false, color: "Linen", border: "none", square: 9 }],
        [{ filled: false, color: "Linen", border: "none", square: 7 }, {
            filled: false,
            color: "Linen",
            border: "none",
            square: 7
        }, { filled: false, color: "Linen", border: "none", square: 7 }, {
            filled: false,
            color: "white",
            border: "none",
            square: 8
        }, { filled: false, color: "white", border: "none", square: 8 }, {
            filled: false,
            color: "white",
            border: "none",
            square: 8
        }, { filled: false, color: "Linen", "order": "none", square: 9 }, {
            filled: false,
            color: "Linen",
            border: "none",
            square: 9
        }, { filled: false, color: "Linen", border: "none", square: 9 }]
    ]

    ;