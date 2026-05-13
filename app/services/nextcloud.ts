import axios from 'axios'
import fs from 'fs'

function createPrettyUrl(base: any, ...segments: any) {
  return [base, ...segments]
    .map((segment) => segment.replace(/^\/+|\/+$/g, '')) 
    .join('/')
}

export function getRelativePath(url: any) {
  const rootPath = createPrettyUrl(process.env.NEXTCLOUD_URL, '/cloud/p/')
  return url.replace(rootPath, '')
}

export async function uploadNC(file: any, destination: any = null, filename: any = null) {
  const username = process.env.NEXTCLOUD_USERNAME
  const password = process.env.NEXTCLOUD_PASSWORD
  const webdav = process.env.NEXTCLOUD_WEBDAV
  const nextcloudURL = process.env.NEXTCLOUD_URL

  if (!password || !username || !webdav) {
    return {
      status: 500,
      message: 'Failed Connect to Nextcloud',
    }
  }

  if (!destination) {
    destination = '/'
  }

  try {
    const datetime = new Date()
    const fileStream = fs.createReadStream(file.tmpPath)

    let remoteFileName
    let extention = file.clientName.split('.')
    extention = extention[extention.length - 1]

    if (filename) {
      remoteFileName = `${filename}-${datetime.getTime()}.${extention}`
    } else {
      remoteFileName = `${datetime.getTime()}.${extention}`
    }

    const uploadUrl = `${webdav}/${destination}/${remoteFileName}`

    const response = await axios.put(uploadUrl, fileStream, {
      auth: {
        username: username,
        password: password,
      },
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    })

    if (response.status === 201 || response.status === 204) {
      return {
        status: 200,
        message: 'File uploaded successfully',
        url: createPrettyUrl(nextcloudURL, '/cloud/p/', destination, remoteFileName),
      }
    } else {
      throw new Error('Failed to upload file.')
    }
  } catch (error) {
    return {
      status: 500,
      message: error,
    }
  }
}

export async function getNC(filePath: any) {
  const username = process.env.NEXTCLOUD_USERNAME
  const password = process.env.NEXTCLOUD_PASSWORD
  const webdav = process.env.NEXTCLOUD_WEBDAV

  if (!password || !username || !webdav) {
    return null
  }

  const fileUrl = `${webdav}/${filePath}`
  const response = await axios({
    method: 'GET',
    url: fileUrl,
    auth: {
      username: username,
      password: password,
    },
    responseType: 'stream',
    validateStatus: () => true,
  })

  return response
}

export async function deleteNC(filePath: any) {
  try {
    const username = process.env.NEXTCLOUD_USERNAME
    const password = process.env.NEXTCLOUD_PASSWORD
    const webdav = process.env.NEXTCLOUD_WEBDAV

    if (!password || !username || !webdav) {
      return null
    }

    const fileUrl = `${webdav}/${filePath}`

    await axios({
      method: 'DELETE',
      url: fileUrl,
      auth: {
        username: username,
        password: password,
      },
    })

    return true
  } catch (error) {
    return false
  }
}
