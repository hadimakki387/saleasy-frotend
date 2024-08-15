import { Box, Paper, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

interface LinksProps {
  title: string;
}

const Links: React.FC<LinksProps> = ({ title }) => {
  return (
    <Box className="relative flex items-center cursor-pointer group">
      <Typography variant="body1" className="text-base">
        {title}
      </Typography>
      icon
      <Box className="absolute left-1/2 top-full min-w-[170px] transform -translate-x-1/2 hidden group-hover:block z-20">
        <Paper className="mt-2">
          <nav aria-label="secondary mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton className="p-0 px-3 hover:bg-gray-100">
                  <ListItemText
                    primary="Dashboard"
                    className="flex-grow text-sm font-light"
                  />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding className="relative group">
                <ListItemButton className="flex p-0 px-3 hover:bg-gray-100">
                  <ListItemText
                    primary="Products"
                    className="flex-grow text-sm font-light"
                  />
                  icon
                </ListItemButton>
                <Box className="absolute top-0 left-full hidden min-w-[150px] ml-2 group-hover:block z-10">
                  <Paper className="bg-white shadow-lg">
                    <nav aria-label="secondary mailbox folders">
                      <List>
                        <ListItem disablePadding>
                          <ListItemButton className="p-0 px-3 hover:bg-gray-100">
                            <ListItemText
                              primary="Add Product"
                              className="text-sm font-light"
                            />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton className="p-0 px-3 hover:bg-gray-100">
                            <ListItemText
                              primary="Edit Product"
                              className="text-sm font-light"
                            />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </nav>
                  </Paper>
                </Box>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton className="p-0 px-3 hover:bg-gray-100">
                  <ListItemText
                    primary="Orders"
                    className="flex-grow text-sm font-light"
                  />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton className="p-0 px-3 hover:bg-gray-100">
                  <ListItemText
                    primary="Profile"
                    className="flex-grow text-sm font-light"
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Paper>
      </Box>
    </Box>
  );
};

export default Links;
