import { createMaterialTheme } from ".";

const {
  createContract,
  createTheme
} = createMaterialTheme({
  color: {
    customRoles: {
      success: "dynamic",
      error: "fixed",
    }
  },
});
