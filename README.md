# Salonia_HIS-Integrador

ESTILOS:
-Codigo de estilos en su mayoria generado con chat gpt. Al menos en un principio para tener 
una estetica inical. En cuanto se tenga una formato general del diseño, se refinará a mano
 

 PROBLEMAS:
 -Problemas con la modal de index a la hora de combinar el primer formulario de "paciente" con el formulario de ala, habitaciones y camas. El problema ocurre porque el segundo boton, de la ventana emergente, es el encargado de enviar el contenido de ambos formularios. Hay dos soluciones. La primera es realizar dos POST, el primero que envie la informacion del paciente, y el segundo que modifique el estado de las camas y habitaciones y realice una asociacion entre cama y paciente, en el que el ultimo tiene asociado en su tabla un id de la cama (aunque esto no lo veo necesario ya que en las camas se podra localizar al paciente)
 
