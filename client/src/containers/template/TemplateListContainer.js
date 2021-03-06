import { connect } from "react-redux"
import { templateActions } from "../../store/modules/template.js"
import { templateDeleteActions } from "../../store/modules/templateDelete.js"
import TemplateList from "../../components/template/TemplateList.js"

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTemplateList: () => {
      dispatch(templateActions.TEMPLATE_REQUEST())
    },
    clearDeleteResult: () => {
      dispatch(templateDeleteActions.TEMPLATE_DELETE_CLEAR())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateList)
