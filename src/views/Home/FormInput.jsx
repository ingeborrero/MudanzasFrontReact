import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    textAlign: 'left',
  },
  pos: {
    marginBottom: 12,
  },
  inputFile: {
    padding: 15,
  },
});

const FormInput = (props) => {
  const ref = React.createRef();
  const classes = useStyles();
  const {
    onSelectFile, accept, id, name, onClickProcesar, setCedula,
  } = props;

  return (
    <div>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <div>
            <TextField id="standard-basic" label="Cédula del participante" onChange={(e) => { setCedula(e.target.value); }} />
          </div>
          <div className={classes.inputFile}>
            <input
              ref={ref}
              id={id}
              type="file"
              name={name}
              accept={accept}
              onChange={(e) => onSelectFile(e)}
            />
          </div>
        </CardContent>
        <CardActions style={{ flexDirection: 'column' }}>
          <Button variant="contained" color="primary" onClick={onClickProcesar}>
            Procesar
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default FormInput;
