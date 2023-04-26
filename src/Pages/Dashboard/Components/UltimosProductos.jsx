import { Avatar, Card, CardContent, CardHeader, Icon, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { Fragment } from "react";
import { funciones } from "../../../Functions";

function UltimosProductos({productos}) {
    return ( <Card sx={{ maxWidth: "100%", height:'100%', boxShadow: 3, p: 0, margin: "0 auto", }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: green[800] }}>
          <Icon>local_mall</Icon>
        </Avatar>
      }
      title={<Typography variant="button">Últimos productos</Typography>}
    />
    <CardContent sx={{ p: 0,'&:last-child': {p:0} }}>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          
        }}
      >
        {productos.map((e, i) => (
          <Fragment key={i}>
            <ListItem
                sx={{ pb:1, ':hover':{background:'none'} }}
                secondaryAction={<b>{funciones.numberFormat( e.precio_vendido)}</b>}
            >
              <ListItemAvatar>
                <Avatar><Icon>local_mall</Icon></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<b>{e.nombre_producto}</b>}
              />
            </ListItem>
          </Fragment>
        ))}
      </List>
    </CardContent>
  </Card> );
}

export default UltimosProductos;