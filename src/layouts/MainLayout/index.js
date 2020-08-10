import React, {useState} from "react";
import clsx from 'clsx';
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from '@material-ui/core/IconButton';
// https://material-ui.com/style/icons/
import HomeIcon from "@material-ui/icons/Home";
import HelpIcon from "@material-ui/icons/HelpOutlined";
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
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
    }
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
          <Typography>Hello, Prof.</Typography>
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