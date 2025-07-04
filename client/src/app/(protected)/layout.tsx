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
import React from "react";
import { useRouter } from "next/navigation";
import Link from "@mui/material/Link";
import { Button } from "@mui/material";
import AddNewListModal from "@/components/modals/AddNewListModal";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const router = useRouter();
  const handleFilter = (category: string) => {
    router.push(`/${category.toLowerCase()}`);
  };
  const categories = [
    { id: 1, title: "personal", color: "#FFCCCD" },
    { id: 2, title: "work", color: "#AFDDD5" },
  ];
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
        {categories.map((cat) => (
          <ListItem
            key={cat.id}
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <Box
              sx={{
                width: "20px",
                height: "20px",
                backgroundColor: cat.color,
                borderRadius: "50%",
              }}
            ></Box>
            <Link
              href={`/${cat.title}`}
              onClick={() => handleFilter(cat.title)}
            >
              {cat.title.charAt(0).toUpperCase() + cat.title.slice(1)}
            </Link>
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
    </>
  );
}
