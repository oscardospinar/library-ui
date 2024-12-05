'use client'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Subcategory } from '../Services/Subcategory';

interface Props {
    initialSubategories: Subcategory[];
}

export default function SubategoryAdministration(props: Props) {

  const {initialSubategories} = props;

  return (
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell >Nombre</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {initialSubategories.map((row) => (
            <TableRow
              key={row.subcategoryId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.subcategoryId}
              </TableCell>
              <TableCell >{row.description}</TableCell>
              <TableCell align="right">
                <ButtonGroup variant="outlined" aria-label="crud botton group">
                    <Button  startIcon={<EditIcon />}>
                        Editar
                    </Button>
                    <Button color="error" startIcon={<DeleteIcon />}>
                        Eliminar
                    </Button>
                </ButtonGroup>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}