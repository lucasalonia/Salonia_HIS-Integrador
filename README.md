# Salonia_HIS-Integrador

# EJECUCION DESDE CONSOLA:
nodemon start

# PARAMETRO DE CONEXION:
DB_HOST=shuttle.proxy.rlwy.net
DB_USER=root
DB_PASSWORD=yRHwIqPMXYicnrkQYAadJVNjNQsvICrw
DB_NAME=railway
DB_TIMEZONE=-03:00
DB_PORT=45987
PORT=3000

# ACLARACIONES SOBRE EL DESARROLLO:
-La aplicacion esta pensada para ser utilizada en una resolucion 1920 X 1080 ya que no tiene media query desarrolladas
-El ingreso es exclusivo con cuenta de google por una cuestion de tiempo. No alcance a agregar mas opciones
-Muchas vistas, inputs y botones carecen de funcionalidad debido a la falta de tiempo para su desarrollo. Estas son las secciones de enfermeria que se pueden acceder desde /enfermeria/principal. El link a la seccion de Medicos esta desactivado. En Administracion/principal ofrece tres opciones de las cuales solo se puede acceder a "Administracion Camas", ultima solo con un desarrollo en css y pug. NO se traen camas de la base de datos. El input de busqeuda en listaPacientes NO es funcional. Error no solucionado en fichaPaciente para mostrar foto y nombre del perfil que esta utilizando el sistema. Parece que haciendo click al usuario activo que figura en la esquina superior izquierda del header se deberia poder acceder a un menu del Perfil de dicho usuario. Queda pendiente
