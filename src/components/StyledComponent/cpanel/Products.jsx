import React, { useState, useEffect, lazy, Suspense } from "react"; // Import React and useState hook
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector hooks from react-redux

import ThemeProvider from "../../StyledComponent/theme/ThemeProvider";
import ThemeSelector from "../../StyledComponent/theme/ThemeSelector";
import {
  Container,
  ContainerIcon,
  ContainerSearchBar,
} from "../../StyledComponent/Container";
import { ContainerForm } from "../../StyledComponent/Login/Container";
import { H1, Label } from "../../StyledComponent/Text";
import { SearchBar, StyledTextField } from "../../StyledComponent/Inputs";
import {
  AiFillEyeInvisibles,
  AiFillEyes,
  BsFillTrashFillS,
  BsSearchs,
  StyledIconGoogle,
} from "../../StyledComponent/Icons";

import styled from "styled-components";
import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
const CustomModal = lazy(() => import("./add/ModalAddProducts"));

import { getProducts } from "../../../firebase/firebase";
import { StyleButtondelete2 } from "../botton";
import CustomModalEdit from "./edit/ModalEditProducts";
import CustomModalDelete from "./delete/ModalDeleteProducts";

const SideBar = styled.div`
  width: 15%;
  height: 100vh;
  background-color: red;
`;
const NavBar = styled.div`
  width: 100%;
  height: 150px;
  background-color: #00ff6a;
  margin: 0 auto;
`;

const ContainerColumn = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
`;

const ContainerTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 0 20px 0;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
`;

const ContainerControls = styled.div`
  display: flex;
  justify-content: end;
  gap: 5px;
`;
const Img = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin: 0;
`;

const CustomTableCell = styled(TableCell)`
  height: 100px;
`;

const RegisterProduct = () => {
  const [data, setData] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const updatetable = useSelector((state) => state.update.Update);
  const dispatch = useDispatch();

  useEffect(() => {
    const dataquery = async () => {
      const result = await getProducts();
      setData(result);
    };
    dataquery();
  }, [updatetable]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function createData(name, price, discount, description, id, urlImg) {
    return { name, price, discount, description, id, urlImg };
  }

  let rows = [];

  if (data && data.length > 0) {
    rows = data.map((item) =>
      createData(
        item.name,
        item.price,
        item.discount,
        item.description,
        item.id,
        item.urlImg
      )
    );
  }

  return (
    <ThemeProvider>
      <Container>
        <SideBar />
        <ContainerColumn>
          <NavBar>
            <ThemeSelector />
          </NavBar>
          <ContainerForm>
            <ContainerTitle>
              <H1>productos</H1>

              <Suspense
                style={{ display: "flex", alignitems: "center" }}
                fallback={<Skeleton animation="wave" height={60} width={133} />}
              >
                <CustomModal />
              </Suspense>
            </ContainerTitle>

            <Search>
              <ContainerSearchBar>
                <SearchBar id="search-bar" placeholder="Search products" />
                <ContainerIcon>
                  <BsSearchs />
                </ContainerIcon>
              </ContainerSearchBar>
            </Search>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Img</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="right">price</TableCell>
                    <TableCell align="right">discount</TableCell>
                    <TableCell align="center">description</TableCell>
                    <TableCell align="right"> Controls</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length > 0 ? (
                    rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            height: "50px",
                          }}
                        >
                          <TableCell scope="row">
                            <Img src={Object.values(row.urlImg)[0]}></Img>
                          </TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="right">{row.price}</TableCell>
                          <TableCell align="right">{row.discount}</TableCell>
                          <TableCell align="left">
                            {row.description.substring(0, 200)}...
                          </TableCell>
                          <TableCell align="right">
                            <ContainerControls>
                              <CustomModalEdit productId={row.id} />
                              <CustomModalDelete productId={row.id} />
                            </ContainerControls>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <Skeleton animation="wave" height={50} />
                        <Skeleton animation="wave" height={50} />
                        <Skeleton animation="wave" height={50} />
                        <Skeleton animation="wave" height={50} />
                        <Skeleton animation="wave" height={50} />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => {
                  setPage(newPage);
                }}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              />
            </TableContainer>
          </ContainerForm>
        </ContainerColumn>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterProduct;
