# Salonia_HIS-Integrador
PARAMETRO DE CONEXION:







ACLARACIONES SOBRE EL DESARROLLO

PENDIENTES: 
-CONECTAR BASE DE DATOS Y PROBAR MODELOS
-VALIDAR FECHAS EN REGISTRO
-LIMITAR NUMEROS DE INGRESO PARA OBRA SOCIAL
-VALIDAR EXTENCION DNI
-MOSTAR HISTORIAL MEDICO EN CASO QUE EL PACIENTE YA CARGO LA INFORMACION EN ALGUN OTRO MOMENTO
-Controlador para traer camas disponibles segun estados
-Controlador para verificar datos de las subtables asociadas a historial medico. Si ya existen por ejemplo cirugias , no se crea una fila nueva, se mantiene la misma. Esto puede suceder en el caso que vuelva el pacinete. 


DISEÑO:
-REGISTRO-INDEX: 
 

ESTILOS:
-Codigo de estilos en su mayoria generado con chat gpt. Al menos en un principio para tener 
una estetica inical. En cuanto se tenga una formato general del diseño, se refinará a mano
 

 PROBLEMAS:
 -Problemas con la modal de index a la hora de combinar el primer formulario de "paciente" con el formulario de ala, habitaciones y camas. El problema ocurre porque el segundo boton, de la ventana emergente, es el encargado de enviar el contenido de ambos formularios. Hay dos soluciones. La primera es realizar dos POST, el primero que envie la informacion del paciente, y el segundo que modifique el estado de las camas y habitaciones y realice una asociacion entre cama y paciente, en el que el ultimo tiene asociado en su tabla un id de la cama (aunque esto no lo veo necesario ya que en las camas se podra localizar al paciente)
 
 -Problema con modales en REGISTRO solucionados faltaria una correcta validadcion de los datos ingresados y un controlador que verifique la existencia o no del pacientes, la disponibilidad de capas segun estado e higiene.

 -Problema con validaciones y controladores. Detallados debajo en sus respectivas secciones 
 

 VALIDACIONES: 
 -Validacion en modales: Para la validacion en la seccion de registro de un paciente se hizo en la primera entrada de infromacion con una validacion visual que evita que se abra la modal de alas. Esto ocurre de esta manera debido a que el POST recien ser ejecutará al confirmar TODOS los datos en la segunda ventana emergente, por lo que no se da una entrada de datos al servidor al hacer click al primer boton. Luego, una vez confirmado los datos se controloran (especificacion en seccion CONTROLADORES) estos datos.

 CONTROLADORES:
 
 
 -POST /agregar/paciente. Para controlar los datos previamente validados de paciente, habitacion y cama. Con el primer objeto se verificara su existencia, si es asi se actuializaran los datos, si no, se creeara uno nuevo. Camas modificara sus estados al igual que habitaciones. 

