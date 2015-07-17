/// <reference path="definitions.d.ts"/>
module dyCb {
    export class Hash {
        public static create(){
            var obj = new this();

            return obj;
        }

        constructor() {
        }

        private _childs:any = {};

        public getChilds() {
            return this._childs;
        }

        public getKeys(){
            var result = [],
                key = null;

            for(key in this._childs){
                result.push(key);
            }

            return result;
        }

        public getChild(key:string) {
            return this._childs[key];
        }

        public addChild(key:string, value:any) {
            this._childs[key] = value;

            return this;
        }

        public appendChild(key:string, value:any) {
            //if (JudgeUtils.isArray(this._childs[key])) {
            //    this._childs[key].push(value);
            //}
            //else {
            //    this._childs[key] = [value];
            //}
            if (this._childs[key] instanceof Collection) {
                this._childs[key].addChild(value);
            }
            else {
                this._childs[key] = Collection.create().addChild(value);
            }

            return this;
        }

        public removeChild(arg:any){
            if(JudgeUtils.isString(arg)){
                let key = <string>arg;

                this._childs[key] = undefined;
            }
            else if (JudgeUtils.isFunction(arg)) {
                let func = <Function>arg,
                    self = this;

                //return this._removeChild(this._childs, arg);
                this.forEach((val, key) => {
                    if(func(val, key)){
                        self._childs[key] = undefined;
                    }
                });
            }

            return this;
        }

        public hasChild(key:string):boolean {
            return !!this._childs[key];
        }


        public forEach(func:Function, context?:any){
            var i = null,
                childs = this._childs;

            for (i in childs) {
                if (childs.hasOwnProperty(i)) {
                    if (func.call(context, childs[i], i) === $BREAK) {
                        break;
                    }
                }
            }

            return this;
        }

        public filter(func:Function){
            var result = {},
                scope = this._childs;

            this.forEach((val, key) => {
                if(!func.call(scope, val, key)){
                    return;
                }

                result[key] = val;
            });

            this._childs = result;

            return this;
        }

        //public map(handlerName:string, argArr?:any[]) {
        //    var i = null,
        //        childs = this._childs;
        //
        //    for (i in childs) {
        //        if (childs.hasOwnProperty(i)) {
        //            childs[i][handlerName].apply(childs[i], argArr);
        //        }
        //    }
        //}
    }
}
