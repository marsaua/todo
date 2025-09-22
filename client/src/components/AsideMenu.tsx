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
import LogoutButton from "./buttons/LogoutButton";
import { useRouter } from "next/navigation";
import InvitationModal from "./modals/InvitationModal";

export default function AsideMenu({
  children,
  categories,
  userName,
  role,
}: {
  children: React.ReactNode;
  categories:
    | {
        title: string;
        color: string;
        id: number;
      }[]
    | null;
  userName: string;
  role: "USER" | "COMPANY" | "";
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [id, setId] = useState(0);

  const [openInvitation, setOpenInvitation] = useState(false);

  const router = useRouter();

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setId(0);
  };

  const handleCloseInvitation = () => {
    setOpenInvitation(false);
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
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <List>
        <ListItem>
          <Link href="/home">
            <Box component="img" src="logo.png" width={"100px"} />
          </Link>
        </ListItem>
      </List>
      <Divider />
      <Typography sx={{ p: 2, mt: 2, fontWeight: "bold" }}>Tasks</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "calc(100vh - 200px)",
        }}
      >
        <List>
          <ListItem>
            <Link onClick={() => router.push("/home?categoryId=0")}>
              All todos
            </Link>
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
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  width: "100%",
                }}
                onClick={() => router.push(`/home?categoryId=${cat.id}`)}
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
            <Button
              variant="contained"
              onClick={handleClickOpen}
              sx={{ width: "100%" }}
            >
              Add New List
            </Button>
          </ListItem>
          <ListItem>
            {(role === "COMPANY" || !role) && (
              <Button
                variant="outlined"
                onClick={() => setOpenInvitation(true)}
                sx={{ width: "100%" }}
              >
                Invite the user
              </Button>
            )}
          </ListItem>
        </List>
        <LogoutButton />
      </Box>
    </Box>
  );

  return (
    <>
      <Box sx={{ display: { xs: "block", sm: "flex", flexDirection: "row" } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Link href="/home">
              <Box component="img" src="logo.png" width={"100px"} />
            </Link>
            <Toolbar sx={{ justifyContent: "flex-end" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Box>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
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
            width: { sm: `calc(100% - 250px)` },
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
      <InvitationModal
        open={openInvitation}
        handleClose={handleCloseInvitation}
      />
    </>
  );
}
