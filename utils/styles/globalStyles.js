import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  // estilos del spreadsheet
  spreadsheet: {
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden", // Evita que el contenido sobresalga
  },
  headerData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#005BB5",
    backgroundColor: "#007AFF",
  },
  containerData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "#fff",
  },
  headerText: {
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
  column: {
    flex: 1,
    textAlign: "center",
  },
  // estilos del modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  // estilos botones
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "48%",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "48%",
  },
  // estilos del formulario
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  form: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  dropdown: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "48%",
    marginRight: "4%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default globalStyles;
