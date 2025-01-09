import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [voladoresData, setVoladoresData] = useState([]);
  const [rastrerosData, setRastrerosData] = useState([]);
  const [roedoresData, setRoedoresData] = useState([]);
  const [productosData, setProductosData] = useState([]);
  const [clienteData, setClienteData] = useState([]);
  const [exportarData, setExportarData] = useState([]);
  const [usuarioData, setUsuarioData] = useState([]);

  return (
    <DataContext.Provider
      value={{
        voladoresData,
        setVoladoresData,
        rastrerosData,
        setRastrerosData,
        roedoresData,
        setRoedoresData,
        productosData,
        setProductosData,
        clienteData,
        setClienteData,
        exportarData,
        setExportarData,
        usuarioData,
        setUsuarioData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
