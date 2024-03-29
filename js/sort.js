/*降序升序操作*/

var tableSort = function(){
    this.initialize.apply(this,arguments);
}

tableSort.prototype = {

    initialize : function(tableId,clickRow,startRow,endRow,classUp,classDown,selectClass){
        this.Table = document.getElementById(tableId);
        this.rows = this.Table.rows;//所有行
        this.Tags = this.rows[clickRow-1].cells;//标签td
        this.up = classUp;
        this.down = classDown;
        this.startRow = startRow;
        this.selectClass = selectClass;
        this.endRow = (endRow == 999? this.rows.length : endRow);
        this.T2Arr = this._td2Array();//所有受影响的td的二维数组
        this.setShow();
    },
//设置标签切换
    setShow:function(){
        var defaultClass = this.Tags[0].className;
        for(var Tag ,i=0;Tag = this.Tags[i];i++){
            Tag.index = i;
            addEventListener(Tag ,'click', Bind(Tag,statu));
        }
        var _this =this;
        var turn = 0;
        function statu(){
            for(var i=0;i<_this.Tags.length;i++){
                _this.Tags[i].className = defaultClass;
            }
            if(turn==0){
                addClass(this,_this.down)
                _this.startArray(0,this.index);
                turn=1;
            }else{
                addClass(this,_this.up)
                _this.startArray(1,this.index);
                turn=0;
            }
        }
    },
//设置选中列样式
    colClassSet:function(num,cla){
//得到关联到的td
        for(var i= (this.startRow-1);i<(this.endRow);i++){
            for(var n=0;n<this.rows[i].cells.length;n++){
                removeClass(this.rows[i].cells[n],cla);
            }
            addClass(this.rows[i].cells[num],cla);
        }
    },
//开始排序 num 根据第几列排序 aord 逆序还是顺序
    startArray:function(aord,num){
        var afterSort = this.sortMethod(this.T2Arr,aord,num);//排序后的二维数组传到排序方法中去
        this.array2Td(num,afterSort);//输出
    },
//将受影响的行和列转换成二维数组
    _td2Array:function(){
        var arr=[];
        for(var i=(this.startRow-1),l=0;i<(this.endRow);i++,l++){
            arr[l]=[];
            for(var n=0;n<this.rows[i].cells.length;n++){
                arr[l].push(this.rows[i].cells[n].innerHTML);
            }
        }
        return arr;
    },
//根据排序后的二维数组来输出相应的行和列的 innerHTML
    array2Td:function(num,arr){
        this.colClassSet(num,this.selectClass);
        for(var i= (this.startRow-1),l=0;i<(this.endRow);i++,l++){
            for(var n=0;n<this.Tags.length;n++){
                this.rows[i].cells[n].innerHTML = arr[l][n];
            }
        }
    },
//传进来一个二维数组，根据二维数组的子项中的w项排序，再返回排序后的二维数组
    sortMethod:function(arr,aord,w){
//var effectCol = this.getColByNum(whichCol);
        arr.sort(function(a,b){
            x = killHTML(a[w]);
            y = killHTML(b[w]);
            x = x.replace(/,/g,'');
            y = y.replace(/,/g,'');
            switch (isNaN(x)){
                case false:
                    return Number(x) - Number(y);
                    break;
                case true:
                    return x.localeCompare(y);
                    break;
            }
        });
        arr = aord==0?arr:arr.reverse();
        return arr;
    }
}
/*-----------------------------------*/
function addEventListener(o,type,fn){
    if(o.attachEvent){o.attachEvent('on'+type,fn)}
    else if(o.addEventListener){o.addEventListener(type,fn,false)}
    else{o['on'+type] = fn;}
}

function hasClass(element, className) {
    var reg = new RegExp('(\\s|^)'+className+'(\\s|$)');
    return element.className.match(reg);
}

function addClass(element, className) {
    if (!this.hasClass(element, className))
    {
        element.className += " "+className;
    }
}

function removeClass(element, className) {
    if (hasClass(element, className)) {
        var reg = new RegExp('(\\s|^)'+className+'(\\s|$)');
        element.className = element.className.replace(reg,' ');
    }
}

var Bind = function(object, fun) {
    return function() {
        return fun.apply(object, arguments);
    }
}
//去掉所有的html标记
function killHTML(str){
    return str.replace(/<[^>]+>/g,"");
}
//------------------------------------------------
//tableid 第几行是标签行，从第几行开始排序，第几行结束排序(999表示最后) 升序标签样式，降序标签样式 选中列样式
//注意标签行的class应该是一致的
var ex1 = new tableSort('table',1,2,999,'up','down','hov');
