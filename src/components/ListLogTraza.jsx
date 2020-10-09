import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const ListLogTraza = ({ data }) => {
  const classes = useStyles();
  return (
    <>
      <List className={classes.root}>
        {data.map((item) => (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{item.id}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Participante: ${item.cedulaEjecutor}`}
                secondary={format(new Date(item.fechaEjecucion), 'dd/MM/yyyy kk:mm:ss') } 
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    </>
  );
};

export default ListLogTraza;
