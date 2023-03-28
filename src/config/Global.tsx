import { notification } from "antd";
import { RcFile } from "antd/lib/upload";

export const displayFormats = {
  DATE_FORMAT: "MM-DD-YYYY",
  TIME_FORMAT: "HH:mm",
  DATE_TIME_FORMAT: "MM-DD-YYYY HH:mm",
};

export const uploadedFileOnPreview = async (file: any) => {
  let src = file.url as string;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj as RcFile);
      reader.onload = () => resolve(reader.result as string);
    });
  }

  const image = new Image();
  image.src = src;
  const imgWindow: any = window.open(src);
  imgWindow.document.write(image.outerHTML);
};

export const Notification = {
  success: (data: any) => {
    notification.success({
      placement: data.placement ? data.placement : "bottomRight",
      duration: 3,
      ...data,
    });
  },
  error: (data: any) => {
    notification.error({
      placement: data.placement ? data.placement : "bottomRight",
      duration: 3,
      ...data,
    });
  },
};

export const snake_case_string = (str: any) => {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((s: any) => s.toLowerCase())
      .join("_")
  );
};

export const camel_case_string = (str: any) => {
  str = str
    .replace(/[-_]+/g, " ")
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word: any, index: any) {
      return index !== 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/ (.)/g, function ($1: any) {
      return $1.toUpperCase();
    });
  return str;
};

export const convertTextToID = (
  text_array: any,
  main_array: any,
  text_key: any,
  id_key: any
) => {
  const new_array: any = [];
  if (text_array && text_array.values && text_array.values.length > 0) {
    text_array.values.forEach((x: any) => {
      var temp = main_array.find((y: any) => y[text_key] === x);
      console.log("temp", temp);
      if (x && temp) {
        new_array.push(temp[id_key]);
      } else {
        insertAt(new_array, 0, x);
      }
    });
  }
  return new_array;
};

function insertAt(array: any, index: any, ...elementsArray: any) {
  array.splice(index, 0, ...elementsArray);
}

export const dataToFormdataConverter = (data: any) => {
  const formData = new FormData();
  for (let name in data) {
    const value = data[name];

    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        name = `${name}[]`;
        value.map((item) => {
          formData.append(name, item);
        });
      } else {
        formData.append(name, value);
      }
    }
    // formData.append(name, data[name]); // there should be values.avatar which is a File object
  }
  return formData;
};
