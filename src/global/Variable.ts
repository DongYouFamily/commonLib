declare var global:any,window:Window;

module wdCb{
    export var root:any;

    if(JudgeUtils.isNodeJs() && typeof global != "undefined"){
        root = global;
    }
    else{
        root = window;
    }
}


