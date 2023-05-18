import { CircularProgress, Dialog, DialogActions, Icon, Stack, Zoom } from "@mui/material";
import {useRef,Fragment} from 'react'
import { useReactToPrint } from 'react-to-print';
import ButtonCustom from "../../../../Components/MuiCustom/ButtonCustom";
import { useDatosEmpresa } from "../../../../Contexts/DatosEmpresaProvider";
import { funciones } from "../../../../Functions";
import { useFacturas } from "../FacturasProvider";
import '../../Vender/Impresiones/styles.css'
const ImpresionTicketRecibo = () => {

  const {EMPRESA} = useDatosEmpresa()
  const {dialogs,setDialogs,formulario,itemsFactura,loadings} = useFacturas();
  const divRef = useRef();
    const imprimir = useReactToPrint({
        content: () => divRef.current,
      });

    
  const widthDimension = EMPRESA.dimension_ticket+"mm";

  const DF = {...formulario}

  const cerrar = ()=>{
    setDialogs({...dialogs,imprimirTicketRecibo:false})
  }

  return (
    <Dialog open={dialogs.imprimirTicketRecibo} maxWidth="xs" onClose={cerrar} TransitionComponent={Zoom}>
      {loadings.factura ? (
        <Stack sx={{ padding: "20px" }} alignItems="center"><CircularProgress /></Stack>
      ) : 
      <div ref={divRef} style={{ width: `${widthDimension}` }} className='div_print_ticket' >
      <table width='100%'>
        <tbody>
          <tr>
            <th align='center'>{EMPRESA.nombre_empresa}</th>
          </tr>
          <tr>
            <td align='center'> ===================== </td>
          </tr>
        </tbody>
      </table>
      <table width='100%' className='_tabledatos_ticket'>
        <tbody>
          <tr>
            <td width='40%'>FACTURA</td>
            <td>: {DF.nro_factura}</td>
          </tr>
          <tr>
            <td width='40%'>FECHA</td>
            <td>: {DF.fecha_factura }</td>
          </tr>
          <tr>
            <td width='40%'>CLIENTE: </td>
            <td>: {DF.nombre_cliente} {DF.ruc_cliente}</td>
          </tr>
          <tr>
            <td width='40%'>VENTA</td>
            <td>: {DF.tipo_factura==="3" ? "CREDITO CUOTA" : "CONTADO"  }</td>
          </tr>
        </tbody>
      </table>
      <table width='100%' className='_table_items_descripcion'>
        <tbody>
          <tr><td colSpan={3}> ===================== </td></tr>
          <tr>
            <td>Descrip /  Cant.</td>
            <td>Precio</td>
            <td>Subt.</td>
          </tr>
          <tr><td colSpan={3}> ===================== </td></tr>
        </tbody>
      </table>
      <table width='100%' className='_tabla_items'>
        <tbody>
              {itemsFactura.map((e, i) => (
                      <Fragment key={i}>
                      <tr>
                        <td colSpan={3} valign="top">{e.nombre_producto}</td>
                      </tr>
                      <tr>
                        <td align='right' valign="top">{e.cantidad_producto}</td>
                        <td align='right' valign="top">{funciones.numberFormat(e.precio_producto_factura)}</td>
                        <td align='right' valign="top">
                        {funciones.numberFormat(parseFloat(e.precio_producto_factura) * parseFloat(e.cantidad_producto))}
                        </td> 
                      </tr>
                  </Fragment>
                    ))}
        </tbody>
      </table>
      <table width='100%' >
        <tbody>
          <tr>
            <td align='right'><b>TOTAL: {funciones.numberSeparator(parseFloat(DF.monto_total_factura)-parseInt(DF.descuento_factura))}{" "}{DF.abreviatura_moneda}</b></td>
          </tr>
          
          <tr><td align='center'> ===================== </td></tr>
          <tr><td align='center' className="_mensajito"> * {EMPRESA.mensaje_recibo_empresa} * </td></tr>
        </tbody>
      </table>
    </div>
      }
        <DialogActions>
        <ButtonCustom 
          variant="contained"
          color="primary"
          startIcon={<Icon>print</Icon>}
          onClick={imprimir}
        >
          Imprimir
        </ButtonCustom>
        <ButtonCustom
          variant="outlined"
          color="primary"
          onClick={cerrar}
        >
          Cerrar
        </ButtonCustom>
      </DialogActions>
    </Dialog>
  )
}

export default ImpresionTicketRecibo
