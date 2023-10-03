import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as counterActions from "../../store/actions/counter.actions";

const Index = (props) => {
  const { count, increment, decrement } = props;
  return (
    <div>
      <button onClick={() => increment(5)}>+5</button>
      <span>{count}</span>
      <button onClick={() => decrement(5)}>-5</button>
    </div>
  );
};

const mapStateToProps = ({ counter }) => ({
  count: counter.count,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(counterActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Index);
