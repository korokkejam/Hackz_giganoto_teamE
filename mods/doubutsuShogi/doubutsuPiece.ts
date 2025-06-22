type pieceType={
    name:string,movable:{absolute:number[][],relative:number[][],func:string},jumpable:boolean
};

const giraffe:pieceType={
    name:"キリン",
    movable:{
        relative:[[1,0],[0,1],[-1,0],[0,-1]],
        absolute:[],
        func:""
    },
    jumpable:false
};
const elephant:pieceType={
    name:"ゾウ",
    movable:{
        relative:[[1,1],[-1,1],[-1,-1],[1,-1]],
        absolute:[],
        func:""
    },
    jumpable:false
};
const chicken:pieceType={
    name:"ﾆﾜﾄﾘ",
    movable:{
        relative:[[0,1]],
        absolute:[],
        func:""
    },
    jumpable:false
};
const lion:pieceType={
    name:"ﾗｲｵﾝ",
    movable:{
        relative:[[0,1],[0,-1],[-1,0],[1,0],[1,1],[-1,-1],[1,-1],[-1,1]],
        absolute:[],
        func:""
    },
    jumpable:false
};