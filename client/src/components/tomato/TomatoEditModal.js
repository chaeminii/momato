import React, {useState, useEffect} from "react";
import {
    makeStyles,
    Button,
    FormControl,
    InputLabel,
    Typography,
    TextField,
    Select,
    MenuItem
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
        display: "block",
    },
    name: {
        width: "100%"
    },
    div: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(2)
    },

    title: {
        marginRight: theme.spacing(20),
    },

    editbtn: {
        m: "auto",
        textAlign: "center"
    },

    select: {
        width: "40%",
        cursor: "pointer",
    },
    option: {
        cursor: "pointer",
    }
}));

const useInput = (initVal) => {
    const [value, setValue] = useState(initVal);
    const onChange = (e) => {
        setValue(e.target.value);
    };
    return {value, onChange};
};

const TomatoEditModal = (props) => {
    let templateIdx = props.templateIdx;
    let date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10);
    if (!templateIdx){
      templateIdx = 0;
    } else {
      date = "";
    }
    const data = {
        date,
        templateIdx,
      };
    useEffect(() => {
        if (localStorage.getItem("auth")){
            props.getTomatos(data);
            props.clearEditResult();
        } else {
            props.getTempTomatoList();
        }
      },[props.tomatoEditReducer.isTomatoEditSucceed]);

    const classes = useStyles();
    const tomatoName = useInput(props.name);
    const tomatoFullRegular = useInput(props.fullRegular);
    const tomatoFullBreak = useInput(props.fullBreak);

    const tomatoEditRequest = () => {
        if (!localStorage.getItem("auth")){
            const tempTomato = {
                "tomatoIdx": props.index,
                "tomatoName": tomatoName.value,
                "template": 0,
                "tomatoCanStart": 0,
                "tomatoDate": new Date(),
                "tomatoEndTime": 0,
                "tomatoStartTime": 0,
                "tomatoFullRegular": tomatoFullRegular.value,
                "tomatoLeftRegular": tomatoFullRegular.value,
                "tomatoFullBreak": tomatoFullBreak.value,
                "tomatoLeftBreak": tomatoFullBreak.value,
              };
            sessionStorage.setItem(props.index, JSON.stringify(tempTomato));
            props.getTempTomatoList();
        } else {
            const tdata = {
                tomatoIdx: props.index,
                tomatoName: tomatoName.value,
                tomatoFullRegular: tomatoFullRegular.value,
                tomatoFullBreak: tomatoFullBreak.value,
            }
            props.tomatoEdit(tdata);
        }
        props.onClose();
    }
    return (
        <> < TextField className = {
            classes.name
        }
        id = "standard-textarea" label = "" placeholder = {
            props.name
        }
        multiline 
        autoFocus
        onKeyPress={(e) => {
            if(e.key === "Enter"){
              e.preventDefault();
              document.getElementById("editButton").click();
            };
        }}
            {...tomatoName}
        /> <p id="transition-modal-description"/>
            <FormControl className={classes.formControl}>
                <div className={classes.div}>
                    <InputLabel htmlFor="fullRegular"></InputLabel>
                    <Typography className={classes.title}>재배 시간</Typography>
                    <Select
                        defaultValue={props.fullRegular / 60}
                        inputProps={{
                            name: 'tomatoFullRegular',
                            id: 'uncontrolled-native'
                        }}
                        {...tomatoFullRegular}
                        >
                        <MenuItem value={300}>5분</MenuItem>
                        <MenuItem value={600}>10분</MenuItem>
                        <MenuItem value={900}>15분</MenuItem>
                        <MenuItem value={1200}>20분</MenuItem>
                        <MenuItem value={1500}>25분</MenuItem>
                        <MenuItem value={1800}>30분</MenuItem>
                    </Select>
                    </div>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        
                    <div className={classes.div}>
                        <InputLabel htmlFor="fullBreak"></InputLabel>
                        <Typography className={classes.title}>휴식 시간</Typography>
                        <Select
                        defaultValue={props.fullBreak / 60}
                        inputProps={{
                            name: 'tomatoFullBreak',
                            id: 'uncontrolled-native'
                        }}
                        {...tomatoFullBreak}
                        >
                        <MenuItem value={300}>5분</MenuItem>
                        <MenuItem value={600}>10분</MenuItem>
                        <MenuItem value={900}>15분</MenuItem>
                        <MenuItem value={1200}>20분</MenuItem>
                        <MenuItem value={1500}>25분</MenuItem>
                        <MenuItem value={1800}>30분</MenuItem>
                    </Select>
                    </div>
                    <div className={classes.editbtn}>
                        <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={tomatoEditRequest}
                        id="editButton"
                        >수정</Button>
                    </div>
                </FormControl>
        </>
    );
};

export default TomatoEditModal;