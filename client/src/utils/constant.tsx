const stateAlertMessages = {
  noText: "..........",
  accounts: {
    add: {
      ready: "Listo para Agregar.",
      incomplete: "Completa las casillas, por favor.",
      rutExisting: "El rut ya existe.",
    },
    modify: {
      ready: "Listo para Modificar.",
      selectUser: "Selecciona usuario, por favor.",
      unmodified: "No has hecho modificaciones.",
    },
    delete: {
      ready: "Listo para Eliminar.",
      selectUser: "Selecciona usuario, por favor.",
    },
  },
  cylinders: {
    add: {
      ready: "Listo para Agregar.",
      incomplete: "Completa las casillas, por favor.",
      rutExisting: "El código ya existe.",
    },
    modify: {
      ready: "Listo para Modificar.",
      selectUser: "Selecciona cilindro, por favor.",
      unmodified: "No has hecho modificaciones.",
    },
    delete: {
      ready: "Listo para Eliminar.",
      selectUser: "Selecciona cilindro, por favor.",
    },
  },
  clients: {
    add: {
      ready: "Listo para Agregar.",
      incomplete: "Completa las casillas, por favor.",
      rutExisting: "El rut ya existe.",
    },
    modify: {
      ready: "Listo para Modificar.",
      selectUser: "Selecciona cliente, por favor.",
      unmodified: "No has hecho modificaciones.",
    },
    delete: {
      ready: "Listo para Eliminar.",
      selectUser: "Selecciona cliente, por favor.",
    },
  },
  formCylinders: {
    selectCompany: (data: string) => `Solicitar cilindro para: ${data}`,
    menuEmptyCylinder: "Selecione cilindro a disponer",
    menuDisposeCylinder: "Selecione empresa solicitante",
  },
};

const stateError: any = {
  user: {
    0: { title: "Validación incorrecta", text: "" },
    1: { title: "Error al actualizar lista", text: "" },
    2: { title: "Error al Guardar cuenta", text: "" },
    3: { title: "Error al modificar cuenta", text: "" },
    4: { title: "Error al Eliminar cuenta", text: "" },
    5: { title: "Error al conectar con el servidor", text: "" },
  },
  cylinders: {
    0: { title: "Error al actualizar lista", text: "" },
    1: { title: "Error al Guardar cilindro", text: "" },
    2: { title: "Error al modificar cilindro", text: "" },
    3: { title: "Error al Eliminar cilindro", text: "" },
  },
  clients: {
    0: { title: "Error al actualizar lista", text: "" },
    1: { title: "Error al Guardar cliente", text: "" },
    2: { title: "Error al modificar cliente", text: "" },
    3: { title: "Error al Eliminar cliente", text: "" },
  },
};

const stateMessagesModal: any = {
  user: {
    0: { title: "¿Está seguro de que desea eliminar?", text: "" },
  },
  formCylinder: {
    0: { title: "¿Está seguro que desea disponer el cilindro?", text: "" },
    1: { title: "¿Está seguro que desea retirar el cilindro?", text: "" },
  },
  deliveryAndReception: {
    0: { title: "¿El cilindro fue entregado?", text: "" },
    1: { title: "¿El cilindro fue recepcionado?", text: "" },
  },
};

export { stateAlertMessages, stateError, stateMessagesModal };
