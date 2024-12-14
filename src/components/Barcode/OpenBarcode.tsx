import React, { ReactElement, useEffect, useState } from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

interface Props {
  src: string | undefined; 
  open: boolean;
  onClose: () => void;
}



export default function OpenBarcode({ src, onClose, open }: Props): ReactElement {

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
    return () => setBase64Image("");
  }, [src]);

  const downloadImage = () => {
    if (base64Image) {
      const link = document.createElement("a");
      link.href = base64Image;
      link.download = "codigo-de-barras.png"; 
      document.body.appendChild(link); 
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("No hay imagen disponible para descargar.");
    }
  };


  const handleClose = () => {
    onClose();
  };


  return (
    <Dialog onClose={handleClose} open={open} >
      {base64Image ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            padding:3
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: 1 }}>
          Código de barras generado:
          </Typography>
          <CardMedia
            component="img"
            image={base64Image}
            sx={{
              maxWidth: "100%",
              borderRadius: 4,
              border: "1px solid #ddd",
            }}
          />
          <Button variant="contained" startIcon={<SaveAltIcon />}  onClick={downloadImage}>
            Guardar Imagen
          </Button>
        </Box>
      ) : (
        <Typography variant="body2" color="error">
          No se pudo generar la imagen del código de barras.
        </Typography>
      )}
    </Dialog>
  );
}
