import React from "react";
import axios from "axios";
import * as XLSX from "xlsx";

function ExcelToJsonConverter() {
  const [jsonData, setJsonData] = React.useState(null);
  const [fileLink, setFileLink] = React.useState("");

  const handleFileLoad = async () => {
    const response = await axios.get(fileLink, {
      responseType: "arraybuffer",
    });

    const data = response.data;
    const workbook = XLSX.read(data, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const json = XLSX.utils.sheet_to_json(sheet);
    const formattedJson = formatAsDictionary(json);

    setJsonData(formattedJson);
  };


  const removeEmptyKeys = (data) => {
    return data
      .map((item) => {
        const newItem = {};
        Object.keys(item).forEach((key) => {
          if (
            item[key] !== undefined &&
            item[key] !== null &&
            key !== "__EMPTY" &&
            key !== "__rowNum__"
          ) {
            newItem[key] = item[key];
          }
        });
        if (Object.keys(newItem).length > 0) {
          return newItem;
        } else {
          return null; // Opcional: devolver null en lugar de un objeto vacío
        }
      })
      .filter((item) => item !== null); // Eliminar objetos vacíos del array resultante
  };

  const formatAsDictionary = (json) => {
    const formattedData = [];
    let obs = removeEmptyKeys(json);

    // Obtener los nombres de campo
    const fields = obs[0];

    // Iterar sobre cada objeto del arreglo y renombrar los campos
    const result = obs.slice(1).map((obj) => {
      const newObj = {};
      Object.keys(fields).forEach((key) => {
        newObj[fields[key]] = obj[key];
      });
      return newObj;
    });

    formattedData.push(result);

    return formattedData; // Devolvemos el nuevo arreglo sin los objetos vacíos
  };

  return (
    <div>
      <input
        type="text"
        value={fileLink}
        onChange={(e) => setFileLink(e.target.value)}
      />

      <button onClick={handleFileLoad}>Load File</button>

      {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
    </div>
  );
}

export default ExcelToJsonConverter;
