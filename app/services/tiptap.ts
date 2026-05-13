import fs from 'node:fs'
import path from 'node:path'
import app from '@adonisjs/core/services/app'

export default class TipTapHelper {
  static get tmpDir(): string {
    return app.publicPath('tmp')
  }

  static get imagesDir(): string {
    return app.publicPath('uploads/images')
  }

  static ensureDirs(): void {
    fs.mkdirSync(TipTapHelper.tmpDir, { recursive: true })
    fs.mkdirSync(TipTapHelper.imagesDir, { recursive: true })
  }

  static extractImageFilenames(html: string): string[] {
    const regex = /\/uploads\/(?:tmp|images)\/([^"'\s>]+)/g
    const filenames: string[] = []
    let match: RegExpExecArray | null

    while ((match = regex.exec(html)) !== null) {
      filenames.push(match[1])
    }

    return [...new Set(filenames)]
  }

  static moveImages(html: string): string {
    TipTapHelper.ensureDirs()

    const filenames = TipTapHelper.extractImageFilenames(html)
    let updatedHtml = html

    for (const filename of filenames) {
      const tmpPath = path.join(TipTapHelper.tmpDir, filename)
      const destPath = path.join(TipTapHelper.imagesDir, filename)

      if (fs.existsSync(tmpPath)) {
        try {
          fs.renameSync(tmpPath, destPath)
        } catch {
          fs.copyFileSync(tmpPath, destPath)
          fs.unlinkSync(tmpPath)
        }
      }

      updatedHtml = updatedHtml.replaceAll(
        `/tmp/${filename}`,
        `/uploads/images/${filename}`
      )
    }

    return updatedHtml
  }

  static deleteTmpImage(filename: string): boolean {
    TipTapHelper.ensureDirs()

    const safe = path.basename(filename)
    const filePath = path.join(TipTapHelper.tmpDir, safe)

    if (!fs.existsSync(filePath)) return false

    fs.unlinkSync(filePath)
    return true
  }

  static deleteImage(filename: string): boolean {
    TipTapHelper.ensureDirs()

    const safe = path.basename(filename)
    const filePath = path.join(TipTapHelper.imagesDir, safe)

    if (!fs.existsSync(filePath)) return false

    fs.unlinkSync(filePath)
    return true
  }

  static deleteAllImagesFromHtml(html: string): void {
    const filenames = TipTapHelper.extractImageFilenames(html)

    for (const filename of filenames) {
      const safe = path.basename(filename)

      for (const dir of [TipTapHelper.tmpDir, TipTapHelper.imagesDir]) {
        const filePath = path.join(dir, safe)
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath)
          } catch {}
        }
      }
    }
  }

  static cleanOldTmpFiles(maxAgeMs: number = 24 * 60 * 60 * 1000): void {
    TipTapHelper.ensureDirs()

    const now = Date.now()
    const files = fs.readdirSync(TipTapHelper.tmpDir)

    for (const file of files) {
      const filePath = path.join(TipTapHelper.tmpDir, file)
      const stat = fs.statSync(filePath)

      if (now - stat.mtimeMs > maxAgeMs) {
        try {
          fs.unlinkSync(filePath)
        } catch {}
      }
    }
  }
}
