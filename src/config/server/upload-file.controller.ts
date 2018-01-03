import { requestType } from '~/config/enum.config'

const CONTROLLER = 'uploadFile'

export const uploadFileController = {
  /**
   * 上传文件
   */
  upload: {
    controller: CONTROLLER,
    action: 'upload',
    type: requestType.Post
  },
  /**
   * 通过文件名下载文件
   */
  getFile: {
    controller: CONTROLLER,
    action: 'getFile',
    type: requestType.Get
  },
  /**
   * 按ID查询上传文件信息
   */
  getUploadFile: {
    controller: CONTROLLER,
    action: 'getUploadFile',
    type: requestType.Get
  }
}
