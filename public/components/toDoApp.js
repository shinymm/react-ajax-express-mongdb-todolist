const App = React.createClass({
    getInitialState: function () {
        return {
            input: "",
            items: [],
            parms: []
        }
    },
    change: function (event) {
        this.setState({input: event.target.value});
    },
    addItem: function (event) {
        if (event.keyCode === 13 && event.target.value != '') {
            const items = this.state.items;
            const item = {};
            item.text = event.target.value;
            item.isChoose = false;
            items.push(item);
            this.setState({items});
            this.setState({parms: this.state.items}); // ????? 可以就用items
            this.setState({input: ""});
        }
    },
    deleteItem: function (index) {
        const items = this.state.items;
        items.splice(index, 1);
        this.setState({items});
        this.setState({parms: items});
    },
    exchange: function (index) {
        const item = this.state.items[index];
        item.isChoose = !item.isChoose;
        this.setState({items: this.state.items});
        this.setState({parms: this.state.items});
    },
    all:function(){
        this.setState({parms:this.state.items});
    },
    active:function(){
       const parms =  this.state.items.filter(item => !item.isChoose);
        this.setState({parms});
    },
    completed:function(){
        const parms = this.state.items.filter(item => item.isChoose);
        this.setState({parms});
    },
    clearCompleted:function(){
        const parms = this.state.items.filter(item => !item.isChoose);
        this.setState({items:parms});
        this.setState({parms});
    },
    chooseAll:function(){
        const items = this.state.items.map(item => {
            item.isChoose = !item.isChoose;
            return item;
        });
        this.setState({items});//??????
    },
    render: function () {
        let  footer;
        if(this.state.items.length > 0){
            footer  = <Footer  parms={this.state.parms}
                               onAll={this.all}
                               onActive={this.active}
                               onCompleted={this.completed}
                               onClearCompleted={this.clearCompleted}/>
        }
        return <div className="col-md-4 col-md-offset-4 wrap">
            <div className="header">
                <h1>todos</h1>
                <span onClick={this.chooseAll} className="glyphicon glyphicon-chevron-down">
                    </span>
                <input type="text"
                       className="form-control"
                       value={this.state.input}
                       placeholder="What needs to be done?"
                       onChange={this.change}
                       onKeyDown={this.addItem}/>
            </div>

            <div className="footer-item">
                <Items items={this.state.parms}
                      onRemove={this.deleteItem}
                      onExchange={this.exchange}/>
            </div>
            {footer}
        </div>
    }
});

const Items = React.createClass({
    exchange:function(index){
        this.props.onExchange(index);
    },
    remove:function(index){
        this.props.onRemove(index)
    },
    render: function () {
        const itemsText = this.props.items.map((item, index) => {
            return <div className="item" key={index}>
                <input type="checkbox"
                       checked={item.isChoose}
                       onClick={this.exchange.bind(this, index)}/>
                <span className="itemTitle">{item.text}</span>
                <span className="glyphicon glyphicon-remove delete"
                      onClick={this.remove.bind(this, index)}>
                </span>
            </div>
        });
        return <div>{itemsText}</div>
    }
});

const Footer = React.createClass({
    render:function(){
        var leftItems = this.props.parms.filter(item => !item.isChoose).length;
       const  left = leftItems > 1 ? `${leftItems} left Items`: `${leftItems} left Item`;
        return <div className="footer">
            <span>{left}</span>
            <button className="btn btn-primary"
                    onClick={this.props.onAll}>All </button>
            <button className="btn btn-info"
                    onClick={this.props.onActive}>Active </button>
            <button className="btn btn-success"
                    onClick={this.props.onCompleted}>Completed </button>
            <button className="tn btn-danger clearCompleted"
                    onClick={this.props.onClearCompleted}>clearCompleted </button>
        </div>
    }
});


ReactDOM.render(<App />, document.getElementById("content"));
