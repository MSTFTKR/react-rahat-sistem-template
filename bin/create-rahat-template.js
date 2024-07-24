const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Kullanıcının proje adını alın
const projectName = process.argv[2];

if (!projectName) {
  console.log('Lütfen bir proje adı belirtin');
  process.exit(1);
}

// Yeni proje dizinini oluşturun
const currentDir = process.cwd();
const projectDir = path.join(currentDir, projectName);
fs.mkdirSync(projectDir, { recursive: true });

// Template dosyalarınızı kopyalayın
// Bu kısımda, kendi template dosyalarınızı kopyalamak için gerekli kodu yazın

// Bağımlılıkları yükleyin
console.log('Bağımlılıklar yükleniyor...');
execSync('npm install', { cwd: projectDir, stdio: 'inherit' });

console.log(`${projectName} başarıyla oluşturuldu!`);