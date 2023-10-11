import { useState } from 'react';
/* eslint-disable */

// mui import
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// project import
import ModalUI from 'ui-component/ModalUI';
// utils import
import { lugaresDeCompra, presentacionDeProductos, estadoProdcuto } from 'utils/productsDataUtils';

const AddProductModal = ({ addProduct, showModal, closeModal }) => {
  // dropdown options

  const [formData, setFormData] = useState({
    nombre: '',
    presentacion: '',
    marca: '',
    modelo: '',
    estado: '',
    stock: '',
    lugar: '',
    imagen: '',
    almacen: '',
    minima: ''
  });

  const handleChange = (e, setFormData) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleInputChange = (e) => {
    handleChange(e, setFormData);
  };

  const [showNotificationSuccess, setShowNotificationSuccess] = useState(false);
  const [showNotificationError, setShowNotificationError] = useState(false);

  // const { addProduct } = useProducts();

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowNotificationSuccess(false);
    setShowNotificationError(false);
  };

  const onSubmitModal = () => {
    // promise linked to the result of adding data
    return addProduct(formData).then((response) => {
      if (response.error) {
        setShowNotificationError(true);
      } else {
        closeModal();
        setShowNotificationSuccess(true);
        setFormData({ nombre: '', presentacion: '', marca: '', modelo: '', estado: '', stock: '', lugar: '', imagen: '', almacen: '' });
      }
    });
  };
  return (
    <>
      <Modal
        open={showModal}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <ModalUI title={'Agregar Artículo'} closeModal={closeModal}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack spacing={2} mt={2}>
              <TextField
                required
                name="nombre"
                onChange={(e) => handleInputChange(e)}
                color="secondary"
                id="outlined-basic"
                label="Nombre del Artículo"
                variant="outlined"
              />
            </Stack>
            <Stack spacing={2} direction="row" mt={2}>
              <Autocomplete
                disablePortal
                id="combo-box-presentacion"
                options={presentacionDeProductos}
                sx={{ width: '60%' }}
                onChange={(e) => setFormData({ ...formData, presentacion: e.target.outerText.toUpperCase() })}
                renderInput={(params) => <TextField {...params} label="Paquete" />}
              />
              <TextField
                name="marca"
                required
                onChange={(e) => handleInputChange(e)}
                color="secondary"
                id="outlined-basic"
                label="Marca"
                variant="outlined"
              />
            </Stack>
            <Stack spacing={2} direction="row" mt={2}>
              <TextField
                name="modelo"
                onChange={(e) => handleInputChange(e)}
                color="secondary"
                id="outlined-basic"
                label="Modelo"
                variant="outlined"
              />
              <TextField
                name="stock"
                required
                onChange={(e) => handleInputChange(e)}
                color="secondary"
                id="outlined-basic"
                label="Stock"
                type="number"
                variant="outlined"
              />
            </Stack>
            <Stack spacing={2} direction="row" mt={2}>
              <Autocomplete
                disablePortal
                id="combo-box-presentacion"
                sx={{ width: '60%' }}
                options={estadoProdcuto}
                onChange={(e) => setFormData({ ...formData, estado: e.target.outerText })}
                renderInput={(params) => <TextField {...params} label="Estado" />}
              />
              <TextField
                name="almacen"
                required
                onChange={(e) => handleInputChange(e)}
                color="secondary"
                id="outlined-basic"
                label="Existencia"
                type="number"
                variant="outlined"
              />
            </Stack>
            <Stack spacing={2} direction="row" mt={2}>
              <Autocomplete
                sx={{ width: '60%' }}
                disablePortal
                id="combo-box-demo"
                options={lugaresDeCompra}
                onChange={(e) => setFormData({ ...formData, lugar: e.target.outerText.toUpperCase() })}
                renderInput={(params) => <TextField {...params} label="Lugar de Compra" />}
              />
              <TextField
                name="minima"
                required
                onChange={(e) => handleInputChange(e)}
                color="secondary"
                id="outlined-basic"
                label="Cantidad Mínima"
                type="number"
                variant="outlined"
              />
            </Stack>
            <p>Sube una foto de el artículo</p>
            <TextField
              name="image"
              onChange={(e) => setFormData({ ...formData, imagen: e.target.files[0] })}
              color="secondary"
              id="outlined-basic"
              type="file"
              variant="standard"
            />

            <Stack mt={2}>
              <Button type="submit" onClick={onSubmitModal} size="medium" variant="contained">
                Agregar
              </Button>
            </Stack>
          </form>
        </ModalUI>
      </Modal>
      <Snackbar
        autoHideDuration={2000}
        open={showNotificationSuccess}
        message="Artículo Agregado"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert severity="info">Artículo Agregado</Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={2000}
        open={showNotificationError}
        message="Artículo Agregado"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert severity="error">Error al agregar articulo</Alert>
      </Snackbar>
    </>
  );
};

AddProductModal.propTypes = {
  closeModal: PropTypes.func,
  showModal: PropTypes.bool
};

export default AddProductModal;
