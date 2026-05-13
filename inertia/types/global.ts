import { formatNumberEn, formatNumberId, formatRoundNumber } from '~/utils/format'
import { encryptData, decryptData } from '~/utils/crypto'
import { encryptBase64, decryptBase64 } from '~/utils/base64crypto'
import { randUID } from '~/utils/generate'
import { getDate, getDatetime, getMonth, getYear, timeAgo } from '~/utils/time'

const appName = import.meta.env.VITE_APP_NAME || 'Adonis Workspace'

export default function setupGlobal(app: any) {
  app.config.globalProperties.$appName = appName

  app.config.globalProperties.$crypto = {
    encrypt: encryptData,
    decrypt: decryptData,
  }

  app.config.globalProperties.$time = {
    ago: timeAgo,
    year: getYear,
    month: getMonth,
    date: getDate,
    datetime: getDatetime,
  }

  app.config.globalProperties.$base64Crypto = {
    encrypt: encryptBase64,
    decrypt: decryptBase64,
  }

  app.config.globalProperties.$generate = {
    uid: randUID,
  }

  app.config.globalProperties.$format = {
    numberId: formatNumberId,
    numberEn: formatNumberEn,
    round: formatRoundNumber,
  }
}
