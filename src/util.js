export const formatDate = date => {
  let result = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  result = result
    .replaceAll(". ", "/")
    .replaceAll(".", "")
    .replaceAll("/", "-");

  return result;
};
