import React, { useState, useEffect } from "react"
import { Button, makeStyles, TextField } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: 30,
  },
  content: {
    display: "block",
    marginBottom: theme.spacing(3),
    "& > *": {
      width: theme.spacing(50),
      [theme.breakpoints.down("650")]: {
        width: theme.spacing(25),
        fontSize: 12,
      },
    },
  },
  editBtn: {
    margin: "auto",
    textAlign: "center",
    "& > *": {
      [theme.breakpoints.down("650")]: {
        fontSize: 12,
      },
    },
  },
}))

const useInput = (initVal) => {
  const [value, setValue] = useState(initVal)
  const onChange = (e) => {
    setValue(e.target.value)
  }
  return { value, onChange }
}

const TemplateModal = (props) => {
  const classes = useStyles()
  const NAME_CHARACTER_LIMIT = 15
  const COMMENT_CHARACTER_LIMIT = 25
  const templateName = useInput("")
  const templateComment = useInput("")

  useEffect(() => {
    props.getTemplateList()
    props.clearAddResult()
  }, [props.templateAddReducer.isTemplateAddSucceed])

  const templateAddRequest = () => {
    const data = {
      templateName: templateName.value,
      templateComment: templateComment.value,
    }
    props.addTemplate(data)
    props.onClose()
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h2 id="transition-modal-title">텃밭 만들기</h2>
          <div>
            <TextField
              autoFocus
              className={classes.content}
              placeholder="텃밭 이름"
              inputProps={{
                maxLength: NAME_CHARACTER_LIMIT,
              }}
              helperText={`${templateName.value.length}/${NAME_CHARACTER_LIMIT}`}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  document.getElementById("comment").focus()
                }
              }}
              {...templateName}
            />
          </div>
          <div>
            <TextField
              id="comment"
              className={classes.content}
              placeholder="텃밭 코멘트"
              inputProps={{
                maxLength: COMMENT_CHARACTER_LIMIT,
              }}
              helperText={`${templateComment.value.length}/${COMMENT_CHARACTER_LIMIT}`}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  document.getElementById("editBtn").click()
                }
              }}
              {...templateComment}
            />
          </div>
          <div className={classes.editBtn}>
            <Button id="editBtn" variant="contained" color="secondary" onClick={templateAddRequest}>
              만들기
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default TemplateModal
