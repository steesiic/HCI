export function validateFields(fields) {
  return Object.values(fields).every((v) => v.trim() !== "");
}