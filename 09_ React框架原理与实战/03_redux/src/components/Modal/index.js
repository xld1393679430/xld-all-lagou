import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as modalActions from "../../store/actions/modal.actions";

const styles = {
  backgroundColor: "lightblue",
  width: 200,
  height: 200,
  position: "fixed",
  left: "50%",
  top: "50%",
  marginLeft: -100,
  marginTop: -100,
};

const Index = (props) => {
  const { visible, onShow, onHide } = props;
  return (
    <div>
      <button onClick={onShow}>显示</button>
      <button onClick={onHide}>隐藏</button>
      {visible && <div style={styles}></div>}
    </div>
  );
};

const mapStateToProps = ({ modal }) => {
  return {
    visible: modal.visible,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(modalActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Index);
