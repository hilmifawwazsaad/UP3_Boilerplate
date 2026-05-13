import { utils, writeFile } from 'xlsx'

class Excel {
  exportToExcel(data: any, columns: any, fname: string) {
    const flatRows = data.map((row: any) => {
      const flattenedRow: any = {}

      columns.forEach((column: any) => {
        const keys = column.field
        let value = row
        value = value ? value[keys] : null
        flattenedRow[column.title.replace('.', '_')] = value
      })
      return flattenedRow
    })

    const MAX_WIDTH = 50
    const ws: any = utils.json_to_sheet(flatRows)

    const headerRange = utils.decode_range(ws['!ref'])
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
      const cellAddress = utils.encode_cell({ r: 0, c: C })
      if (ws[cellAddress]) {
        ws[cellAddress].s = {
          font: { bold: true, color: { rgb: 'FFFFFF' } }, 
          alignment: { horizontal: 'center', vertical: 'center' },
          fill: { patternType: 'solid', fgColor: { rgb: '0070C0' } }, 
        }
      }
    }

    for (let R = 1; R <= headerRange.e.r; ++R) {
      for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
        const cellAddress = utils.encode_cell({ r: R, c: C })
        if (ws[cellAddress]) {
          ws[cellAddress].s = {
            alignment: { horizontal: 'left', vertical: 'center' },
            fill: { patternType: 'solid', fgColor: { rgb: 'D9E1F2' }, bgColor: { indexed: 64 } }, 
          }
        }
      }
    }

    const colWidths = flatRows.reduce((widths: any, row: any) => {
      Object.keys(row).forEach((key, i) => {
        const value = row[key] ? row[key].toString() : ''
        const width = Math.min(value.length + 2, MAX_WIDTH) 
        widths[i] = Math.max(widths[i] || 10, width) 
      })
      return widths
    }, [])

    const maxPixelWidth = 200 / 7.5 
    const cols = colWidths.map((width: any) => ({ wch: Math.min(width, maxPixelWidth) }))
    ws['!cols'] = cols

    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Data')

    let now = new Date()
    const dateFname = now.getTime()
    const fileName = `${fname}-${dateFname}.xlsx`
    writeFile(wb, fileName, { bookType: 'xlsx' })
  }
}

export default function useExcel() {
  return new Excel()
}
