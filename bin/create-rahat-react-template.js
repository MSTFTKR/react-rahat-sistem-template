#!/usr/bin/env node
const util = require('util');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const exec = util.promisify(require('child_process').exec);
async function runCmd(command) {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log(stderr);
  } catch (error) {
    console.log(error);
  }
}

if (process.argv.length < 3) {
  console.log('Lütfen hedef proje dizinini belirtin.');
  console.log('Örneğin:');
  console.log('    npx create-rahat-sistem-template my-app');
  process.exit(1);
}

const ownPath = process.cwd();
const folderName = process.argv[2];
const appPath = path.join(ownPath, folderName);
const repo = 'https://github.com/MSTFTKR/react-rahat-sistem-template.git';

try {
  fs.mkdirSync(appPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log('Dizin zaten mevcut. Lütfen proje için başka bir ad seçin.');
  } else {
    console.log(err);
  }
  process.exit(1);
}

async function setup() {
  try {
    console.log(`${repo} adresinden dosyalar indiriliyor`);
    await runCmd(`git clone --depth 1 ${repo} ${folderName}`);
    console.log('Klonlama başarılı.');

    process.chdir(appPath);

    console.log('Bağımlılıklar yükleniyor...');
    await runCmd('npm install --legacy-peer-deps');
    console.log('Bağımlılıklar başarıyla yüklendi.');
    console.log();

    // .git klasörünü sil
    await runCmd('npx rimraf ./.git');


    console.log('Kurulum tamamlandı!');

    console.log('Başlamak için şu komutları kullanmanızı öneriyoruz:');
    console.log(`    cd ${folderName}`);
    console.log('    npm run dev');
    console.log('Özel şablonunuza dayalı yeni React uygulamanızın keyfini çıkarın!');
    console.log('Daha fazla bilgi için README.md dosyasını kontrol edin.');
  } catch (error) {
    console.log(error);
  }
}

setup();