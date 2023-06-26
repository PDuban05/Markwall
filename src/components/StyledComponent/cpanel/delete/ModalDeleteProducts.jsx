import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import {
  StyleButtonAdd,
  StyleButtonEdit,
  StyleButtoncancel,
  StyleButtondelete2,
} from "../../botton";
import { H1 } from "../../Text";

import {
  Category,
  deleteProduct,
  getProduct,
  registerNewProduct,
} from "../../../../firebase/firebase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillTrashFillS, TfiPencilAlts } from "../../Icons";
import { StateUpdate } from "../../../../features/cpanel/UpdateSlice";

const Boxs = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 250px;
  background-color: ${(props) => props.theme.modal};
  border: 1px solid #0000005a;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContainerTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
`;
const ContainerForm = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 30px;
`;

const ContainerInput = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Parrafo = styled.p`
  color: ${(props) => props.theme.text};
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`;

const ContainerControls = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const CustomModalDelete = ({ productId }) => {
  const [query, setQuery] = useState(null);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    setOpen(true);
    const productId = e.currentTarget.querySelector("h1").textContent;
    setQuery(productId);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (query != null) {
      const getData = async () => {
        const result = await getProduct(query);
        const Values = result.filter((item) => Object.keys(item).length > 0);
        setData(Values);
      };
      getData();
    }
  }, [query]);

  const handleSubmit = (e) => {
    deleteProduct(data[0].id);
    dispatch(StateUpdate(Math.floor(Math.random() * (1000 - 1 + 1)) + 1));
    handleClose();
  };

  return (
    <div>
      <StyleButtondelete2 onClick={handleOpen}>
        <h1 style={{ display: "none" }}>{productId}</h1>
        <BsFillTrashFillS />
      </StyleButtondelete2>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Boxs style={{ maxHeight: "90%" }}>
            <ContainerTitle>
              <H1>Delete product</H1>
            </ContainerTitle>

            {data[0]?.name === null ? (
              <Skeleton height={100} />
            ) : (
              <Parrafo>
                Do you want to delete product {data[0]?.name} and all its media
                files?
              </Parrafo>
            )}

            <ContainerControls>
              <StyleButtoncancel onClick={handleClose}>
                Cancel
              </StyleButtoncancel>
              <StyleButtondelete2 onClick={handleSubmit}>
                Delete
              </StyleButtondelete2>
            </ContainerControls>
          </Boxs>
        </Fade>
      </Modal>
    </div>
  );
};

export default CustomModalDelete;
