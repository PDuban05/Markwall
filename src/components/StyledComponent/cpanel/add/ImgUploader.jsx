import { Button, Card, CardMedia, makeStyles } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { deleteFile, uploadFile } from "../../../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { StyleButtonDelete } from "../../botton";
import { BsFillTrashFills, IconUploadImg } from "../../Icons";
import { useDispatch } from "react-redux";
import { StateImgUrl } from "../../../../features/cpanel/LoadImgSlice";

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FileInput = styled.input`
  display: none;
`;

const Label = styled.label`
  width: 120px;
  background-color: #f1f3f4;
  color: #5f6368;
  font-size: 14px;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  margin-right: 8px;

  &:hover {
    background-color: #e2e4e6;
  }
`;
const Img = styled.img`
  width: 200px;
  height: 80%;
  object-fit: cover;
`;
const ContainerUploadImg = styled.div`
  width: 100%;
  height: 500px;
  background-color: ${(props) => props.theme.modal};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: relative;
  overflow-y: scroll;
  padding: 30px 0;
`;

const ContainerImg = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 200px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  z-index: 2;
`;

const ConstainerDelete = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageUploader = ({ idProduct }) => {
  console.log(idProduct);
  const [imageRef, setImageRef] = useState({});
  const dispatch = useDispatch(); // Create a dispatch function to dispatch actions

  const handleFileChange = async (e) => {
    const images = e.target.files;

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const name = uuidv4() + "_" + idProduct;
      const result = await uploadFile(image, name);

      setImageRef((prevState) => ({
        ...prevState,
        [name]: result[name],
      }));
    }
  };

  const handleDelete = async (key, id) => {
    await deleteFile(key);

    setImageRef((prevState) => {
      const newState = { ...prevState };
      delete newState[id];
      return newState;
    });
  };

  useEffect(() => {
    dispatch(StateImgUrl(imageRef));
  }, [imageRef]);

  return (
    <InputWrapper>
      <Label htmlFor="file-input">
        Choose Files
        <FileInput
          id="file-input"
          type="file"
          onChange={handleFileChange}
          multiple
        />
      </Label>

      <ContainerUploadImg>
        {Object.keys(imageRef).map((key) => (
          <ContainerImg key={key}>
            <Img src={imageRef[key]} />

            <ConstainerDelete>
              <StyleButtonDelete
                onClick={() => handleDelete(imageRef[key], key)}
              >
                <BsFillTrashFills />
              </StyleButtonDelete>
            </ConstainerDelete>
          </ContainerImg>
        ))}
      </ContainerUploadImg>
    </InputWrapper>
  );
};

export default ImageUploader;
