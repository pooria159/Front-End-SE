import React from "react";
import {
    Checkbox,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
  } from "@material-tailwind/react";
   
const CheckboxVerticalListGroup = () => {
    return (
        <List className="flex justify-start items-center pl-1 p-4 pb-1 mt-1 text-pallate-Third">
          <ListItem className="p-0">
            <label
              htmlFor="vertical-list-react"
              className="flex w-full cursor-pointer items-center"
            >
              <ListItemPrefix className="mr-3">
                <Checkbox
                  id="vertical-list-react"
                  ripple={false}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0",
                  }}
                />
              </ListItemPrefix>
              <Typography color="blue-gray" className="font-medium">
                React.js
              </Typography>
            </label>
          </ListItem>
          <ListItem className="p-0">
            <label
              htmlFor="vertical-list-vue"
              className="flex w-full cursor-pointer items-center px-3 py-2"
            >
              <ListItemPrefix className="mr-3">
                <Checkbox
                  id="vertical-list-vue"
                  ripple={false}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0",
                  }}
                />
              </ListItemPrefix>
              <Typography color="blue-gray" className="font-medium">
                Vue.js
              </Typography>
            </label>
          </ListItem>
          <ListItem className="p-0">
            <label
              htmlFor="vertical-list-svelte"
              className="flex w-full cursor-pointer items-center px-3 py-2"
            >
              <ListItemPrefix className="mr-3">
                <Checkbox
                  id="vertical-list-svelte"
                  ripple={false}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0",
                  }}
                />
              </ListItemPrefix>
              <Typography color="blue-gray" className="font-medium">
                Svelte.js
              </Typography>
            </label>
          </ListItem>
        </List>
    );
  }

export default CheckboxVerticalListGroup
