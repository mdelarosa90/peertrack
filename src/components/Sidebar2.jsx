import React, { useState, forwardRef } from 'react';
import { List, ListItem, Collapse, Button, Drawer, AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import clsx from 'clsx';
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { NavLink as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NavBar from './NavBar';
import Icon from '@material-ui/core/Icon';

const menuItems = {
    "data": [
        {
            "name": "Item1",
            "url": "/projects",
            "icon": <ExpandMore />,
        },
        {
            "name": "Item2",
            "url": "/item2"
        },
        {
            "name": "Item3",
            "children": [
                {
                    "name": "Child31",
                    "url": "/child31"
                },
                {
                    "name": "Child32",
                    "url": "/child32"
                },
                {
                    "name": "Child33",
                    "url": "/child33"
                }
            ]
        },
        {
            "name": "Item4",
            "children": [
                {
                    "name": "Child41",
                    "url": "/child41"
                },
                {
                    "name": "Child42",
                    "url": "/child42"
                },
                {
                    "name": "Child43",
                    "children": [
                        {
                            "name": "Child431",
                            "url": "/child431"
                        },
                        {
                            "name": "Child432",
                            "url": "/child432,"
                        },
                        {
                            "name": "Child433",
                            "url": "/child433"
                        }
                    ]
                }
            ]
        }
    ]
}
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: "left",
    },
    drawer: {
        paddingTop: "20px",
        width: "250px",
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        width: '100px'
    },
    item: {
        display: 'flex',
        paddingTop: 0,
        paddingBottom: 0,
    },
    button: {
        color: colors.blueGrey[800],
        padding: '10px 8px',
        justifyContent: 'flex-start',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
    },
    btnRoot: {
        paddingLeft: "25px",
        justifyContent: "left !important"
    },
    subMenu: {
        paddingLeft: "50px !important",
    },
    menuButton: {
        marginRight: '2px',
      },
      title: {
        flexGrow: 1,
      },
}));

const MenuBar = (props) => {
    const [menu, setMenu] = useState({});
    const [open, setOpen] = useState({});
    const { className, ...rest } = props;
    const classes = useStyles();
    const handleClick = (item) => {
        let newData = { ...menu, [item]: !menu[item] };
        setMenu(newData);
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const CustomRouterLink = forwardRef((props, ref) => (
        <div ref={ref} style={{ flexGrow: 1 }}>
            <RouterLink {...props} />
        </div>
    ));
    const handleMenu = (children, level = 0) => {
        return children.map(({ children, name, icon, url, links }) => {
            if (!children) {
                return (
                    <List component="div" disablePadding key={name}>
                        <ListItem
                            className={classes.item}
                            disableGutters
                            style={{ padding: "0px" }}
                            key={name}
                        >
                            <Button
                                className={clsx({
                                    [classes.btnRoot]: true,
                                    [classes.button]: true,
                                    [classes.subMenu]: level
                                })}
                                component={CustomRouterLink}
                                to={url}
                            >   
                                {icon}
                                {name}
                            </Button>
                        </ListItem>
                    </List>
                )
            }
            return (
                <div key={name}>
                    <ListItem
                        className={classes.item}
                        disableGutters
                        key={name}
                        onClick={() => handleClick(name)}
                    >
                        <Button
                            className={clsx({
                                [classes.btnRoot]: true,
                                [classes.button]: true,
                                [classes.subMenu]: level
                            })}>
                            {name} {menu[name] ? <ExpandLess /> : <ExpandMore />}
                        </Button>
                    </ListItem>
                    <Collapse
                        in={(menu[name]) ? true : false}
                        timeout="auto"
                        unmountOnExit
                    >
                        {handleMenu(children, 1)}
                    </Collapse>
                </div>
            )
        })
    }
    return (
        <>
            <NavBar abierto={open} handleClick={handleDrawerOpen} />
            <Drawer
                anchor="left"
                classes={{ paper: clsx(classes.drawer, !open && classes.drawerPaperClose)}}
                open={true}
                variant="persistent"
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <List {...rest} className={clsx(classes.root, className)} >
                    {handleMenu(menuItems.data)}
                </List>
            </Drawer>
        </>
    )
}
export default MenuBar;