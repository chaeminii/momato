import MemberInfo from "../../components/common/MemberInfo";
import { loginActions } from "../../store/modules/login";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const { isLogin, memberInfo } = state.loginReducer;
  return { isLogin, memberInfo };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMemberInfo: () => {
      dispatch(loginActions.MEMBERINFO_REQUEST());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberInfo);
