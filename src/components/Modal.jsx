import { useState , useEffect } from "react";

import CerrarBtn from "../img/cerrar.svg";
import Mensaje from './Mensaje'


function Modal({ setModal, animarModal, setAnimarModal , guardarGasto , gastoEditar , setGastoEditar}) {

  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, SetCategoria] = useState("");
  const [mensaje , setMensaje] = useState("");

  const [id , setId] = useState('')
  const [fecha  , setFecha] = useState('')


  useEffect(() =>{
    if(Object.keys(gastoEditar).length > 0){
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      SetCategoria(gastoEditar.categoria)
      setMensaje(gastoEditar.mensaje)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  },[])

  const OcultarModal = () => {
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 400);
    setGastoEditar({})
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    if([nombre,cantidad,categoria].includes('')){
      setMensaje('Todos los campos son obligatorios')
      console.log('Fallo La validacion')
      setTimeout(() => {
        setMensaje('')
      }, 3000);
      return
    }
    guardarGasto({nombre,cantidad,categoria , id , fecha})
    setMensaje('')
    setGastoEditar('')
  }

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={CerrarBtn}
          alt="Cerrar Modal"
          onClick={OcultarModal}
          style={{ cursor: "pointer" }}
        />
      </div>

      <form
        action=""
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        onSubmit={handleSubmit}
      >
        <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

          {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            type="text"
            id="nombre"
            placeholder="Añade el nombre del gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            id="cantidad"
            placeholder="Añade la cantidad del gasto : EJ . 300"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => SetCategoria(e.target.value)}
          >
            <option value="">--Seleccione una Categoria--</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="ahorro">Ahorro</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input className="input" type="submit" value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}></input>
      </form>
    </div>
  );
}

export default Modal;
