import imagemin from 'imagemin';
import imageminSharp from 'imagemin-sharp';

const MAX_SIZE = 3000;

async function optimizeImages(folderName) {
	const INPUT = `${folderName}/*.{jpg,png}`;
	const OUTPUT = `${folderName}`;

	const files = await imagemin([INPUT], {
		destination: OUTPUT,
		plugins: [
			imageminSharp({
				chainSharp: async (sharp) => {
					const meta = await sharp.metadata();
					if (meta.width > MAX_SIZE) {
						console.warn(`🚨 주의 : width 값이 ${MAX_SIZE}px을 초과하는 이미지가 있습니다.`);
						return sharp;
					}
					return sharp;
				},
			}),
		],
	});

	console.log(`✨ ${folderName} 의 이미지 압축이 완료되었습니다. ✨`);
}

if (process.argv.length >= 3) {
	const folderName = process.argv[2];
	optimizeImages(folderName).catch((error) => {
		console.error(`Error optimizing images for ${folderName}:`, error);
	});
} else {
	console.error('Error: Please provide the folder name as an argument.');
}
