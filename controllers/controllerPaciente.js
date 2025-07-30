const {
  Paciente,
  Internacion,
  Derivacion,
  ObraSocial,
  Medico,
  Cama,
  Alergias,
  Enfermedades,
  Cirugias,
  Antecedentes,
  Medicamentos,
  Sintomas,
  Necesidades,
  InternacionPrioridad,
  EvaluacionBasica,
  Intervenciones,
  Analisis,
  Radiografias,
  Resonancias,
  Fisioterapias,
  Tratamientos,
  Ocupacionales,
  PacienteMedicamentos,
} = require("../models/index.js");

const { sequelize } = require("../config/db");

const crearPaciente = async (req, res) => {
  const { paciente, mutual, medico, asignacion } = req.body;

  const transaction = await sequelize.transaction();
  const dni = paciente.dni;
  if (dni.startsWith("00")) {
    paciente.es_nn = true;
  } else {
    paciente.es_nn = false;
  }
  try {
    let pacienteCargado = await Paciente.buscarPacientePorDni(dni, {
      transaction,
    });
    if (pacienteCargado) {
      await pacienteCargado.update(paciente, { transaction });
    } else {
      pacienteCargado = await Paciente.crearPaciente(paciente, {
        transaction,
      });
    }

    await Internacion.crearInternacion(
      {
        id_cama: asignacion.cama,
        id_paciente: pacienteCargado.id,
      },
      { transaction }
    );

    const obraSocialExistente = await ObraSocial.buscarObraSocialPorIdPaciente(
      pacienteCargado.id,
      { transaction }
    );
    if (obraSocialExistente) {
      await obraSocialExistente.update(
        {
          nombre: mutual.obra_social,
          numero: mutual.numero_obra_social,
          id_paciente: pacienteCargado.id,
        },
        { transaction }
      );
    } else {
      await ObraSocial.crearObraSocial(
        {
          nombre: mutual.obra_social,
          numero: mutual.numero_obra_social,
          id_paciente: pacienteCargado.id,
        },
        { transaction }
      );
    }

    if (medico.medico_derivador) {
      await Derivacion.crearDerivacion(
        {
          id_medico: medico.medico_derivador,
          id_paciente: pacienteCargado.id,
        },
        { transaction }
      );
    }

    await Cama.actualizarEstadoCama(
      asignacion.cama,
      { liberada: false },
      { transaction }
    );

    await transaction.commit();

    res.status(201).json({
      success: true,
      mensaje: "Paciente agregado con éxito",
      pacienteCargado,
    });
  } catch (error) {
    console.error("Error en el controlador:", error);
    await transaction.rollback();
    res
      .status(500)
      .json({ mensaje: "Error al agregar paciente", error: error.message });
  }
};

const listarPacientesOpcionLimpia = async () => {
  const pacientes = await Paciente.findAll({
    where: {
      borradoLogico: true,
    },
    include: [
      {
        model: Internacion,
        include: [Cama],
        required: false,
      },
      {
        model: Derivacion,
        include: [Medico],
        required: false,
      },
      {
        model: ObraSocial,
        required: false,
      },
    ],
  });

  const pacientesInternados = pacientes.filter(
    (p) => p.Internacions && p.Internacions.length > 0
  );

  return pacientesInternados;
};

const listarPacientes = async (req, res) => {
  try {
    const fotoPerfil = req.user.foto_perfil;
    const nombreUsuario = req.user.usuario;
    const pacientes = await Paciente.findAll({
      where: {
        borradoLogico: true,
      },
      include: [
        {
          model: Internacion,
          include: [Cama],
          required: false,
        },
        {
          model: Derivacion,
          include: [Medico],
          required: false,
        },
        {
          model: ObraSocial,
          required: false,
        },
      ],
    });

    const pacientesInternados = pacientes.filter(
      (p) => p.Internacions && p.Internacions.length > 0
    );

    const datos = pacientesInternados.map((paciente) => {
      const internacion = paciente.Internacions[0];
      const cama = internacion.Cama;

      const derivacion = paciente.Derivacions[0];
      const medico = derivacion ? derivacion.Medico : null;

      const obraSocial = paciente.ObraSocial;

      const fechaStr = internacion.fecha_ingreso.split("T")[0];
      const fecha = new Date(fechaStr + "T12:00:00");
      const fechaFormateada = fecha.toLocaleDateString("es-AR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      return {
        id: paciente.id,
        nombre: paciente.nombre,
        apellido: paciente.apellido,
        dni: paciente.dni,
        telefono:
          paciente.numero_emergencia && paciente.numero_emergencia !== "x"
            ? paciente.numero_emergencia
            : "Sin asignar",
        natalicio: new Date(paciente.fecha_nacimiento).toLocaleDateString(
          "es-AR",
          {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }
        ),
        sexo: paciente.sexo,
        direccion: paciente.direccion,
        ciudad: paciente.ciudad,
        correo:
          paciente.email && !paciente.email.toLowerCase().startsWith("x")
            ? paciente.email
            : "Sin Asignar",
        vias: paciente.medios_ingreso,
        fecha_ingreso: fechaFormateada,
        medico: medico ? `${medico.nombre} ${medico.apellido}` : "-",
        obraSocial: obraSocial ? obraSocial.nombre : "Sin Asignar",
        numeroObraSocial:
          obraSocial && obraSocial.numero !== 0
            ? obraSocial.numero
            : "Sin asignar",
        cama: cama ? cama.numero_cama : "Sin asignar",
        es_nn: paciente.es_nn,
      };
    });

    res.render("pacientes/listaPacientes", {
      pacientes: datos,
      fotoPerfil: fotoPerfil,
      nombreUsuario: nombreUsuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al listar pacientes");
  }
};

const buscarPacientePorDni = async (req, res) => {
  const dni = req.params.dni;

  const paciente = await Paciente.buscarPacientePorDni(dni);

  if (!paciente) {
    return res.json({ paciente: null, obraSocial: null, medico: null });
  }

  const id_paciente = paciente.id;
  const obraSocial = await ObraSocial.buscarObraSocialPorIdPaciente(
    id_paciente
  );

  const derivacion = await Derivacion.buscarDerivacionPorIdPaciente(
    id_paciente
  );
  let medico = null;
  if (derivacion && derivacion.id_medico) {
    medico = await Medico.buscarMedicoPorId(derivacion.id_medico);
  }

  res.json({ paciente, obraSocial, medico });
};

const buscarUltimoPacienteNN = async (req, res) => {
  const paciente = await Paciente.buscarUltimoPacienteNN();

  if (!paciente) {
    return res.json({ paciente: null });
  }

  const nuevoDni = (parseInt(paciente.dni, 10) + 1).toString().padStart(8, "0");
  paciente.dni = nuevoDni;

  res.json({ paciente });
};

const recuperarDatosPaciente = async (req, res) => {
  const id = req.params.id;

  try {
    const paciente = await Paciente.buscarPacientePorId(id);
    let medicoPredefinido = { nombre: "Sin Asignar", apellido: "Sin Asignar" };

    const internacion = await Internacion.buscarInternacionPorIdPaciente(id);
    const id_cama = internacion ? internacion.id_cama : null;
    const cama = await Cama.buscarCamaPorId(id_cama);
    const obraSocial = await ObraSocial.buscarObraSocialPorIdPaciente(id);
    const derivacion = await Derivacion.buscarDerivacionPorIdPaciente(id);
    const medico = derivacion
      ? await Medico.buscarMedicoPorId(derivacion.id_medico)
      : medicoPredefinido;

    if (!paciente || !internacion || !cama || !obraSocial) {
      return res.status(404).json({ mensaje: "Datos no econtrados" });
    }

    res.render("pacientes/fichaPaciente", {
      paciente,
      internacion,
      cama,
      obraSocial,
      medico,
    });
  } catch (error) {
    console.error("Error en el controlador", error);
    res.status(500).json({ mensaje: "EError al recuperar datos" });
  }
};

const modificarDatosPaciente = async (req, res) => {
  const id = req.params.id;
  const { paciente, mutual } = req.body;
  if (!paciente) {
    return res.status(400).json({ mensaje: "Faltan datos requeridos" });
  }
  const transaction = await sequelize.transaction();

  try {
    const pacienteExistente = await Paciente.buscarPacientePorId(id);
    if (!pacienteExistente) {
      await transaction.rollback();
      return res.status(404).json({ mensaje: "Paciente no encontrado" });
    }

    const dniTemporal = pacienteExistente.dni
      ? pacienteExistente.dni.toString()
      : "";
    const nn = pacienteExistente.es_nn;

    // Caso: Paciente con DNI temporal (NN)
    if (dniTemporal.startsWith("0") && nn) {
      const dniIngresado = paciente.dni;
      const pacienteConDniExistente = await Paciente.buscarPacientePorDni(
        dniIngresado
      );
      const idPacienteExistente = pacienteConDniExistente
        ? pacienteConDniExistente.id
        : null;

      if (pacienteConDniExistente && !pacienteConDniExistente.borradoLogico) {
        // Caso: ya existe un paciente con el DNI ingresado

        const internacion = await Internacion.buscarInternacionPorIdPaciente(
          pacienteExistente.id
        );

        if (!internacion) {
          await transaction.rollback();
          return res
            .status(404)
            .json({ mensaje: "Internación no encontrada para el paciente NN" });
        }

        await internacion.update(
          {
            id_paciente: idPacienteExistente,
            fecha_ingreso: internacion.fecha_ingreso,
            hora_ingreso: internacion.hora_ingreso,
          },
          { transaction }
        );

        await Paciente.modificarDatosPaciente(idPacienteExistente, paciente, {
          transaction,
        });
        await Paciente.altaLogicoPaciente(idPacienteExistente, { transaction });

        await ObraSocial.actualizarObraSocialPorIdPaciente(
          idPacienteExistente,
          {
            nombre: mutual.obra_social,
            numero: mutual.numero_obra_social,
          },
          { transaction }
        );

        await Paciente.eliminacionCompletaPacienteNN(id, { transaction });

        console.log("todo bien");
        await transaction.commit();
        return res
          .status(200)
          .json({ exito: true, mensaje: "Paciente actualizado correctamente" });

        //Si coincide el DNI ingresado con un paciente que SI esta internado (borradoLogico en true, es decir existe en el sistema)
      } else if (
        pacienteConDniExistente &&
        pacienteConDniExistente.borradoLogico == true
      ) {
        await transaction.rollback();
        console.log("Los DNI coinciden entre paciente DESCONOCIDO y CONOCIDO");

        return res.status(409).json({
          mensaje:
            "Error en el DNI: El paciente con ese documento ya se encuentra internado",
          dni: pacienteConDniExistente.dni,
        });
      } else {
        // Caso: Paciente NN y el nuevo DNI no existe previamente
        await Paciente.modificarDatosPaciente(id, paciente, { transaction });
        await Paciente.anularEstadoNN(id, { transaction });

        await ObraSocial.actualizarObraSocialPorIdPaciente(
          id,
          {
            nombre: mutual.obra_social,
            numero: mutual.numero_obra_social,
          },
          { transaction }
        );

        await transaction.commit();
        return res.status(200).json({
          exito: true,
          mensaje: "Paciente NN actualizado con nuevo DNI",
        });
      }
    }

    //Evitamos que se ingrese un DNI repetido con un paciente que NO es NN

    const consultarPaciente = await Paciente.buscarPacientePorDni(paciente.dni);

    if (consultarPaciente) {
      // Caso: Paciente con DNI ya válido, solo se actualizan datos

      await Paciente.modificarDatosPaciente(id, paciente, { transaction });
      console.log("entro aca");
      console.log(id);

      await ObraSocial.actualizarObraSocialPorIdPaciente(
        id,
        {
          nombre: mutual.obra_social,
          numero: mutual.numero_obra_social,
        },
        { transaction }
      );

      await transaction.commit();
      return res.status(200).json({
        exito: true,
        mensaje: "Datos del paciente actualizados correctamente",
      });
    } else {
      await transaction.rollback();
      console.log("Los DNI coinciden entre pacientes CONOCIDOS");

      return res.status(409).json({
        mensaje:
          "Error en el DNI: El paciente con ese documento ya se encuentra internado",
      });
    }
  } catch (error) {
    console.error("Error en el controlador", error);
    await transaction.rollback();
    return res
      .status(500)
      .json({ mensaje: "Error al modificar los datos del paciente" });
  }
};

const boradoLogicoPaciente = async (req, res) => {
  
  const id = req.params.id;
 
  
  const transaction = await sequelize.transaction();

  try {
    const paciente = await Paciente.borrarLogicoPaciente(id, { transaction });
    const internacion = await Internacion.buscarInternacionPorIdPaciente(id, {
      transaction,
    });
    const id_cama = internacion ? internacion.id_cama : null;
    const cama = await Cama.actualizarEstadoCamaPorId(id_cama, { transaction });

    await Internacion.darAlta(id, { transaction });

    if (!paciente || !internacion || !cama) {
      return res.status(404).json({ mensaje: "Datos no econtrados" });
    }
    await transaction.commit();

    res
      .status(200)
      .json({ exito: true, mensaje: "Datos modificacdos correctamente" });
  } catch (error) {
    console.error("Error en el controlador", error);

    await transaction.rollback();

    res.status(500).json({ mensaje: "Error al eliminar el paciente" });
  }
};


const buscarPacientePorDniGenerico = async (req, res) => {
  const dni = req.params.dni;

  const paciente = await Paciente.buscarPacientePorDni(dni);

  res.json({ paciente });
};

const obtenerDatosPaciente = async (idPaciente) => {
  try {
    const paciente = await Paciente.buscarPacientePorId(idPaciente);
    if (!paciente) {
      throw new Error("Paciente no encontrado");
    }
    const internacionCama = await Internacion.findOne({
      where: { id_paciente: idPaciente },
      include: { model: Cama },
    });

    //Info basica
    const cama = internacionCama.Cama;
    const internacion = await Internacion.buscarInternacionPorIdPaciente(
      idPaciente
    );
    const obraSocial = await ObraSocial.buscarObraSocialPorIdPaciente(
      idPaciente
    );

    const medicoDerivacion = await Derivacion.findOne({
      where: { id_paciente: idPaciente },
      include: { model: Medico },
    });
    const medico = medicoDerivacion ? medicoDerivacion.Medico : "Sin Asignar";

    //Info Historial
    const pacienteConAlergias = await Paciente.findOne({
      where: { id: idPaciente },
      include: Alergias,
    });
    const pacienteEnfermedades = await Paciente.findOne({
      where: { id: idPaciente },
      include: Enfermedades,
    });

    const pacienteCirugias = await Paciente.findOne({
      where: { id: idPaciente },
      include: Cirugias,
    });
    const pacienteAntecedentes = await Paciente.findOne({
      where: { id: idPaciente },
      include: Antecedentes,
    });
    const medicamentosHistorial = await Medicamentos.findAll({
      include: {
        model: Paciente,
        as: "pacientesHistorial",
        where: { id: idPaciente },
        attributes: [],
        through: {
          attributes: [],
        },
      },
    });

    const alergias = pacienteConAlergias ? pacienteConAlergias.Alergias : [];
    const enfermedades = pacienteEnfermedades
      ? pacienteEnfermedades.Enfermedades
      : [];
    const cirugias = pacienteCirugias ? pacienteCirugias.Cirugias : [];
    const antecedentes = pacienteAntecedentes
      ? pacienteAntecedentes.Antecedentes
      : [];

    //Info Motivos
    const pacienteSintomas = await Paciente.findOne({
      where: { id: idPaciente },
      include: Sintomas,
    });
    const pacienteNecesidades = await Paciente.findOne({
      where: { id: idPaciente },
      include: Necesidades,
    });
    const internacionPrioridad = await InternacionPrioridad.findOne({
      where: { id_internacion: internacion.id_internacion },
    });

    const sintomas = pacienteSintomas ? pacienteSintomas.Sintomas : [];
    const necesidades = pacienteNecesidades
      ? pacienteNecesidades.Necesidades
      : [];
    const prioridad = internacionPrioridad
      ? internacionPrioridad.prioridad
      : "Sin Asignar";

    //Info Evaluacion Basica
    const evaluacionBasica = await EvaluacionBasica.findOne({
      where: { id_paciente: idPaciente },
    });
    const presion_arterial = evaluacionBasica
      ? evaluacionBasica.presion_arterial
      : "Sin Asignar";
    const frecuencia_cardiaca = evaluacionBasica
      ? evaluacionBasica.frecuencia_cardiaca
      : "Sin Asignar";
    const frecuencia_respiratoria = evaluacionBasica
      ? evaluacionBasica.frecuencia_respiratoria
      : "Sin Asignar";
    const temperatura_corporal = evaluacionBasica
      ? evaluacionBasica.temperatura_corporal
      : "Sin Asignar";
    const color_piel = evaluacionBasica
      ? evaluacionBasica.color_piel
      : "Sin Asignar";

    //Plan Preeliminar
    const medicamentosPlan = await Medicamentos.findAll({
      include: {
        model: Paciente,
        as: "pacientesPlan",
        where: { id: idPaciente },
        attributes: [],
        through: {
          attributes: [],
        },
      },
    });

    const intervenciones = await Intervenciones.findAll({
      include: {
        model: Paciente,
        as: "intervencionesPaciente",
        where: { id: idPaciente },
        attributes: [],
        through: {
          attributes: [],
        },
      },
    });

    //Parte medica
    //Evaluacion Medica
    const analisis = await Analisis.findAll({
      include: {
        model: Paciente,
        as: "pacientesAnalisis",
        where: { id: idPaciente },
        attributes: [],
        through: {
          attributes: [],
        },
      },
    });
    const radiografias = await Radiografias.findAll({
      include: {
        model: Paciente,
        as: "pacientesRadiografias",
        where: { id: idPaciente },
        attributes: [],
        through: {
          attributes: [],
        },
      },
    });
    const resonancia = await Resonancias.findAll({
      include: {
        model: Paciente,
        as: "pacientesResonancias",
        where: { id: idPaciente },
        attributes: [],
        through: {
          attributes: [],
        },
      },
    });

    //Seguimiento
    const fisioterapias = await Fisioterapias.findAll({
      include: {
        model: Paciente,
        as: "pacientesFisioterapias",
        where: { id: idPaciente },
        attributes: [],
        through: {
          attributes: [],
        },
      },
    });
    const ocupacionales = await Ocupacionales.findAll({
      include: {
        model: Paciente,
        as: "pacientesOcupacionales",
        where: { id: idPaciente },
        attributes: [],
        through: {
          attributes: [],
        },
      },
    });
    const tratamientos = await Tratamientos.findAll({
      include: {
        model: Paciente,
        as: "pacientesTratamientos",
        where: { id: idPaciente },
        attributes: [],
        through: {
          attributes: [],
        },
      },
    });
    const medicamentosMedico = await Medicamentos.findAll({
      include: {
        model: Paciente,
        as: "pacientesMedicamentosSeguimiento",
        where: { id: idPaciente },
        attributes: [],
        through: {
          attributes: [],
        },
      },
    });
    const medicamentoEspecificaciones = await PacienteMedicamentos.findAll({
      where: { id_paciente: idPaciente },
    });

    return {
      paciente,
      cama,
      internacion,
      obraSocial,
      medico,
      alergias,
      enfermedades,
      cirugias,
      antecedentes,
      medicamentosHistorial,
      sintomas,
      necesidades,
      prioridad,
      presion_arterial,
      frecuencia_cardiaca,
      frecuencia_respiratoria,
      temperatura_corporal,
      color_piel,
      medicamentosPlan,
      intervenciones,
      analisis,
      radiografias,
      resonancia,
      tratamientos,
      fisioterapias,
      ocupacionales,
      medicamentosMedico,
      medicamentoEspecificaciones,
    };
  } catch (error) {
    console.error("Error al obtener los datos del paciente:", error);
    throw error;
  }
};

module.exports = {
  crearPaciente,
  listarPacientes,
  buscarPacientePorDni,
  buscarUltimoPacienteNN,
  boradoLogicoPaciente,
  recuperarDatosPaciente,
  modificarDatosPaciente,
  buscarPacientePorDniGenerico,
  listarPacientesOpcionLimpia,
  obtenerDatosPaciente,
};
