import AppBar from "@material-ui/core/AppBar";
import Badge from '@material-ui/core/Badge';
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from '@material-ui/core/IconButton';
import List from "@material-ui/core/List";
import { fade, withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HelpIcon from "@material-ui/icons/HelpOutlined";
// https://material-ui.com/style/icons/
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import clsx from 'clsx';
import React, { useState } from "react";
import NavLink from "./NavLink";

// https://material-ui.com/demos/drawers/#full-height-navigation
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
},
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  toolBarClose: {
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
},
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1) * 3
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    container: {
        marginLeft: drawerWidth,
        marginTop: '200px'
    },
    search: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
},
});

function MainLayout(props) {
  const { classes, children } = props;
  const [open, setOpen] = useState(true);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
        {!open && 
        <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setOpen(true)}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
        }
          <Typography variant="h6" color="inherit" noWrap>
            Peertrack
          </Typography>
          <div style={{ display: "flex", flex: 1 }} />
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          <Typography>Hello, Andres Lastra</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={clsx(classes.drawer, !open && classes.drawerPaperClose)}
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        anchor="left"
        open={open}
      >
        <div className={classes.toolbarIcon}>
                    <IconButton onClick={() => setOpen(false)}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
        <Divider />
        <List>
          <NavLink activeOnlyWhenExact to="/dashboard" icon={HomeIcon}>
            Dashboard
          </NavLink>
          <NavLink to="/projects" icon={AccountTreeIcon}>
            Projects
          </NavLink>
          <NavLink to="/tasks" icon={HelpIcon}>
            Tareas
          </NavLink>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}


export default withStyles(styles)(MainLayout);