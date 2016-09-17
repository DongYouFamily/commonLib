module wdCb {
    export class Stack<T> extends List<T>{
        public static create<T>(children = []){
            var obj = new this(<Array<T>>children);

            return obj;
        }

        constructor(children:Array<T> = []){
            super();

            this.children = children;
        }

        get top(){
            return this.children[this.children.length - 1];
        }

        public push(element:T){
            this.children.push(element);
        }

        public pop(){
            return this.children.pop();
        }

        public clear(){
            this.removeAllChildren();
        }

        public clone();
        public clone(isDeep: boolean);
        public clone(target: Stack<T>);
        public clone(target: Stack<T>, isDeep: boolean);

        public clone(...args) {
            var target: Stack<T> = null,
                isDeep: boolean = null;

            if (args.length === 0) {
                isDeep = false;
                target = Stack.create<T>();
            }
            else if (args.length === 1) {
                if (JudgeUtils.isBoolean(args[0])) {
                    target = Stack.create<T>();
                    isDeep = args[0];
                }
                else {
                    target = args[0];
                    isDeep = false;
                }
            }
            else {
                target = args[0];
                isDeep = args[1];
            }

            if (isDeep === true) {
                target.setChildren(ExtendUtils.extendDeep(this.children));
            }
            else {
                target.setChildren(ExtendUtils.extend([], this.children));
            }

            return target;
        }

        public filter(func:(value:T, index:number) => boolean):Collection<T> {
            var children = this.children,
                result = [],
                value = null;

            for(let i = 0, len = children.length; i < len; i++){
                value = children[i];

                if (func.call(children, value, i)) {
                    result.push(value);
                }
            }

            return Collection.create<T>(result);
        }

        public findOne(func:(value:T, index:number) => boolean){
            var scope = this.children,
                result:T = null;

            this.forEach((value:T, index) => {
                if (!func.call(scope, value, index)) {
                    return;
                }

                result = value;
                return $BREAK;
            });

            return result;
        }

        public reverse () {
            return Collection.create<T>(this.copyChildren().reverse());
        }

        public removeChild(arg:any){
            return Collection.create<T>(this.removeChildHelper(arg));
        }

        public sort(func:(a:T, b:T) => any, isSortSelf = false):Collection<T>{
            if(isSortSelf){
                this.children.sort(func);

                return this;
            }

            return Collection.create<T>(this.copyChildren().sort(func));
        }

        public map(func:(value:T, index:number) => any){
            var resultArr = [];

            this.forEach((e, index) => {
                var result = func(e, index);

                if(result !== $REMOVE){
                    resultArr.push(result);
                }
                //e && e[handlerName] && e[handlerName].apply(context || e, valueArr);
            });

            return Collection.create<any>(resultArr);
        }

        public removeRepeatItems(){
            var noRepeatList =  Collection.create<T>();

            this.forEach((item:T) => {
                if (noRepeatList.hasChild(item)) {
                    return;
                }

                noRepeatList.addChild(item);
            });

            return noRepeatList;
        }

        public hasRepeatItems(){
            var noRepeatList =  Collection.create<T>(),
                hasRepeat:boolean = false;

            this.forEach((item:T) => {
                if (noRepeatList.hasChild(item)) {
                    hasRepeat = true;

                    return $BREAK;
                }

                noRepeatList.addChild(item);
            });

            return hasRepeat;
        }
    }
}
