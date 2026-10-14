import sharp from 'sharp'
import { readdir, mkdir, stat } from 'node:fs/promises'
import { join, parse } from 'node:path'

// ════ НАСТРОЙКИ ════
const SOURCE_DIR = 'posters-source'
const OUTPUT_DIR = 'public/anime/posters'
const QUALITY = 88

const VARIANTS = [
  { width: 600, height: 900, suffix: '' },
]
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
    const outName = `${name}.webp`
    const outPath = join(OUTPUT_DIR, outName)

    // Проверяем: если webp уже есть и он новее исходника — пропускаем
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

    const srcStats = await sharp(srcPath).metadata()
    const sizeBefore = (await stat(srcPath)).size
    totalBefore += sizeBefore

    console.log(
      `\n${file}  (${srcStats.width}×${srcStats.height}, ${(sizeBefore / 1024).toFixed(0)} KB)`
    )

    for (const v of VARIANTS) {
      const vOutName = `${name}${v.suffix}.webp`
      const vOutPath = join(OUTPUT_DIR, vOutName)

      await sharp(srcPath)
        .resize(v.width, v.height, {
          fit: 'cover',
          position: 'center',
          withoutEnlargement: true,
        })
        .webp({ quality: QUALITY })
        .toFile(vOutPath)

      const sizeAfter = (await stat(vOutPath)).size
      totalAfter += sizeAfter

      console.log(
        `  → ${vOutName}  ${v.width}×${v.height}  ${(sizeAfter / 1024).toFixed(0)} KB  ` +
        `(-${Math.round((1 - sizeAfter / sizeBefore) * 100)}%)`
      )
    }
  }

  console.log(`\n─────────────`)
  console.log(`Обработано:  ${images.length - skipped}`)
  console.log(`Пропущено:   ${skipped}`)
  console.log(`Итого до:    ${(totalBefore / 1024 / 1024).toFixed(1)} MB`)
  console.log(`Итого после: ${(totalAfter / 1024 / 1024).toFixed(1)} MB`)
  if (totalBefore > 0) {
    console.log(`Экономия:    -${Math.round((1 - totalAfter / totalBefore) * 100)}%`)
  }
}

main().catch(console.error)