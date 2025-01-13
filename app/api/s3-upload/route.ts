import { sanitizeKey } from "next-s3-upload";
import { POST as route } from "next-s3-upload/route";

export const POST = route.configure({
	async key(req, filename) {
		try {
			const url = req.url.split('?')[1];
			const params = new URLSearchParams(url);
			const folder = params.get('folder');

            return `${folder}/${sanitizeKey(filename)}`;
		} catch (error) {
			console.error("Error parsing JSON body:", error);
			return `${filename}`;
		}
	},
});