import React from "react";
import {
  Box,
  Button,
  TextField,
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
  Autocomplete,
  createFilterOptions,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const filter = createFilterOptions();

function ComboBox(props) {
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const selectOptions = props.data ? props.data : [];

  const handleClose = () => {
    setDialogValue({
      title: "",
      year: "",
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    title: "",
    year: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
      year: parseInt(dialogValue.year, 10),
    });

    handleClose();
  };
  const handleOption = (options) => {
    if (options.length > 0) {
      const resultOptions = options.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      return resultOptions;
    } else {
      return [];
    }
  };

  //styling
  const theme = createTheme({
    components: {
      // Name of the component
      MuiFormControl: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            // overflow: "unset",
            margin: "0px",
          },
        },
      },
      // .css-viou3o--root
      MuiAutocomplete: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            width: "100%",
          },
        },
      },
    },
  });

  //render function

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          style={{
            display: "flex",
            padding: "0px",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box
            style={{
              width: "47%",
              whiteSpace: "nowrap",
              padding: "12px 16px 12px 0px",
              color: "#00000",
            }}
          >
            <Typography
              htmlFor={props.label.toLowerCase().split(" ").join("_")}
              sx={{ color: "black" }}
            >
              {props.label}{" "}
              {props.required ? (
                <p className="product_required_mark">*</p>
              ) : null}
            </Typography>
          </Box>
          <Box style={{ width: "100%" }}>
            <Autocomplete
              width="100%"
              value={value}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  // timeout to avoid instant validation of the dialog's form.
                  setTimeout(() => {
                    toggleOpen(true);
                    setDialogValue({
                      newBrand: newValue,
                      year: "",
                    });
                  });
                } else if (newValue && newValue.inputValue) {
                  toggleOpen(true);
                  setDialogValue({
                    newBrand: newValue.inputValue,
                    year: "",
                  });
                } else {
                  setValue(newValue);
                }
              }}
              // filterOptions={(options, params) => {
              //   // const filtered = filter(options, params);

              //   // if (params.inputValue !== "") {
              //   //   filtered.push({
              //   //     inputValue: params.inputValue,
              //   //     title: `Add "${params.inputValue}"`,
              //   //   });
              //   // }

              //   // return filtered;
              // }}
              // id="free-solo-dialog-demo"
              options={
                // top100Films

                handleOption(selectOptions)
              }
              // getOptionLabel={(option) => {
              //   // e.g value selected with enter, right from the input
              //   if (typeof option === "string") {
              //     return option;
              //   }
              //   if (option.inputValue) {
              //     return option.inputValue;
              //   }
              //   return option.name;
              // }}
              selectOnFocus
              clearOnBlur
              // renderOption={(props, option) => {
              //   return <li {...props}>{option.label}</li>;
              // }}
              renderInput={(params) => (
                <TextField {...params} label="Free solo dialog" size="small" />
              )}
              size="small"
            />
            {/* <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={handleOption(selectOptions)}
              value={getVariantType(props.value)}
              onChange={(event, value) => {
                // props.resetProperty();
                props.setSelectValue && props.setSelectValue(props.label);
                props.setSelectKey && props.setSelectKey(value.value);
                props.setVale && props.setVale(props.tempCount);
                props.setFieldKey && props.setFieldKey(props.fieldKey);
                props.onChange && props.onChange(event);
              }}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label={`Search ${props.label}`} />
              )}
            /> */}
          </Box>
          <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
              <DialogTitle>Add a new film</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Did you miss any film in our list? Please, add it!
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  value={dialogValue.title}
                  onChange={(event) =>
                    setDialogValue({
                      ...dialogValue,
                      title: event.target.value,
                    })
                  }
                  label="title"
                  type="text"
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  id="name"
                  value={dialogValue.year}
                  onChange={(event) =>
                    setDialogValue({
                      ...dialogValue,
                      year: event.target.value,
                    })
                  }
                  label="year"
                  type="number"
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add</Button>
              </DialogActions>
            </form>
          </Dialog>
        </Box>
      </ThemeProvider>
    </>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];

export default ComboBox;




/*
 Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)
 All rights reserved.
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License v3.0 as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License v3.0 for more details.
 You should have received a copy of the GNU Lesser General Public License v3.0
 along with this program.  If not, see <https://www.gnu.org/licenses/lgpl-3.0.html/>.
*/