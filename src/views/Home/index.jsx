import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormInput from './FormInput';
import { procesarArchivoAction, getDataTrazasAction } from '../../actions/home.action';
import { toBase64 } from '../../utils/filesFunction';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(4),
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const { procesarArchivo } = props;
  const [file, setFile] = useState(null);

  const onSelectedFile = async (e) => {
    const { name } = e.target;
    const { files } = e.target;

    if (files && files[0]) {
      setFile(await toBase64(files[0]));
    //   if (!validateFile(files[0])) return;
    //   setImages((prevState) => ({ ...prevState, [name]: URL.createObjectURL(files[0]) }));
    //   setFiles((prevState) => ({ ...prevState, [name]: files[0] }));
    }
  };

  const handleProcesar = () => {
    debugger;
    const data = {
      cedula: '91519644',
      file,
    };
    procesarArchivo(data);
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Mudanzas Solvers
            </Typography>
            <Button color="inherit">Jorge Armando Borrero Gómez</Button>
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography component="h5" variant="h5">Procesamiento de datos</Typography>
              <FormInput
                name="archivoMudanza"
                content="+"
                onSelectFile={onSelectedFile}
                accept=".dat,.txt"
                onClickProcesar={handleProcesar}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography component="h5" variant="h5">Registro histórico</Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

const mapStateToProps = ({ home }) => ({
  loading: home.loading,
  traza: home.traza,
});

const mapDispatchToProps = {
  getDataTrazas: getDataTrazasAction,
  procesarArchivo: procesarArchivoAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
