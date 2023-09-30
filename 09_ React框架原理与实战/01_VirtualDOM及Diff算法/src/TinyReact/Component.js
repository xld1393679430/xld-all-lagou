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
    const virtualDom = this.render();
    const oldDom = this.getDom();
    const container = oldDom.parentNode;
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
