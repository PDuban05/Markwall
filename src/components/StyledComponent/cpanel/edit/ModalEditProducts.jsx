import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Rating,
  Typography,
} from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { StyleButtonAdd, StyleButtonEdit } from "../../botton";
import { H1, Text5 } from "../../Text";
import {
  StyledTextField,
  StyledTextField1,
  StyledTextField2,
} from "../../Inputs";
import ImageUploader from "./ImgUploaderEdit";

import {
  Category,
  getProduct,
  registerNewProduct,
} from "../../../../firebase/firebase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TfiPencilAlts } from "../../Icons";
import { FcPrevious } from "react-icons/fc";
import { StateUpdate } from "../../../../features/cpanel/UpdateSlice";

const Boxs = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  background-color: ${(props) => props.theme.modal};
  border: 1px solid #0000005a;
  padding: 30px;
`;

const ContainerTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  margin: 0 0 40px 0;
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

const ContainerRating = styled.div`
  width: 45%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #ffffff5a;
  border-radius: 5px;
`;

const CustomModalEdit = ({ productId }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOptionformat, setSelectedOptionformat] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options3, setOptions3] = useState([]);
  const [query, setQuery] = useState(null);
  const [query2, setQuery2] = useState([]);
  const ImgURL = useSelector((state) => state.URLImg.URL);
  const [dataLoaded, setDataLoaded] = useState(false);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    subcategory: "",
    typeproduct: "",
    discount: "",
    color: "",
    size: "",
    description: "",
    urlImg: "",
    link: "",
    rating: 0,
  });
  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    setOpen(true);
    const productId = e.currentTarget.querySelector("h1").textContent;

    setQuery(productId);
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(StateUpdate(Math.floor(Math.random() * (1000 - 1 + 1)) + 1));
  };

  const handleinput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectedOptionChange = (event, value) => {
    setSelectedOption(value);
    setSelectedOption2(null);
    setSelectedOption3(null);
    setOptions2([]);
    setOptions3([]);

    setForm({ ...form, category: value });
  };

  const handleSelectedOptionChange2 = (event, value) => {
    try {
      setSelectedOption2(value);

      setSelectedOptionformat(
        value
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s/g, "")
      );

      setForm({ ...form, subcategory: value });
    } catch (e) {}

    setSelectedOption3(null);
    setOptions3([]);
  };

  const handleSelectedOptionChange3 = (event, value) => {
    setSelectedOption3(value);
    setForm({ ...form, typeproduct: value });
  };

  useEffect(() => {
    if (selectedOption != null) {
      const getCategories = async () => {
        const result = await Category();
        const categories = [
          ...new Set(result.map((item) => item.data.category)),
        ];
        setOptions(categories);

        if (selectedOption != null) {
          const categoryMatch = result.find(
            (item) => item.data.category === selectedOption
          );

          if (categoryMatch) {
            const subcategories = categoryMatch.data.subcategories.split(",");
            setOptions2(subcategories);
          } else {
            console.log(
              `No se encontraron subcategorías para la categoría ${selectedOption}`
            );
          }

          if (selectedOption2 != null) {
            const subcategories = [
              ...new Set(
                result
                  .filter((item) => item.data.category === selectedOption)
                  .map((item) => item.data.typeProduct)
              ),
            ];
            const objeto = JSON.parse(subcategories);
            const listaDeMuebles = objeto[selectedOptionformat];
            setOptions3(listaDeMuebles);
          }
        }
      };

      getCategories();

      if (ImgURL != form.urlImg) {
        setForm({ ...form, urlImg: "" });
        setForm({ ...form, urlImg: ImgURL });
      }
    }
  }, [selectedOption, selectedOption2, ImgURL]);

  useEffect(() => {
    if (query != null) {
      const getData = async () => {
        const result = await getProduct(query);
        const Values = result.filter((item) => Object.keys(item).length > 0);

        setForm({
          ...form,
          id: Values[0].id,
          name: Values[0].name,
          price: Values[0].price,
          discount: Values[0].discount,
          color: Values[0].color,
          size: Values[0].size,
          description: Values[0].description,
          urlImg: Values[0].urlImg,
          link: Values[0].link,
          rating: Values[0].rating,
        });
        setDataLoaded(true);

        setSelectedOption(Values[0].category);
        setSelectedOption2(Values[0].subcategory);
        setSelectedOption3(Values[0].typeproduct);

        setSelectedOptionformat(
          Values[0].subcategory
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s/g, "")
        );
      };
      getData();
    }
  }, [query]);

  const handleSubmit = (e) => {
    registerNewProduct(form);
    handleClose();
  };

  return (
    <div>
      <StyleButtonEdit onClick={handleOpen}>
        <h1 style={{ display: "none" }}>{productId}</h1>
        <TfiPencilAlts />
      </StyleButtonEdit>

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
          <Boxs style={{ maxHeight: "90%", overflowY: "scroll" }}>
            <ContainerTitle>
              <H1>Edit Productos </H1>
            </ContainerTitle>

            <ContainerForm>
              <ContainerInput>
                <StyledTextField1
                  name="name"
                  label="Name"
                  value={form.name}
                  onChange={handleinput}
                  onKeyUp={handleinput}
                />
                <StyledTextField1
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleinput}
                  label="Price"
                  onKeyUp={handleinput}
                />
              </ContainerInput>
              <ContainerInput>
                <Autocomplete
                  options={options}
                  style={{ width: "40%" }}
                  getOptionLabel={(option) => option}
                  value={selectedOption}
                  renderInput={(params) => (
                    <StyledTextField2
                      {...params}
                      label="Category"
                      style={{ width: "100%" }}
                    />
                  )}
                  onChange={handleSelectedOptionChange}
                />

                <Autocomplete
                  value={selectedOption2}
                  options={options2}
                  style={{ width: "40%" }}
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <StyledTextField2
                      {...params}
                      label="subcategory"
                      style={{ width: "100%" }}
                    />
                  )}
                  onChange={handleSelectedOptionChange2}
                />
              </ContainerInput>
              <ContainerInput>
                <Autocomplete
                  value={selectedOption3}
                  options={options3}
                  style={{ width: "40%" }}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <StyledTextField2
                      {...params}
                      label="subcategory-terciaria"
                      style={{ width: "100%" }}
                    />
                  )}
                  onChange={handleSelectedOptionChange3}
                />
                <StyledTextField1
                  label="discount"
                  name="discount"
                  type="number"
                  value={form.discount}
                  onChange={handleinput}
                  onKeyUp={handleinput}
                />
              </ContainerInput>
              <ContainerInput>
                <StyledTextField1
                  label="Color"
                  name="color"
                  value={form.color}
                  onChange={handleinput}
                  onKeyUp={handleinput}
                />
                <StyledTextField1
                  label="Size"
                  name="size"
                  onChange={handleinput}
                  onKeyUp={handleinput}
                  value={form.size}
                />
              </ContainerInput>

              <ContainerInput>
                <StyledTextField2
                  label="Description"
                  name="description"
                  onChange={handleinput}
                  onKeyUp={handleinput}
                  value={form.description}
                  multiline
                />
              </ContainerInput>
              <ContainerInput>
                <StyledTextField1
                  label="Link"
                  name="link"
                  value={form.link}
                  onChange={handleinput}
                  onKeyUp={handleinput}
                />

                <ContainerRating>
                  <Text5>Rating:</Text5>
                  <Rating
                    name="rating"
                    precision={0.1}
                    value={form.rating}
                    onChange={handleinput}
                  />
                </ContainerRating>
              </ContainerInput>

              <ContainerInput>
                <ImageUploader data={form.urlImg} idProduct={form.id} />
              </ContainerInput>

              <ContainerInput style={{ justifyContent: "end" }}>
                <StyleButtonAdd onClick={handleSubmit}>Save</StyleButtonAdd>
              </ContainerInput>
            </ContainerForm>
          </Boxs>
        </Fade>
      </Modal>
    </div>
  );
};

export default CustomModalEdit;
