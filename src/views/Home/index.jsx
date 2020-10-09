import React, { useState, useEffect } from 'react';
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
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormInput from './FormInput';
import ListLogTraza from '../../components/ListLogTraza';
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
  const {
    procesarArchivo, getDataTrazas, traza, dataResponse,
  } = props;
  const [file, setFile] = useState(null);
  const [cedula, setCedula] = useState('');

  useEffect(() => {
    getDataTrazas();
  }, []);

  const onSelectedFile = async (e) => {
    const { name } = e.target;
    const { files } = e.target;

    if (files && files[0]) {
      setFile(await toBase64(files[0]));
    }
  };

  const handleProcesar = () => {
    const data = {
      cedula,
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
                setCedula={setCedula}
              />
            </Paper>
            {dataResponse && dataResponse.listResultado !== undefined
              && (
                <Paper className={classes.paper}>
                  <Typography component="h5" variant="h5">Resultado análisis</Typography>
                  {dataResponse.listResultado.map((item, index) => (
                    <>
                      <ListItem key={index}>
                        <ListItemText
                          primary={`Case #${index + 1}: ${item}`}
                        />
                      </ListItem>
                    </>
                  ))}
                </Paper>
              )}
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography component="h5" variant="h5">Registro histórico</Typography>
              {traza && traza.length > 0 && <ListLogTraza data={traza} />}
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
  dataResponse: home.dataResponse,
});

const mapDispatchToProps = {
  getDataTrazas: getDataTrazasAction,
  procesarArchivo: procesarArchivoAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
