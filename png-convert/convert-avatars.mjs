import sharp from 'sharp'
import { readdir, mkdir, stat } from 'node:fs/promises'
import { join, parse } from 'node:path'

// ════ НАСТРОЙКИ ════
const SOURCE_DIR = 'avatars-source'
const OUTPUT_DIR = 'public/anime/avatars'
const SIZE = 200
const QUALITY = 88
// ════════════════════

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true })

  const files = await readdir(SOURCE_DIR)
  const images = files.filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))

  console.log(`Найдено файлов: ${images.length}\n`)

  let totalBefore = 0
  let totalAfter = 0
  let skipped = 0

  for (const file of images) {
    const { name } = parse(file)
    const srcPath = join(SOURCE_DIR, file)
    const outPath = join(OUTPUT_DIR, `${name}.webp`)

    // Проверяем: если webp новее исходника — пропускаем
    try {
      const srcStat = await stat(srcPath)
      const outStat = await stat(outPath)
      if (outStat.mtimeMs >= srcStat.mtimeMs) {
        console.log(`skip  ${file}  (webp up-to-date)`)
        skipped++
        continue
      }
    } catch {
      // webp не существует — создаём
    }

    const sizeBefore = (await stat(srcPath)).size
    totalBefore += sizeBefore

    const meta = await sharp(srcPath).metadata()

    await sharp(srcPath)
      .resize(SIZE, SIZE, {
        fit: 'cover',
        position: 'center',
        withoutEnlargement: false,
      })
      .webp({ quality: QUALITY })
      .toFile(outPath)

    const sizeAfter = (await stat(outPath)).size
    totalAfter += sizeAfter

    console.log(
      `${file}  (${meta.width}×${meta.height}, ${(sizeBefore / 1024).toFixed(0)} KB)\n` +
      `  → ${name}.webp  ${SIZE}×${SIZE}  ${(sizeAfter / 1024).toFixed(0)} KB  ` +
      `(-${Math.round((1 - sizeAfter / sizeBefore) * 100)}%)\n`
    )
  }

  console.log('─────────────')
  console.log(`Обработано:  ${images.length - skipped}`)
  console.log(`Пропущено:   ${skipped}`)
  console.log(`Итого до:    ${(totalBefore / 1024).toFixed(0)} KB`)
  console.log(`Итого после: ${(totalAfter / 1024).toFixed(0)} KB`)
}

main().catch(console.error)