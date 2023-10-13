import fs from 'fs';
import sharp from 'sharp';

// 리사이징할 이미지가 있는 폴더 경로
const folderPath = './menu-uploads';

// 리사이징된 이미지를 저장할 폴더 경로
const outputFolderPath = './menu-uploads-test';

// 폴더 내의 파일 목록을 읽어옵니다.
fs.readdir(folderPath, (err, files) => {
	if (err) {
		console.error('Error reading folder:', err);
		return;
	}

	// 각 이미지에 대해 리사이징 작업을 수행합니다.
	files.forEach(file => {
		// 파일 확장자가 이미지인지 확인합니다.
		if (['.jpg', '.jpeg', '.png', '.gif'].includes(file.toLowerCase().slice(-4))) {
			// 이미지 리사이징 작업
			sharp(`${folderPath}/${file}`)
			.resize({ width: 400 })
			.toFile(`${outputFolderPath}/${file}`, (err, info) => {
				if (err) {
					console.error(`Error resizing ${file}:`, err);
				} else {
					console.log(`Resized ${file} to width: 400, height: ${info.height}`);
				}
			});
		}
	});
});
