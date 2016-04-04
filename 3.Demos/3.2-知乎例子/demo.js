var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MyClass = (function (_super) {
    __extends(MyClass, _super);
    function MyClass() {
        _super.apply(this, arguments);
    }
    MyClass.prototype.render = function () {
        return React.createElement("h1", null, "hello ", this.props.name);
    };
    return MyClass;
}(React.Component));
document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(React.createElement(MyClass, {name: "Tom"}), document.body);
});
