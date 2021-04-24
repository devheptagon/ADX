export const validPhone = (val) =>
  new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$").test(val);

export const slugify = (val) =>
  val
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
