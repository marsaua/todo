"use client";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "@mui/material/Link";
import { Button } from "@mui/material";
import AddNewListModal from "@/components/modals/AddNewListModal";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteCategoryModal from "@/components/modals/DeleteCategoryModal";
import { useState } from "react";

export default function AsideMenu({
  children,
  categories,
}: {
  children: React.ReactNode;
  categories:
    | {
        title: string;
        color: string;
        id: number;
      }[]
    | null;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [id, setId] = useState(0);
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setId(0);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const drawer = (
    <Box>
      <List>
        <ListItem>
          <Typography variant="h4">Home</Typography>
        </ListItem>
      </List>
      <Divider />
      <Typography sx={{ p: 2, mt: 2, fontWeight: "bold" }}>Tasks</Typography>
      <List>
        <ListItem>
          <Link href="/home">All todos</Link>
        </ListItem>
        {categories?.map((cat) => (
          <ListItem
            key={cat.id}
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <Box
              sx={{
                minWidth: "20px",
                minHeight: "20px",
                backgroundColor: cat.color,
                borderRadius: "50%",
                cursor: "pointer",
                border: "1px solid #ccc",
              }}
            ></Box>
            <Link
              href={`/${cat.title}`}
              onClick={() => setOpenDelete(true)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                width: "100%",
              }}
            >
              {cat.title.charAt(0).toUpperCase() + cat.title.slice(1)}
            </Link>
            {!["work", "personal"].includes(cat.title.toLowerCase()) && (
              <DeleteIcon
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setOpenDelete(true);
                  setId(cat.id);
                }}
              />
            )}
          </ListItem>
        ))}
        <ListItem>
          <Button variant="text" onClick={handleClickOpen}>
            Add New List
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box
          sx={{ display: "flex", flexDirection: "column", flex: "0 0 auto" }}
        >
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                width: 250,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: 250,
                  boxSizing: "border-box",
                },
              }}
            >
              {drawer}
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              sx={{
                width: 250,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: 250,
                  boxSizing: "border-box",
                },
                display: { xs: "none", sm: "block" },
              }}
            >
              {drawer}
            </Drawer>
          )}
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 250px)`, xs: "100%" },
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
      <AddNewListModal open={open} onClose={handleClose} />
      <DeleteCategoryModal
        open={openDelete}
        onClose={handleCloseDelete}
        id={id}
      />
    </>
  );
}
