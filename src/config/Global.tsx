import { RcFile } from "antd/lib/upload";

export const displayFormats = {
	DATE_FORMAT: 'MM-DD-YYYY',
	TIME_FORMAT: 'HH:mm',
	DATE_TIME_FORMAT: 'MM-DD-YYYY HH:mm',
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
