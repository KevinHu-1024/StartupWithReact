[教程来自](https://www.zhihu.com/question/38838053)

首先扫盲一下，先从搭建环境开始：
1.安装node，因为ts的编译器是js/ts写的；
安装node后同时获得npm命令，这是nodejs世界里的包管理器（也可以看作node的app商店）；
2.安装vs 2015或者vs code，当然这不是必须的，但是这里强烈推荐写ts的工具，vs第一，vsc第二；
3.vs自带了TypeScript（vs2012+，vs2015update1自带了ts1.7）,最新版本的typescript for vs去官网下载即可, 或者如果不依赖vs（比如mac环境）, 可以用命令行装ts编译器

    npm i -g typescript@next

4. 安装了ts后, 就会有2个命令可用：tsc和tsd, tsc用来编译TypeScript代码, tsd用来下载第三方js类库的ts定义文件(或者叫头文件)，熟练使用tsd，工作效率提升，因为减少了80%查文档的时间，所以写ts可以说是jser打通了任督二脉，上手任何新的开发环境都很快；
有网友指正tsd工具不是安装ts的时候自带的，需要另外安装，装太久不记得了。
    npm install tsd -g

5. 命令行下载react的ts头文件,

    tsd install react-global --save

注意上面之所以写 react-global 而不是react， 因为我们接下来使用比较原始的写法，直接把React当作全局对象使用， 而不作为es6模块（必须用import引入），不需要Babel编译也不需要webpack打包；
上面执行的tsd命令下载了ReactJS类库的头文件, 下面用tsc命令创建一个ts项目配置文件

    tsc --init

命令创建了tsconfig.json配置文件, 打开该文件
增加"jsx": "react", 就是自动把tsx变成最终的js, 而不是jsx
把"outDir": "built", 这行去掉,这样编译的文件就会在当前目录输出
"target": "es5", 这里es3改成es5,
"watch": true 是否监听文件修改 如果你用的是vs,这行不重要

6.下载reactjs文件，如果没有安装bower命令，可以手动去官网下载react类库

    bower install --save react

7.以上环境配置好了, 开始写代码:
创建一个demo.tsx文件(注意这里是tsx, 不是ts也不是jsx)
创建一个demo.html, 添加文件的引用

    <!doctype html>
    <html>
    <head>
        <script src="bower_components/react/react.min.js"></script>
        <script src="bower_components/react/react-dom.min.js"></script>
        <script src="demo.js"></script>
    </head>
    <body>
        
    </body>
    </html>

8. demo.tsx 写代码

    class MyClass extends React.Component<any, any> {
        render() {
            return <h1>hello {this.props.name}</h1>;  
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        ReactDOM.render(<MyClass name="Tom" />, document.body);
    });

9. 如果保存了demo.tsx后, 没有在目录下发现自动编译了demo.js, 那么可能是vs没配置好,如果你没有装vs或者vsc,没关系,在当前文件夹下命令行运行

tsc

tsc命令会自动根据tsconfig.json里面配置的情况, 自动帮你把代码编译成js, 这是编译后的js文件


10. 打开demo.html可以看到效果了;
11. 至于题主说怎么学习, 其实跟JS完全没两样, 上面demo.tsx的代码, 跟react官网的es6写法一模一样多了<any,any> 这两个prop和states类型约束, 仅此而已;
12. 下班, 有空再写;
－－－－－－时间分割－－－－－－
13、继续写，对1-12进行润色，转入传教模式；

妖兽啦，这里14-15的文字怎么不不见了，知乎编辑器bug好多。
不记得写了什么，大概说的是 工厂方法创建子类和用class直接继承的差异。

React.createClass 和 Backbone.View.extend 等都是工厂方法创建子类


文字断了。。。。

以上的代码，工厂方法在创建子类的同时，做了一些初始化的动作，这与单纯的原型继承不同，所以在使用class方式进行子类继承，这样的写法是无效的；

    class MyView extends React.Component {
        render() {
            return <h1>hello {this.state.name}</h1>; //会抛异常,因为state是null
        }
        //不起作用的
        getInitialState:(){ 
        return {name:'',age:20};
    }
    }

需要改成如下方式，下面是官网给出的方案（这里TypeScript和ES6情况是一样的）

    class MyView extends React.Component {
        constructor(props, context) {
        super(props, context);

        this.state = {
            name: '',
        };
        }
        render() {
            return <h1>hello {this.state.name}</h1>;  
        }
    }


16、当组件化遇到强类型：
从前写JS组件，一般复用性比较差，基本写完就仍，原因如下：
1）暴露了太多的Dom结构以及别的实现细节；
2）命名挫，缺乏可记忆性，本身编程中变量和方法的命名对于码农来说就是天坑；
3）JS天生缺乏私有和公共成员的约束，不加注释根本不知道怎么使用该类库/组件；
React解决了把dom标签暴露出去的问题，TS则解决了语言层面的问题，并提供了强大的重构能力，你根本不需要记住组件的API，因为工具会列出来；

待续...下面会配上实例。

-----------------时间轴 到2016-01-05-------------------
17、强类型的ts有IDE的代码提示，但是面对各种mvvm的字符串模版组装，却无用武之地，以下是典型的mvvm数据绑定和有IDE支持的JSX数据组装在开发体验上的区别；
模板字符串的绑定里，工具无法检查出问题，只能在运行时抛出异常，而jsx则可以提示拼写错误。

18、关于生产力再抛一个概念：无障碍编程；
我们平时的开发工作，有不少时间花在查API文档、调试代码、查字典（给变量命名），需要不停地切换任务窗口……
上面的例子比较小，实际开发中各种JSON对象可能有10来个属性，且结构层层嵌套，不一边查文档一边抓包，根本无法完成开发；
如果项目是并行开发的，文档都还没定义出来（但是产品原型已经有了，甚至html页面都已经切好），如何快速完成前端部分的开发工作？
业界常用方法是使用mock数据（先造假数据），下面介绍一种更简单的办法（为了举例先虚拟一个需求场景 —— 一个留言板html的组装）；

别忘了JS变量是可以用中文的，好吧不用查字典了，先把需求完成再说，在组装html的过程中TS+JSX发挥了巨大的优势，三下五除二就把组装界面的代码写好了，不用调试我可以确定没有错误的；
过了些天，WebAPI的数据结构定义出来了，可以着手进行代码重构（或者说把查字典的工作集中完成），利用开发工具的重构功能进行变量改名：
最后项目完成的时候，是把所有类型的定义都挪到独立的描述文件里(比如叫做webapi.d.ts)，原来的interface可以改成type关键字(类型别名)：
以上，这个开发过程中基本没有一边查文档、一边查字典，效率的提升是明显的。

待续，后面主要会写：
JSX与TS结合，使得在JS开发视图下获得html自动补全的支持；开发一套自定义的标记语言并能投入生产，曾经是每个开发人员都有的“梦想”，有了TSX，那么这个“梦想”则离现实更近一步了。
自己开发和维护的组件项目，拥有良好的文档和接口封装、命名，则项目越有生命力，所以开发工具的辅助可以使JS组件流通性大大增强........ 

作者：Fula Li
链接：https://www.zhihu.com/question/38838053/answer/78371116
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。