import React, { ReactElement, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  src: string; 
  bookId: string;
}

export default function Barcode({ src, bookId }: Props): ReactElement {
  const [base64Image, setBase64Image] = useState("");

  useEffect(() => {
    
    if (src) {
      if (!src.startsWith("data:image/")) {
        setBase64Image(`data:image/png;base64,${src}`);
      } else {
        setBase64Image(src);
      }
    } else {
      console.error("El atributo 'src' está vacío o no válido.");
    }
  }, [src]);

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
      </Box>

      {base64Image ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: 1 }}>
          Código de barras generado:
          </Typography>
          <img
            src={base64Image}
            style={{
              maxWidth: "100%",
              borderRadius: 4,
              border: "1px solid #ddd",
            }}
          />
        </Box>
      ) : (
        <Typography variant="body2" color="error">
          No se pudo generar la imagen del código de barras.
        </Typography>
      )}
    </Box>
  );
}
