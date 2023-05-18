import { Dialog, DialogActions, Icon, Zoom } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import ButtonCustom from '../../../../Components/MuiCustom/ButtonCustom';
import { useDatosEmpresa } from '../../../../Contexts/DatosEmpresaProvider';
import { useVentas } from '../VentasProvider';
import { useRef,Fragment } from 'react';
import './styles.css'

const ImprimirTicketRecibo = () => {
    const {dialogs,setDialogs,indexFactura,datosFacturas,cerrarDialogFactura,valorConvertido} = useVentas();
    
    const {EMPRESA} = useDatosEmpresa()
    const divRef = useRef();
    const imprimir = useReactToPrint({
        content: () => divRef.current,
      });

    const DF = datosFacturas.facturas[indexFactura];
    const widthDimension = EMPRESA.dimension_ticket+"mm";
    const cerrar = ()=>{ 
      setDialogs({...dialogs,imprimirTicketRecibo:false});
      cerrarDialogFactura();
  }

  


  return (
    <Dialog open={dialogs.imprimirTicketRecibo} maxWidth="xs" onClose={cerrar} TransitionComponent={Zoom}>
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
                <td>: {DF.datosFactura.nro_factura}</td>
              </tr>
              <tr>
                <td width='40%'>FECHA</td>
                <td>: {DF.datosFactura.fecha_factura }</td>
              </tr>
              <tr>
                <td width='40%'>CLIENTE: </td>
                <td>: {DF.datosCliente.nombre_cliente} {DF.datosCliente.ruc_cliente}</td>
              </tr>
              <tr>
                <td width='40%'>VENTA</td>
                <td>: {DF.datosFactura.tipoFactura==="3" ? "CREDITO CUOTA" : "CONTADO"  }</td>
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
              {DF.itemsFactura.map((item, i) => (
                  <Fragment key={i}>
                      <tr>
                        <td colSpan={3} valign="top">{item.nombre_producto}</td>
                      </tr>
                      <tr>
                        <td align='right' valign="top">{item.cantidad_producto}</td>
                        <td align='right' valign="top">{valorConvertido(item.precio_guardado)}</td>
                        <td align='right' valign="top">
                          {valorConvertido(item.precio_guardado * item.cantidad_producto)}
                        </td> 
                      </tr>
                  </Fragment>
                    ))}
            </tbody>
          </table>
          <table width='100%'>
            <tbody>
              <tr>
                <td align='right'><b>TOTAL: {valorConvertido(DF.total-DF.descuento)}{" "}{DF.datosMoneda.abreviatura_moneda}</b></td>
              </tr>
              <tr>
                <td align='right'><b>ABONADO: {valorConvertido(DF.datosFactura.totalAbonado)} {DF.datosMoneda.abreviatura_moneda}</b></td>
              </tr>
              <tr><td align='center'> ===================== </td></tr>
              <tr><td align='center' className='_mensajito'> * {EMPRESA.mensaje_recibo_empresa} * </td></tr>
            </tbody>
          </table>
        </div>
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
          size="large"
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

export default ImprimirTicketRecibo
