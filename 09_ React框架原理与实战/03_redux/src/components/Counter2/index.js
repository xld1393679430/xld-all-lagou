import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as counterActions from "../../store/actions/counter2.redux-actions";

const Index = (props) => {
  const { count, increment, decrement } = props;
  return (
    <div>
      <button onClick={increment}>+1</button>
      <span>{count}</span>
      <button onClick={decrement}>-1</button>
    </div>
  );
};

const mapStateToProps = ({ counter2 }) => ({
  count: counter2.count,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(counterActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Index);
