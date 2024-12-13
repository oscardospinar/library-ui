import React, { ReactElement, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Button from '@mui/material/Button';
import OpenBarcode from "./OpenBarcode";

interface Props {
  bookId: string;
  handleClickOpen: () => void;
}

export default function Barcode({ bookId, handleClickOpen }: Props): ReactElement {
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        marginTop: 3,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#e3f2fd",
          padding: 2,
          borderRadius: 2,
          border: "1px solid #90caf9",
          width: "fit-content",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" component="p">
          Identificación del Libro
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "1.1rem",
            fontWeight: 500,
            color: "#1976d2",
          }}
        >
          {bookId}
        </Typography>
        <Button variant="contained" startIcon={<SaveAltIcon />}  onClick={handleClickOpen}>
            Ver código de barras
        </Button>
      </Box>
    </Box>
  );
}
