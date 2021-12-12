
const shapes = [
    // horizontal bar 4
    [1, 1, 1, 1],
    // vertical bar 4
    [1, 0, 0, 0,
        1, 0, 0, 0,
        1, 0, 0, 0,
        1, 0, 0, 0],
    // horizontal 3
    [1, 1, 1, 0],
    // vertical 3
    [1, 0, 0, 0,
        1, 0, 0, 0,
        1, 0, 0, 0,
        0, 0, 0, 0],

    // three and ones _-_
    [0, 1, 0, 0,
        1, 1, 1],
    [1, 1, 1, 0,
        0, 1, 0, 0],
    [1, 0, 0, 0,
        1, 1, 0, 0,
        1, 0, 0, 0],
    [0, 1, 0, 0,
        1, 1, 0, 0,
        0, 1, 0, 0],

    // L shapes 3/2
    [1, 0, 0, 0,
        1, 0, 0, 0,
        1, 1, 0, 0],
    [0, 1, 0, 0,
        0, 1, 0, 0,
        1, 1, 0, 0],
    [1, 1, 0, 0,
        1, 0, 0, 0,
        1, 0, 0, 0],
    [1, 1, 0, 0,
        0, 1, 0, 0,
        0, 1, 0, 0],
    [1, 1, 1, 0,
        1, 0, 0, 0,
        0, 0, 0, 0],
    [1, 1, 1, 0,
        0, 0, 1, 0,
        0, 0, 0, 0],
    [1, 0, 0, 0,
        1, 1, 1, 0,
        0, 0, 0, 0],
    [0, 0, 1, 0,
        1, 1, 1, 0,
        0, 0, 0, 0],

    // two corners
    [1, 1, 0, 0,
        1, 0, 0, 0,
        0, 0, 0, 0],
    [1, 1, 0, 0,
        0, 1, 0, 0,
        0, 0, 0, 0],
    [1, 0, 0, 0,
        1, 1, 0, 0,
        0, 0, 0, 0],
    [0, 1, 0, 0,
        1, 1, 0, 0,
        0, 0, 0, 0],

    // // z shapes
    [1, 1, 0, 0,
        0, 1, 1, 0],
    [0, 1, 1, 0,
        1, 1, 0, 0],
    [1, 0, 0, 0,
        1, 1, 0, 0,
        0, 1, 0, 0,
        0, 0, 0, 0],
    [0, 1, 0, 0,
        1, 1, 0, 0,
        1, 0, 0, 0,
        0, 0, 0, 0],

    // // square
    [1, 1, 0, 0,
        1, 1],

    // buckets
    [1, 0, 1, 0,
        1, 1, 1, 0,
        0, 0, 0, 0,
        0, 0, 0, 0],
    [1, 1, 1, 0,
        1, 0, 1, 0,
        0, 0, 0, 0,
        0, 0, 0, 0],
    [1, 1, 0, 0,
        1, 0, 0, 0,
        1, 1, 0, 0,
        0, 0, 0, 0],
    [1, 1, 0, 0,
        0, 1, 0, 0,
        1, 1, 0, 0,
        0, 0, 0, 0],

    // oneszies twozies
    [1, 0, 0, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 0,
        1, 0, 0, 0],

    //diagonal messes
    [1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0],
    [0, 0, 1, 0,
        0, 1, 0, 0,
        1, 0, 0, 0],
    // [1, 0, 1, 0,
    //     0, 1, 0, 0,
    //     1, 0, 1, 0],
    [0, 1, 0, 0,
        1, 1, 1, 0,
        0, 1, 0, 0],
];
const colors = [
    'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'
];

const rainbowPlus = [
    'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'magenta', 'red'
];


let board =
    [
        [{ filled: false, color: ODD_FIELD_COLOR, border: "none", square: 1 }, {
            filled: false,
            color: ODD_FIELD_COLOR,
            border: "none",
            square: 1
        }, { filled: false, color: ODD_FIELD_COLOR, border: "none", square: 1 }, {
            filled: false,
            color: PLAY_FIELD_COLOR,
            border: "none",
            square: 2
        }, { filled: false, color: PLAY_FIELD_COLOR, border: "none", square: 2 }, {
            filled: false,
            color: PLAY_FIELD_COLOR,
            border: "none",
            square: 2
        }, { filled: false, color: ODD_FIELD_COLOR, "order": "none", square: 3 }, {
            filled: false,
            color: ODD_FIELD_COLOR,
            border: "none",
            square: 3
        }, { filled: false, color: ODD_FIELD_COLOR, border: "none", square: 3 }],
        [{ filled: false, color: ODD_FIELD_COLOR, border: "none", square: 1 }, {
            filled: false,
            color: ODD_FIELD_COLOR,
            border: "none",
            square: 1
        }, { filled: false, color: ODD_FIELD_COLOR, border: "none", square: 1 }, {
            filled: false,
            color: PLAY_FIELD_COLOR,
            border: "none",
            square: 2
        }, { filled: false, color: PLAY_FIELD_COLOR, border: "none", square: 2 }, {
            filled: false,
            color: PLAY_FIELD_COLOR,
            border: "none",
            square: 2
        }, { filled: false, color: ODD_FIELD_COLOR, "order": "none", square: 3 }, {
            filled: false,
            color: ODD_FIELD_COLOR,
            border: "none",
            square: 3
        }, { filled: false, color: ODD_FIELD_COLOR, border: "none", square: 3 }],
        [{ filled: false, color: ODD_FIELD_COLOR, border: "none", square: 1 }, {
            filled: false,
            color: ODD_FIELD_COLOR,
            border: "none",
            square: 1
        }, { filled: false, color: ODD_FIELD_COLOR, border: "none", square: 1 }, {
            filled: false,
            color: PLAY_FIELD_COLOR,
            border: "none",
            square: 2
        }, { filled: false, color: PLAY_FIELD_COLOR, border: "none", square: 2 }, {
            filled: false,
            color: PLAY_FIELD_COLOR,
            border: "none",
            square: 2
        }, { filled: false, color: ODD_FIELD_COLOR, "order": "none", square: 3 }, {
            filled: false,
            color: ODD_FIELD_COLOR,
            border: "none",
            square: 3
        }, { filled: false, color: ODD_FIELD_COLOR, border: "none", square: 3 }],

        [{ filled: false, color: PLAY_FIELD_COLOR, border: "none", square: 4 }, {
            filled: false,
            color: PLAY_FIELD_COLOR,
            border: "none",
            square: 4
        }, { filled: false, color: PLAY_FIELD_COLOR, border: "none", square: 4 }, {
            filled: false,
            color: ODD_FIELD_COLOR,
            border: "none",
            square: 5
        }, { filled: false, color: ODD_FIELD_COLOR, border: "none", square: 5 }, {
            filled: false,
            color: ODD_FIELD_COLOR,
            border: "none",
            square: 5
        }, { filled: false, color: PLAY_FIELD_COLOR, "order": "none", square: 6 }, {
            filled: false,
            color: PLAY_FIELD_COLOR,
            border: "none",
            square: 6
        }, { filled: false, color: PLAY_FIELD_COLOR, border: "none", square: 6 }],
        [{ filled: false, color: PLAY_FIELD_COLOR, border: "none", square: 4 }, {
            filled: false,
            color: PLAY_FIELD_COLOR,
            border: "none",
            square: 4
        }, { filled: false, color: PLAY_FIELD_COLOR, border: "none", square: 4 }, {
            filled: false,
            color: ODD_FIELD_COLOR,
            border: "none",
            square: 5
        }, { filled: false, color: ODD_FIELD_COLOR, border: "none", square: 5 }, {
            filled: false,
            color: ODD_FIELD_COLOR,
            border: "none",
            square: 5
        }, { filled: false, color: PLAY_FIELD_COLOR, "order": "none", square: 6 }, {
            filled: false,
            color: PLAY_FIELD_COLOR,
            border: "none",
            square: 6
        }, { filled: false, color: PLAY_FIELD_COLOR, border: "none", square: 6 }],
        [{ filled: false, color: PLAY_FIELD_COLOR, border: "none", square: 4 }, {
            filled: false,
            color: PLAY_FIELD_COLOR,
            border: "none",
            square: 4
        }, { filled: false, color: PLAY_FIELD_COLOR, border: "none", square: 4 }, {
            filled: false,
            color: ODD_FIELD_COLOR,
            border: "none",
            square: 5
        }, { filled: false, color: ODD_FIELD_COLOR, border: "none", square: 5 }, {
            filled: false,
            color: ODD_FIELD_COLOR,
            border: "none",
            square: 5
        }, { filled: false, color: PLAY_FIELD_COLOR, "order": "none", square: 6 }, {
            filled: false,
            color: PLAY_FIELD_COLOR,
            border: "none",
            square: 6
        }, { filled: false, color: PLAY_FIELD_COLOR, border: "none", square: 6 }],

        [{ filled: false, color: ODD_FIELD_COLOR, border: "none", square: 7 }, {
            filled: false,
            color: ODD_FIELD_COLOR,
            border: "none",
            square: 7
        }, { filled: false, color: ODD_FIELD_COLOR, border: "none", square: 7 }, {
            filled: false,
            color: PLAY_FIELD_COLOR,
            border: "none",
            square: 8
        }, { filled: false, color: PLAY_FIELD_COLOR, border: "none", square: 8 }, {
            filled: false,
            color: PLAY_FIELD_COLOR,
            border: "none",
            square: 8
        }, { filled: false, color: ODD_FIELD_COLOR, "order": "none", square: 9 }, {
            filled: false,
            color: ODD_FIELD_COLOR,
            border: "none",
            square: 9
        }, { filled: false, color: ODD_FIELD_COLOR, border: "none", square: 9 }],
        [{ filled: false, color: ODD_FIELD_COLOR, border: "none", square: 7 }, {
            filled: false,
            color: ODD_FIELD_COLOR,
            border: "none",
            square: 7
        }, { filled: false, color: ODD_FIELD_COLOR, border: "none", square: 7 }, {
            filled: false,
            color: PLAY_FIELD_COLOR,
            border: "none",
            square: 8
        }, { filled: false, color: PLAY_FIELD_COLOR, border: "none", square: 8 }, {
            filled: false,
            color: PLAY_FIELD_COLOR,
            border: "none",
            square: 8
        }, { filled: false, color: ODD_FIELD_COLOR, "order": "none", square: 9 }, {
            filled: false,
            color: ODD_FIELD_COLOR,
            border: "none",
            square: 9
        }, { filled: false, color: ODD_FIELD_COLOR, border: "none", square: 9 }],
        [{ filled: false, color: ODD_FIELD_COLOR, border: "none", square: 7 }, {
            filled: false,
            color: ODD_FIELD_COLOR,
            border: "none",
            square: 7
        }, { filled: false, color: ODD_FIELD_COLOR, border: "none", square: 7 }, {
            filled: false,
            color: PLAY_FIELD_COLOR,
            border: "none",
            square: 8
        }, { filled: false, color: PLAY_FIELD_COLOR, border: "none", square: 8 }, {
            filled: false,
            color: PLAY_FIELD_COLOR,
            border: "none",
            square: 8
        }, { filled: false, color: ODD_FIELD_COLOR, "order": "none", square: 9 }, {
            filled: false,
            color: ODD_FIELD_COLOR,
            border: "none",
            square: 9
        }, { filled: false, color: ODD_FIELD_COLOR, border: "none", square: 9 }]
    ]

    ;