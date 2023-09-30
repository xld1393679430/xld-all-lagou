import diff from "./diff";

export default class Component {
  constructor(props) {
    this.props = props;
  }

  componentWillMount() {}
  componentDidMount() {}
  componentWillReciveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps != this.props || nextState != this.state;
  }
  componentWillUpdate(nextProps, nextState) {}
  componentDidUpdate(prevProps, prevState) {}
  componentWillUnmount() {}

  setState(state) {
    this.state = Object.assign({}, this.state, state);
    let virtualDom = this.render();
    let oldDom = this.getDom();
    let container = oldDom.parentNode;
    diff(virtualDom, container, oldDom);
  }

  setDom(dom) {
    this._dom = dom;
  }

  getDom() {
    return this._dom;
  }

  updateProps(props) {
    this.props = props;
  }
}
